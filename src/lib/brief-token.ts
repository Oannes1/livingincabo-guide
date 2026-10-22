import crypto from "crypto";

/* ------------------------------------------------------------------ */
/*  Private, expiring lead-brief links.                                */
/*  The lead is encrypted into the URL (AES-256-GCM), so agents get a  */
/*  private brief page without us running a database, and nobody who   */
/*  sees the link can read the buyer's name, email or phone out of it. */
/*  GCM's auth tag rejects any tampered token. Every token carries an  */
/*  expiry. There is no fallback secret: without BRIEF_SECRET (or      */
/*  FUB_API_KEY) no link is minted and none is accepted.               */
/* ------------------------------------------------------------------ */

const TTL_MS = (Number(process.env.BRIEF_TTL_DAYS) || 90) * 24 * 60 * 60 * 1000;

const secret = (): string | null => process.env.BRIEF_SECRET || process.env.FUB_API_KEY || null;

const key = (s: string) =>
  Buffer.from(crypto.hkdfSync("sha256", s, "livingincabo-brief", "v2-enc", 32));

export interface BriefPayload {
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  quiz: Record<string, unknown>;
  matches: { slug: string; name: string; score: number }[];
  at: string;
  contactId?: number;
}

/** Returns null when no secret is configured. Callers must not fall back to an unsigned link. */
export function signBrief(p: BriefPayload): string | null {
  const s = secret();
  if (!s) {
    console.error("[brief] BRIEF_SECRET is not set; no brief link minted");
    return null;
  }
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", key(s), iv);
  const plain = JSON.stringify({ ...p, exp: Date.now() + TTL_MS });
  const enc = Buffer.concat([cipher.update(plain, "utf8"), cipher.final()]);
  return `v2.${Buffer.concat([iv, cipher.getAuthTag(), enc]).toString("base64url")}`;
}

export function readBrief(token: string): BriefPayload | null {
  const s = secret();
  if (!s) return null;
  return token.startsWith("v2.") ? readV2(token.slice(3), s) : readLegacy(token, s);
}

function readV2(raw: string, s: string): BriefPayload | null {
  try {
    const buf = Buffer.from(raw, "base64url");
    if (buf.length < 29) return null;
    const decipher = crypto.createDecipheriv("aes-256-gcm", key(s), buf.subarray(0, 12));
    decipher.setAuthTag(buf.subarray(12, 28));
    const plain = Buffer.concat([decipher.update(buf.subarray(28)), decipher.final()]).toString("utf8");
    const { exp, ...p } = JSON.parse(plain) as BriefPayload & { exp?: number };
    if (typeof exp !== "number" || Date.now() > exp) return null;
    return p;
  } catch {
    return null;
  }
}

/* Links minted before v2 were signed but not encrypted and had no expiry.
   They keep working only until TTL after the lead was submitted. */
function readLegacy(token: string, s: string): BriefPayload | null {
  const dot = token.lastIndexOf(".");
  if (dot < 1) return null;
  const body = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const expect = crypto.createHmac("sha256", s).update(body).digest("base64url").slice(0, 24);
  const a = Buffer.from(sig);
  const b = Buffer.from(expect);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  try {
    const p = JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as BriefPayload;
    const at = Date.parse(p.at);
    if (!Number.isFinite(at) || Date.now() > at + TTL_MS) return null;
    return p;
  } catch {
    return null;
  }
}

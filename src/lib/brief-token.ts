import crypto from "crypto";

/* ------------------------------------------------------------------ */
/*  Signed, stateless lead-brief links.                                */
/*  The whole lead is encoded into the URL and signed with an HMAC, so */
/*  agents get a private brief page without us running a database.     */
/*  Tampering with the payload invalidates the signature.              */
/* ------------------------------------------------------------------ */

const secret = () =>
  process.env.BRIEF_SECRET || process.env.FUB_API_KEY || "livingincabo-dev-secret";

const b64u = {
  enc: (s: string) => Buffer.from(s, "utf8").toString("base64url"),
  dec: (s: string) => Buffer.from(s, "base64url").toString("utf8"),
};

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

export function signBrief(p: BriefPayload): string {
  const body = b64u.enc(JSON.stringify(p));
  const sig = crypto.createHmac("sha256", secret()).update(body).digest("base64url").slice(0, 24);
  return `${body}.${sig}`;
}

export function readBrief(token: string): BriefPayload | null {
  const dot = token.lastIndexOf(".");
  if (dot < 1) return null;
  const body = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const expect = crypto.createHmac("sha256", secret()).update(body).digest("base64url").slice(0, 24);
  // constant-time compare
  const a = Buffer.from(sig);
  const b = Buffer.from(expect);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  try {
    return JSON.parse(b64u.dec(body)) as BriefPayload;
  } catch {
    return null;
  }
}

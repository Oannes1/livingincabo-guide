const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

interface SpamCheckOptions {
  checkContent?: string[];
}

interface SpamCheckResult {
  ok: boolean;
  reason?: "honeypot" | "too-fast" | "rate-limited" | "gibberish";
}

export function checkForSpam(
  request: Request,
  body: Record<string, unknown>,
  options: SpamCheckOptions = {}
): SpamCheckResult {
  // Layer 1: Honeypot
  if (body._website) {
    return { ok: false, reason: "honeypot" };
  }

  // Layer 2: Timestamp (must take at least 3 seconds)
  const loaded = Number(body._loaded);
  if (loaded && Date.now() - loaded < 3000) {
    return { ok: false, reason: "too-fast" };
  }

  // Layer 3: Rate limiting (5 per 15 minutes per IP)
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (entry) {
    if (now > entry.resetAt) {
      rateLimitMap.set(ip, { count: 1, resetAt: now + 15 * 60 * 1000 });
    } else {
      entry.count++;
      if (entry.count > 5) {
        return { ok: false, reason: "rate-limited" };
      }
    }
  } else {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 15 * 60 * 1000 });
  }

  // Layer 4: Gibberish detection
  if (options.checkContent) {
    for (const field of options.checkContent) {
      const value = body[field];
      if (typeof value === "string" && isGibberish(value)) {
        return { ok: false, reason: "gibberish" };
      }
    }
  }

  return { ok: true };
}

function isGibberish(text: string): boolean {
  if (text.length < 3) return false;
  const letters = text.replace(/[^a-zA-Z]/g, "");
  if (letters.length < 3) return false;

  const vowels = letters.replace(/[^aeiouAEIOU]/g, "").length;
  if (vowels / letters.length < 0.15) return true;

  if (/[^aeiouAEIOU\s]{5,}/i.test(letters)) return true;

  if (/[a-z][A-Z][a-z][A-Z]/.test(text)) return true;

  return false;
}

/* ------------------------------------------------------------------ */
/*  Follow Up Boss Integration                                         */
/*  https://docs.followupboss.com/reference/people-post                */
/* ------------------------------------------------------------------ */

const FUB_API_BASE = "https://api.followupboss.com/v1";

export interface FUBPersonPayload {
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  source?: string;
  tags?: string[];
  customFields?: Record<string, string>;
  note?: string;
}

export interface FUBResult {
  success: boolean;
  contactId?: number;
  error?: string;
  skipped?: boolean;
}

/**
 * Create or update a person in Follow Up Boss.
 * FUB uses HTTP Basic auth with the API key as the username and an empty password.
 */
export async function createFUBContact(payload: FUBPersonPayload): Promise<FUBResult> {
  const apiKey = process.env.FUB_API_KEY;
  const systemName = process.env.FUB_SYSTEM_NAME || "LivingInCaboGuide";

  if (!apiKey) {
    console.warn("[FUB] No API key configured — skipping CRM sync");
    return { success: true, skipped: true };
  }

  const basic = Buffer.from(`${apiKey}:`).toString("base64");

  const body = {
    source: payload.source || "Buying Property in Mexico Guide",
    tags: payload.tags || ["Lead Magnet", "Buying Guide PDF"],
    firstName: payload.firstName,
    lastName: payload.lastName || "",
    emails: payload.email ? [{ value: payload.email, type: "home" }] : [],
    phones: payload.phone ? [{ value: payload.phone, type: "mobile" }] : [],
    ...(payload.customFields ? { customFields: payload.customFields } : {}),
  };

  try {
    const response = await fetch(`${FUB_API_BASE}/people?deduplicate=true`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/json",
        "X-System": systemName,
        "X-System-Key": apiKey.substring(0, 8),
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("[FUB] Contact creation failed:", response.status, text);
      return {
        success: false,
        error: `FUB API returned ${response.status}`,
      };
    }

    const result = (await response.json()) as { id?: number };

    // Optionally add a note to the contact
    if (result.id && payload.note) {
      try {
        await fetch(`${FUB_API_BASE}/notes`, {
          method: "POST",
          headers: {
            Authorization: `Basic ${basic}`,
            "Content-Type": "application/json",
            "X-System": systemName,
            "X-System-Key": apiKey.substring(0, 8),
          },
          body: JSON.stringify({
            personId: result.id,
            subject: "Lead Magnet Downloaded",
            body: payload.note,
          }),
        });
      } catch (err) {
        console.error("[FUB] Note creation failed:", err);
        // Don't fail the whole operation if note creation fails
      }
    }

    return { success: true, contactId: result.id };
  } catch (error) {
    console.error("[FUB] API error:", error);
    return { success: false, error: "Failed to reach FUB API" };
  }
}

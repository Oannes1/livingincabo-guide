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

  // Tags are deliberately NOT sent on create. FUB only emits "tag added"
  // events (which drive tag-triggered Automations) when tags are added to
  // an existing person — tags included at creation set silently and no
  // automation fires. So: create/dedupe first, then merge tags in a
  // second call below. This also gets tags onto deduped existing
  // contacts, which the create call ignores entirely.
  const body = {
    source: payload.source || "Buying Property in Mexico Guide",
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

    const result = (await response.json()) as { id?: number; tags?: string[] };

    // Merge tags in a second call so FUB emits real "tag added" events,
    // which is what tag-triggered Automations listen for.
    const desiredTags = payload.tags || ["Lead Magnet", "Buying Guide PDF"];
    if (result.id && desiredTags.length) {
      try {
        const existing = Array.isArray(result.tags) ? result.tags : [];
        const merged = Array.from(new Set([...existing, ...desiredTags]));
        const newOnes = merged.length > existing.length;
        if (newOnes) {
          const tagResponse = await fetch(`${FUB_API_BASE}/people/${result.id}`, {
            method: "PUT",
            headers: {
              Authorization: `Basic ${basic}`,
              "Content-Type": "application/json",
              "X-System": systemName,
              "X-System-Key": apiKey.substring(0, 8),
            },
            body: JSON.stringify({ tags: merged }),
          });
          if (!tagResponse.ok) {
            console.error("[FUB] Tag update failed:", tagResponse.status, await tagResponse.text());
          }
        }
      } catch (err) {
        console.error("[FUB] Tag update error:", err);
        // Contact exists and note still lands — don't fail the lead over tags
      }
    }

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

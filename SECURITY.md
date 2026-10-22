# Security setup for guide.livingincabo.com

This repo is public. Never commit a key, token or password. All secrets live in
Vercel under Project Settings, Environment Variables.

## Environment variables

| Name | Required | What it does |
| --- | --- | --- |
| `BRIEF_SECRET` | Yes | Encrypts and signs the private agent brief links. Use a long random value (for example the output of `openssl rand -base64 48`). If it is missing the site falls back to `FUB_API_KEY`; if both are missing, no brief link is created and none opens. |
| `BRIEF_TTL_DAYS` | No | How many days a brief link keeps working. Defaults to 90. |
| `ANTHROPIC_API_KEY` | Yes, for the AI brief | Without it the quiz shows its built-in results instead. |
| `FUB_API_KEY` | Yes | Follow Up Boss. |
| `RESEND_API_KEY` | Yes | Sends the guide and alert emails. |
| `EMAIL_FROM`, `EMAIL_REPLY_TO`, `ALERT_EMAIL` | Recommended | Sender and alert addresses. |

Changing `BRIEF_SECRET` makes every earlier brief link stop working. That is the
way to revoke all links at once.

## Bot protection (Vercel BotID)

`/api/ai-brief`, `/api/quiz-submit` and `/api/submit` are protected by Vercel BotID.
The list of protected paths is in `src/instrumentation-client.ts` and each route
calls `checkBotId()` on the server. Add a path in both places or neither.

Optional but recommended: Vercel dashboard, the project, Firewall, Configure,
turn on **Vercel BotID Deep Analysis**.

## Rate limit rule (Vercel Firewall)

The in-code limiter in `src/lib/spam-protection.ts` only counts per server
instance, so the durable limit is a Firewall rule. Add it once:

1. Vercel dashboard, the project, **Firewall**, **Configure**, **Add New Rule**.
2. Name: `Rate limit AI brief and forms`.
3. If: **Request Path** **matches expression** `^/api/(ai-brief|quiz-submit|submit)$`
   AND **Method** **equals** `POST`.
4. Then: **Rate Limit**, Fixed Window, **60 seconds**, **10 requests**, keyed by **IP**,
   action **Too Many Requests (429)**.
5. Save, then **Review Changes** and **Publish**.

A real buyer calls each of these once or twice per visit, so 10 a minute leaves
plenty of headroom.

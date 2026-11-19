import { initBotId } from "botid/client/core";

/* Vercel BotID: attaches an invisible challenge to these requests. Each
   route re-checks it server side with checkBotId(); this list and those
   checks have to stay in step. */
initBotId({
  protect: [
    { path: "/api/ai-brief", method: "POST" },
    { path: "/api/quiz-submit", method: "POST" },
    { path: "/api/submit", method: "POST" },
  ],
});

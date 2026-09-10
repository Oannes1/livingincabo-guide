/* ------------------------------------------------------------------ */
/*  Quiz instrumentation                                               */
/*                                                                     */
/*  Without this every other decision gets judged on taste. The point  */
/*  is to answer four questions:                                       */
/*    1. which question loses people                                   */
/*    2. how long each screen takes                                    */
/*    3. how takers distribute across segments                         */
/*    4. which segments actually turn into contacts                    */
/*                                                                     */
/*  Deliberately dependency-free. Events fan out to whatever is        */
/*  present (Vercel Analytics, GA4) and always to our own /api/track,  */
/*  so the funnel is reconstructable from our own logs even if every   */
/*  third-party script is blocked — which, for this audience on        */
/*  iPhones, a good share of the time it is.                           */
/* ------------------------------------------------------------------ */

export type QuizEvent =
  | "quiz_start"
  | "question_view"
  | "question_answer"
  | "question_back"
  | "contradiction_shown"
  | "contradiction_resolved"
  | "scoring_started"
  | "result_view"
  | "gate_view"
  | "gate_submit"
  | "gate_error"
  | "guide_offer_view"
  | "guide_offer_accept"
  | "phone_captured"
  | "share_click"
  | "quiz_abandon";

export interface EventProps {
  step?: number;
  stepKey?: string;
  answer?: string;
  inPlay?: number;
  msOnStep?: number;
  segment?: string;
  topMatch?: string;
  topScore?: number;
  contradictionId?: string;
  kept?: string;
  [k: string]: string | number | boolean | undefined;
}

/** Stable per-visitor id so a funnel can be reassembled without cookies. */
function sessionId(): string {
  if (typeof window === "undefined") return "ssr";
  const KEY = "lic_quiz_sid";
  try {
    let id = sessionStorage.getItem(KEY);
    if (!id) {
      id = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
      sessionStorage.setItem(KEY, id);
    }
    return id;
  } catch {
    // Private mode / storage disabled. Still emit, just unlinked.
    return "nostore";
  }
}

let stepEnteredAt = 0;

/** Call when a question first paints, so the next event can report dwell. */
export function markStepEntered() {
  stepEnteredAt = Date.now();
}

export function msOnStep(): number {
  return stepEnteredAt ? Date.now() - stepEnteredAt : 0;
}

export function track(event: QuizEvent, props: EventProps = {}) {
  if (typeof window === "undefined") return;

  const payload = {
    event,
    sid: sessionId(),
    at: new Date().toISOString(),
    path: window.location.pathname,
    ...props,
  };

  // 1. Vercel Analytics, if the script is on the page.
  try {
    const va = (window as unknown as { va?: (...a: unknown[]) => void }).va;
    if (typeof va === "function") va("event", { name: event, data: props });
  } catch { /* never let analytics break the quiz */ }

  // 2. GA4 / GTM, if present.
  try {
    const w = window as unknown as {
      gtag?: (...a: unknown[]) => void;
      dataLayer?: unknown[];
    };
    if (typeof w.gtag === "function") w.gtag("event", event, props);
    else if (Array.isArray(w.dataLayer)) w.dataLayer.push({ event, ...props });
  } catch { /* same */ }

  // 3. Our own collector. keepalive so an abandon event still lands
  //    while the tab is closing.
  try {
    const body = JSON.stringify(payload);
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/track", new Blob([body], { type: "application/json" }));
    } else {
      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        keepalive: true,
      }).catch(() => {});
    }
  } catch { /* same */ }
}

/** Fires once per session when the tab is hidden mid-quiz. */
export function trackAbandonOnce(step: number, stepKey: string, inPlay: number) {
  if (typeof window === "undefined") return () => {};
  let fired = false;

  const onHide = () => {
    if (fired || document.visibilityState !== "hidden") return;
    fired = true;
    track("quiz_abandon", { step, stepKey, inPlay, msOnStep: msOnStep() });
  };

  document.addEventListener("visibilitychange", onHide);
  return () => document.removeEventListener("visibilitychange", onHide);
}

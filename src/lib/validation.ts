import { z } from "zod";

/* ------------------------------------------------------------------ */
/*  Request schemas for the public API routes.                         */
/*                                                                     */
/*  Every field has a length cap. Anything a bot could use to stuff a  */
/*  link into an email we send to a stranger (a URL in the first name, */
/*  a domain in the property location) is rejected outright.           */
/* ------------------------------------------------------------------ */

const LINKISH = /(https?:|www\.|:\/\/|[<>@]|\.(com|net|org|io|co|ru|cn|xyz|top|info|biz|link|click|me|ly)\b)/i;

const short = z.string().trim().max(40);

const personName = (max: number) =>
  z.string().trim().max(max).refine((s) => !LINKISH.test(s), "Names can't contain links.");

export const emailField = z.string().trim().toLowerCase().max(254).pipe(z.email());

export const phoneField = z.string().trim().max(40).default("");

/** Quiz answers. Unknown keys are stripped so only these reach the prompt or the CRM. */
export const answersSchema = z.object({
  useCase: short.optional(),
  budgetMin: z.number().finite().min(0).max(1_000_000_000).optional(),
  budgetMax: z.number().finite().min(0).max(1_000_000_000).optional(),
  setting: short.optional(),
  vibe: short.optional(),
  homeType: short.optional(),
  mustHaves: z.array(short).max(12).optional(),
  timeline: short.optional(),
  buildStage: short.optional(),
  hoaTolerance: short.optional(),
  amenities: z.array(short).max(12).optional(),
  ownership: short.optional(),
  whyNow: short.optional(),
});

export const aiBriefSchema = z.object({ answers: answersSchema.default({}) });

export const quizSubmitSchema = z.object({
  leadType: z.string().max(40).optional(),
  firstName: personName(80).pipe(z.string().min(1)),
  lastName: personName(80).default(""),
  email: emailField,
  phone: phoneField,
  quiz: answersSchema.extend({ guideFor: z.string().trim().max(80).optional() }).default({}),
  matches: z
    .array(
      z.object({
        slug: z.string().trim().max(80),
        name: personName(120),
        score: z.number().finite().min(0).max(100),
      })
    )
    .max(10)
    .default([]),
});

export const submitSchema = z.object({
  leadType: z.enum(["buyer", "buyer-quiz", "seller"]).catch("buyer"),
  firstName: personName(80).pipe(z.string().min(1)),
  lastName: personName(80).default(""),
  email: emailField,
  phone: phoneField,
  propertyLocation: personName(200).default(""),
  quiz: z
    .record(z.string().max(40), z.string().max(80))
    .refine((q) => Object.keys(q).length <= 12)
    .nullish(),
});

/** One plain-English message for a failed parse, matching the copy the forms already show. */
export function validationMessage(error: z.ZodError): string {
  const issue = error.issues[0];
  const field = issue?.path[0];
  if (issue?.code === "custom" && (field === "firstName" || field === "lastName")) return issue.message;
  if (field === "email") return "Please enter a valid email address.";
  if (field === "firstName") return "First name and email are required.";
  return "Please check your details and try again.";
}

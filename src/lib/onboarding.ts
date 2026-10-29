import { z } from "zod";
import { PLANS } from "./pricing";

// Public endpoint (no secrets on the page). The function validates with the
// service role on the server side and only ever inserts.
export const ONBOARDING_ENDPOINT =
  "https://aliegtwlfphpeyvesyvi.supabase.co/functions/v1/cw-onboarding-submit";

export const TENANT_SLUG = "assorted-coworking";

const planCodes = PLANS.map((p) => p.code) as [string, ...string[]];

export const onboardingSchema = z.object({
  full_name: z.string().trim().min(2, "Please enter your full name").max(120),
  phone: z
    .string()
    .trim()
    .refine((v) => v.replace(/\D/g, "").length >= 10, "Enter a valid WhatsApp number"),
  email: z.string().trim().email("Enter a valid email").max(160),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  cnic: z
    .string()
    .trim()
    .max(20)
    .optional()
    .or(z.literal(""))
    .refine((v) => !v || v.replace(/\D/g, "").length === 13, "CNIC should have 13 digits"),
  plan_code: z.enum(planCodes, { errorMap: () => ({ message: "Pick a plan" }) }),
  seats: z.coerce.number().int().min(1).max(20),
  meeting_room: z.boolean().default(false),
  start_date: z.string().min(1, "Pick a start date"),
  emergency_contact: z.string().trim().max(160).optional().or(z.literal("")),
  heard_from: z.string().trim().max(60).optional().or(z.literal("")),
  notes: z.string().trim().max(500).optional().or(z.literal("")),
  agree: z.literal(true, { errorMap: () => ({ message: "Please accept the house rules" }) }),
  // honeypot: real users never fill this
  website: z.string().max(200).optional().or(z.literal("")),
});

export type OnboardingInput = z.infer<typeof onboardingSchema>;

export interface OnboardingResult {
  ok: boolean;
  error?: string;
  member_no?: string;
  monthly_fee?: number;
  addon?: number;
  deposit?: number;
  total?: number;
  bank_details?: { bank: string; account_title: string; account_no: string };
}

export async function submitOnboarding(input: OnboardingInput): Promise<OnboardingResult> {
  const res = await fetch(ONBOARDING_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...input,
      tenant: TENANT_SLUG,
      page: typeof window !== "undefined" ? window.location.href : undefined,
    }),
  });
  let data: OnboardingResult;
  try {
    data = (await res.json()) as OnboardingResult;
  } catch {
    data = { ok: false, error: "bad_response" };
  }
  if (!res.ok && !data.error) data.error = `http_${res.status}`;
  return data;
}

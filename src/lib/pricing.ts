// Rate Card 2026 (PKR). Keep in sync with the display strings in
// src/components/Pricing.tsx and with cw_tenants.pricing in Supabase.
export type PlanPeriod = "month" | "day";

export interface Plan {
  code: string;
  name: string;
  detail: string;
  price: number;
  period: PlanPeriod;
  /** Unit label for the quantity selector */
  unit: "seat" | "room" | "pass";
  /** Whether a refundable deposit applies per unit */
  deposit: boolean;
}

export const PLANS: Plan[] = [
  { code: "day_shift", name: "Day Shift", detail: "9AM to 5PM", price: 15000, period: "month", unit: "seat", deposit: true },
  { code: "afternoon_shift", name: "Afternoon Shift", detail: "2PM to 10PM", price: 13500, period: "month", unit: "seat", deposit: true },
  { code: "night_shift", name: "Night Shift", detail: "5PM to 3AM", price: 12000, period: "month", unit: "seat", deposit: true },
  { code: "all_access", name: "24 Hour Access", detail: "Any time, all month", price: 18000, period: "month", unit: "seat", deposit: true },
  { code: "dedicated_desk", name: "Dedicated Desk", detail: "Reserved seat, 24/7", price: 22000, period: "month", unit: "seat", deposit: true },
  { code: "private_room", name: "Private Room", detail: "Lockable team office, 24/7", price: 65000, period: "month", unit: "room", deposit: true },
  { code: "flex_10", name: "10 Day Flex Pass", detail: "Any 10 days in a month", price: 10000, period: "month", unit: "pass", deposit: false },
  { code: "day_pass", name: "Day Pass", detail: "Full access for one day", price: 1500, period: "day", unit: "pass", deposit: false },
];

export const DEPOSIT_PER_SEAT = 10000;
export const MEETING_ROOM_ADDON = 5000;

export const BANK_DETAILS = {
  bank: "Bank Alfalah",
  accountTitle: "Assorted Business Services",
  accountNumber: "05581009191757",
};

export const WHATSAPP_NUMBER = "923218526405";

export const planByCode = (code: string) => PLANS.find((p) => p.code === code);

export interface Quote {
  plan: Plan;
  seats: number;
  monthly: number;
  addon: number;
  deposit: number;
  total: number;
}

export function quote(planCode: string, seats: number, meetingRoom: boolean): Quote | null {
  const plan = planByCode(planCode);
  if (!plan) return null;
  const qty = Math.max(1, Math.floor(seats || 1));
  const monthly = plan.price * qty;
  const addon = meetingRoom ? MEETING_ROOM_ADDON : 0;
  const deposit = plan.deposit ? DEPOSIT_PER_SEAT * qty : 0;
  return { plan, seats: qty, monthly, addon, deposit, total: monthly + addon + deposit };
}

export const formatPKR = (n: number) => `Rs ${Math.round(n).toLocaleString("en-PK")}`;

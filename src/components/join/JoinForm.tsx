import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PLANS, formatPKR, quote } from "@/lib/pricing";
import {
  onboardingSchema,
  submitOnboarding,
  type OnboardingInput,
  type OnboardingResult,
} from "@/lib/onboarding";
import { trackFormSubmit } from "@/lib/analytics";

const HEARD_FROM = ["Google", "Instagram", "Facebook", "LinkedIn", "Friend / referral", "Walked past", "Other"];

const todayIso = () => new Date().toISOString().slice(0, 10);

interface Props {
  onSuccess: (result: OnboardingResult, input: OnboardingInput) => void;
}

const JoinForm = ({ onSuccess }: Props) => {
  const [submitting, setSubmitting] = useState(false);
  const form = useForm<OnboardingInput>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      full_name: "",
      phone: "",
      email: "",
      company: "",
      cnic: "",
      plan_code: "day_shift",
      seats: 1,
      meeting_room: false,
      start_date: todayIso(),
      emergency_contact: "",
      heard_from: "",
      notes: "",
      agree: undefined as unknown as true,
      website: "",
    },
  });

  const planCode = form.watch("plan_code");
  const seats = form.watch("seats");
  const meetingRoom = form.watch("meeting_room");
  const q = useMemo(() => quote(planCode, Number(seats), meetingRoom), [planCode, seats, meetingRoom]);

  const onSubmit = async (values: OnboardingInput) => {
    setSubmitting(true);
    try {
      const result = await submitOnboarding(values);
      if (!result.ok) {
        toast.error(
          result.error === "missing"
            ? "Some details are missing. Please check the form."
            : "We couldn't save your form. Please try again or WhatsApp us.",
        );
        return;
      }
      trackFormSubmit();
      onSuccess(result, values);
    } catch {
      toast.error("Network problem. Please try again or WhatsApp us.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "h-12 border-2 border-border bg-background focus:border-primary transition-colors duration-300 rounded-xl";

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" noValidate>
        {/* honeypot */}
        <div className="hidden" aria-hidden="true">
          <input type="text" tabIndex={-1} autoComplete="off" {...form.register("website")} />
        </div>

        <section className="space-y-5">
          <h2 className="text-xl font-black">1. About you</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Ali Khan" autoComplete="name" className={inputClass} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>WhatsApp number *</FormLabel>
                  <FormControl>
                    <Input type="tel" inputMode="tel" placeholder="0321 2345678" autoComplete="tel" className={inputClass} {...field} />
                  </FormControl>
                  <FormDescription>We send invoices and updates here.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email *</FormLabel>
                  <FormControl>
                    <Input type="email" inputMode="email" placeholder="you@company.com" autoComplete="email" className={inputClass} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company (optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Startup / freelancer" autoComplete="organization" className={inputClass} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cnic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CNIC (optional)</FormLabel>
                  <FormControl>
                    <Input inputMode="numeric" placeholder="61101-1234567-1" className={inputClass} {...field} />
                  </FormControl>
                  <FormDescription>Needed for fingerprint entry registration.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="emergency_contact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Emergency contact (optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Name and number" className={inputClass} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </section>

        <section className="space-y-5">
          <h2 className="text-xl font-black">2. Your membership</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="plan_code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Plan *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className={inputClass}>
                        <SelectValue placeholder="Choose a plan" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {PLANS.map((p) => (
                        <SelectItem key={p.code} value={p.code}>
                          {p.name} · {formatPKR(p.price)}
                          {p.period === "month" ? "/month" : ""} · {p.detail}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="seats"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Number of {q?.plan.unit === "room" ? "rooms" : q?.plan.unit === "pass" ? "passes" : "seats"} *
                  </FormLabel>
                  <FormControl>
                    <Input type="number" inputMode="numeric" min={1} max={20} className={inputClass} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="start_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start date *</FormLabel>
                  <FormControl>
                    <Input type="date" min={todayIso()} className={inputClass} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="heard_from"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>How did you hear about us?</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value || ""}>
                    <FormControl>
                      <SelectTrigger className={inputClass}>
                        <SelectValue placeholder="Optional" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {HEARD_FROM.map((h) => (
                        <SelectItem key={h} value={h}>
                          {h}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="meeting_room"
            render={({ field }) => (
              <FormItem className="flex items-start gap-3 rounded-xl border-2 border-border p-4">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={(v) => field.onChange(v === true)} className="mt-0.5" />
                </FormControl>
                <div className="space-y-1 leading-tight">
                  <FormLabel className="font-semibold">Add meeting room access</FormLabel>
                  <FormDescription>+ Rs 5,000 per month on any membership.</FormDescription>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Anything we should know? (optional)</FormLabel>
                <FormControl>
                  <Textarea rows={3} placeholder="Team size, preferred desk, special requests…" className="border-2 border-border bg-background focus:border-primary rounded-xl resize-none" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </section>

        {q && (
          <section className="rounded-2xl border-2 border-primary/20 bg-primary/5 p-5 space-y-2">
            <h2 className="text-lg font-black">3. Total payable now</h2>
            <dl className="text-sm space-y-1">
              <div className="flex justify-between">
                <dt>
                  {q.plan.name} × {q.seats}
                </dt>
                <dd className="font-semibold">{formatPKR(q.monthly)}</dd>
              </div>
              {q.addon > 0 && (
                <div className="flex justify-between">
                  <dt>Meeting room access</dt>
                  <dd className="font-semibold">{formatPKR(q.addon)}</dd>
                </div>
              )}
              {q.deposit > 0 && (
                <div className="flex justify-between">
                  <dt>Refundable security deposit × {q.seats}</dt>
                  <dd className="font-semibold">{formatPKR(q.deposit)}</dd>
                </div>
              )}
              <div className="flex justify-between border-t border-primary/20 pt-2 text-base">
                <dt className="font-black">Total</dt>
                <dd className="font-black text-primary">{formatPKR(q.total)}</dd>
              </div>
            </dl>
            <p className="text-xs text-muted-foreground">
              Bank details and your member number appear after you submit. The deposit is refunded when you leave.
            </p>
          </section>
        )}

        <FormField
          control={form.control}
          name="agree"
          render={({ field }) => (
            <FormItem className="flex items-start gap-3">
              <FormControl>
                <Checkbox checked={field.value === true} onCheckedChange={(v) => field.onChange(v === true ? true : undefined)} className="mt-0.5" />
              </FormControl>
              <div className="space-y-1 leading-tight">
                <FormLabel className="font-semibold">I agree to the house rules *</FormLabel>
                <FormDescription>
                  Monthly fee is due in advance by the 28th. Keep the space quiet and tidy. Deposit is refundable on exit after dues are cleared.
                </FormDescription>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <Button type="submit" size="lg" disabled={submitting} className="w-full h-14 rounded-xl text-base font-bold gradient-primary">
          {submitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Submitting…
            </>
          ) : (
            "Submit induction form"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default JoinForm;

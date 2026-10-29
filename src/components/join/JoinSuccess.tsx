import { useState } from "react";
import { CheckCircle2, Copy, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BANK_DETAILS, WHATSAPP_NUMBER, formatPKR } from "@/lib/pricing";
import type { OnboardingInput, OnboardingResult } from "@/lib/onboarding";
import { trackWhatsAppClick } from "@/lib/analytics";

interface Props {
  result: OnboardingResult;
  input: OnboardingInput;
}

const CopyRow = ({ label, value }: { label: string; value: string }) => {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };
  return (
    <div className="flex items-center justify-between gap-3 py-2">
      <div>
        <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
        <div className="font-semibold break-all">{value}</div>
      </div>
      <Button type="button" variant="outline" size="sm" onClick={copy} className="rounded-lg shrink-0">
        <Copy className="h-4 w-4 mr-1" /> {copied ? "Copied" : "Copy"}
      </Button>
    </div>
  );
};

const JoinSuccess = ({ result, input }: Props) => {
  const bank = result.bank_details ?? {
    bank: BANK_DETAILS.bank,
    account_title: BANK_DETAILS.accountTitle,
    account_no: BANK_DETAILS.accountNumber,
  };
  const total = result.total ?? 0;
  const text = encodeURIComponent(
    `Hi, this is ${input.full_name} (${result.member_no ?? "new member"}). Here is my payment screenshot for ${formatPKR(total)}.`,
  );
  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <CheckCircle2 className="h-14 w-14 text-green-600 mx-auto" />
        <h2 className="text-2xl font-black">Form received, {input.full_name.split(" ")[0]}!</h2>
        <p className="text-muted-foreground">
          Your member number is <span className="font-bold text-foreground">{result.member_no}</span>. One last step: make the payment and send us the screenshot.
        </p>
      </div>

      <div className="rounded-2xl border-2 border-primary/20 bg-primary/5 p-5">
        <div className="text-sm font-bold uppercase tracking-wide text-primary mb-2">Step 2 — Make your payment</div>
        <dl className="text-sm space-y-1 mb-3">
          <div className="flex justify-between"><dt>Monthly fee</dt><dd className="font-semibold">{formatPKR(result.monthly_fee ?? 0)}</dd></div>
          {!!result.addon && <div className="flex justify-between"><dt>Meeting room access</dt><dd className="font-semibold">{formatPKR(result.addon)}</dd></div>}
          {!!result.deposit && <div className="flex justify-between"><dt>Refundable deposit</dt><dd className="font-semibold">{formatPKR(result.deposit)}</dd></div>}
          <div className="flex justify-between border-t border-primary/20 pt-2 text-base"><dt className="font-black">Total payable</dt><dd className="font-black text-primary">{formatPKR(total)}</dd></div>
        </dl>
        <div className="divide-y divide-border rounded-xl bg-background px-4">
          <CopyRow label="Bank" value={bank.bank} />
          <CopyRow label="Account name" value={bank.account_title} />
          <CopyRow label="Account number" value={bank.account_no} />
        </div>
      </div>

      <div className="space-y-3">
        <div className="text-sm font-bold uppercase tracking-wide text-primary">Step 3 — Share the screenshot</div>
        <Button asChild size="lg" className="w-full h-14 rounded-xl text-base font-bold bg-green-600 hover:bg-green-700">
          <a href={waHref} target="_blank" rel="noopener noreferrer" onClick={trackWhatsAppClick}>
            <MessageCircle className="h-5 w-5 mr-2" /> Send payment screenshot on WhatsApp
          </a>
        </Button>
        <p className="text-xs text-center text-muted-foreground">
          We activate your membership and fingerprint access as soon as the payment is confirmed.
        </p>
      </div>
    </div>
  );
};

export default JoinSuccess;

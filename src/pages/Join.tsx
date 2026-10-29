import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import logo from "@/assets/logo.png";
import JoinForm from "@/components/join/JoinForm";
import JoinSuccess from "@/components/join/JoinSuccess";
import type { OnboardingInput, OnboardingResult } from "@/lib/onboarding";

const Join = () => {
  const [done, setDone] = useState<{ result: OnboardingResult; input: OnboardingInput } | null>(null);

  useEffect(() => {
    const prev = document.title;
    document.title = "Join Assorted Coworking — Membership Induction Form";
    window.scrollTo(0, 0);
    return () => {
      document.title = prev;
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-[#0f1c3c] text-white">
        <div className="section-container flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Assorted Coworking" className="h-9 w-auto brightness-0 invert" />
          </Link>
          <Link to="/" className="text-sm text-white/80 hover:text-white inline-flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" /> Back to site
          </Link>
        </div>
      </header>

      <main className="section-container py-10 md:py-16">
        <div className="mx-auto max-w-2xl">
          {!done && (
            <div className="mb-8">
              <span className="inline-block text-sm font-bold text-accent tracking-widest uppercase mb-3">Step 1 of 3</span>
              <h1 className="text-3xl md:text-4xl font-black mb-3">
                Membership <span className="text-gradient">Induction Form</span>
              </h1>
              <p className="text-muted-foreground">
                Welcome to Assorted Coworking, D-12 Markaz, Islamabad. Fill this in once; it takes about two minutes. You'll get the bank details and your member number right after.
              </p>
            </div>
          )}
          <div className="rounded-3xl border border-border bg-card p-5 md:p-8 shadow-sm">
            {done ? <JoinSuccess result={done.result} input={done.input} /> : <JoinForm onSuccess={(result, input) => setDone({ result, input })} />}
          </div>
          <p className="mt-6 text-center text-xs text-muted-foreground">
            Questions? WhatsApp us at +92 321 852 6405 or email hello@assorted.business
          </p>
        </div>
      </main>
    </div>
  );
};

export default Join;

import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Head } from "vite-react-ssg";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, ChevronDown, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";
import { analytics } from "@/lib/analytics";

const StartProject = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();

  const stageOptions = t("startPage.fields.stageOptions", { returnObjects: true }) as string[];
  const timingOptions = t("startPage.fields.timingOptions", { returnObjects: true }) as string[];
  const budgetOptions = t("startPage.fields.budgetOptions", { returnObjects: true }) as string[];

  const stageParam = searchParams.get("stage");
  const presetStage =
    stageParam === "idea" ? stageOptions[0] : stageParam === "problem" ? stageOptions[2] : stageParam === "project" ? stageOptions[1] : "";

  const [form, setForm] = useState({
    goal: "",
    stage: presetStage,
    useful: "",
    timing: timingOptions[0],
    budget: budgetOptions[0],
    firstName: "",
    lastName: "",
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = form.goal.trim() && form.stage && form.firstName.trim() && form.lastName.trim() && form.email.trim();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit || isSubmitting) return;
    setIsSubmitting(true);
    setError(null);

    const summary = [
      `${t("startPage.fields.goal")}\n${form.goal.trim()}`,
      `${t("startPage.fields.stage")} ${form.stage}`,
      form.useful.trim() ? `${t("startPage.fields.useful")}\n${form.useful.trim()}` : null,
      `${t("startPage.fields.timing")} ${form.timing}`,
      `${t("startPage.fields.budget")} ${form.budget}`,
    ]
      .filter(Boolean)
      .join("\n\n")
      .slice(0, 9000);

    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/submit-contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName.trim().slice(0, 100),
          lastName: form.lastName.trim().slice(0, 100),
          email: form.email.trim().slice(0, 255),
          projectPlan: summary,
        }),
      });
      if (!response.ok) throw new Error("submit failed");
      analytics.ctaClick("start_project_submitted");
      setIsDone(true);
    } catch (err) {
      console.error("Start a project submission failed", err);
      setError(t("startPage.error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldClass =
    "w-full rounded-2xl border border-plum/20 bg-background px-4 py-3 text-base text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15";

  return (
    <>
      <Head>
        <title>Start a project - Es Venture</title>
        <meta
          name="description"
          content="Tell Es Venture what you are making. A few notes are enough and Esther comes back with the best next step."
        />
        <link rel="canonical" href="https://esventure.nl/start-a-project" />
        <meta property="og:title" content="Start a project - Es Venture" />
        <meta property="og:description" content="Tell me what you are making. A few notes are enough." />
        <meta property="og:url" content="https://esventure.nl/start-a-project" />
        <meta property="og:type" content="website" />
      </Head>

      <div className="min-h-screen bg-paper text-paper-foreground font-sans">
        <Navigation />

        <main className="container mx-auto px-4 pt-32 pb-20 md:pt-40 md:pb-28">
          <div className="mx-auto max-w-2xl">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              {t("startPage.eyebrow")}
            </p>
            <h1 className="mt-5 font-display font-bold tracking-[-0.02em] leading-[1.02] text-[clamp(2.25rem,5.2vw,3.75rem)]">
              {t("startPage.title")}
            </h1>
            <p className="mt-5 max-w-[62ch] text-lg leading-relaxed text-plum/75">{t("startPage.intro")}</p>

            {isDone ? (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-12 rounded-[1.75rem] bg-lilac p-8 text-lilac-foreground"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Check className="h-5 w-5" />
                  </span>
                  <p className="text-lg font-semibold">{t("startPage.success")}</p>
                </div>
                <Link
                  to="/"
                  className="mt-6 inline-flex items-center gap-2 text-base font-semibold text-primary hover:text-plum transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  {t("startPage.back")}
                </Link>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-12 space-y-8">
                <div className="space-y-2">
                  <label htmlFor="goal" className="block text-base font-semibold">
                    {t("startPage.fields.goal")}
                  </label>
                  <textarea
                    id="goal"
                    required
                    maxLength={2000}
                    value={form.goal}
                    onChange={(e) => setForm({ ...form, goal: e.target.value })}
                    className={`${fieldClass} min-h-[120px] resize-y`}
                  />
                </div>

                <fieldset className="space-y-3">
                  <legend className="text-base font-semibold">{t("startPage.fields.stage")}</legend>
                  <div className="flex flex-wrap gap-2">
                    {stageOptions.map((option) => {
                      const selected = form.stage === option;
                      return (
                        <button
                          key={option}
                          type="button"
                          aria-pressed={selected}
                          onClick={() => setForm({ ...form, stage: option })}
                          className={`min-h-[44px] rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
                            selected
                              ? "bg-plum text-paper"
                              : "border border-plum/25 bg-transparent text-plum/80 hover:border-primary hover:text-primary"
                          }`}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                <div className="space-y-2">
                  <label htmlFor="useful" className="block text-base font-semibold">
                    {t("startPage.fields.useful")}{" "}
                    <span className="font-normal text-plum/55">{t("startPage.fields.optional")}</span>
                  </label>
                  <textarea
                    id="useful"
                    maxLength={2000}
                    value={form.useful}
                    onChange={(e) => setForm({ ...form, useful: e.target.value })}
                    className={`${fieldClass} min-h-[90px] resize-y`}
                  />
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="timing" className="block text-base font-semibold">
                      {t("startPage.fields.timing")}
                    </label>
                    <div className="relative">
                      <select
                        id="timing"
                        value={form.timing}
                        onChange={(e) => setForm({ ...form, timing: e.target.value })}
                        className={`${fieldClass} appearance-none pr-10`}
                      >
                        {timingOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-plum/50" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="budget" className="block text-base font-semibold">
                      {t("startPage.fields.budget")}{" "}
                      <span className="font-normal text-plum/55">{t("startPage.fields.optional")}</span>
                    </label>
                    <div className="relative">
                      <select
                        id="budget"
                        value={form.budget}
                        onChange={(e) => setForm({ ...form, budget: e.target.value })}
                        className={`${fieldClass} appearance-none pr-10`}
                      >
                        {budgetOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-plum/50" />
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Input
                    aria-label={t("startPage.fields.firstName")}
                    placeholder={t("startPage.fields.firstName")}
                    required
                    maxLength={100}
                    value={form.firstName}
                    onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                    className="h-12 rounded-2xl border-plum/20 bg-background"
                  />
                  <Input
                    aria-label={t("startPage.fields.lastName")}
                    placeholder={t("startPage.fields.lastName")}
                    required
                    maxLength={100}
                    value={form.lastName}
                    onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                    className="h-12 rounded-2xl border-plum/20 bg-background"
                  />
                </div>
                <Input
                  type="email"
                  aria-label={t("startPage.fields.email")}
                  placeholder={t("startPage.fields.email")}
                  required
                  maxLength={255}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="h-12 rounded-2xl border-plum/20 bg-background"
                />

                {error && <p className="text-sm font-medium text-destructive">{error}</p>}

                <Button
                  type="submit"
                  disabled={!canSubmit || isSubmitting}
                  className="w-full rounded-full bg-plum py-6 text-base font-semibold text-paper hover:bg-primary hover:text-primary-foreground disabled:opacity-40"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t("startPage.submitting")}
                    </>
                  ) : (
                    <>
                      {t("startPage.submit")}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>
        </main>

        <CustomCursor />
      </div>
    </>
  );
};

export default StartProject;

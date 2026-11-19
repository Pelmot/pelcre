import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/cn";
import { useSiteData } from "@/context/DataContext";

// Delivers to revak.designs.arch@gmail.com (key regenerated 2026-11-19).
const WEB3FORMS_ACCESS_KEY = "4914275f-1338-460c-b1dc-1c6d28b5790a";

interface FormState {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

function validate(values: FormState, t: (key: string) => string) {
  const errors: Partial<Record<keyof FormState, string>> = {};
  if (!values.name.trim()) errors.name = t("contactForm.errorName");
  if (!values.email.trim()) {
    errors.email = t("contactForm.errorEmail");
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = t("contactForm.errorEmailInvalid");
  }
  if (!values.message.trim() || values.message.trim().length < 10) {
    errors.message = t("contactForm.errorMessage");
  }
  return errors;
}

export function ContactForm() {
  const { t } = useTranslation();
  const { architect } = useSiteData();
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const handleChange = (
    field: keyof FormState,
    value: string,
  ) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(values, t);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setSubmitting(true);
    setSubmitError(false);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `New project inquiry from ${values.name}`,
          name: values.name,
          email: values.email,
          phone: values.phone,
          message: values.message,
        }),
      });
      const result = await response.json();
      if (result.success) {
        setSubmitted(true);
      } else {
        setSubmitError(true);
      }
    } catch {
      setSubmitError(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-start gap-4 rounded-lg border border-mist bg-linen/60 p-10 dark:bg-ink-soft"
      >
        <CheckCircle2 className="text-gold" size={32} strokeWidth={1.5} />
        <h3 className="font-serif text-2xl text-ink dark:text-bone">
          {t("contactForm.thankYou", { name: values.name.split(" ")[0] })}
        </h3>
        <p className="text-sm leading-relaxed text-stone">
          {t("contactForm.successBody")}
        </p>
        <button
          onClick={() => {
            setValues(initialState);
            setSubmitted(false);
          }}
          className="link-underline mt-2 text-sm font-medium text-ink uppercase dark:text-bone"
        >
          {t("contactForm.sendAnother")}
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-7">
      <div className="grid gap-7 sm:grid-cols-2">
        <Field label={t("contactForm.fullName")} error={errors.name}>
          <input
            type="text"
            value={values.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className={inputClasses(!!errors.name)}
            placeholder={t("contactForm.placeholderName")}
            aria-invalid={!!errors.name}
          />
        </Field>
        <Field label={t("contactForm.emailAddress")} error={errors.email}>
          <input
            type="email"
            value={values.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className={inputClasses(!!errors.email)}
            placeholder={t("contactForm.placeholderEmail")}
            aria-invalid={!!errors.email}
          />
        </Field>
      </div>

      <Field label={t("contactForm.phoneOptional")}>
        <input
          type="tel"
          value={values.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          className={inputClasses(false)}
          placeholder={t("contactForm.placeholderPhone")}
        />
      </Field>

      <Field label={t("contactForm.tellUsAboutProject")} error={errors.message}>
        <textarea
          rows={5}
          value={values.message}
          onChange={(e) => handleChange("message", e.target.value)}
          className={cn(inputClasses(!!errors.message), "resize-none")}
          placeholder={t("contactForm.placeholderMessage")}
          aria-invalid={!!errors.message}
        />
      </Field>

      {submitError && (
        <p className="flex items-start gap-2 text-sm text-ink dark:text-bone">
          <AlertCircle size={16} className="mt-0.5 shrink-0" />
          {t("contactForm.submitErrorText")}{" "}
          <a href={`mailto:${architect.email}`} className="link-underline font-medium">
            {architect.email}
          </a>{" "}
          {t("contactForm.submitErrorOr")} {architect.phone}.
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex items-center gap-2.5 rounded-lg bg-ink px-8 py-4 text-sm font-medium tracking-wide text-paper uppercase transition-opacity hover:opacity-85 disabled:opacity-60 dark:bg-bone dark:text-ink"
      >
        {submitting ? t("contactForm.sending") : t("contactForm.sendMessage")}
      </button>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2.5 block text-xs font-medium tracking-[0.15em] text-stone uppercase">
        {label}
      </span>
      {children}
      {error && (
        <span className="mt-2 flex items-center gap-1.5 text-xs font-medium text-ink dark:text-bone">
          <AlertCircle size={14} className="shrink-0" />
          {error}
        </span>
      )}
    </label>
  );
}

function inputClasses(hasError: boolean) {
  return cn(
    "w-full rounded-lg border bg-paper px-4 py-3 text-base text-ink outline-none transition-colors dark:bg-ink-soft dark:text-bone",
    hasError
      ? "border-2 border-ink dark:border-bone"
      : "border-mist focus:border-ink dark:focus:border-bone",
  );
}

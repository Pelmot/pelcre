import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/cn";

interface FormState {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
}

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  projectType: "Residential",
  message: "",
};

const projectTypes = [
  "Residential",
  "Commercial",
  "Interior",
  "Landscape",
  "Renovation",
  "Consultation",
];

function validate(values: FormState) {
  const errors: Partial<Record<keyof FormState, string>> = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!values.email.trim()) {
    errors.email = "Please enter your email.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!values.message.trim() || values.message.trim().length < 10) {
    errors.message = "Tell us a little more about your project (10+ characters).";
  }
  return errors;
}

export function ContactForm() {
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (
    field: keyof FormState,
    value: string,
  ) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 900);
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
          Thank you, {values.name.split(" ")[0]}.
        </h3>
        <p className="text-sm leading-relaxed text-stone">
          Your message has been received. We typically reply within two
          business days to discuss next steps for your project.
        </p>
        <button
          onClick={() => {
            setValues(initialState);
            setSubmitted(false);
          }}
          className="link-underline mt-2 text-sm font-medium text-ink uppercase dark:text-bone"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-7">
      <div className="grid gap-7 sm:grid-cols-2">
        <Field label="Full name" error={errors.name}>
          <input
            type="text"
            value={values.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className={inputClasses(!!errors.name)}
            placeholder="Jane Appleseed"
            aria-invalid={!!errors.name}
          />
        </Field>
        <Field label="Email address" error={errors.email}>
          <input
            type="email"
            value={values.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className={inputClasses(!!errors.email)}
            placeholder="jane@example.com"
            aria-invalid={!!errors.email}
          />
        </Field>
      </div>

      <div className="grid gap-7 sm:grid-cols-2">
        <Field label="Phone (optional)">
          <input
            type="tel"
            value={values.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            className={inputClasses(false)}
            placeholder="+1 (___) ___-____"
          />
        </Field>
        <Field label="Project type">
          <select
            value={values.projectType}
            onChange={(e) => handleChange("projectType", e.target.value)}
            className={inputClasses(false)}
          >
            {projectTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Tell us about your project" error={errors.message}>
        <textarea
          rows={5}
          value={values.message}
          onChange={(e) => handleChange("message", e.target.value)}
          className={cn(inputClasses(!!errors.message), "resize-none")}
          placeholder="Site location, timeline, budget range, and anything else that helps us understand the project..."
          aria-invalid={!!errors.message}
        />
      </Field>

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex items-center gap-2.5 rounded-lg bg-ink px-8 py-4 text-sm font-medium tracking-wide text-paper uppercase transition-opacity hover:opacity-85 disabled:opacity-60 dark:bg-bone dark:text-ink"
      >
        {submitting ? "Sending..." : "Send message"}
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

import { Button } from "./Button";
import { ScrollReveal } from "./ScrollReveal";

interface CTASectionProps {
  eyebrow?: string;
  title: string;
  description?: string;
  buttonLabel: string;
  buttonTo: string;
}

export function CTASection({
  eyebrow = "Start a project",
  title,
  description,
  buttonLabel,
  buttonTo,
}: CTASectionProps) {
  return (
    <section className="bg-ink py-28 sm:py-36">
      <div className="container-lux text-center">
        <ScrollReveal className="mx-auto max-w-3xl">
          <p className="mb-5 text-xs font-medium tracking-[0.3em] text-gold-soft uppercase">
            {eyebrow}
          </p>
          <h2 className="font-serif text-4xl leading-[1.1] font-medium text-balance text-bone sm:text-5xl lg:text-6xl">
            {title}
          </h2>
          {description && (
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-mist">
              {description}
            </p>
          )}
          <div className="mt-10 flex justify-center">
            <Button to={buttonTo} variant="primary" className="!bg-bone !text-ink hover:!bg-gold-soft">
              {buttonLabel}
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

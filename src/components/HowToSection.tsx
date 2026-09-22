import type { LucideIcon } from "lucide-react";

export type HowToStep = {
  name: string;
  text: string;
  icon?: LucideIcon;
};

type HowToSectionProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  steps: HowToStep[];
  className?: string;
};

export function HowToSection({
  eyebrow = "How-To Guide",
  title,
  description,
  steps,
  className = "",
}: HowToSectionProps) {
  return (
    <section
      className={`mx-auto max-w-[1080px] px-6 py-20 md:py-24 ${className}`}
    >
      <div className="mx-auto max-w-[760px] text-center">
        <p className="mb-4 text-xs font-semibold uppercase text-foreground-subtle">
          {eyebrow}
        </p>
        <h2 className="text-3xl font-semibold md:text-[40px] md:leading-[1.1]">
          {title}
        </h2>
        {description ? (
          <p className="mx-auto mt-4 text-lg leading-relaxed text-foreground-muted">
            {description}
          </p>
        ) : null}
      </div>

      <ol className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <li
              key={step.name}
              className="flex flex-col rounded-[24px] border border-border bg-elev p-7 shadow-sm md:p-8"
            >
              <div className="flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-full bg-accent text-sm font-semibold text-accent-foreground">
                  {Icon ? <Icon aria-hidden className="size-4" /> : index + 1}
                </span>
                <span className="text-xs font-semibold uppercase text-foreground-subtle">
                  Step {index + 1} of {steps.length}
                </span>
              </div>
              <h3 className="mt-5 text-xl font-semibold md:text-[22px]">
                {step.name}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-foreground-muted">
                {step.text}
              </p>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

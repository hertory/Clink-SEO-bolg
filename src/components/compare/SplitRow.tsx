import { Check, X } from "lucide-react";
import type { SplitRowData } from "@/lib/compare/stripe";

export function SplitRow({
  data,
  reverse = false,
}: {
  data: SplitRowData;
  reverse?: boolean;
}) {
  return (
    <div
      className={`grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-16 ${
        reverse ? "md:[&>*:first-child]:order-2" : ""
      }`}
    >
      <div className="md:col-span-6">
        <p
          className="mb-4 text-xs font-semibold uppercase text-foreground-subtle"
          style={{ letterSpacing: "0.18em" }}
        >
          {data.eyebrow}
        </p>
        <h3 className="text-[28px] font-semibold leading-[1.15] tracking-[-0.01em] md:text-[36px]">
          {data.title}
        </h3>
        <p className="mt-5 text-[17px] leading-relaxed text-foreground-muted">
          {data.body}
        </p>
      </div>
      <div className="md:col-span-6">
        <div
          className="rounded-[24px] border bg-elev p-6 md:p-7"
          style={{
            borderColor: "var(--surface-stroke)",
            boxShadow: "var(--shadow-card)",
          }}
        >
          <PointRow type="clink" text={data.clinkPoint} />
          <div
            className="my-4 h-px"
            style={{ background: "var(--surface-stroke)" }}
          />
          <PointRow type="stripe" text={data.stripePoint} />
        </div>
      </div>
    </div>
  );
}

function PointRow({
  type,
  text,
}: {
  type: "clink" | "stripe";
  text: string;
}) {
  const isClink = type === "clink";
  return (
    <div className="flex items-start gap-4">
      <span
        className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full"
        style={{
          background: isClink ? "var(--accent-soft)" : "var(--background-elev-2)",
          color: isClink ? "var(--accent)" : "var(--foreground-muted)",
        }}
        aria-hidden
      >
        {isClink ? (
          <Check className="h-4 w-4" strokeWidth={2.5} />
        ) : (
          <X className="h-4 w-4" strokeWidth={2.5} />
        )}
      </span>
      <div>
        <p
          className="text-[11px] font-semibold uppercase"
          style={{
            letterSpacing: "0.18em",
            color: isClink ? "var(--accent)" : "var(--foreground-subtle)",
          }}
        >
          {isClink ? "CLINK" : "STRIPE"}
        </p>
        <p className="mt-1 text-[15px] leading-relaxed text-foreground">
          {text}
        </p>
      </div>
    </div>
  );
}

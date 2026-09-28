import Link from "next/link";
import referrals from "@/data/checkout-referrals.json";

type ReferralRow = {
  rank: number;
  domain: string;
  globalRank: string;
  share: string;
  visits: string;
  mom: string;
  arrSlug: string | null;
};

type ReferralSnapshot = {
  asOf: string;
  monthTotalLabel: string;
  listedDomains: number;
  listedShare: string;
  sourceLabel: string;
  sourceHref: string;
  rows: ReferralRow[];
};

const DATA = referrals as unknown as ReferralSnapshot;

const ON_BOARD = DATA.rows.filter((r) => r.arrSlug).map((r) => r.domain);

export function CheckoutReferralsSection() {
  return (
    <section className="mx-auto max-w-[1080px] px-6 py-14">
      <p
        className="text-xs font-semibold uppercase text-foreground-subtle"
        style={{ letterSpacing: "0.18em" }}
      >
        Beyond Published ARR
      </p>
      <h2
        className="mt-3 max-w-[820px] font-semibold leading-[1.1] tracking-[-0.02em]"
        style={{ fontSize: "clamp(26px, 3.5vw, 40px)" }}
      >
        Paying Products That Never Published a Number.
      </h2>
      <p className="mt-5 max-w-[760px] text-base leading-relaxed text-foreground-muted">
        Every company above disclosed a figure — or a credible outlet reported
        one. The domains below never have. But their users keep clicking into{" "}
        <code className="rounded bg-elev px-1.5 py-0.5 text-[13px]">
          checkout.stripe.com
        </code>
        , and referral traffic into a payment page is payment intent you
        can&apos;t fake: checkout pages aren&apos;t browsed, they&apos;re
        reached from a buy button.
      </p>

      <div
        className="mt-8 overflow-hidden rounded-[24px] border bg-elev"
        style={{
          borderColor: "var(--surface-stroke)",
          boxShadow: "var(--shadow-card)",
        }}
      >
        <div
          className="hidden grid-cols-[56px_1.6fr_1fr_1fr_1fr_1fr] gap-4 border-b px-6 py-4 text-xs font-semibold uppercase text-foreground-subtle md:grid"
          style={{
            borderColor: "var(--surface-stroke)",
            letterSpacing: "0.12em",
          }}
        >
          <span>#</span>
          <span>Domain</span>
          <span>Global Rank</span>
          <span>Checkout Share</span>
          <span>Visits Sent</span>
          <span>MoM</span>
        </div>
        {DATA.rows.map((r) => {
          const up = r.mom.startsWith("+");
          return (
            <div
              key={r.domain}
              className="grid grid-cols-2 gap-x-4 gap-y-2 border-b px-6 py-4 transition-colors last:border-b-0 hover:bg-background md:grid-cols-[56px_1.6fr_1fr_1fr_1fr_1fr] md:items-center"
              style={{ borderColor: "var(--surface-stroke)" }}
            >
              <p className="text-base font-semibold text-foreground-subtle">
                {String(r.rank).padStart(2, "0")}
              </p>
              <div className="flex flex-wrap items-baseline gap-x-2">
                {r.arrSlug ? (
                  <Link
                    href={`/arr-leaderboard/${r.arrSlug}`}
                    className="text-[15px] font-medium underline decoration-1 underline-offset-4 hover:text-foreground"
                    style={{ color: "var(--accent)" }}
                  >
                    {r.domain}
                  </Link>
                ) : (
                  <a
                    href={`https://${r.domain}`}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-[15px] font-medium text-foreground hover:underline"
                  >
                    {r.domain}
                  </a>
                )}
                {r.arrSlug && (
                  <span
                    className="rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide"
                    style={{
                      background: "var(--accent-soft, rgba(255,90,60,0.08))",
                      color: "var(--accent)",
                    }}
                  >
                    On the board above
                  </span>
                )}
              </div>
              <p className="text-sm text-foreground-muted">{r.globalRank}</p>
              <p className="text-sm font-medium text-foreground">{r.share}</p>
              <p className="text-sm text-foreground-muted">{r.visits}</p>
              <p
                className={`text-sm font-medium ${
                  up ? "text-emerald-600" : "text-red-500"
                }`}
              >
                {r.mom}
              </p>
            </div>
          );
        })}
      </div>

      <p className="mt-5 text-sm leading-relaxed text-foreground-subtle">
        checkout.stripe.com received {DATA.monthTotalLabel} visits in{" "}
        {DATA.asOf}; the {DATA.listedDomains} domains SimilarWeb tracks covered{" "}
        {DATA.listedShare} of its referral traffic, the rest is long tail.
        {ON_BOARD.length > 0 && (
          <>
            {" "}
            {ON_BOARD.length} of the top {DATA.rows.length} —{" "}
            {ON_BOARD.join(", ")} — already sit on the ARR leaderboard above,
            which is exactly the kind of cross-check that makes traffic
            signals worth watching.
          </>
        )}{" "}
        Referral volume is a third-party estimate of payment intent, not
        revenue: products billing through their own domain, Paddle,
        LemonSqueezy or Creem never appear. Data:{" "}
        <a
          href={DATA.sourceHref}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4"
        >
          {DATA.sourceLabel}
        </a>
        , monthly snapshot {DATA.asOf}.
      </p>
    </section>
  );
}

/**
 * Growth race data: years from ~$1M ARR to a $100M annualized run rate.
 * Every point is a publicly reported milestone; legacy SaaS baselines
 * (Slack, Twilio, Shopify) are two-point lines from their reported
 * time-to-$100M, as no reliable intermediate figures are public.
 */

export interface GrowthPoint {
  /** Years since the company first crossed ~$1M ARR. */
  year: number;
  /** Annualized run rate in USD millions. */
  arrM: number;
}

export interface GrowthSeries {
  slug: string;
  name: string;
  domain: string;
  /** Reported time from ~$1M to $100M ARR, in years. */
  yearsTo100M: number;
  timeLabel: string;
  highlighted?: boolean;
  /** True when intermediate points are publicly reported; false = straight baseline. */
  detailed: boolean;
  points: GrowthPoint[];
  sourceLabel: string;
  sourceHref: string;
}

export const GROWTH_RACE: GrowthSeries[] = [
  {
    slug: "lovable",
    name: "Lovable",
    domain: "lovable.dev",
    yearsTo100M: 0.58,
    timeLabel: "~7 months",
    highlighted: true,
    detailed: true,
    points: [
      { year: 0, arrM: 1 },
      { year: 0.08, arrM: 10 },
      { year: 0.17, arrM: 17 },
      { year: 0.25, arrM: 30 },
      { year: 0.5, arrM: 75 },
      { year: 0.58, arrM: 100 },
    ],
    sourceLabel: "TechCrunch / Sacra",
    sourceHref:
      "https://techcrunch.com/2026/06/09/lovable-says-it-has-hit-500m-in-annualized-revenue-with-1-million-new-projects-a-week/",
  },
  {
    slug: "cursor",
    name: "Cursor",
    domain: "cursor.com",
    yearsTo100M: 1,
    timeLabel: "~12 months",
    detailed: true,
    points: [
      { year: 0, arrM: 1 },
      { year: 0.5, arrM: 10 },
      { year: 1, arrM: 100 },
    ],
    sourceLabel: "Sacra",
    sourceHref: "https://sacra.com/research/cursor-at-100m-arr/",
  },
  {
    slug: "anthropic",
    name: "Anthropic",
    domain: "anthropic.com",
    yearsTo100M: 1,
    timeLabel: "~1 year",
    detailed: false,
    points: [
      { year: 0, arrM: 1 },
      { year: 1, arrM: 100 },
    ],
    sourceLabel: "Press reports, 2023–24",
    sourceHref:
      "https://valueaddvc.com/blog/anthropic-revenue-hits-47b-run-rate-how-it-passed-openai-in-just-five-months",
  },
  {
    slug: "wiz",
    name: "Wiz",
    domain: "wiz.io",
    yearsTo100M: 1.5,
    timeLabel: "18 months",
    detailed: false,
    points: [
      { year: 0, arrM: 1 },
      { year: 1.5, arrM: 100 },
    ],
    sourceLabel: "Product Market Fit",
    sourceHref:
      "https://valueaddvc.com/blog/how-does-wiz-make-money-cloud-security-pricing-and-the-32b-google-deal-breakdown",
  },
  {
    slug: "elevenlabs",
    name: "ElevenLabs",
    domain: "elevenlabs.io",
    yearsTo100M: 2,
    timeLabel: "~2 years",
    detailed: true,
    points: [
      { year: 0, arrM: 1 },
      { year: 1, arrM: 25 },
      { year: 2, arrM: 100 },
    ],
    sourceLabel: "Sacra",
    sourceHref: "https://sacra.com/c/elevenlabs/",
  },
  {
    slug: "openai",
    name: "OpenAI",
    domain: "openai.com",
    yearsTo100M: 3,
    timeLabel: "~3 years",
    detailed: true,
    points: [
      { year: 0, arrM: 1 },
      { year: 2, arrM: 28 },
      { year: 3, arrM: 100 },
    ],
    sourceLabel: "Press reports, 2020–23",
    sourceHref:
      "https://www.cnbc.com/2026/06/26/openai-anthropic-new-ai-spending-reality-as-users-shift-to-efficiency.html",
  },
  {
    slug: "sierra",
    name: "Sierra",
    domain: "sierra.ai",
    yearsTo100M: 1.75,
    timeLabel: "~21 months",
    detailed: true,
    points: [
      { year: 0, arrM: 1 },
      { year: 0.85, arrM: 26 },
      { year: 1.75, arrM: 100 },
    ],
    sourceLabel: "Sacra",
    sourceHref: "https://sacra.com/c/sierra/",
  },
  {
    slug: "replit",
    name: "Replit",
    domain: "replit.com",
    yearsTo100M: 2,
    timeLabel: "~2 years",
    detailed: true,
    points: [
      { year: 0, arrM: 1 },
      { year: 1.2, arrM: 10 },
      { year: 2, arrM: 100 },
    ],
    sourceLabel: "Sacra / TechCrunch",
    sourceHref: "https://sacra.com/research/replit-passes-500m-year/",
  },
  {
    slug: "perplexity",
    name: "Perplexity",
    domain: "perplexity.ai",
    yearsTo100M: 1.85,
    timeLabel: "~22 months",
    detailed: true,
    points: [
      { year: 0, arrM: 1 },
      { year: 1, arrM: 30 },
      { year: 1.85, arrM: 100 },
    ],
    sourceLabel: "Sacra",
    sourceHref: "https://sacra.com/c/perplexity/",
  },
  {
    slug: "harvey",
    name: "Harvey",
    domain: "harvey.ai",
    yearsTo100M: 2.5,
    timeLabel: "~2.5 years",
    detailed: true,
    points: [
      { year: 0, arrM: 1 },
      { year: 1.4, arrM: 50 },
      { year: 2.5, arrM: 100 },
    ],
    sourceLabel: "Sacra",
    sourceHref: "https://sacra.com/c/harvey/",
  },
  {
    slug: "slack",
    name: "Slack",
    domain: "slack.com",
    yearsTo100M: 3,
    timeLabel: "~3 years",
    detailed: false,
    points: [
      { year: 0, arrM: 1 },
      { year: 3, arrM: 100 },
    ],
    sourceLabel: "Shearwater Capital",
    sourceHref:
      "https://www.shearwater.co/news/0-to-100m-arr-in-3-years-most-likely-a-spreadsheet-error/",
  },
  {
    slug: "twilio",
    name: "Twilio",
    domain: "twilio.com",
    yearsTo100M: 5,
    timeLabel: "~5 years",
    detailed: false,
    points: [
      { year: 0, arrM: 1 },
      { year: 5, arrM: 100 },
    ],
    sourceLabel: "Hacker News / public filings",
    sourceHref: "https://news.ycombinator.com/item?id=24465864",
  },
  {
    slug: "shopify",
    name: "Shopify",
    domain: "shopify.com",
    yearsTo100M: 7,
    timeLabel: "~7 years",
    detailed: false,
    points: [
      { year: 0, arrM: 1 },
      { year: 7, arrM: 100 },
    ],
    sourceLabel: "Hacker News / public filings",
    sourceHref: "https://news.ycombinator.com/item?id=24465864",
  },
];

export const GROWTH_RACE_MAX_YEARS = 7;
export const GROWTH_RACE_MAX_ARR = 100;

import "server-only";
import { cache } from "react";
import anthropic from "@/data/arr/anthropic.json";
import openai from "@/data/arr/openai.json";
import databricks from "@/data/arr/databricks.json";
import cursor from "@/data/arr/cursor.json";
import crusoe from "@/data/arr/crusoe.json";
import mercor from "@/data/arr/mercor.json";
import zhipu from "@/data/arr/zhipu.json";
import lambda from "@/data/arr/lambda.json";
import surge from "@/data/arr/surge.json";
import scale from "@/data/arr/scale.json";
import fireworks from "@/data/arr/fireworks.json";
import together from "@/data/arr/together.json";
import moonshot from "@/data/arr/moonshot.json";
import wiz from "@/data/arr/wiz.json";
import cognition from "@/data/arr/cognition.json";
import minimax from "@/data/arr/minimax.json";
import perplexity from "@/data/arr/perplexity.json";
import fluidstack from "@/data/arr/fluidstack.json";
import elevenlabs from "@/data/arr/elevenlabs.json";
import baseten from "@/data/arr/baseten.json";
import replit from "@/data/arr/replit.json";
import lovable from "@/data/arr/lovable.json";
import xai from "@/data/arr/xai.json";
import cohere from "@/data/arr/cohere.json";
import deepseek from "@/data/arr/deepseek.json";
import midjourney from "@/data/arr/midjourney.json";
import vast from "@/data/arr/vast.json";
import mistral from "@/data/arr/mistral.json";
import fal from "@/data/arr/fal.json";
import harvey from "@/data/arr/harvey.json";
import ai21 from "@/data/arr/ai21.json";
import suno from "@/data/arr/suno.json";
import modal from "@/data/arr/modal.json";
import glean from "@/data/arr/glean.json";
import runway from "@/data/arr/runway.json";
import heygen from "@/data/arr/heygen.json";
import sierra from "@/data/arr/sierra.json";
import synthesia from "@/data/arr/synthesia.json";
import clay from "@/data/arr/clay.json";
import emergent from "@/data/arr/emergent.json";
import gamma from "@/data/arr/gamma.json";
import decagon from "@/data/arr/decagon.json";
import abridge from "@/data/arr/abridge.json";
import evenup from "@/data/arr/evenup.json";
import skild from "@/data/arr/skild.json";
import stability from "@/data/arr/stability.json";
import coderabbit from "@/data/arr/coderabbit.json";
import hippocratic from "@/data/arr/hippocratic.json";
import luma from "@/data/arr/luma.json";
import deepgram from "@/data/arr/deepgram.json";

export type ArrMilestone = {
  /** Short axis label */
  label: string;
  /** Full date description */
  date: string;
  /** ARR in USD millions */
  arr: number;
  note: string;
  source: string;
};

export type FactRow = { label: string; value: string; source: string };

export type ArrProfile = {
  slug: string;
  name: string;
  domain: string;
  canonical: string;
  h1: string;
  intro: string;
  metaTitle: string;
  metaDescription: string;
  ogDescription: string;
  heroStats: [string, string][];
  chartTitle: string;
  chartIntro: string;
  chartMax: number;
  chartSources: string;
  milestones: ArrMilestone[];
  speed: FactRow[];
  facts: FactRow[];
  modelTitle: string;
  modelParagraphs: string[];
  revenueMix: [string, string][];
  faqs: { q: string; a: string }[];
  ctaTitle: string;
  ctaDescription: string;
  ctaLabel: string;
  ctaHref: string;
};

/**
 * Every ARR detail page is data-only: drop a new JSON file in `src/data/arr/`,
 * register it here, and `/arr-leaderboard/<slug>` renders automatically.
 */
const SOURCES = [
  anthropic,
  openai,
  databricks,
  cursor,
  crusoe,
  mercor,
  zhipu,
  lambda,
  surge,
  scale,
  fireworks,
  together,
  moonshot,
  wiz,
  cognition,
  minimax,
  perplexity,
  fluidstack,
  elevenlabs,
  baseten,
  replit,
  lovable,
  xai,
  cohere,
  deepseek,
  midjourney,
  vast,
  mistral,
  fal,
  harvey,
  ai21,
  suno,
  modal,
  glean,
  runway,
  heygen,
  sierra,
  synthesia,
  clay,
  emergent,
  gamma,
  decagon,
  abridge,
  evenup,
  skild,
  stability,
  coderabbit,
  hippocratic,
  luma,
  deepgram,
] as unknown as ArrProfile[];

const ARR_PROFILES: Record<string, ArrProfile> = Object.fromEntries(
  SOURCES.map((p) => [p.slug, p]),
);

export const getArrProfileSlugs = cache((): string[] => {
  return SOURCES.map((p) => p.slug);
});

export function getArrProfile(slug: string): ArrProfile | undefined {
  return ARR_PROFILES[slug];
}

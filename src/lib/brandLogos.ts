import anthropic from "@/assets/logos/anthropic.com.png";
import openai from "@/assets/logos/openai.com.png";
import cursor from "@/assets/logos/cursor.com.png";
import mercor from "@/assets/logos/mercor.com.png";
import wiz from "@/assets/logos/wiz.io.png";
import perplexity from "@/assets/logos/perplexity.ai.png";
import elevenlabs from "@/assets/logos/elevenlabs.io.png";
import replit from "@/assets/logos/replit.com.png";
import lovable from "@/assets/logos/lovable.dev.png";
import harvey from "@/assets/logos/harvey.ai.png";
import glean from "@/assets/logos/glean.com.png";
import sierra from "@/assets/logos/sierra.ai.png";
import clay from "@/assets/logos/clay.com.png";
import synthesia from "@/assets/logos/synthesia.io.png";
import databricks from "@/assets/logos/databricks.com.png";
import crusoe from "@/assets/logos/crusoe.ai.png";
import zhipu from "@/assets/logos/zhipuai.cn.png";
import lambda from "@/assets/logos/lambda.ai.png";
import surge from "@/assets/logos/surgehq.ai.png";
import scale from "@/assets/logos/scale.com.png";
import fireworks from "@/assets/logos/fireworks.ai.png";
import together from "@/assets/logos/together.ai.png";
import moonshot from "@/assets/logos/moonshot.cn.png";
import cognition from "@/assets/logos/cognition.ai.png";
import minimax from "@/assets/logos/minimaxi.com.png";
import fluidstack from "@/assets/logos/fluidstack.io.png";
import baseten from "@/assets/logos/baseten.co.png";
import xai from "@/assets/logos/x.ai.png";
import cohere from "@/assets/logos/cohere.com.png";
import deepseek from "@/assets/logos/deepseek.com.png";
import midjourney from "@/assets/logos/midjourney.com.png";
import vast from "@/assets/logos/vastdata.com.png";
import mistral from "@/assets/logos/mistral.ai.png";
import fal from "@/assets/logos/fal.ai.png";
import ai21 from "@/assets/logos/ai21.com.png";
import suno from "@/assets/logos/suno.com.png";
import modal from "@/assets/logos/modal.com.png";
import runway from "@/assets/logos/runwayml.com.png";
import heygen from "@/assets/logos/heygen.com.png";
import emergent from "@/assets/logos/emergent.ai.png";
import gamma from "@/assets/logos/gamma.app.png";
import decagon from "@/assets/logos/decagon.ai.png";
import abridge from "@/assets/logos/abridge.com.png";
import evenup from "@/assets/logos/evenup.ai.png";
import skild from "@/assets/logos/skild.ai.png";
import stability from "@/assets/logos/stability.ai.png";
import coderabbit from "@/assets/logos/coderabbit.ai.png";
import hippocratic from "@/assets/logos/hippocraticai.com.png";
import luma from "@/assets/logos/lumalabs.ai.png";
import deepgram from "@/assets/logos/deepgram.com.png";
import today from "@/assets/logos/today.ai.png";
import claudeCode from "@/assets/logos/claude.ai.png";
import codex from "@/assets/logos/codex.com.png";
import trae from "@/assets/logos/trae.ai.png";
import workbuddy from "@/assets/logos/workbuddy.ai.png";
import chatgpt from "@/assets/logos/chatgpt.com.png";
import manus from "@/assets/logos/manus.im.png";
import openclaw from "@/assets/logos/openclaw.ai.png";

export const BRAND_LOGOS: Record<string, string> = {
  "anthropic.com": anthropic.src,
  "openai.com": openai.src,
  "cursor.com": cursor.src,
  "mercor.com": mercor.src,
  "wiz.io": wiz.src,
  "perplexity.ai": perplexity.src,
  "elevenlabs.io": elevenlabs.src,
  "replit.com": replit.src,
  "lovable.dev": lovable.src,
  "harvey.ai": harvey.src,
  "glean.com": glean.src,
  "sierra.ai": sierra.src,
  "clay.com": clay.src,
  "synthesia.io": synthesia.src,
  "databricks.com": databricks.src,
  "crusoe.ai": crusoe.src,
  "zhipuai.cn": zhipu.src,
  "lambda.ai": lambda.src,
  "surgehq.ai": surge.src,
  "scale.com": scale.src,
  "fireworks.ai": fireworks.src,
  "together.ai": together.src,
  "moonshot.cn": moonshot.src,
  "cognition.ai": cognition.src,
  "minimaxi.com": minimax.src,
  "fluidstack.io": fluidstack.src,
  "baseten.co": baseten.src,
  "x.ai": xai.src,
  "cohere.com": cohere.src,
  "deepseek.com": deepseek.src,
  "midjourney.com": midjourney.src,
  "vastdata.com": vast.src,
  "mistral.ai": mistral.src,
  "fal.ai": fal.src,
  "ai21.com": ai21.src,
  "suno.com": suno.src,
  "modal.com": modal.src,
  "runwayml.com": runway.src,
  "heygen.com": heygen.src,
  "emergent.ai": emergent.src,
  "gamma.app": gamma.src,
  "decagon.ai": decagon.src,
  "abridge.com": abridge.src,
  "evenup.ai": evenup.src,
  "skild.ai": skild.src,
  "stability.ai": stability.src,
  "coderabbit.ai": coderabbit.src,
  "hippocraticai.com": hippocratic.src,
  "lumalabs.ai": luma.src,
  "deepgram.com": deepgram.src,
  "today.ai": today.src,
  "claude.ai": claudeCode.src,
  "codex.com": codex.src,
  "trae.ai": trae.src,
  "workbuddy.ai": workbuddy.src,
  "chatgpt.com": chatgpt.src,
  "manus.im": manus.src,
  "openclaw.ai": openclaw.src,
};

export function brandLogo(domain?: string): string | undefined {
  return domain ? BRAND_LOGOS[domain] : undefined;
}

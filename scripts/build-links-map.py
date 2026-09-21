"""Build the Clink blog internal-links map (mirrors floatboat's blog-internal-links-map.md).

Reads content/blog/*.md from this repo, computes per-article word count, internal
outlinks, inbound links and density, and emits a markdown map grouped by cluster.
Rerun after every publishing round: python scripts/build-links-map.py
"""
import json
import os
import re
import sys
from collections import defaultdict

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BLOG_DIR = os.path.join(ROOT, "content", "blog")
OUT_MD = r"E:\clients\clink\blog\blog-internal-links-map.md"
OUT_JSON = os.path.join(ROOT, "scripts", "links-map-data.json")

CLUSTERS = {
    "core": ("core", "01–03, 16–17, 19–20"),
    "glossary-metrics": ("glossary-metrics", "10–14"),
    "lovable-series": ("lovable-series", "05–09"),
    "agentic-payments": ("agentic-payments", "04, 26–29, 31, 33–38, 39–41, 44"),
    "industry-news": ("industry-news", "15, 18"),
    "stripe-risk-disputes": ("stripe-risk-disputes", "21–23"),
    "stripe-risk-accounts": ("stripe-risk-accounts", "25, 30, 32"),
    "standalone": ("standalone", "pay-by-link"),
}

def parse(path):
    raw = open(path, encoding="utf-8").read()
    m = re.match(r"^---\n(.*?)\n---\n(.*)$", raw, re.S)
    fm, body = (m.group(1), m.group(2)) if m else ("", raw)
    def field(name):
        mm = re.search(r'^%s:\s*"?([^"\n]*)"?\s*$' % name, fm, re.M)
        return mm.group(1).strip() if mm else ""
    slug = field("slug") or os.path.basename(path)[:-3]
    links = []
    for lm in re.finditer(r"\[([^\]]*)\]\((/blog/[a-z0-9-]+)\)", body):
        links.append({"anchor": lm.group(1)[:60], "href": lm.group(2)[6:]})
    # dedupe targets per R4 spirit, keep first anchor
    seen, outlinks = set(), []
    for l in links:
        if l["href"] not in seen:
            seen.add(l["href"])
            outlinks.append(l)
    words = len(re.sub(r"[#\-*|>`\[\]()]", " ", body).split())
    return {
        "file": os.path.basename(path),
        "slug": slug,
        "title": field("title"),
        "date": field("date"),
        "category": field("category"),
        "words": words,
        "outlinks": outlinks,
        "faq": body.count("### "),
    }

def main():
    posts = [parse(os.path.join(BLOG_DIR, f)) for f in sorted(os.listdir(BLOG_DIR)) if f.endswith(".md")]
    by_slug = {p["slug"]: p for p in posts}
    inbound = defaultdict(list)
    for p in posts:
        for l in p["outlinks"]:
            if l["href"] in by_slug:
                inbound[l["href"]].append(p["slug"])
    for p in posts:
        p["inbound"] = inbound.get(p["slug"], [])
        p["density"] = round(len(p["outlinks"]) / max(p["words"] / 1000, 0.1), 1)

    slug2cluster = {
        # core
        **{s: "core" for s in ["what-is-clink", "mor-vs-psp", "smart-routing",
            "what-is-skill-marketplace", "clink-launches-skill-marketplace",
            "best-ai-companies-by-arr", "fastest-growing-ai-companies-arr"]},
        # glossary-metrics
        **{s: "glossary-metrics" for s in ["burn-rate", "annual-recurring-revenue",
            "monthly-recurring-revenue", "net-revenue-retention", "runway"]},
        # lovable-series
        **{s: "lovable-series" for s in ["how-to-add-payments-lovable-app",
            "integrate-stripe-lovable", "how-to-add-payments-bolt-app",
            "how-to-add-payments-v0-app", "how-to-add-payments-replit-app"]},
        # agentic-payments
        **{s: "agentic-payments" for s in ["agent-payments",
            "what-is-ap2-agent-payments-protocol", "what-is-x402",
            "what-is-machine-payments-protocol", "what-is-agentic-commerce-protocol",
            "how-to-sell-on-chatgpt", "what-is-universal-commerce-protocol",
            "agentic-commerce-agent-channels", "agentic-commerce-merchant-stack-cms",
            "agentic-commerce-merchant-stack-psp",
            "clink-and-visa-partner-on-intelligent-commerce",
            "clink-launches-agent-wallet", "what-is-ai-agent-wallet",
            "ai-agent-payments-infrastructure", "ai-agent-spending-limits",
            "clink-wallet-vs-cloudflare-wallets"]},
        # industry-news
        **{s: "industry-news" for s in ["cloudflare-wallets-agent-payments",
            "stripe-openrouter-acquisition"]},
        # stripe-risk-disputes
        **{s: "stripe-risk-disputes" for s in ["what-is-stripe-dispute",
            "how-to-dispute-stripe-charge", "stripe-chargeback-prevention"]},
        # stripe-risk-accounts
        **{s: "stripe-risk-accounts" for s in ["stripe-account-suspended",
            "why-stripe-closes-accounts", "how-to-appeal-stripe-account-closure"]},
        # standalone
        "pay-by-link": "standalone",
    }

    for p in posts:
        p["cluster"] = slug2cluster.get(p["slug"], "unmapped")

    grouped = defaultdict(list)
    for p in posts:
        grouped[p["cluster"]].append(p)

    orphans = [p["slug"] for p in posts if not p["inbound"]]
    thin = [p["slug"] for p in posts if len(p["outlinks"]) < 2]

    lines = []
    lines.append("# Clink Blog — 内链映射（机器生成）\n")
    lines.append("> **生成**: 2026-09-22 · **来源**: 部署仓 content/blog frontmatter + 正文链接（勿手工编辑，重跑 `python scripts/build-links-map.py` 再生）")
    lines.append("> **规则**: R1–R7 见 `skills/clink-blog-article/references/internal-links.md` · **例外**: 37 号为特殊 HTML 页（markdown 正文不渲染，其出链不计入实时页面） · orphan/thin 判定自动")
    lines.append("> **总计**: %d 篇 · **孤儿**(入链 0): %d 篇 · **出链<2**(违 R1): %d 篇\n" % (len(posts), len(orphans), len(thin)))
    for cid in ["core", "glossary-metrics", "lovable-series", "agentic-payments", "industry-news", "stripe-risk-disputes", "stripe-risk-accounts", "standalone"]:
        if cid not in grouped:
            continue
        lines.append("\n## %s\n" % cid)
        for p in sorted(grouped[cid], key=lambda x: x["file"]):
            outs = ", ".join("`/blog/%s`" % l["href"] for l in p["outlinks"]) or "—"
            ins = ", ".join("`%s`" % s for s in p["inbound"]) or "**孤儿**"
            lines.append("## %s" % p["slug"])
            lines.append("- 标题: %s（%s）· %d 词 · 内链密度 %.1f/1000w · 入链 %d" % (p["title"], p["date"], p["words"], p["density"], len(p["inbound"])))
            lines.append("- 出链: %s" % outs)
            lines.append("- 入链: %s\n" % ins)
    open(OUT_MD, "w", encoding="utf-8", newline="\n").write("\n".join(lines))
    json.dump(posts, open(OUT_JSON, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print("posts:", len(posts), "| orphans:", orphans, "| thin(R1<2):", thin)
    print("wrote", OUT_MD)

if __name__ == "__main__":
    main()

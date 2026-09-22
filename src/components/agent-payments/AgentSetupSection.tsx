"use client";

import { useState } from "react";
import { Check, ChevronRight, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BrandLogo } from "@/components/BrandLogo";
import type { AgentPaymentPage } from "@/lib/agent-payments";

type SetupData = AgentPaymentPage["setup"];

/**
 * Shared MCP setup section for /agentic-payments/{agent} pages:
 * agent tabs + copyable connection snippet. Identical product-level content
 * across agent pages; the surrounding page copy is what gets customized.
 */
export function AgentSetupSection({ setup }: { setup: SetupData }) {
  const [activeAgent, setActiveAgent] = useState(setup.agents[0]);
  const [copied, setCopied] = useState(false);

  const setupText = `# ${setup.codeTitlePrefix} ${activeAgent.name}\n${setup.code}\n\n${setup.thenAskLabel}\n${setup.thenAsk}`;

  const copySetup = async () => {
    try {
      await navigator.clipboard.writeText(setupText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="bg-elev">
      <div className="mx-auto max-w-[1080px] px-6 py-20 md:py-28">
        <div className="mx-auto max-w-[820px] text-center">
          <h2 className="text-3xl font-semibold md:text-[48px] md:leading-[1.06]">
            {setup.title}
          </h2>
          <p className="mx-auto mt-5 max-w-[700px] text-base leading-relaxed text-foreground-muted md:text-lg">
            {setup.body}
          </p>
        </div>

        <div
          className="mx-auto mt-8 flex w-full max-w-[400px] flex-col rounded-[12px] border border-border bg-card p-1 shadow-sm sm:w-fit sm:max-w-full sm:flex-row"
          aria-label="Connection methods"
        >
          <Button className="h-10 rounded-[8px] px-5">{setup.primaryTab}</Button>
          <Button
            variant="ghost"
            disabled
            className="h-10 rounded-[8px] px-5 text-foreground-muted"
          >
            {setup.secondaryTab}
            <span className="rounded-full border border-border px-2 py-0.5 text-[10px] font-semibold uppercase">
              {setup.secondaryBadge}
            </span>
          </Button>
        </div>

        <div className="mx-auto mt-12 min-w-0 max-w-[1000px] overflow-hidden rounded-[20px] border border-primary-foreground/15 bg-primary text-primary-foreground shadow-sm">
          <div className="border-b border-primary-foreground/15" role="tablist" aria-label="Choose an agent">
            <div className="flex flex-wrap justify-center px-3 pt-3 sm:px-5">
              {setup.agents.map((agent) => {
                const selected = activeAgent.name === agent.name;
                return (
                  <Button
                    key={agent.name}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    aria-controls="clink-mcp-panel"
                    variant="ghost"
                    onClick={() => {
                      setActiveAgent(agent);
                      setCopied(false);
                    }}
                    className={`h-12 rounded-none border-b-2 px-3 text-sm text-primary-foreground/55 hover:bg-primary-foreground/5 hover:text-primary-foreground sm:h-14 sm:px-4 ${
                      selected ? "border-accent text-primary-foreground" : "border-transparent"
                    }`}
                  >
                    <BrandLogo name={agent.name} domain={agent.domain} size={22} className="rounded-[6px] border-0" />
                    {agent.label}
                  </Button>
                );
              })}
            </div>
          </div>

          <div
            id="clink-mcp-panel"
            role="tabpanel"
            className="relative min-w-0 px-5 py-8 sm:px-10 sm:py-10"
          >
            <div className="flex items-center justify-between gap-4">
              <p className="flex items-center gap-3 text-sm font-semibold text-primary-foreground">
                <BrandLogo name={activeAgent.name} domain={activeAgent.domain} size={28} className="rounded-[8px] border-0" />
                {setup.codeTitlePrefix} {activeAgent.name}
              </p>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={copySetup}
                className="shrink-0 text-primary-foreground/60 hover:bg-primary-foreground/10 hover:text-primary-foreground"
                aria-label={`Copy ${activeAgent.name} MCP setup`}
              >
                {copied ? <Check aria-hidden /> : <Copy aria-hidden />}
                {copied ? "Copied" : "Copy"}
              </Button>
            </div>

            <div className="mt-8 max-w-full overflow-x-auto font-mono text-[13px] leading-7 sm:text-sm">
              <p className="text-primary-foreground/45">
                # {setup.codeTitlePrefix} {activeAgent.name}
              </p>
              <pre className="mt-2 min-w-[520px] whitespace-pre text-primary-foreground/90">
                {setup.code}
              </pre>
              <p className="mt-8 text-primary-foreground/45">{setup.thenAskLabel}</p>
              <p className="mt-2 text-primary-foreground">{setup.thenAsk}</p>
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t border-primary-foreground/15 px-5 py-4 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-7">
            <a
              href={setup.guideHref}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 font-medium text-primary-foreground hover:text-accent"
            >
              {setup.guideLabel}
              <ChevronRight aria-hidden className="size-4" />
            </a>
            <span className="text-primary-foreground/50">{setup.footerNote}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

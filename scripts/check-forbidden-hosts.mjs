// Build gate: fails if any non-canonical host appears in source that ships to
// users. Runs automatically via the "prebuild" npm lifecycle.
// Canonical host ruling 2026-09-22: bare domain https://clinkbill.com
// (www -> bare 301 live). Legacy preview hosts must never be linked.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRCS = ["src", "content", "scripts", "public"];
const FORBIDDEN = [
  /clink-seo-bolg\.vercel\.app/,
  /clink-ai\.lovable\.app/,
  /https:\/\/www\.clinkbill\.com/, // use bare https://clinkbill.com
];

let hits = 0;
for (const dir of SRCS) {
  const base = path.join(ROOT, dir);
  if (!fs.existsSync(base)) continue;
  for (const entry of fs.globSync("**/*.{ts,tsx,md,json,html}", { cwd: base })) {
    const file = path.join(base, entry);
    const text = fs.readFileSync(file, "utf-8");
    for (const re of FORBIDDEN) {
      if (re.test(text)) {
        const line = text.split("\n").findIndex((l) => re.test(l)) + 1;
        console.error(`FORBIDDEN HOST ${dir}/${entry}:${line} matches ${re}`);
        hits++;
      }
    }
  }
}

if (hits > 0) {
  console.error(`\n${hits} forbidden-host occurrence(s). Use https://clinkbill.com or relative paths.`);
  process.exit(1);
}
console.log("check-forbidden-hosts: OK");

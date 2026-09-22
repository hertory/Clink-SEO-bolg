# Clink 部署工作流 — 本地修改 → 验证 → push → 线上

> 类型：操作手册 | 版本：v1.0 | 建立：2026-09-17（基于当日全链路对齐实战）
> 读者：在本仓库改内容/代码并发布到 clinkbill.com 的人或 agent。

---

## 1. 仓库拓扑（先搞清楚谁是谁）

| 角色 | 位置 | 说明 |
|------|------|------|
| **本仓库（部署仓 / SSOT）** | `E:\客户部署项目\clink-ai-main` | 唯一维护处：博客文章、ARR 榜单、页面代码 |
| 线上仓 | `github.com/hertory/Clink-SEO-bolg`（`origin`，**SSH**） | push 即触发 Vercel 生产部署 |
| Vercel 部署域 | `clink-ai-psi.vercel.app` | 本应用直连域（预览用） |
| 正式域 | `clinkbill.com` | 主站（另一套 Pages Router 仓库）+ 本应用经 **CloudFront 反代** |
| CloudFront 转发规则 | `/blog/*`、`/arr-leaderboard/*`、`/_next/*` | **其余路径（含 `/compare`、`/platforms`）正式域 404**，见 §7 |
| 文档仓（知识库） | `E:\clients\clink` | 客户知识库、任务单、发布索引（`blog/README.md`）；**不放文章正文** |

> 主站（首页/产品页/contact）不归本仓库管；主站侧待办见 §8。

## 2. 内容规则（SSOT：只在本仓库维护）

- 文章路径：`content/blog/NN-{slug}.md`，**flat 无子目录**；NN 全局连续（下一号 24），文件名仅排序用，**slug 以 frontmatter 为准**。
- Frontmatter 必填：`title / description / slug / date / category / author / readingMinutes`；可选：`updated / secondaryCategory / image`（**禁止 `keywords` / `related`**）。
- **FAQ 必须用 `## FAQ` + `### 问题` 格式**：`scripts/build-blog-data.ts` 靠正则提取成结构化 FAQ（页面渲染 + JSON-LD）。用 `**加粗**` 或行尾格式不对会静默提取失败。
- 同 slug 文件只能存在一份——重复文件会在列表页渲染两张卡片。
- 图片：放 `public/blog/images/`，frontmatter 写 `image: /blog/images/xxx.jpg`；**没图就不要写 image 字段**（否则 og:image 404）。
- 主站同款 chrome（导航/页脚）在 `src/components/TopNav.tsx` + `Footer.tsx`，改动前先对照 clinkbill.com 主站。

## 3. 本地验证（push 前必做）

```powershell
cd E:\客户部署项目\clink-ai-main
npm run build        # 自动先跑 build-blog-data 再 next build
```

- 预期：`Generated blog data with N post(s)`（N = content/blog 的 md 数）、`✓ Generating static pages` 全绿、无 TS/lint 错误。
- 文章 FAQ 抽查（可选）：

```powershell
npx tsx -e "import {BLOG_POSTS} from './src/data/blog-data'; console.log(BLOG_POSTS.filter(p=>p.faqs).length, '/', BLOG_POSTS.length)"
```

- 产物抽查（可选）：canonical / og:url / 面包屑 / GA4 在 `.next/server/app/blog.html` 里 grep 得到。

## 4. 提交与推送

```powershell
git add <具体路径>          # 不要 git add -A（避免卷入未完成草稿）
git commit -m "..."
git push origin main        # origin = git@github.com:hertory/Clink-SEO-bolg.git
```

- **HTTPS 连不上 github 时用 SSH**（本机 `~/.ssh/id_ed25519`，身份 kostja94）：
  `git remote set-url origin git@github.com:hertory/Clink-SEO-bolg.git`
- push 后 Vercel 自动部署，**约 60–120 秒生效**。
- 未完成的草稿文章留在 `content/blog/` 里**不 add 即可**（本地 build 会把它算进 blog-data，但只要不提交就不影响线上；若要本地 build 也不含它，临时挪出目录）。

## 5. 部署后线上验收（curl 清单）

```bash
B="https://clinkbill.com/blog/<某篇文章slug>"
curl -sL $B | grep -c "G-0YGZ90TPXH"                    # GA4，应 >0
curl -sL $B | grep -o 'rel="canonical" href="[^"]*"'    # https://clinkbill.com/blog/...
curl -sL $B | grep -o '"item":"[^"]*"'                  # 面包屑应全为绝对 URL
curl -s -o /dev/null -w "%{http_code}" https://clinkbill.com/blog/sitemap.xml   # 200
curl -sL https://clinkbill.com/blog/sitemap.xml | grep -c "<loc>"               # URL 数
```

新文章额外：`curl -I https://clinkbill.com/blog/<slug>` 应 200；列表页 `curl -sL .../blog | grep -c 'href="/blog/<slug>"'` 应为 1。

## 6. 发布一篇文章的完整 checklist

1. 写 `content/blog/NN-{slug}.md`（按 §2 规范；图片先行）
2. `npm run build` 验证（文章数 +1、FAQ 提取成功）
3. `git add content/blog/NN-xxx.md src/data/blog-data.ts public/blog/images/xxx.*` → commit → push
4. §5 验收（200 + 列表出现一次）
5. **登记文档仓**：`E:\clients\clink\blog\README.md` 表格补一行（链接写线上 URL），commit 文档仓

## 7. 已知坑位（2026-09-17 实测沉淀）

| 坑 | 说明 / 对策 |
|----|------------|
| **CRLF 行尾** | Windows 编辑器会把文件存成 CRLF；build-blog-data 的 FAQ 正则已做容错，但新文件尽量存 LF（VS Code 右下角切 LF） |
| **重复 slug** | 带编号/不带编号双文件 = 列表页双卡片；提交前 `for f in content/blog/*.md; do grep -m1 '^slug:' $f; done \| sort \| uniq -d` 应为空 |
| **lovable.app 残留** | 任何 canonical/og/robots/内链禁止再出现 `clink-ai.lovable.app` |
| **正式域 404 的路径** | `/compare`、`/platforms/*` 未被 CloudFront 转发；`/blog/sitemap.xml` 已过滤它们；要上线这些页面需主站加转发规则 |
| **canonical host** | 全站统一**裸域** `https://clinkbill.com`（metadataBase + ARR JSON 同口径）；✅ www → 裸域 301 已于 2026-09-22 上线（裁定=裸域，与全部既有口径一致，零改动） |
| 主站 GA ID | `G-0YGZ90TPXH`，本应用 GA4 与主站同 ID 同 property |

## 8. 主站侧遗留（不归本仓库，提醒用）

- 主站页面 canonical/og:url（主站仓库）
- 主站 robots.txt 声明 `Sitemap: https://clinkbill.com/blog/sitemap.xml`（或 GSC 手动提交）
- 主站 sitemap 补 `/agentic-payment`、`/skills`，移除 307 `/products` 与 `#fragment` 噪音
- `/compare`、`/platforms` 的 CloudFront 转发规则

---

*deploy-workflow · v1.0 · 2026-09-17 · 维护：本仓库（随流程演进更新版本号）*

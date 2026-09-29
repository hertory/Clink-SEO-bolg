---
title: Clink 部署工作流
description: 规定 clink-ai-main 从本地修改、构建到生产验收的流程，以及 Blog 发布索引的唯一生成规则。
type: spec
date: 2026-09-17
updated: 2026-09-28
version: v1.1
status: active
---

# Clink 部署工作流

> 类型：操作手册 | 版本：v1.1 | 建立：2026-09-17 | 更新：2026-09-28
> 读者：在本仓库改内容/代码并发布到 clinkbill.com 的人或 agent。

---

## 1. 仓库拓扑（先搞清楚谁是谁）

| 角色 | 位置 | 说明 |
|------|------|------|
| **本仓库（部署仓 / SSOT）** | `E:\客户部署项目\clink-ai-main` | 唯一维护处：博客文章、ARR 榜单、页面代码 |
| 线上仓 | `github.com/hertory/Clink-SEO-bolg`（`origin`，**SSH**） | push 即触发 Vercel 生产部署 |
| Vercel 部署域 | `clink-seo-bolg.vercel.app` | 本应用直连域（预览用） |
| 正式域 | `clinkbill.com` | 主站（另一套 Pages Router 仓库）+ 本应用经 **CloudFront 反代** |
| CloudFront 转发规则 | `/blog`、`/blog/*`、`/arr-leaderboard`、`/arr-leaderboard/*`、`/_next/*` | **其余路径（含 `/compare`、`/platforms`）正式域当前 404**；完整口径见 [生产路由拓扑](../production-routing.md) |
| 文档仓（知识库） | `E:\clients\clink` | 客户背景、策略与任务文档；**不放文章正文，也不维护发布清单** |

> 主站（首页/产品页/contact）不归本仓库管；主站侧待办见 §8。

## 2. 内容规则与发布索引（SSOT：只在本仓库维护）

- 文章正文位于 `content/blog/*.md`，**flat 无子目录**。历史文件名可带 `NN-` 前缀，也可不带；编号只用于人工排序，不要求连续、不表示发布状态，也不得据此推断“下一号”。**URL 与唯一性均以 frontmatter `slug` 为准**。
- Frontmatter 必填：`title / description / slug / date / category / author / readingMinutes`；可选：`updated / secondaryCategory / image`（**禁止 `keywords` / `related`**）。
- **FAQ 必须用 `## FAQ` + `### 问题` 格式**：`scripts/build-blog-data.ts` 靠正则提取成结构化 FAQ（页面渲染 + JSON-LD）。用 `**加粗**` 或行尾格式不对会静默提取失败。
- 同 slug 文件只能存在一份——重复文件会在列表页渲染两张卡片。
- 图片：放 `public/blog/images/`，frontmatter 写 `image: /blog/images/xxx.jpg`；**没图就不要写 image 字段**（否则 og:image 404）。
- 主站同款 chrome（导航/页脚）在 `src/components/TopNav.tsx` + `Footer.tsx`，改动前先对照 clinkbill.com 主站。

### 2.1 发布索引规则

1. `content/blog/*.md` 的 frontmatter 是文章元数据唯一维护源。
2. `scripts/build-blog-data.ts` 扫描全部 Markdown，并生成 `src/data/blog-data.ts`；站点列表、动态路由和 sitemap 使用生成结果。
3. 当前发布候选清单从 `BLOG_POSTS` 或构建输出读取，不在 `E:\clients\clink` 另建或手工同步文章表。
4. 同一 `slug` 只能出现一次；构建前必须执行重复 slug 检查。文件名编号、文件数量和客户文档中的历史排期都不能替代该检查。
5. `src/data/blog-data.ts` 是生成物，不是第二个手工 SSOT；变更文章后通过构建脚本刷新。

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
5. 如文章改变产品事实、内容归属或长期策略，只更新 `E:\clients\clink` 中对应的主题所有者；普通发布不登记手工文章清单。

## 7. 已知坑位（2026-09-17 实测沉淀）

| 坑 | 说明 / 对策 |
|----|------------|
| **CRLF 行尾** | Windows 编辑器会把文件存成 CRLF；build-blog-data 的 FAQ 正则已做容错，但新文件尽量存 LF（VS Code 右下角切 LF） |
| **重复 slug** | 带编号/不带编号双文件也可能生成重复卡片；以 frontmatter `slug` 去重，不能依赖文件名或编号 |
| **lovable.app 残留** | 任何 canonical/og/robots/内链禁止再出现 `clink-ai.lovable.app` |
| **正式域 404 的路径** | `/compare`、`/platforms/*` 未被 CloudFront 转发；`/blog/sitemap.xml` 已过滤它们；要上线这些页面需主站加转发规则 |
| **canonical host** | 全站统一**裸域** `https://clinkbill.com`（metadataBase + ARR JSON 同口径）；✅ www → 裸域 301 已于 2026-09-22 上线（裁定=裸域，与全部既有口径一致，零改动） |
| 主站 GA ID | `G-0YGZ90TPXH`，本应用 GA4 与主站同 ID 同 property |

## 8. 独立主站 backlog（不归本仓库）

- 主站页面 canonical/og:url（独立任务；Blog canonical 已 completed，不得据此标记“全站 completed”）
- 主站 robots.txt 是否声明 `Sitemap: https://clinkbill.com/blog/sitemap.xml`，或仅在 GSC/Bing 单独提交（人工基础设施决策）
- 主站 sitemap 补 `/agentic-payment`、`/skills`，移除 307 `/products` 与 `#fragment` 噪音
- 是否为 `/compare`、`/platforms` 增加 CloudFront 转发规则（人工基础设施决策）

---

*deploy-workflow · v1.1 · 2026-09-28 · 维护：本仓库（随流程演进更新版本号）*

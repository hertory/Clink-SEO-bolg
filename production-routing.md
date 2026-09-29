---
title: Clink 生产路由拓扑
description: 说明 clinkbill.com、CloudFront、主站与本部署仓之间的现行生产路由边界和验收方式。
type: spec
date: 2026-09-17
updated: 2026-09-28
version: v2.0
status: active
scope: clinkbill.com 经 CloudFront 分流到主站和 clink-ai-main 的生产拓扑
---

# Clink 生产路由拓扑

本文是本部署仓对生产流量拓扑的唯一说明。发布步骤见 [部署工作流](./docs/deploy-workflow.md)；本文不维护文章清单或主站实现细节。

## 现行拓扑

```text
用户访问 https://clinkbill.com
              |
          CloudFront
         /          \
主站 Pages Router    本仓库 Next.js 15 / Vercel
其余主站路径          /blog、/blog/*
                     /arr-leaderboard、/arr-leaderboard/*
                     /_next/*（本应用资源）
```

| 层 | 现行职责 |
|---|---|
| `clinkbill.com` / CloudFront | 对外唯一正式域与路径分流层 |
| 主站仓库 | 首页、产品、联系、法务等主站页面；不在本仓库维护 |
| `E:\客户部署项目\clink-ai-main` | Blog、ARR 榜单、页面代码、文章内容和可达 sitemap |
| `clink-seo-bolg.vercel.app` | 本应用回源/直连域；用于部署与诊断，不作为公开 canonical |

生产规则位于 CloudFront（或其上游基础设施），不位于本仓库 `next.config.ts`。本仓库不能单独改变正式域的转发范围。

## 路由归属

| 正式域路径 | 归属 | 当前状态 |
|---|---|---|
| `/blog`、`/blog/*` | 本仓库 | CloudFront 转发至 Vercel |
| `/blog/sitemap.xml` | 本仓库 | 正式域可达的 Blog sitemap |
| `/arr-leaderboard`、`/arr-leaderboard/*` | 本仓库 | CloudFront 转发至 Vercel |
| `/_next/*` | 分流层 | 当前允许本应用资源通过；变更时必须同时回归主站资源 |
| `/compare`、`/compare/*` | 本仓库有实现 | 正式域当前未转发，因此 404 |
| `/platforms/*` | 本仓库有实现 | 正式域当前未转发，因此 404 |
| `/`、`/products/*`、`/agentic-payment`、`/skills`、`/contact`、法务页 | 主站仓库 | 不由本仓库修改或发布 |

新增文章由动态路由 `/blog/[slug]` 承接，不需要新增 CloudFront 规则。新增顶级路径时，必须先由主站/基础设施维护方扩展转发范围，再把该路径加入正式域 sitemap。

## SEO 与资源约束

- canonical、`og:url`、Breadcrumb JSON-LD 与 sitemap 的公开 URL 统一使用裸域 `https://clinkbill.com`。
- `NEXT_PUBLIC_SITE_URL` 的生产值应为 `https://clinkbill.com`；代码默认值也保持同一口径。
- `*.vercel.app` 只用于回源和诊断，不得进入公开 canonical、结构化数据或站内正式链接。
- `/blog/sitemap.xml` 只包含正式域当前可达路径；尚未转发的 `/compare` 与 `/platforms/*` 不得出现在其中。
- 调整 `/_next/*` 行为可能同时影响主站与本应用，必须回归两侧页面的 CSS、JS、字体和 RSC 请求。

## 变更职责

| 变更 | 负责位置 |
|---|---|
| Blog/ARR 内容、页面、metadata、sitemap | 本仓库 |
| CloudFront 路径转发、缓存行为、回源配置 | 主站/基础设施维护方 |
| 主站页面、主站 canonical、主站 robots/sitemap | 主站仓库 |
| Vercel 构建与部署 | 本仓库连接的 Vercel 项目 |

不得在本仓库新增一套假设性的 `rewrites()` 或 `vercel.json` 作为生产真源。若生产基础设施从 CloudFront 迁移，先更新本文，再同步部署工作流和验收命令。

## 验收

- [ ] `https://clinkbill.com/blog` 与一篇 `/blog/{slug}` 返回 200，地址栏不跳到 Vercel 域。
- [ ] `https://clinkbill.com/arr-leaderboard` 与一个详情页返回 200。
- [ ] Blog 页面所需 CSS、JS、字体请求均为 200，主站首页与产品页资源不受影响。
- [ ] canonical、`og:url` 与 Breadcrumb `item` 均使用 `https://clinkbill.com/...`。
- [ ] `https://clinkbill.com/blog/sitemap.xml` 返回 200，且不包含正式域 404 的路径。
- [ ] `/compare` 与 `/platforms/*` 在获得转发前不被描述为已上线。

## 待主站/基础设施维护方决定

- 是否把 `/compare`、`/compare/*` 与 `/platforms/*` 纳入正式域转发。
- 主站 robots.txt 是声明 Blog sitemap，还是仅在 GSC/Bing 中单独提交。

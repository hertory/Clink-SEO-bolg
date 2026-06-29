# Clink 生产路由：主站 Rewrite / 反向代理

> **读者**：负责 **`clinkbill.com` 主站** 的前端/全栈同学。  
> **博客子站**：Next.js 15 项目，部署在 **`https://clink-ai-psi.vercel.app`**（本仓库）。  
> **目标**：用户访问 `https://clinkbill.com/blog` 和 `https://clinkbill.com/blog/:slug` 时**地址栏保持 `clinkbill.com`**，请求透明转发到子站，避免 302 到 `*.vercel.app`。

---

## 1. 维护边界

| 职责 | 负责方 |
| --- | --- |
| 博客内容 / 视觉 / Next 代码 | 本仓库（`clink-ai` / `clink-ai-psi.vercel.app`） |
| rewrite 规则 / `BLOG_ORIGIN` | 主站仓库 `clinkbill.com` |
| 首页 / 产品页 / 定价等 | 主站仓库 |

主站团队**不直接改**子站页面 JSX，只维护转发规则与环境变量。

---

## 2. 子站路径清单

### 2.1 博客路由（需转发）

| 路径 | 说明 |
| --- | --- |
| `/blog` | 博客列表页 |
| `/blog/what-is-clink` | 文章：What Is Clink? |
| `/blog/mor-vs-psp` | 文章：MoR vs PSP |
| `/blog/:slug` | 动态文章详情（未来新增） |

### 2.2 子站资源前缀（需转发）

| 前缀 | 用途 |
| --- | --- |
| `/_next/*` | Next.js 静态 chunk / RSC / 字体 — 子站博客页面的样式和 JS 依赖 |

### 2.3 不转发的路由

以下路径由主站 `clinkbill.com` 自行渲染，**不走 rewrite**：

| 路径 | 说明 |
| --- | --- |
| `/` | 主站首页 |
| `/products/*` | 产品页 |
| `/platforms/lovable` | Lovable 集成页 |
| `/compare` | 竞品对比 |
| `/compare/stripe` | Clink vs Stripe |
| `/contact` | 联系 |
| `/docs` | 文档 |
| `/login` | 登录 |

---

## 3. Rewrite / 反向代理 / 重定向

| 方式 | 地址栏 | 用途 |
| --- | --- | --- |
| **Rewrite** | 始终 `clinkbill.com` | 主站透明转发到子站 ✅ |
| **反向代理** | 同上 | CDN / Nginx / Worker 层等价实现 |
| **301 / 302** | 变为 `clink-ai-psi.vercel.app` | ❌ 损害品牌与 SEO |

---

## 4. 配置写在哪里

| 主站托管方式 | 配置位置 |
| --- | --- |
| Vercel + Next.js（推荐假设） | 主站 `next.config.ts` → `rewrites()` |
| Vercel 非 Next | 主站根 `vercel.json` → `rewrites` |
| Cloudflare | Workers / Snippets / Transform Rules |
| 自建 | Nginx `proxy_pass` / Caddy |

**铁律**：在**子站仓库**改 `next.config.ts` **不会**影响 `clinkbill.com` 的转发。规则只在持有主域解析的一层生效。

---

## 5. 方案 A（推荐）：主站 `next.config.ts`

> ⚠️ 先读 [§7 `/_next` 冲突](#7-_next-冲突必读) 再配置。

### 5.1 仅转发博客路径

```ts
// next.config.ts（clinkbill.com 主站仓库）
import type { NextConfig } from "next";

const BLOG_ORIGIN = process.env.BLOG_ORIGIN ?? "https://clink-ai-psi.vercel.app";

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        // 博客路由
        { source: "/blog", destination: `${BLOG_ORIGIN}/blog` },
        { source: "/blog/:slug", destination: `${BLOG_ORIGIN}/blog/:slug` },

        // 子站 Next.js 静态资源（仅 blog 页面需要）
        { source: "/_next/static/css/:path*", destination: `${BLOG_ORIGIN}/_next/static/css/:path*` },
        { source: "/_next/static/chunks/app/blog/:path*", destination: `${BLOG_ORIGIN}/_next/static/chunks/app/blog/:path*` },
        { source: "/_next/static/chunks/pages/blog/:path*", destination: `${BLOG_ORIGIN}/_next/static/chunks/pages/blog/:path*` },
        { source: "/_next/static/media/:path*", destination: `${BLOG_ORIGIN}/_next/static/media/:path*` },
      ],
    };
  },
};

export default nextConfig;
```

### 5.2 环境变量

```bash
# 主站 Vercel 项目
BLOG_ORIGIN=https://clink-ai-psi.vercel.app
```

Preview 环境可指向 Preview Deployment URL。

---

## 6. 方案 B：`vercel.json`（与 A 二选一）

```json
{
  "rewrites": [
    { "source": "/blog", "destination": "https://clink-ai-psi.vercel.app/blog" },
    { "source": "/blog/:slug", "destination": "https://clink-ai-psi.vercel.app/blog/:slug" },
    { "source": "/_next/static/css/:path*", "destination": "https://clink-ai-psi.vercel.app/_next/static/css/:path*" },
    { "source": "/_next/static/chunks/app/blog/:path*", "destination": "https://clink-ai-psi.vercel.app/_next/static/chunks/app/blog/:path*" },
    { "source": "/_next/static/media/:path*", "destination": "https://clink-ai-psi.vercel.app/_next/static/media/:path*" }
  ]
}
```

**不要** `next.config.ts` 与 `vercel.json` 同时配 rewrite，避免双跳。

---

## 7. `/_next` 冲突（必读）

主站（`clinkbill.com`）与子站（`clink-ai-psi.vercel.app`）**都是 Next.js**。子站博客页面的 HTML 会请求 `/_next/static/...` 资源。

### 冲突场景

- 若把 `/_next/*` **全部**转发到子站 → 主站自身页面（首页、产品页）丢失样式。
- 若**不**转发 `/_next/*` → 子站博客页面无样式，因为浏览器向 `clinkbill.com/_next/static/...` 请求资源，而主站没有这些 chunk。

### 推荐策略：精确转发

只转发子站博客页面实际需要的 chunk 前缀（见 §5.1）：

| 转发模式 | 说明 |
| --- | --- |
| `/_next/static/css/:path*` | CSS 文件（主站子站共享，转发无冲突） |
| `/_next/static/chunks/app/blog/:path*` | 博客路由专属 JS chunk |
| `/_next/static/media/:path*` | 字体文件 |
| `/_next/static/chunks/pages/blog/:path*` | pages router 下的 blog chunk（备用） |

**原理**：Next.js 按路由分割 chunk（code splitting）。`/blog` 页面的 JS 代码在 `app/blog/` 前缀的 chunk 中，转发这些 chunk 不会影响主站其他页面。CSS 和字体文件通常是共享的，可安全转发。

### 备选方案：子站 `assetPrefix`

如果精确转发仍不生效（主站版本与子站 chunk 哈希冲突），在子站 `next.config.ts` 中设置：

```ts
assetPrefix: "https://clink-ai-psi.vercel.app",
```

子站博客页面的所有 `/_next/static/...` 请求将直接指向 `clink-ai-psi.vercel.app`，无需主站转发任何 `/_next/*` 规则。代价是博客页面首次加载多一次 DNS 解析。

---

## 8. 子站侧约束（本仓库需确认的事项）

| # | 检查项 | 状态 |
|---|--------|------|
| 1 | `metadataBase` 指向 `https://clinkbill.com` | 待更新（当前为 `clink-ai.lovable.app`） |
| 2 | `NEXT_PUBLIC_SITE_URL=https://clinkbill.com` | 待配置 |
| 3 | `<Link href="/blog">` 使用相对路径 | ✅ 已使用 |
| 4 | canonical 输出 `clinkbill.com` | 待更新 |
| 5 | `og:url` 输出 `clinkbill.com` | 待更新 |
| 6 | `sitemap.xml` 输出 `clinkbill.com` | 待更新 |

---

## 9. 验证清单

- [ ] 无痕访问 `https://clinkbill.com/blog`，地址栏保持 `clinkbill.com`
- [ ] 访问 `https://clinkbill.com/blog/mor-vs-psp`，地址栏保持 `clinkbill.com`
- [ ] Network：文档 200，CSS/JS chunk 200，无大量 404
- [ ] 与直接访问 `https://clink-ai-psi.vercel.app/blog` 同路径 HTML 一致
- [ ] view-source：canonical / `og:url` 指向 `clinkbill.com`，无 `vercel.app` 域泄漏
- [ ] 主站产品路径（`/`、`/products`、`/contact` 等）不受影响，样式正常
- [ ] `sitemap.xml` 中博客 URL 为 `clinkbill.com/blog/*`

---

## 10. 必记三件事

1. **`/_next` 精确转发** — 只转发 `/blog` 路由的 chunk 前缀，不影响主站样式。
2. **SEO 指主域** — 子站 env、metadata、canonical、og:url 统一用 `clinkbill.com`。
3. **只留一层 rewrite** — `next.config` / `vercel.json` / Cloudflare 勿叠加。

---

## 11. 路径增减同步

博客新增文章（如 `content/blog/smart-routing.md` → `/blog/smart-routing`）时：
- 动态路由 `/blog/:slug` 自动覆盖，**无需修改 rewrite 规则**。
- 如需新增整站路径转发（如 `/compare` 也从子站渲染），更新本文 §2 和主站 rewrite 规则。

---

## 12. 参考

- Vercel rewrites：https://vercel.com/docs/projects/project-configuration#rewrites
- Next.js rewrites：https://nextjs.org/docs/app/api-reference/config/next-config-js/rewrites
- 通用迁移指南：[migrate-lovable-to-nextjs.md](../通用知识库/docs/migrate-lovable-to-nextjs.md)

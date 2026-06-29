# Clink — Brand & Visual Guidelines

> 类型：视觉设计规范 | 版本：v1.1 | 更新：2026-06-23

---

## §1 颜色系统

所有颜色定义为 CSS token，通过语义类消费。**禁止在组件中硬编码 hex/rgb。**

主题：**light**（暖白优先）。强调色为橙→粉品牌渐变。

### 基础色

| Token | Hex | 用途 |
|---|---|---|
| `--color-bg-page` | `#FEFEFB` | 页面主背景、Header 背景 |
| `--color-bg-section` | `#FAF9F7` | 功能大卡片浅暖灰背景 |
| `--color-surface` | `#FFFFFF` | 卡片、按钮、输入框表面 |
| `--color-surface-subtle` | `#F9F9F9` | 次级浅色表面 |
| `--color-text-primary` | `#0D1323` | 主标题、正文主要文字 |
| `--color-text-secondary` | `#3F3F46` | 导航、次级正文、卡片正文 |
| `--color-text-muted` | `#71717A` | placeholder、输入提示 |
| `--color-text-disabled` | `#B8B8BC` | 禁用态文字 |
| `--color-border` | `#EFEFEF` | 默认边框（卡片 / 按钮 / 表单 / 微型 UI） |
| `--color-border-warm` | `#F2EDE6` | 暖色嵌套面板边框 |
| `--color-footer` | `#0A0A0A` | Footer 背景 |
| `--color-footer-border` | `#1A1A1A` | Footer 顶部分割线 |
| `--color-footer-text` | `#999999` | Footer 次级文字 |
| `--color-footer-muted` | `#666666` | Footer 版权文字 |

### 品牌强调色

```css
--gradient-brand: linear-gradient(90deg, #ED7039 10.1%, #EC7193 98.5%);
```

使用场景（保持稀缺）：

- Hero 强调词（如 `humans` / `agents`）。
- Section Eyebrow，例如 `FEATURES`。
- Logo 或品牌装饰。
- 强调词下划线：纯色 `#ED7039`，高度 `4px`。

避免大面积使用该渐变作为背景，保持品牌色稀缺和聚焦。

### 阴影体系

层级靠 `背景色差 + 1px 边框 + 大圆角` 表达，**不依赖阴影**。卡片一律不加重投影；唯一例外是 Hero 内的小尺寸 UI 示意卡可用 `backdrop-filter: blur(5px)`。Footer 黑色容器可保留顶部浅边框层次。

### 禁止使用的颜色

- ❌ `purple-*` `blue-*` `indigo-*` `violet-*` `cyan-*`（蓝紫色系，全部禁止 — 强调色只能是橙粉渐变 / `#ED7039`）
- ❌ `green-*` `emerald-*` `teal-*` `lime-*`（绿色系全部禁止）
- ❌ 在 JSX className 里直写裸 hex / rgb（一律走 token）
- 中性灰（`#3F3F46` / `#71717A` / `#B8B8BC`）是规范内文字色，正常使用；黑色（`#000` / `#0A0A0A`）仅用于 primary CTA + Footer 容器。

### 区域背景层次

| 区域 | 底色 |
|---|---|
| Page / Header | `--color-bg-page #FEFEFB` |
| 功能大卡片 | `--color-bg-section #FAF9F7` |
| 卡片 / 表单表面 | `--color-surface #FFFFFF` |
| 嵌套示意面板 | `#FEFEFB` + `--color-border-warm` 暖边 |
| Footer | `--color-footer #0A0A0A`（黑色大圆角独立容器） |

三层暖白色阶（page → section → surface）+ 黑色 Footer 是全站底色的全部，不允许额外底色变体。

### Logo 使用规范

- 主 Logo：`src/assets/clink/nav-logo.svg`（wordmark "Clink"，导航内高度约 24px @ 1x）；浅底使用深色 / 品牌色版本，深色容器（Footer）使用白色版本
- 留白：四周保持 ≥ 首字母 "C" 字高 的留白
- 最小尺寸：屏幕 20px，印刷 8mm
- 禁止：在规定配色外重新着色、拉伸、倾斜、旋转、加投影、放在低对比度/杂色背景上
- 强调标识："Clink for Claw" 和 Hero CTA 旁可附 28px 的 claw lobster avatar（`claw-avatar.svg`）；**除此之外全站禁止再使用 mascot**

---

## §2 字体系统

### 字体族

| 用途 | 字体 | Tailwind class | 用途 |
|---|---|---|---|
| 标题 / 大标题 / 导航 | Hanken Grotesk | `font-heading` | Hero、Section Heading、Feature Title、顶部导航 |
| 正文 / 描述 / UI / 按钮 | Inter | `font-body` | 段落、标签、Footer、卡片内容、CTA |

```css
--font-heading: "Hanken Grotesk", "Inter", system-ui, sans-serif;
--font-body: "Inter", system-ui, sans-serif;
```

**全站仅 Hanken Grotesk + Inter 两族。** 标题用 Hanken Grotesk，正文 / UI 用 Inter，不引入第三家族，不引入 serif。

### 字号体系

| 层级 | 字体 | 字号 / 行高 | 字重 | 字距 | 场景 |
|---|---|---|---|---|---|
| Hero Title | Hanken Grotesk | 54 / 64 | Medium / SemiBold | −1px | 首屏主标题 |
| Section Title | Hanken Grotesk | 40 / 44 | Medium | 0 | 模块标题（Features / Partners） |
| Feature Title | Hanken Grotesk | 36 / 54 | Medium | 0 | 功能卡片标题 |
| Body Large | Inter | 20 / 30 | Regular | 0 | 模块 / 功能描述 |
| Label / Eyebrow | Inter | 16 / 24 | SemiBold | 0 | `FEATURES`、渐变小标题（全大写 + 品牌渐变色） |
| Navigation | Hanken Grotesk | 16 / normal | Regular | 0 | 顶部导航 |
| Button | Inter | 16 / 24 | SemiBold | 0 | 常规 CTA |
| Header Button | Inter | 14 / 14–22 | Medium | 0 | 语言切换 / 登录 / Get Started |
| Card Body | Inter | 14 / 20–22 | Regular | 0 | Testimonial / Footer 链接 |
| Mini UI Text | Inter | 8–10 / 12–15 | Regular | 0 | 支付表单示意微型文字 |

使用规则：主标题 `Hanken Grotesk Medium`，重点词 `Hanken Grotesk SemiBold` + 渐变色；正文 `Inter Regular`，大段正文行高 ≈ 1.5；`FEATURES` 标签全大写 + `Inter SemiBold 16px` + 品牌渐变色；不使用负字距作为通用规则，仅 Hero 标题保留 `−1px` 轻微收紧。

### 禁止使用的字体

- ❌ Poppins、Montserrat、Roboto（任何冒充 Hanken Grotesk 的 grotesque 替代）
- ❌ Lora、Playfair Display、任何 serif（包括标题与引用）
- ❌ 任何手写体、display 装饰体
- ❌ 即兴使用未列于上表的字号绕过字号体系

---

## §3 布局与间距

| 规则 | 值 |
|---|---|
| 容器最大宽 | `max-w-[1200px]`（统一容器宽度） |
| 容器左右内边距 | `px-6`（移动 24px / 桌面 48px 等效 — `px-6` + container 自带） |
| Hero 上下间距 | `pt-24 md:pt-[120px] pb-24 md:pb-32` |
| Section 上下间距 | `py-20 md:py-28` |
| Feature Tiles section | `py-20 md:py-24` |
| 卡片内边距 | `p-7`（标准 tile） / `p-6`（quote card） |
| 网格 gap | `gap-6`（24px，所有 tile/feature 网格统一） |
| Feature Row 上下间距 | `py-12 md:py-16`（行间距 96px 桌面） |
| 圆角 | `rounded-[10px]`（pills）/ `rounded-2xl`（图片容器）/ `rounded-[24px]`（quote card）/ `rounded-[32px]`（Feature tile / Feature row 容器）/ `rounded-full`（CTA / nav login pill / avatar） |

---

## §4 按钮规范

### 允许的变体（控制在 3 种以内）

| Variant | 视觉 | 用途 |
|---|---|---|
| **primary (Hero CTA)** | `bg-black text-white rounded-full px-6 py-4 text-[15px] font-semibold` + 后置 `→` | **全站唯一一处** — 仅出现在 Hero："Get Agent-Ready in 1-Click" |
| **outline (Login)** | `h-9 rounded-full border px-4 text-sm font-medium text-primary hover:bg-surface-subtle` + `style={{ borderColor: 'var(--color-border)' }}` | TopNav 右侧 Login |
| **text link (Discover X →)** | `inline-flex items-center gap-2 text-[15px] font-medium` + `style={{ color: '#ED7039' }}` + 尾随 `→` | Feature Overview 每行末尾，不使用按钮 |

### 层级规则

- **全站只有 Hero 一个 primary CTA**。Feature Overview 用 text link，不用按钮；Footer 不出现 CTA。
- 禁止第 4 种按钮变体（不允许出现 `bg-accent` 实色按钮、不允许 ghost 按钮）。
- 禁止在 H2/H3 下方出现 "Get started" / "Learn more" 这类装饰性按钮组。
- 禁止 Hero 出现第二个 primary CTA（无 "Watch demo" / "Talk to sales" 并排按钮）。

---

## §5 组件规范

### 5.1 图文大卡片（Feature Tile）

用于 Feature 模块（如 Global Payments），图文搭配的展示型大卡。

| 属性 | 规范 |
|---|---|
| 背景 | `--color-bg-section #FAF9F7` |
| 边框 | `1px solid #EFEFEF` |
| 圆角 | 大圆角（`36px` 级） |
| 内边距 | 左侧内容距卡片约 `40px`，顶部约 `104px` |
| 标题 | Hanken Grotesk Medium，Feature Title 级 |
| 正文 | Inter Regular，Body Large 级 |
| CTA | 黑底白字，胶囊圆角 |

可在卡内嵌入展示面板：浅暖底（`#FEFEFB`）+ 暖色边框（`--color-border-warm`）+ 大圆角，用于放置示意图或小 Logo 卡片。**禁止给卡片加投影**，层级靠背景色差 + 边框。

### 5.2 文本卡片（Testimonial Quote Card）

用于用户评价、案例等以文字为主的卡片。

| 属性 | 规范 |
|---|---|
| 背景 | `--color-surface #FFFFFF` |
| 边框 | `1px solid #EFEFEF` |
| 圆角 | 中圆角（`24px` 级） |
| 内边距 | `30px` |
| 头像 | 圆形小头像（约 44px） |
| 姓名 | Inter Medium |
| 公司 / 描述 / 正文 | Inter Regular，Card Body 级 |

头像缺失时 fallback 为浅暖底 + 姓名首字母 monogram。

### 5.3 小卡片（Mini UI Card）

用于 Hero 支付表单示意、嵌套小面板等轻量示意组件。

| 属性 | 规范 |
|---|---|
| 背景 | `--color-surface #FFFFFF` |
| 边框 | `1px solid #EFEFEF` |
| 圆角 | 小圆角（`16px` 级） |
| 模糊 | 可选 `backdrop-filter: blur(5px)` |
| 内边距 | 垂直 `12px`，左右 `12px` |
| 微型文字 | Inter Regular，Mini UI Text 级 |
| 分割线 | `#EFEFEF` 或同级浅灰 |

小卡片为视觉示意组件，不建议直接复用为真实业务表单组件。


### 5.4 行内链接（Feature Overview "Discover X →"）

| 属性 | 值 |
|---|---|
| 颜色 | `style={{ color: '#ED7039' }}` |
| 底线 | **不显示底线**（与 spec §5/text link 一致） |
| 字重 | `font-medium` |
| 尾随 | 必带 `→` |

> 注：这是 Clink 唯一的"链接"模式，所以传统的"正文内 underline 链接"不出现在 homepage；如果未来增加博客/文档页，再补充 underline 规范。

### 5.5 导航体系

- **TopNav** — `src/routes/index.tsx` 中的 `<TopNav />`：sticky、初始透明，滚动 > 80px 后 `backdrop-blur-md` + `background: color-mix(--color-bg-page 75%, transparent)` + 底部 hairline。
- 同一路由禁止同时渲染两套导航。
- 品牌色在导航中的边界：nav 链接用 `text-secondary`，**禁止** 任何 nav 链接使用 `#ED7039`；唯一允许的"强调"是 "Clink for Claw" 链接前的 16px claw avatar。

### 5.6 特殊视觉效果

| 工具类 | 用途 | 限制 |
|---|---|---|
| `--gradient-brand` + `bg-clip-text text-transparent` | Hero 标题强调词 | 每页 1 次，仅 Hero |
| Marquee（双向无限滚动） | Partner section 两条 rail | 仅 Partner section，opposite directions，hover pause |
| Vertical scroll columns | Testimonial 3 列垂直无限滚动 | 仅 Testimonial section |

禁止在其他组件中复刻这些效果。

---

## §6 图标规范

### 允许的图标库

**自绘 SVG only**（来自 `src/assets/clink/`）。**Hero 三个 pill 必须使用** 项目内置的 `tab-icon-card.svg` / `tab-icon-widget.svg` / `tab-icon-notes.svg` —— 禁止用 Lucide 的 `CreditCard / LayoutGrid / Receipt` 替代。

如果未来需要功能性图标（form、表单控件、状态指示器），允许引入 `lucide-react`，但**白名单**仅限：`Menu | X | ChevronDown | ChevronRight | ArrowRight | Check | Minus | Loader2 | Search`。其余 Lucide 图标禁止出现。

> `Minus` 的唯一合法用途：`ComparisonTable` 中表示 "partial / 部分支持"。`Check` = yes，`X` = no，`Minus` = partial。`ChevronDown` 同时用于 `FaqSection` accordion 的展开指示。

禁止 emoji 作为 UI 元素。禁止任何彩色填充图标（"icon-in-rounded-square-with-bg" 模式禁止）。

### 尺寸体系

| 场景 | 尺寸 |
|---|---|
| 行内 / 按钮内 | `h-4 w-4` |
| Nav 内 claw avatar | `h-4 w-4 rounded-full` |
| Hero pill 图标 | `h-[18px] w-[18px]` |
| Hero CTA claw avatar | `h-7 w-7 rounded-full` |
| Testimonial avatar | `h-9 w-9 rounded-full` |

### 装饰性 vs 功能性

**禁止**：
- 在 H2/H3 旁放装饰性图标
- 在功能 tile 顶部放彩色 icon-box（**用图片插图代替** — 见 §7）
- 在列表 bullet 中使用行内装饰图标

**允许**：CTA 按钮内图标、Nav 内 claw avatar（仅 Clink for Claw 链接）、表单控件图标。

---

## §7 图像与插图

### 资产清单（全部已下载到 `src/assets/clink/`）

| 用途 | 文件 |
|---|---|
| Nav wordmark | `nav-logo.svg` |
| Hero pill 图标 ×3 | `tab-icon-card.svg` / `tab-icon-widget.svg` / `tab-icon-notes.svg` |
| Claw avatar（CTA + Nav） | `claw-avatar.svg` |
| Feature tile 插图 ×5 | `hero-feature-lockin-illustration.svg` / `hero-feature-global.png` / `hero-feature-secure.png` / `hero-feature-simple.png` / `hero-feature-report-chip.png` |
| Feature Overview 插图 ×3 | `feature-global-payments.png` / `feature-smart-routing.png` / `feature-billing.svg` |
| Partner logos ×15 | `partners/partner_{2,34-38,40-48}.svg` |
| Testimonial avatars | `testimonials/{block-sec,gee-lark,linkloud,gazolab,zing-front,nova-sonic}.{png,webp,svg}` |

### 通用规则

- 所有 `<img>` 包裹在固定宽高比容器内（`aspect-[16/10]` for tiles & feature rows），容器设 `bg-surface-subtle overflow-hidden rounded-2xl`
- 必须设 `loading="lazy"`
- 必须设语义化 `alt`（feature tile alt = title；装饰性 pill 图标 alt=""）
- 测试用户头像缺失场景：fallback 为浅暖底 + 姓名首字母 monogram（已实现）

### 风格指南

- 插图风格：**亮色、克制、轻商务 2.5D micro-scene**，柔和橙粉品牌点缀，premium fintech aesthetic
- 插图调色板：暖白背景 + 橙粉品牌点缀 + 少量克制中性技术色（purple/teal allowed *仅* in product illustrations，禁止扩散到 UI tokens）
- 禁止：蓝色企业库存图、3D 渲染、玻璃态、霓虹光效、dark editorial、含 AI 生成文字的插图
- 宽高比规范：Tile 与 Feature Row 容器统一 `16/10`；Testimonial avatar `1/1`；OG 图 `1200×630`

---

## §8 动效规范

| 元素 | 动效 |
|---|---|
| Section 入场 | 不强制；如有，`opacity 0→1, y 12→0, viewport once, 400ms ease-out`（每个 section 作为一个整块入场，禁止逐 card 错峰） |
| Feature tile hover | `hover:-translate-y-1` + 边框轻亮，`transition-all duration-200` |
| Hero CTA arrow | `group-hover:translate-x-1`，`transition-transform duration-200` |
| Hero CTA pill | `hover:-translate-y-0.5` |
| Partner marquee | 双 rail，opposite directions，`45s / 55s linear infinite`，hover pause |
| Testimonial columns | 3 列，`60s / 80s / 70s linear infinite`，alternating directions，hover pause |
| Nav blur | scroll > 80px 后 fade in `backdrop-filter: blur(16px)` |

动画库：纯 CSS keyframes + Tailwind transition（**禁止引入 Framer Motion / GSAP** — 站点的所有动效都已在 `styles.css` 的 `clink-scroll-x / clink-scroll-x-reverse / clink-scroll-y / clink-scroll-y-reverse` 中提供）。

禁止：parallax、Lottie、autoplay video、scroll-jacking、bouncy/elastic easing、≥ 800ms 首屏入场、headline 渐变动画。

---

## §9 装饰性禁令

以下模式使页面看起来像通用 AI/SaaS 模板，**全站禁止**：

1. **禁止装饰性 eyebrow pill** — 不用 pill 形式标注 section 名称（"FEATURES" / "WHY US" pill 禁止）。Feature Overview 第一行的 "FEATURE OVERVIEW" 是**纯文本 eyebrow**（`text-xs uppercase tracking-[0.18em] text-muted`），不是 pill。
2. **禁止装饰性图标** — 不在 H2/H3 旁放图标作 ornament；不在功能卡片顶部放橙粉圆角方块 icon-box；不在列表用图标代替纯文本 bullet。**功能卡片的视觉重心是顶部的产品插图**，不是图标。
3. **禁止内容空洞的 section 标签** — "How it works" 作为唯一 H2、"Built for builders" 作为 audience 区 eyebrow，全部禁止。每个 H2 必须是有信息量的描述句（如 "Cooperation partners" / "Trusted by Product Builders"）。
4. **禁止 demo/screenshot 的自标注 pill** — "Live demo · click around" 这类禁止。
5. **禁止"As featured in TechCrunch"压条** — 信任信号只用 Partner marquee + Testimonial wall 这两处。
6. **禁止 stat counter 区块**（"99.99% uptime / 135 currencies / 2B+ transactions"）— Clink 官网没有，prototype 也不加。
7. **禁止 pricing table on homepage**。
8. **禁止第二个 Hero CTA**。
9. **禁止 mascot 散落** — claw avatar 仅出现在 Hero CTA + Nav 的 "Clink for Claw" 链接，禁止在 footer / tile 角落 / 卡片装饰中复刻。
10. **禁止 sign-up form on hero**。

**判断标准**：这行文字/图标/pill 如果删掉，section 含义会变模糊吗？如果不会，它就是装饰，应该删。

---

## §10 页面架构

### 页面类型枚举

| 类型 | 路由 | 区域顺序（从上到下） |
|---|---|---|
| 营销 landing（首页） | `/` | TopNav → Hero → FeatureTiles (2+3 grid) → FeatureOverview (3 alternating rows) → Partners (dual marquee) → Testimonials (3-col scrolling wall) → Footer |
| 平台落地页 | `/platforms/$platform`（如 `/platforms/lovable`） | TopNav → Hero (with platform-tinted glow) → FeatureTiles → FeatureOverview → Footer。不复刻 Partners / Testimonials；CTA 仅 1 个。 |
| 对比页索引 | `/compare` | TopNav → Breadcrumb → Hero (small) → 竞品卡片 grid → Footer |
| 对比页详情 | `/compare/$competitor`（如 `/compare/stripe`） | TopNav → Breadcrumb → Hero (split, 无 H1 渐变) → VerdictCard → ComparisonTable → PricingCompare → SplitRow (×3) → "Where X wins" honesty grid → Migration steps → FaqSection → Closing soft-CTA → Footer。**禁止**复用首页 Hero 白 pill primary CTA。 |
| 博客索引 | `/blog` | TopNav → Breadcrumb → 索引 Hero (small) → PostCard grid → Footer |
| 博客文章 | `/blog/$slug` | TopNav → Breadcrumb → ArticleHero → 两列（ArticleBody 720px prose + ArticleSidebar TOC 280px sticky）→ FaqSection (可选) → Footer。**禁止**在文章页加白 pill CTA。 |
| 产品子页（占位） | `/products/payment` / `/products/routing` / `/products/billing` | 待补 |
| Agent 子页（占位） | `/clink-for-claw` | 待补 |
| Auth | `/login` | 待补 |
| Support / Contact / Company | `/support` / `/contact` / `/about` | 待补 |

**规则**：首页区域顺序固定，不可调换。所有 nav 链接的目标路由必须存在路由文件（即使是 404 占位）。**子页面 Hero 不复刻首页强度，保持克制。****全站 `bg-clip-text` 品牌渐变标题仅首页 Hero 一次**，子页面 H1 用 `text-primary` 纯色。

---

## §11 Do / Don't 速查表

| ✅ Do | ❌ Don't |
|---|---|
| `bg-section` `text-primary` `border-[--color-border]` `text-secondary` | 裸 hex/rgb 直写在 className |
| 语义 token 类（含 `bg-section` / `bg-surface-subtle`） | 裸 hex/rgb 在 JSX className |
| Inter @ 400/500/600/700 | Poppins / Lora / Roboto / Montserrat |
| Hero 一个 primary CTA（白 pill） | Hero 出现第二个 CTA / 中段散落按钮 |
| `rounded-full` 用于 CTA + nav login + avatar | 方形/小圆角 CTA |
| 功能性图标 only + 自绘 Hero pill SVG | H2 旁装饰图标、卡片顶 icon-box、Lucide 替代 Hero pill |
| `loading="lazy"` + 语义 `alt` + 头像缺失 fallback | 裸 `<img>` |
| 橙粉品牌色出现位置：标题渐变、Eyebrow、Discover 链接、强调下划线、claw avatar | 任何 purple / blue / green / teal 渐变或强调色 |
| 一个渐变区域（Hero only） | 多 section 都加渐变背景 |

---

## §12 文件归属

| 文件 | 管辖 |
|---|---|
| `src/styles.css` | 所有 CSS 变量、字体导入、`@theme inline` 语义映射、`@layer utilities` 工具类（`bg-section` / `text-secondary` 等）、所有 keyframes（marquee/vertical scroll） |
| `src/routes/__root.tsx` | 全局 `<head>` meta（含 title、description、og:*）、Inter Google Fonts preconnect + stylesheet |
| `src/routes/index.tsx` | Clink 首页全部 7 个 section（TopNav / Hero / FeatureTiles / FeatureOverview / Partners / Testimonials / Footer），全部数据驱动（NAV / HERO_PILLS / TILES / FEATURE_ROWS / PARTNERS_A,B / QUOTES） |
| `src/assets/clink/*` | 所有品牌资产（从 clinkbill.com 同步） |
| `src/components/ui/*` | shadcn 原语（当前 homepage 未使用 — Clink 自绘所有 section）— 读 token，不覆盖颜色 |
| `docs/clink-brand-and-homepage-spec.md` | 原始 prototype spec（含每个 section blueprint、文案 deck、acceptance checklist） |
| `docs/brand.md`（**本文件**） | 视觉设计规范——所有视觉决策的单一真相来源 |

**核心原则：组件消费 token，不定义 token。任何视觉变更从 `src/styles.css` 或本文件开始。**

---

## §13 代码快速参考

### Hero

```tsx
<section className="relative isolate overflow-hidden">
  <div className="mx-auto max-w-[960px] px-6 pt-24 md:pt-[120px] pb-24 md:pb-32 text-center">
    <h1
      className="font-semibold leading-[1.04] tracking-[-0.02em]"
      style={{ fontSize: 'clamp(40px, 6.5vw, 84px)' }}
    >
      <span className="block text-primary">Payment Infrastructure for an</span>
      <span
        className="block bg-clip-text text-transparent"
        style={{ backgroundImage: 'var(--gradient-brand)' }}
      >
        AI-Native World
      </span>
    </h1>
    {/* pills, subcopy, CTA — see src/routes/index.tsx */}
  </div>
</section>
```

### Feature Tile

```tsx
<article
  className="flex flex-col gap-6 rounded-[32px] border bg-section p-7 transition-all hover:-translate-y-1"
  style={{ borderColor: 'var(--color-border)' }}
>
  <div className="aspect-[16/10] overflow-hidden rounded-2xl bg-surface-subtle">
    <img src={img} alt={title} loading="lazy" className="h-full w-full object-cover" />
  </div>
  <h3 className="text-[22px] md:text-[26px] font-semibold tracking-[-0.01em]">{title}</h3>
  <p className="mt-3 text-[15px] leading-relaxed text-secondary">{body}</p>
</article>
```

### Partner Marquee Rail

```tsx
<div
  className="relative overflow-hidden"
  style={{
    maskImage: 'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)',
    WebkitMaskImage: 'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)',
  }}
>
  <div className="flex w-max gap-16 pr-16" style={{ animation: 'clink-scroll-x 45s linear infinite' }}>
    {[...logos, ...logos, ...logos].map((src, i) => (
      <img key={i} src={src} alt="" className="h-9 opacity-60 grayscale brightness-200" />
    ))}
  </div>
</div>
```

### Testimonial Column

```tsx
<div className="relative flex flex-col">
  <div className="flex flex-col gap-5" style={{ animation: 'clink-scroll-y 60s linear infinite' }}>
    {[...quotes, ...quotes, ...quotes].map((q, i) => <QuoteCard key={i} q={q} />)}
  </div>
</div>
```

---

## §14 验收清单（每次视觉变更后自检）

1. [ ] 页面背景近黑 + Hero 顶部暖色径向 glow（其它 section 无渐变）
2. [ ] TopNav sticky、初始透明，滚动 > 80px 后 backdrop blur + hairline
3. [ ] Nav 顺序：wordmark → Home / Clink for Claw (带 claw avatar) / Products / Support / Contact us → Login pill
4. [ ] Hero 标题强调词用 `--gradient-brand` `bg-clip-text`
5. [ ] Hero 3 个 pill 使用 `tab-icon-card/widget/notes.svg`，橙粉-soft 底 + 橙粉-tinted 边
6. [ ] Hero subcopy: "We've built everything inside, so you waste 0 time beyond building great products."
7. [ ] **只有一个** primary CTA：白色 pill "Get Agent-Ready in 1-Click"，前置 claw avatar、后置箭头
8. [ ] 五卡 grid：行 1 = 2 块（7+5 split），行 2 = 3 等分
9. [ ] Feature Overview 3 行，交替 image-right / image-left / image-right
10. [ ] 每行末尾是橙粉 text link "Discover X →"（非按钮）
11. [ ] Partner section 2 条 rail 反向滚动 + 双向 edge fade mask
12. [ ] Testimonial 3 列垂直滚动 + 上下 edge fade mask
13. [ ] Testimonial 文案来自真实 8 人 quote（Ruby / Dominic / JK / Silvirex / Veritas / Kevin / Ronald / Silas）
14. [ ] Footer 5 列 + 底部 © Clink Inc. 2025
15. [ ] 全站无 purple/blue/green 强调色，仅橙粉
16. [ ] Claw mascot 仅出现 2 处：Hero CTA + Nav "Clink for Claw"
17. [ ] 全站字体仅 Inter
18. [ ] 所有图片 `loading="lazy"` + 有意义 alt（装饰图 alt=""）
19. [ ] 响应式：nav 桌面显示，移动收起；Hero clamp 字号；tile 网格 3→1；testimonial 3→1
20. [ ] 无 placeholder boilerplate、无 Lorem ipsum
21. [ ] FAQ 使用 `<details>` accordion 形式（左侧文字 + 右侧 chevron + divider），不允许用 tabs/卡片网格替代
22. [ ] 博客文章页存在 ArticleSidebar（桌面 sticky TOC），文章正文宽度 ≤ 720px
23. [ ] 对比页 Hero 不使用 `--gradient-brand` `bg-clip-text` 渐变标题
24. [ ] 子页面（compare / blog / platforms）不出现第二个 primary 白 pill CTA
25. [ ] `Minus` 图标仅在 `ComparisonTable` 出现；其它任何 Lucide "非白名单" 图标禁止

---

## §15 Sub-page Components（v1.1 新增）

子页面（blog / compare / platforms）共享一组新组件。规范如下。

### 15.1 Breadcrumb（`src/components/Breadcrumb.tsx`）

```tsx
<nav aria-label="Breadcrumb" className="mx-auto max-w-[1200px] px-6 pt-6">
  <ol className="flex items-center gap-2 text-sm text-muted">
    {items.map((item, i) => (
      <li key={i} className="flex items-center gap-2">
        {i > 0 && <span aria-hidden>/</span>}
        {item.href ? (
          <a href={item.href} className="hover:text-primary transition-colors">{item.label}</a>
        ) : (
          <span className="text-secondary">{item.label}</span>
        )}
      </li>
    ))}
  </ol>
</nav>
```

- 始终是页面 TopNav 之后第一个元素；container 宽度与页面主区一致（`max-w-[1200px]`）。
- 末项无 href（当前页），用 `text-secondary`；中间项 `text-muted` hover → `text-primary`。
- 分隔符用 `/` 纯文本，不用 `ChevronRight`（避免装饰图标蔓延）。
- **禁止**在 Breadcrumb 内出现图标、emoji、彩色 badge。

### 15.2 TldrCard（`src/components/blog/TldrCard.tsx`）

bullet 样式参考 alignify.co/tools/image-generator：左侧 2px hairline + 1.5×1.5 圆点 bullet，无图标。

| 属性 | 值 |
|---|---|
| 容器 | `border-l-2 pl-6 md:pl-8`，`borderColor: var(--color-text-muted)` |
| Eyebrow | `text-xs uppercase tracking-[0.18em] text-muted`（固定 "TL;DR · KEY TAKEAWAYS"）|
| Summary | `text-[17px] leading-[1.75] text-secondary` |
| Bullet | `h-1.5 w-1.5 rounded-full`，`backgroundColor: var(--color-text-muted)`，`mt-2.5` 与首行对齐 |
| 内联 strong | `text-primary font-semibold`（通过 `**text**` markdown 标记） |

**禁止**：用 `Check` / 任何 Lucide 图标替代圆点 bullet；用 `bg-section` 卡片包裹 TldrCard（它是左 border 风格，不是卡片）。

### 15.3 FaqSection（`src/components/FaqSection.tsx`）

**全站唯一的 FAQ 形式**。基于原生 `<details name="site-faq">`（同组互斥，单开），不引入 Radix Accordion 以保持零依赖。

```tsx
<details name="site-faq" className="group py-6 first:pt-0">
  <summary className="flex cursor-pointer items-center justify-between gap-6">
    <span className="text-[18px] font-medium md:text-[20px]">{q}</span>
    <ChevronDown className="h-5 w-5 shrink-0 transition-transform group-open:rotate-180 text-muted" />
  </summary>
  <div className="mt-4 text-[15px] leading-relaxed text-secondary">{a}</div>
</details>
```

- 容器：`max-w-[860px]` 居中，section padding `py-20 md:py-24`。
- Items：`divide-y borderColor: var(--color-border)`，每项 `py-6`。
- 标题：H2 `text-3xl md:text-[44px] font-semibold tracking-[-0.02em]`。
- 第一项默认展开（`open` 属性放在数据第一项）。
- **禁止**：将 FAQ 渲染为 grid 卡片、tab pages、表格、bullet 列表；禁止用 `+`/`−` 文本符号替代 `ChevronDown`。

### 15.4 PostCard（`src/components/blog/PostCard.tsx`）

复用 §5.1 Feature Tile 容器规范，差异：

| 属性 | 值 |
|---|---|
| 容器 | `rounded-[32px] border bg-section p-7 md:p-8 hover:-translate-y-1` |
| 封面 | `aspect-[16/9]`（区别于 tile 的 16/10）|
| Meta | `text-xs text-muted`，格式 `{tag} · {readingTime} min` |
| 标题 | `text-[22px] md:text-[26px] font-semibold tracking-[-0.01em]` |
| 末行 | `text-[15px]` "Read article →" 橙粉 text link |

### 15.5 ArticleSidebar（`src/components/blog/ArticleSidebar.tsx`）

桌面（`md+`）右侧 sticky TOC：

- 容器：`sticky top-24`，`w-[280px]`，仅 `md:block` 显示。
- Eyebrow："ON THIS PAGE"，`text-xs uppercase tracking-[0.18em] text-muted`。
- 列表：`text-sm text-secondary`，active 项 `text-[#ED7039]`（这是全站第二处允许 nav 文本染品牌色的地方——第一处是 Discover X 链接）。
- 滚动监听用 IntersectionObserver 实现，不引第三方库。
- 移动端隐藏，文章正文上方不渲染移动版 TOC（避免重复）。

### 15.6 ComparisonTable（`src/components/compare/ComparisonTable.tsx`）

```tsx
<div className="overflow-hidden rounded-[24px] border" style={{ borderColor: 'var(--color-border)' }}>
  <div className="grid grid-cols-[1.5fr_1fr_1fr] divide-y" style={{ borderColor: 'var(--color-border)' }}>
    <div className="contents text-xs uppercase tracking-[0.18em] text-muted">
      <div className="bg-surface-subtle p-5">Capability</div>
      <div className="bg-surface-subtle p-5">Clink</div>
      <div className="bg-surface-subtle p-5">Competitor</div>
    </div>
    {rows.map((r) => (
      <div key={r.label} className="contents">
        <div className="p-5 text-[15px] text-primary">{r.label}</div>
        <Cell value={r.clink} accent />
        <Cell value={r.competitor} />
      </div>
    ))}
  </div>
</div>
```

- 图标语义：`Check` (text-[#ED7039]) = yes / `X` (text-muted) = no / `Minus` (text-muted) = partial。
- 字符串值（如 "100+", "~40"）原样渲染，用 `text-[15px] font-medium`。
- Header 行 `bg-surface-subtle`；body 行无背景色，靠 divide-y 区分。
- Clink 列允许 `text-[#ED7039]` 数值强调；Competitor 列不允许染色。

### 15.7 VerdictCard（`src/components/compare/VerdictCard.tsx`）

并排双卡片，左 Clink / 右 Competitor，各列举 4 条 bullet。

- 容器：`grid grid-cols-1 md:grid-cols-2 gap-6`。
- 单卡片：`rounded-[28px] border bg-section p-7 md:p-8`。
- 标题：`text-[22px] md:text-[26px] font-semibold`，左卡片用 `text-[#ED7039]`，右卡片用 `text-primary`。
- Bullet：`Check` (16px, text-[#ED7039]) + `text-[15px] text-secondary`。

### 15.8 PricingCompare（`src/components/compare/PricingCompare.tsx`）

- 与 VerdictCard 同布局（双卡 grid），但卡片更高、内含分项列表。
- 标价：`text-[40px] md:text-[48px] font-semibold`（**这是 Hero H1 之外唯一允许 ≥ text-[40px] 的场景**，需在 brand.md §2 留记录）。
- 子项行：`flex justify-between py-2 text-[15px]`，分隔 `divide-y` + `var(--color-border)`。
- Footnote：`mt-6 text-xs text-muted`。

### 15.9 SplitRow（`src/components/compare/SplitRow.tsx`）

复用首页 Feature Overview 的 alternating 行布局，差异：

- 左右两列分别用 `<Card>`（Clink 列）和无背景 div（Competitor 列）；不是 image + text，而是 text + text。
- Eyebrow + H3 + body + 两个 takeaway block（每个带 `Check` 或 `X`）。
- 行间距 `space-y-20 md:space-y-28`（比首页 Feature Overview 略松，因 compare 信息密度更高）。

---

## §16 Sub-page Do/Don't 增补（v1.1）

| ✅ Do | ❌ Don't |
|---|---|
| FAQ 用 `<details name="site-faq">` accordion | FAQ 用 tabs / 卡片 grid / 表格 |
| 博客文章桌面端配 ArticleSidebar sticky TOC | 文章页顶部插入 inline TOC pill |
| 对比表用 ComparisonTable + Check/X/Minus 三态 | 对比表用 ✅/❌ emoji 或自绘 svg badge |
| 子页面 Hero H1 纯色 `text-primary` | 子页面 H1 复刻首页 `--gradient-brand` |
| 子页面 CTA 用橙粉 text link `Discover X →` | 子页面 Hero 再放 primary CTA |
| Breadcrumb 用 `/` 分隔符 | Breadcrumb 用 `ChevronRight` 或彩色装饰 |

---

*End. — Clink Brand Guidelines v1.1*

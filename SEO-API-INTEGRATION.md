# SEO API Integration — Projects, Posts, Experiences

এই ডকুমেন্টে এই পোর্টফোলিও ক্লায়েন্টে (Next.js 15, App Router) করা সব পরিবর্তনের সারাংশ আছে — কেন করা হয়েছে, কোন ফাইলে কী আছে, এবং পরে কাজে লাগার মত সব তথ্য।

## লক্ষ্য (Goal)

Backend API (`/projects`, `/posts`, `/experiences`) থেকে আসা ডেটা দিয়ে SEO-friendly, AI-crawlable dynamic pages বানানো — যাতে প্রতিটা project/post/experience আলাদাভাবে search engine এবং AI bot দিয়ে indexed/ranked হতে পারে।

---

## 1. Environment Variables

| ফাইল | কাজ |
|---|---|
| `.env.local` (gitignored) | `NEXT_PUBLIC_API_URL` — লোকাল ডেভেলপমেন্টে কোন API hit করবে তা নির্ধারণ করে। বর্তমানে লাইভ API-তে সেট আছে: `https://nextjs-portfolio-server.vercel.app/api/v1` |
| `.env.example` (committed) | `NEXT_PUBLIC_API_URL` এবং `NEXT_PUBLIC_SITE_URL` এর ডকুমেন্টেশন, যাতে কেউ নতুন ক্লোন করলে বুঝতে পারে কী লাগবে |
| `.gitignore` | `.env*` ব্লক করা থাকলেও `!.env.example` যুক্ত করা হয়েছে যাতে example ফাইলটা commit হয় |

`NEXT_PUBLIC_API_URL` সেট না থাকলে কোড নিজেই লাইভ প্রোডাকশন API ব্যবহার করবে (fallback `src/lib/api/client.js`-এ লেখা আছে), তাই env ফাইল ছাড়াও সাইট কাজ করবে।

**লোকাল ব্যাকএন্ড দিয়ে টেস্ট করতে চাইলে:** `.env.local`-এ বদলে দিন → `NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1`

---

## 2. API Client Layer — `src/lib/api/`

| ফাইল | এক্সপোর্ট করে | কাজ |
|---|---|---|
| `client.js` | `apiFetch()`, `ApiError` | সব API কলের একমাত্র জায়গা (single chokepoint)। `fetch` + Next.js ISR caching (`revalidate: 3600`s, মানে ১ ঘন্টা পর পর fresh data আনে)। non-2xx বা `success:false` হলে `ApiError` throw করে (status code সহ) |
| `projects.js` | `getProjects()`, `getProjectBySlug()`, `getFeaturedProjects()` | প্রজেক্ট লিস্ট/ডিটেইল আনে। slug না পেলে `null` রিটার্ন করে (404 হলে), অন্য error rethrow করে |
| `posts.js` | `getPosts()`, `getPostBySlug()`, `getLatestPosts()` | পোস্টের জন্য একই প্যাটার্ন |
| `experiences.js` | `getExperiences()`, `getExperienceBySlug()` | এক্সপেরিয়েন্সের জন্য একই প্যাটার্ন |

**কেন এই প্যাটার্ন:** নতুন কোনো resource (যেমন ভবিষ্যতে "testimonials") যুক্ত করতে হলে শুধু একটা নতুন ফাইল বানিয়ে `apiFetch` রিইউজ করলেই হবে — কোনো ডুপ্লিকেট fetch/error-handling লজিক লিখতে হবে না।

---

## 3. SEO Helpers — `src/lib/seo/`

| ফাইল | কাজ |
|---|---|
| `site.js` | `siteConfig` — সাইটের নাম, URL (`NEXT_PUBLIC_SITE_URL` থেকে, fallback placeholder `https://kazirahat.com`), author, description। canonical/OG/sitemap সবকিছু এখান থেকে একই তথ্য নেয় |
| `jsonld.js` | JSON-LD structured data বানানোর ফাংশনগুলো:<br>• `buildBreadcrumbJsonLd()` — সব পেজে breadcrumb<br>• `buildPostJsonLd()` — পোস্টের জন্য `BlogPosting` schema<br>• `buildProjectJsonLd()` — প্রজেক্টের জন্য `CreativeWork` schema<br>• `buildExperienceJsonLd()` — এক্সপেরিয়েন্সের জন্য `Person` + `hasOccupation` (`OrganizationRole`) schema |

`src/components/SEO/JsonLd.jsx` — উপরের ডেটা `<script type="application/ld+json">` ট্যাগে সেফলি বসায় (XSS এড়াতে `<` কে `<` করে escape করা আছে)।

**JSON-LD কেন:** এটা Google/AI bot-কে সরাসরি বলে দেয় পেজটা কী (একটা ব্লগ পোস্ট, একটা প্রজেক্ট, না একটা চাকরির experience) — সাধারণ HTML পার্স করে বোঝার চেয়ে এটা অনেক বেশি reliable।

---

## 4. Shared Utilities

| ফাইল | কাজ |
|---|---|
| `src/lib/text.js` | `splitParagraphs(text)` — `\n` দিয়ে split করে খালি লাইন বাদ দিয়ে paragraph array বানায়। API-র `description`/`content` প্লেইন টেক্সট (markdown না), তাই এটা দিয়ে সেফলি `<p>` ব্লক বানানো হয় (`dangerouslySetInnerHTML` ছাড়াই) |
| `src/lib/date.js` | `formatDate()`, `formatPeriod()` — ISO date কে "Jun 2025" ফরম্যাটে আনে, এবং experience-এর "May 2025 – Present" টাইপ period string বানায় |

---

## 5. Reusable UI Components — `src/components/UI/`

| কম্পোনেন্ট | কাজ |
|---|---|
| `Thumbnail.jsx` | `next/image` র‍্যাপার — thumbnail খালি স্ট্রিং (`""`) হলেও crash করে না, বদলে "No image" placeholder দেখায়। সব জায়গায় (homepage card, list, detail) একইভাবে রিইউজ করা হয়েছে |
| `Pagination.jsx` | লিস্ট পেজের Prev/Next লিংক, `meta.totalPages` থেকে |
| `Breadcrumb.jsx` | Home › Projects › {title} টাইপ navigation breadcrumb (visual) — JSON-LD breadcrumb-এর সাথে কনসেপ্টে মেলানো, কিন্তু আলাদা যেহেতু একটা relative href লাগে আর একটা absolute url |

---

## 6. Homepage পরিবর্তন

আগে `Projects` আর `Experience` সেকশনে **হার্ডকোডেড ডেটা** ছিল (Posts সেকশন একদমই ছিল না)। এখন:

| কম্পোনেন্ট | আগে | এখন |
|---|---|---|
| `src/components/Projects/index.jsx` | ৪টা হার্ডকোডেড "service" (App Development, UI/UX...) | `getFeaturedProjects(4)` দিয়ে real project, প্রতিটা card `/projects/[slug]`-এ লিংক করে, "View All" → `/projects` |
| `src/components/Experience/index.jsx` | হার্ডকোডেড 3 experience array | `getExperiences({limit:5})`, timeline UI same রাখা হয়েছে কিন্তু field map করা: `role`→`position`, `period` string→`formatPeriod()`, `responsibilities[]`→`splitParagraphs(description)` |
| `src/components/Posts/index.jsx` (**নতুন**) | ছিল না | "Latest Posts" সেকশন, `getLatestPosts(3)`, homepage-এর visual style-এর সাথে মিলিয়ে বানানো |
| `src/components/HomePage.jsx` | `"use client"` ছিল | Server Component বানানো হয়েছে (কারণ ব্যাখ্যা নিচে #9-এ) |

**Resilience:** প্রতিটা সেকশন `try/catch` দিয়ে wrap করা — backend ডাউন থাকলে homepage crash করবে না, "coming soon" টাইপ মেসেজ দেখাবে।

---

## 7. নতুন রুট/পেজ

```
/projects          → list page (pagination সহ)
/projects/[slug]   → detail page
/posts             → list page
/posts/[slug]      → detail page
/experiences       → list page
/experiences/[slug] → detail page
/sitemap.xml       → app/sitemap.js (dynamic)
/robots.txt        → app/robots.js
```

প্রতিটা detail page-এ আছে:
- `generateStaticParams()` — বিল্ড টাইমে সব slug প্রি-রেন্ডার করে (fast load + SEO)
- `dynamicParams = true` — নতুন slug (যেটা বিল্ডের পরে অ্যাডমিন প্যানেল দিয়ে অ্যাড হয়েছে) সাথে সাথে 404 না দিয়ে on-demand SSR দিয়ে রেন্ডার করে
- `generateMetadata()` — dynamic title, description, canonical URL, Open Graph + Twitter card
- JSON-LD (content + breadcrumb)
- slug না পাওয়া গেলে `notFound()`

প্রতিটা list page-এ আছে `?page=N` pagination, এবং `generateMetadata()`-এ canonical URL pagination-aware।

---

## 8. Layout + Navigation (পরের রাউন্ডে যুক্ত হয়েছে)

প্রথমবার বানানোর পর দেখা গেল `/projects`, `/posts`, `/experiences` পেজগুলোতে **navbar ছিল না** — পেজের উপরে একটা ফাঁকা জায়গা দেখাচ্ছিল (স্ক্রিনশটে দেখানো সমস্যা)। ফিক্স:

| ফাইল | কাজ |
|---|---|
| `src/app/projects/layout.jsx` | `<Nabvar/>` + children |
| `src/app/posts/layout.jsx` | `<Nabvar/>` + children |
| `src/app/experiences/layout.jsx` | `<Nabvar/>` + children |

Nabvar fixed-positioned, তাই পেজগুলোতে আগে থেকেই `pt-32` (top padding) রাখা ছিল clearance-এর জন্য — যেটা homepage-এর `Hero.jsx`-এর সাথেও মিলে যায়।

সাথে প্রতিটা list + detail page-এ `Breadcrumb` কম্পোনেন্ট যুক্ত করা হয়েছে (heading-এর উপরে)।

**`Nabvar.jsx`-এ আরও পরিবর্তন:**
- নতুন "Posts" লিংক (`#posts`) যুক্ত করা হয়েছে desktop + mobile menu-তে
- Mobile menu-র সব লিংক আগে ভাঙা ছিল (`href="#"` — কোথাও যেত না) — এখন desktop-এর সাথে মিলিয়ে আসল anchor-এ ফিক্স করা হয়েছে

---

## 9. দুটো আসল Bug ফিক্স (এই কাজের সময় পাওয়া)

### Bug 1: `tsconfig.json`-এ path alias ছিল না
`jsconfig.json`-এ `@/*` → `src/*` alias ছিল, কিন্তু `tsconfig.json` (যেটা প্রজেক্টে থাকার কারণে Next.js এটাকেই priority দেয়) -তে এই alias ছিল না। এর ফলে `@/lib/...` ইমপোর্ট কখনো কখনো এলোমেলোভাবে "Module not found" error দিচ্ছিল।
**Fix:** `tsconfig.json`-এ `baseUrl: "src"` আর `paths: {"@/*": ["*"]}` যুক্ত করা হয়েছে (jsconfig.json-এর সাথে মিলিয়ে)।

### Bug 2: Server/Client Component boundary ভাঙা ছিল
`HomePage.jsx`-কে Server Component বানানোর পর, `Contactme/index.jsx` (যেটার নিজের কোনো `"use client"` ছিল না) `AppButton`-এ (`"use client"`) সরাসরি function/icon prop (`icon={MessageCircle}`, `callback={handleSubmit}`) পাস করছিল — এটা React Server Component-এর নিয়ম ভাঙে ("Functions cannot be passed directly to Client Components")। আগে এটা সমস্যা হয়নি কারণ পুরো `HomePage` আগে client-side ছিল।
**Fix:** `Contactme/index.jsx`-এ `"use client"` যুক্ত করা হয়েছে।

---

## 10. কেন `HomePage.jsx` Server Component বানানো হলো

Next.js App Router-এর নিয়ম: একটা Client Component ফাইল কখনো একটা async Server Component সরাসরি import করে render করতে পারে না। `Projects`, `Experience`, `Posts` সেকশনগুলো এখন API থেকে ডেটা আনে (async, তাই অবশ্যই Server Component), আর `HomePage.jsx` এগুলোকে সরাসরি JSX-এ render করে — তাই `HomePage.jsx`-কেও Server Component বানাতে হয়েছে (`"use client"` রিমুভ করে)। এর ভেতরের `Nabvar`, `Hero`, `AboutMe`, `Contactme` কম্পোনেন্টগুলোর নিজস্ব `"use client"` আছে, তাই Server parent থেকে render হতে কোনো সমস্যা নেই।

---

## 11. Resilience / Error Handling Design

- প্রতিটা data-fetching জায়গায় (homepage section, list page, sitemap) `try/catch` আছে — backend (Vercel free-tier deployment) ডাউন/স্লো হলেও পুরো সাইট crash করবে না
- `sitemap.js` API fail করলে static routes (`/`, `/projects`, `/posts`, `/experiences`) দিয়ে fallback করে, build/ISR কখনো ভাঙে না
- `dynamicParams = true` থাকায় বিল্ডের পরে অ্যাডমিন প্যানেল দিয়ে নতুন কনটেন্ট অ্যাড করলেও সেটা সাথে সাথে সাইটে দেখা যাবে (rebuild লাগবে না)

---

## 12. পরিচিত সীমাবদ্ধতা (Known caveat)

`next start` দিয়ে self-host করলে (Vercel-এ deploy না করে), না-পাওয়া slug-এর জন্য `notFound()` ঠিক UI দেখায় ও `<meta name="robots" content="noindex">` বসায়, কিন্তু HTTP status 200 দেখায় (404 না)। এটা Next.js-এর নিজস্ব ISR + self-hosted server-এর একটা পরিচিত সীমাবদ্ধতা। **Vercel-এ deploy করলে এটা automatically সঠিক 404 status দেখাবে** (backend ইতিমধ্যে Vercel-এ আছে, তাই client deploy করলেও এটা সমস্যা হবে না)।

---

## 13. ফাইলের সম্পূর্ণ লিস্ট (এই কাজে নতুন/পরিবর্তিত)

**নতুন ফাইল:**
```
.env.local, .env.example
src/lib/api/client.js, projects.js, posts.js, experiences.js
src/lib/seo/site.js, jsonld.js
src/lib/text.js, date.js
src/components/SEO/JsonLd.jsx
src/components/UI/Thumbnail.jsx, Pagination.jsx, Breadcrumb.jsx
src/components/Posts/index.jsx
src/app/projects/page.jsx, layout.jsx, [slug]/page.jsx
src/app/posts/page.jsx, layout.jsx, [slug]/page.jsx
src/app/experiences/page.jsx, layout.jsx, [slug]/page.jsx
src/app/sitemap.js, robots.js
docs/SEO-API-INTEGRATION.md (এই ফাইল)
```

**পরিবর্তিত ফাইল:**
```
.gitignore                          (!.env.example exception)
tsconfig.json                       (path alias bug fix)
src/app/layout.js                   (metadataBase, siteConfig ব্যবহার, OG tags)
src/components/HomePage.jsx         (Server Component + Posts সেকশন যুক্ত)
src/components/Nabvar.jsx           (Posts link, mobile menu fix)
src/components/Projects/index.jsx   (API-driven)
src/components/Experience/index.jsx (API-driven)
src/components/Contactme/index.jsx  ("use client" fix)
```

---

## 14. টেস্ট/ভেরিফাই কীভাবে করবেন

```bash
npm run build        # সব route/sitemap/metadata বিল্ড টাইমে validate হয়
npm run dev           # লোকালি দেখার জন্য — http://localhost:4000
```

ম্যানুয়ালি চেক করার লিস্ট:
- `/`, `/projects`, `/posts`, `/experiences` — সব লোড হচ্ছে, navbar+breadcrumb দেখা যাচ্ছে
- কোনো detail page-এ গিয়ে "View Page Source" করে `<title>`, meta description, এবং `<script type="application/ld+json">` চেক করা
- `/sitemap.xml` আর `/robots.txt` ব্রাউজারে খুলে দেখা
- ভুল slug দিয়ে detail URL দিলে 404 পেজ দেখা যাচ্ছে কিনা

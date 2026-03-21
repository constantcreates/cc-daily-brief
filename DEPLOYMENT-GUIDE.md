# Constant Creates Daily Brief — Deployment Guide

## Project Overview

A lightweight React + Vite dashboard that reads from a single `data.json` file to display your daily founder briefing. Styled to match the Constant Creates brand (dark forest greens, sage accents, Poppins typography).

---

## Tech Stack

| Layer | Tool | Why |
|-------|------|-----|
| Framework | React 18 + TypeScript | Component-based, easy to extend |
| Build Tool | Vite 5 | Fast builds, static export |
| Styling | Tailwind CSS 3 | Utility-first, matches brand tokens |
| Charts | Recharts | Lightweight React charting |
| Icons | Lucide React | Clean, modern icon set |
| Data Source | `public/data.json` | Edit one file to update the dashboard |

---

## Local Development

```bash
# Navigate to project
cd cc-daily-brief

# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Recommended Hosting: Vercel (Free Tier)

Vercel is the best option for this project because it offers free static hosting, automatic deploys from GitHub, custom domain support, and zero configuration needed.

### Step 1: Push to GitHub

```bash
cd cc-daily-brief
git init
git add -A
git commit -m "Initial commit: CC Daily Brief Dashboard"
gh repo create cc-daily-brief --public --push --source .
```

### Step 2: Deploy to Vercel

1. Go to https://vercel.com and sign in with GitHub
2. Click "New Project"
3. Import your `cc-daily-brief` repository
4. Vercel will auto-detect Vite — no configuration needed
5. Click "Deploy"

Your dashboard will be live at `cc-daily-brief.vercel.app` within ~60 seconds.

### Step 3: Connect Your Custom Domain

1. In Vercel Dashboard → your project → Settings → Domains
2. Add your domain (e.g., `brief.constantcreates.com`)
3. Vercel will show you DNS records to add:
   - Add a **CNAME** record: `brief` → `cname.vercel-dns.com`
4. SSL is automatic

---

## Alternative Hosting Options

### Netlify (Free Tier)
```bash
npm run build
npx netlify deploy --prod --dir=dist
```
- Custom domains supported
- Drag-and-drop deploy also available at https://app.netlify.com/drop

### GitHub Pages (Free)
```bash
npm run build
# Push dist/ folder to gh-pages branch
```

### Cloudflare Pages (Free)
- Connect GitHub repo
- Build command: `npm run build`
- Output directory: `dist`

---

## Updating the Dashboard Daily

Edit `public/data.json` with today's numbers. The file structure is:

```
public/data.json
├── lastUpdated          → ISO timestamp
├── overview             → Date, health summary, rating
├── revenue              → Monthly figures, pipeline, invoices
├── leadPipeline         → Leads, audits, outreach stats, top 3 leads
├── contentEngine        → Blog stats, calendar, top performer
├── authorityGrowth      → LinkedIn, YouTube, newsletter metrics
├── opportunities        → Array of business opportunities
├── recommendedActions   → Top 5 daily actions with categories
└── strategicSuggestions → Array of long-term growth ideas
```

After editing, either:
- **Git push** → Vercel auto-rebuilds in ~30 seconds
- **Or** upload the new `data.json` via the Vercel dashboard

---

## Adding New Sections

1. Create a new component in `src/components/NewSection.tsx`
2. Add the data type to the `DashboardData` interface in `src/App.tsx`
3. Import and place the component in the layout
4. Add corresponding data to `public/data.json`
5. Push to deploy

---

## Project Structure

```
cc-daily-brief/
├── public/
│   ├── data.json          ← YOUR DAILY DATA (edit this!)
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Overview.tsx
│   │   ├── Revenue.tsx
│   │   ├── LeadPipeline.tsx
│   │   ├── ContentEngine.tsx
│   │   ├── AuthorityGrowth.tsx
│   │   ├── Opportunities.tsx
│   │   ├── RecommendedActions.tsx
│   │   └── StrategicSuggestions.tsx
│   ├── App.tsx             ← Main dashboard layout
│   ├── main.tsx            ← Entry point
│   └── globals.css         ← Brand styles + animations
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.ts
├── postcss.config.cjs
└── tsconfig.json
```

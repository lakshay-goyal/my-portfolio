# Hey, I'm Lakshay 👋

This is the repo behind [lakshaygoyal.in](https://lakshaygoyal.in) — my little corner of the internet. It started as "just a portfolio site" and, like every side project I touch, ended up with its own Terraform-managed AWS infrastructure, a CI/CD pipeline, and automated DNS syncing. Could I have thrown it on Vercel in 5 minutes? Absolutely. Did I? No. We don't do things the easy way here — we do them the *fun* way.

## Stuff I've built (the highlights)

These are the projects featured on the site. Each one taught me something I couldn't have learned from a tutorial.

### 🤖 [Unlovable](https://unlovable.lakshaygoyal.in/) — AI-powered app builder

Type a prompt, get a working web or mobile application. Lovable, but mine — hence the name. Under the hood: LangChain + LangGraph agents with RAG, code execution inside E2B sandboxes, WebSockets for live streaming of the build, Redis + PostgreSQL holding it all together in a Turborepo monorepo. There's also a second architecture variant I built from scratch on Kubernetes + Docker + Nginx specifically to handle scalable AI workloads — because one architecture is never enough. Also has a React Native mobile builder variant. [Code →](https://github.com/lakshay-goyal/Unlovable)

### 📈 [Exness](https://exness.lakshaygoyal.in/) — CFD trading platform

Real-time crypto prices streamed from Binance, buy/sell order placement, candlestick charts — the whole trading experience. This one was a real-time systems masterclass: Redis pub-sub fanning out price ticks, TimescaleDB for time-series candles, WebSockets keeping every connected client in sync. Deployed on AWS with Terraform, load balancers, and auto-scaling groups, plus monitoring to watch users actually use it. Mobile version built with React Native/Expo. [Code →](https://github.com/lakshay-goyal/Exness)

There's a longer tail of smaller projects on the site too — clones, tools, experiments. The graveyard of side projects is where the learning happened.

## This site itself

The portfolio is a React SPA, but the deployment is where it gets opinionated.

**Frontend:** React 18 + Vite, Tailwind CSS, Framer Motion for the fancy bits, Zustand for state, React Router for client-side routing. All content (projects, experience, skills, books) lives in plain JSON under `src/store/data/` — no CMS, no database, just files. Boring on purpose.

**Infrastructure:** fully defined in Terraform under `terraform/`. The whole thing:

```text
push to main
    │
    ▼
GitHub Actions ──→ lint → build → terraform apply
    │
    ▼
S3 (private, no public access)
    │  served only via Origin Access Control
    ▼
CloudFront CDN ──→ ACM cert (TLS), 403/404 → index.html for SPA routing
    │
    ▼
Hostinger DNS ──→ apex ALIAS + www CNAME auto-synced to CloudFront via API
```

A few deliberate choices in there:

- **S3 is completely locked down** — public access blocked, bucket policy only trusts CloudFront's OAC. Nobody hits the bucket directly.
- **SPA routing on a CDN** — CloudFront rewrites 403/404 to `index.html` so React Router handles deep links instead of AWS throwing XML errors at visitors.
- **DNS as part of the pipeline** — the deploy workflow calls the Hostinger API to upsert the apex ALIAS and `www` CNAME pointing at CloudFront, and cleans up stale A records. The domain literally cannot drift out of sync with the infra.
- **Cache invalidation on every deploy** — CloudFront invalidation runs automatically, so a push to `main` is live worldwide in minutes with zero manual steps.

Is this overkill for a portfolio? Yes. Is the portfolio also a demo of how I build production systems? Also yes. That's the point.

## Running it locally

```bash
npm install
npm run dev      # vite dev server
npm run build    # production build → dist/
npm run lint     # eslint
```

If you want to deploy your own version, `terraform/` has everything — bring your own AWS account, domain, and a healthy disregard for doing things the simple way.

## Say hi

- 🌐 [lakshaygoyal.in](https://lakshaygoyal.in)
- 📧 [lakshaygoyal201@gmail.com](mailto:lakshaygoyal201@gmail.com)
- 💼 [LinkedIn](https://www.linkedin.com/in/lakshay-goyal-9778a6246)
- 🐦 [@lakshayg2004](https://twitter.com/lakshayg2004)
- 🧑‍💻 [github.com/lakshay-goyal](https://github.com/lakshay-goyal)

Always up for talking systems design, AI agents, or why your side project also needs Kubernetes (it doesn't, but let's talk anyway).

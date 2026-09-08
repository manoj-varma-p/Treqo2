export interface BlogAuthor {
  name: string;
  role: string;
  avatar: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  category: "Performance Marketing" | "AI & Automation" | "Career Strategy" | "Founders";
  coverImage: string;
  author: BlogAuthor;
  publishedAt: string;
  readTime: string;
  tags: string[];
  featured?: boolean;
}

export const BLOG_CATEGORIES = [
  "All",
  "Performance Marketing",
  "AI & Automation",
  "Career Strategy",
  "Founders",
] as const;

export const blogPosts: BlogPost[] = [
  {
    id: "blog-1",
    slug: "real-budgets-vs-simulations",
    title: "Why Running Real Ad Budgets Beats 100 Theoretical Case Studies",
    excerpt:
      "Fictional case studies give you false confidence about risks you never carried. Here is why managing live capital transforms how you think about CAC, ROAS, and creative fatigue.",
    category: "Performance Marketing",
    featured: true,
    publishedAt: "September 4, 2026",
    readTime: "5 min read",
    coverImage:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80",
    author: {
      name: "Manoj Varma",
      role: "Founder & Growth Architect, Treqo",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    },
    tags: ["Meta Ads", "Unit Economics", "CAC", "ROAS"],
    content: [
      "Most digital marketing courses teach you how to set up an ad campaign inside a sandbox simulator or review slides from a deck that won an award three years ago. You pick targeting options, write a fictional headline for a fake sneaker brand, and receive a green checkmark.",
      "The problem is that simulators never teach you the gut punch of watching $500 of real money burn through a Meta Ads ad set with a 0.4x ROAS on day two. They don’t teach you what happens when your tracking pixel drops 40% of conversion events after an iOS security update, or when creative fatigue spikes your CPM by 180% in 48 hours.",
      "When you deploy real budgets on real brands with real products, your entire relationship with decision-making changes. You stop debating subjective aesthetics and start interrogating unit economics: What is our allowable CAC? Where in the funnel are users dropping off? Is our post-click experience fulfilling the promise made in the hook?",
      "At Treqo, we threw out theoretical mock assignments because top agencies and high-growth venture studios don't hire graduates who can describe what an ad manager looks like. They hire builders who have already weathered live volatility and can defend their attribution models with concrete spreadsheets.",
    ],
  },
  {
    id: "blog-2",
    slug: "the-death-of-mcq-certifications",
    title: "The Death of MCQ Certifications: Why Founders Hire Proof of Work",
    excerpt:
      "Anyone can pass a multiple-choice exam by opening second tabs and memorizing question banks. Hiring managers know this. Here is the shift toward verified proof-of-work portfolios.",
    category: "Career Strategy",
    featured: false,
    publishedAt: "August 28, 2026",
    readTime: "4 min read",
    coverImage:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    author: {
      name: "Sneha Reddy",
      role: "Head of Admissions & Career Ops",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
    },
    tags: ["Hiring", "Portfolio", "Career", "Proof of Work"],
    content: [
      "If you spend 20 minutes on LinkedIn, you'll see dozens of people posting PDF certificates from 4-hour online courses declaring them 'Certified Master Growth Strategists.' Yet when asked in an interview how they would diagnose a dying conversion rate on a Shopify checkout, the conversation falls apart.",
      "Founders and CMOs are suffering from certification fatigue. A certificate that merely verifies you clicked 'Next Video' 40 times carries near-zero weight in 2026. What gets you hired is unassailable proof of work.",
      "What is proof of work? It is a public URL demonstrating a campaign you ideated, the creative hooks you designed, the copy variations you A/B tested, the live spend you directed, and the net CAC you delivered. Even when a campaign underperformed, an applicant who can dissect why it failed and what pivot they made will beat a candidate holding five multiple-choice badges every single time.",
    ],
  },
  {
    id: "blog-3",
    slug: "ai-in-modern-marketing-workflows",
    title: "How Growth Teams Actually Use Claude & AI in 2026 (Without Generic Copy)",
    excerpt:
      "Generic AI prompts produce generic marketing slop. Discover how high-performing teams use AI for customer persona clustering, creative iteration, and rapid funnel testing.",
    category: "AI & Automation",
    featured: false,
    publishedAt: "August 21, 2026",
    readTime: "6 min read",
    coverImage:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    author: {
      name: "Kiran Sharma",
      role: "AI & Growth Lead",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    },
    tags: ["Claude", "Prompting", "AI Workflows", "Copywriting"],
    content: [
      "The first wave of generative AI in marketing was defined by bad LinkedIn posts and hollow blog articles that sounded like a Wikipedia summary written by a robot. Growth teams that relied on surface-level prompting saw their conversion metrics crater.",
      "The second wave—the one that actually compounds ROI—is systemic. Instead of asking AI to 'write an ad for shoe brand,' modern growth operators feed customer interview transcripts into LLMs to extract exact vernacular and emotional triggers.",
      "In Phase 1 of our curriculum, we integrate AI into the daily operating cadence. Students learn how to build rapid angle matrices, synthesize competitor review complaints to find underserved value propositions, and generate 50 creative permutations for multivariate testing in minutes.",
    ],
  },
  {
    id: "blog-4",
    slug: "ga4-attribution-mastery",
    title: "GA4 Attribution That CFOs Respect: Tracking Unit Economics From Day 1",
    excerpt:
      "Blended ROAS hides unprofitable ad spend. Learn how to structure custom event pipelines, UTM hygiene, and server-side tracking so leadership trusts your numbers.",
    category: "Performance Marketing",
    featured: false,
    publishedAt: "August 14, 2026",
    readTime: "7 min read",
    coverImage:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    author: {
      name: "Manoj Varma",
      role: "Founder & Growth Architect, Treqo",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    },
    tags: ["Analytics", "GA4", "Attribution", "Data"],
    content: [
      "There is an old agency joke: If you add up the conversions reported by Meta, Google Ads, TikTok, and your email tool, your company did 4x more revenue than what actually hit the bank account.",
      "Attribution is where amateur marketers get exposed. When ad platforms claim credit for the same customer journey, founders get nervous and CFOs start cutting marketing budgets. You cannot scale a venture on conflicting data.",
      "Mastering first-party analytics, deterministic event tracking, and first-click vs last-non-direct attribution models separates a button-pusher from an indispensable growth executive. We dedicate an entire phase to setting up clean attribution before any ad dollar is spent.",
    ],
  },
  {
    id: "blog-5",
    slug: "building-with-real-stakes",
    title: "Building With Real Stakes: What Happened When Batch 1 Defended Their P&L Out Loud",
    excerpt:
      "No slides, no filler, no sliding pass. Inside the CEO Challenge where students stand in front of active venture founders and defend their campaign unit economics.",
    category: "Founders",
    featured: false,
    publishedAt: "August 07, 2026",
    readTime: "5 min read",
    coverImage:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
    author: {
      name: "Sneha Reddy",
      role: "Head of Admissions & Career Ops",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
    },
    tags: ["CEO Challenge", "Batch 1", "Defense", "Culture"],
    content: [
      "At the conclusion of Phase 4, every student in Batch 1 was required to defend their live campaign numbers in front of a panel composed of venture-backed founders and agency heads.",
      "The rules were simple: You couldn't talk about 'brand awareness' or 'reach' unless you could show how it converted into downstream lead velocity. If your unit economics didn't make mathematical sense, you were asked to rework the phase. No sliding passes. No polite applause.",
      "At first, it was intimidating. But by week six, the transformation was evident. Students stopped speaking like students and started talking like operators who understand capital allocation. That is the exact rigor top employers look for when interviewing candidates.",
    ],
  },
];

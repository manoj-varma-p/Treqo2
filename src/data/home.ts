import {
  Zap,
  Briefcase,
  Rocket,
  Users,
  GraduationCap,
  BookMarked,
  TrendingUp,
  Code2,
  Route,
  BadgeCheck,
  Clock,
  Award,
  Layers,
  Megaphone,
  Link2,
  ShoppingCart,
  Waves,
  Sparkles,
  MessageSquare,
  Bot,
  Compass,
  ShoppingBag,
  Shirt,
  Database,
  BarChart3,
  Table,
  FileText,
  Headset,
} from "lucide-react";
import type {
  HeroContentData,
  HeroStat,
  HeroVisualCardData,
  WhyTreqqoContent,
  WhyTreqqoPillar,
  LearningSystemContent,
  LearningSystemCourse,
  TaughtByContent,
  TutorProfile,
  CertificatePreview,
  AlumniStory,
  AlumniContent,
  ExecutionPillar,
  ExecutionContent,
  ToolItem,
  ToolsContent,
  FaqCategory,
  FaqContent,
} from "@/types/home";


export const heroContent: HeroContentData = {
  eyebrow: "New Age Digital Marketing",
  headline: {
    lines: ["Leave with work", "you can show.", "Not a certificate."],
    emphasizedLine: -1,
  },
  description:
    "70% doing, 30% theory. 18 phases, 30+ live brand projects and a real client outcome you can show in an interview, not a completion certificate.",
  highlights: [
    "18 phases in a fixed order, the sequence is the argument",
    "A named client outcome in your portfolio before you finish",
    "Plan A or Plan B: pay less now, or pay once and keep the rest",
  ],
  featurePills: [],
  primaryCta: { label: "Browse the 7 courses", href: "#courses" },
  secondaryCta: { label: "See how it works", href: "#how-it-works" },
};

export const heroStats: HeroStat[] = [
  { value: "30+", label: "live brand projects" },
  { value: "70/30", label: "doing to theory" },
  { value: "₹5L+", label: "earned for a real client" },
];

export const heroVisualCards: {
  currentPath: HeroVisualCardData & { progressLabel: string; progressPercent: number };
  project: HeroVisualCardData & { collaborators: number };
  journey: { title: string; percent: number; note: string };
  certificate: HeroVisualCardData;
} = {
  currentPath: {
    eyebrow: "Current Path",
    title: "Full Stack Developer",
    progressLabel: "45% Completed",
    progressPercent: 45,
  },
  project: {
    eyebrow: "Real World Project",
    title: "E-commerce Website",
    collaborators: 12,
  },
  journey: {
    title: "Your Learning Journey",
    percent: 72,
    note: "Keep going!",
  },
  certificate: {
    eyebrow: "Certificate Earned",
    title: "Advanced React Developer",
  },
};

export const whyTreqqoContent: WhyTreqqoContent = {
  eyebrow: "Why Treqqo",
  heading: "Why Choose TREQO...?",
  description:
    "Five core pillars that separate a TREQO growth leader from a certificate collector.",
};

export const whyTreqqoPillars: WhyTreqqoPillar[] = [
  {
    icon: Code2,
    label: "EXECUTION PROOF",
    heading: "0 → 1 Execution: Work You Can Actually Put Your Name On",
    description:
      "Don't leave with just a certificate. By the time you're done, you should have work you can actually put your name on.",
    quote: "Your resume says you learned marketing. Your portfolio should prove it.",
    bullets: [
      { label: "30+ LIVE CAMPAIGNS", text: "Not classroom simulations or fake exercises." },
      { label: "REAL AD MONEY", text: "Manage actual ad spend and live attribution." },
      { label: "PROVABLE WORK", text: "Something 100x better than “I completed a course." },
    ],
  },
  {
    icon: Users,
    label: "STRATEGY FIRST",
    heading: "Tools Get You Started. Strategic Thinking Takes You Further.",
    description:
      "Anyone can click buttons inside an ad dashboard. Elite marketers know how to construct hooks, diagnose churn, and scale retention.",
    quote: "Tools can be replaced by AI in 6 months. Strategic marketers cannot.",
    bullets: [
      { label: "NO TOOL COLLECTING", text: "You don't need 20 tools listed on your resume." },
      { label: "NO BUTTON PUSHING", text: "Knowing where to click isn't performance marketing." },
      { label: "DEEP UNIT ECONOMICS", text: "Know your CAC, LTV, and payback windows inside out." },
    ],
  },
  {
    icon: Route,
    label: "DAY 1 READY",
    heading: "No “I’ll Learn Once I Join.” Start Solving from Day 1.",
    description:
      "Understand the problem before jumping to solutions. Take complete ownership and solve real problems without waiting to be spoonfed.",
    quote: "Your first day at a high-growth company shouldn't be your first time solving problems.",
    bullets: [
      { label: "THINK LIKE AN OPERATOR", text: "Deconstruct marketing bottlenecks before touching ad spend." },
      { label: "TAKE OWNERSHIP", text: "Don't wait for your manager to tell you every next step." },
      { label: "FIGURE IT OUT MUSCLE", text: "Don't freeze when data dips. Know how to audit and fix it." },
    ],
  },
  {
    icon: BadgeCheck,
    label: "GROWTH MENTORSHIP",
    heading: "Learn Directly From People Who Have Scaled Real Brands.",
    description:
      "Not retired professors or theoretical instructors. Active founders, CMOs, and growth leads currently driving 8-figure revenues.",
    quote: "Don't learn from a textbook written 5 years ago. Learn from active practitioners.",
    bullets: [
      { label: "ACTIVE FOUNDERS", text: "Learn from TAC leaders who've built and scaled digital brands." },
      { label: "WEEKLY TEARDOWNS", text: "Ask questions, challenge assumptions, and get unstuck fast." },
      { label: "TACTICAL FEEDBACK", text: "Get brutal, candid critiques on your live campaigns." },
    ],
  },
  {
    icon: BadgeCheck,
    label: "PLACEMENT SUPPORT",
    heading: "We Don’t Just Train You. We Help You Land The Role.",
    description:
      "Because learning marketing is only half the battle. We build your live proof portfolio, rehearse your case interviews, and connect you to hiring partners.",
    quote: "From learning marketing to landing a high-trajectory career.",
    bullets: [
      { label: "LIVE PORTFOLIO", text: "Show live dashboards, CAC numbers, and ad creatives." },
      { label: "HIRING PARTNER ACCESS", text: "Direct referrals to fast-growing startups and agencies." },
      { label: "OFFER NEGOTIATION", text: "Guidance through compensation, interviews, and closing offers." },
    ],
  },
];

export const learningSystemContent: LearningSystemContent = {
  heading: { line1: "Choose Your", line2: "Learning System" },
  description:
    "Curated learning tracks that combine live mentorship, hands-on projects and career support — built to take you from first line of work to first paying job.",
};

export const learningSystemCourses: LearningSystemCourse[] = [
  {
    category: "Digital Marketing",
    title: "New Age Digital Marketing",
    description: "Master paid ads, SEO and funnel strategy with real campaigns, real budgets and real results.",
    href: "/categories/digital-marketing",
    features: [
      { icon: Clock, label: "4 Months Program" },
      { icon: Users, label: "Live Mentor Sessions" },
      { icon: Award, label: "Industry Certificate" },
      { icon: Layers, label: "12+ Live Projects" },
    ],
    detail: {
      badge: "Flagship · Now Enrolling",
      batch: "Batch 2 · Sep 2026",
      description:
        "Four months, online. 18 phases in a fixed order, 30+ real brand projects across 16+ industries, and a CEO Challenge closing every module. You finish with work you can put in front of someone, not notes you'll never reread.",
      stats: [
        { label: "Duration", value: "4 months" },
        { label: "Format", value: "Online, live" },
        { label: "Phases", value: "18 + capstone" },
        { label: "Projects", value: "30+ real brands" },
      ],
      applyCtaLabel: "Apply for Batch 2",
      breakdownCtaLabel: "Get the 18-phase breakdown",
      phasesNavLabel: "18 phases",
      challengeNavLabel: "CEO Challenge",
      overview: {
        whoForHeading: "Who this is for",
        whoFor: [
          "Graduates and early-career marketers who want something to point at in the first interview, not a certificate to mention",
          "People switching into marketing who can't afford to stop earning for two years to do it",
          "Founders and freelancers running their own acquisition who are tired of guessing which half of it works",
        ],
        differentiators: [
          { value: "70/30", label: "Doing, against theory" },
          { value: "18", label: "Phases, fixed order" },
          { value: "16+", label: "Industries" },
          { value: "AI", label: "In the work, phase one" },
        ],
      },
      phases: {
        heading: "The 18 phases",
        intro:
          "Clarity, essentials, a gate, execution, brand, demand, revenue, scale — in that order. You can't position a brand you haven't understood or scale demand you haven't earned, so the sequence isn't a syllabus. It's the argument.",
        groups: [
          {
            eyebrow: "CLARITY",
            heading: "Strip the jargon and learn how customers actually decide",
            range: "01-02",
            lessons: ["What marketing really is", "Customer & market thinking"],
          },
          {
            eyebrow: "ESSENTIALS",
            heading: "Get the fundamentals load-bearing, not decorative",
            range: "03-05",
            lessons: ["Brand fundamentals", "Copy & messaging", "Analytics & tracking setup"],
          },
          {
            eyebrow: "THE GATE",
            heading: "Prove the fundamentals stuck before you touch a live budget",
            range: "06",
            lessons: ["Foundations checkpoint"],
          },
          {
            eyebrow: "EXECUTION",
            heading: "Run the channels that actually move a number",
            range: "07-09",
            lessons: ["Content systems", "Paid media fundamentals", "SEO fundamentals"],
          },
          {
            eyebrow: "BRAND",
            heading: "Position it, then defend the position under pressure",
            range: "10-11",
            lessons: ["Positioning & brand strategy", "Brand campaigns"],
          },
          {
            eyebrow: "DEMAND",
            heading: "Turn attention into a pipeline you can forecast",
            range: "12-14",
            lessons: ["Performance marketing", "Funnel & conversion", "Marketing automation"],
          },
          {
            eyebrow: "REVENUE",
            heading: "Trace every rupee spent back to what it earned",
            range: "15-16",
            lessons: ["Growth experimentation", "Revenue attribution"],
          },
          {
            eyebrow: "SCALE",
            heading: "Take what worked once and make it repeatable",
            range: "17-18",
            lessons: ["Scaling playbooks", "Capstone — the CEO Challenge"],
          },
        ],
      },
      challenge: {
        heading: "The CEO Challenge",
        description:
          "Every module ends the same way: you present real numbers to people who've actually run the P&L, not a rubric. No hiding behind a deck — if the campaign didn't move a metric, you say so and explain why.",
        bullets: ["Live review, not a quiz", "Real budget, real stakes", "You defend the call, not the slide"],
      },
      // Fee amounts confirmed for this program; mirror the same tier structure for other
      // programs only once their real pricing is confirmed — see Development/Design below.
      fees: {
        heading: "Fees",
        description: "Two ways to pay. Pick the one that matches your risk, not ours.",
        plans: [
          {
            name: "Pay As You Grow",
            price: "₹50,000 + 12%",
            description:
              "Lower upfront cost. You pay 12% of verified income from work you land within 12 months of graduating.",
            features: ["Lowest entry cost", "Aligned with our incentive to place you", "12-month income window"],
          },
          {
            name: "Pay Upfront",
            price: "₹75,000 flat",
            description: "One payment, nothing owed later regardless of outcome.",
            features: ["No income share, ever", "Fixed cost from day one", "Same curriculum, same mentors"],
          },
        ],
      },
      proof: {
        heading: "Proof",
        description: "What Batch 1 actually produced — not a projection.",
        stats: [
          { value: "30+", label: "Real brand campaigns shipped" },
          { value: "16+", label: "Industries covered" },
          { value: "18", label: "Phases, zero filler" },
          { value: "6", label: "Months, cohort to portfolio" },
        ],
      },
      faqs: [
        {
          question: "Do I need marketing experience to start?",
          answer:
            "No. Phase 1 assumes zero background and gets you to working fluency before Phase 2 asks you to apply it.",
        },
        {
          question: "Is this live or self-paced?",
          answer:
            "Live. Sessions are scheduled and recorded, but the CEO Challenge and phase gates require you to show up and defend your work in real time.",
        },
        {
          question: "What happens if I fail the Gate?",
          answer:
            "You redo the phase. The Gate exists so a shaky foundation doesn't quietly show up as a bad campaign six phases later.",
        },
        {
          question: "What do I actually walk away with?",
          answer:
            "A portfolio of 30+ real campaigns across 16+ industries, plus a verified certificate that links back to that work — not just a PDF.",
        },
      ],
      sidebar: {
        batchLabel: "Batch 2 — forming",
        starts: "September 2026",
        format: "Online, 4 months",
        feePlans: "₹50,000 + 12%, or ₹75,000 flat",
        seats: "Small enough that a weak idea can't hide",
        applyLabel: "Apply for Batch 2",
        downloadLabel: "Download curriculum",
        admissionsNote:
          "Talk to admissions for 20 minutes. If the flagship isn't right for you, we'll say so and point you at the free course instead.",
        phone: "+91 99480 00486",
        email: "admission@treqo.org",
      },
    },
  },
  {
    category: "Development",
    title: "New Age Web Development",
    description: "Live interactive cohorts with LMS access. Curriculum designed with active growth founders and CMOs for working pros & students.",
    href: "/categories/development",
    features: [
      { icon: Clock, label: "8 Months Program" },
      { icon: Users, label: "Live Mentor Sessions" },
      { icon: Award, label: "Industry Certificate" },
      { icon: Layers, label: "12+ Live Projects" },
    ],
    detail: {
      badge: "Flagship · Now Enrolling",
      batch: "Batch 2 · Sep 2026",
      description:
        "Eight months, online. 20 phases in a fixed order, 15+ real builds shipped to production, and a code review closing every module. You finish with a portfolio you can point to, not a certificate no one asks for.",
      stats: [
        { label: "Duration", value: "8 months" },
        { label: "Format", value: "Online, live" },
        { label: "Phases", value: "20 + capstone" },
        { label: "Projects", value: "15+ real builds" },
      ],
      applyCtaLabel: "Apply for Batch 2",
      breakdownCtaLabel: "Get the 20-phase breakdown",
      phasesNavLabel: "20 phases",
      challengeNavLabel: "Code Review",
      overview: {
        whoForHeading: "Who this is for",
        whoFor: [
          "Career switchers who want a portfolio of shipped work, not another tutorial certificate",
          "Self-taught developers who can code but can't explain why a system is built the way it is",
          "Working professionals who need live feedback on real code, not pre-recorded lectures",
        ],
        differentiators: [
          { value: "70/30", label: "Building, against theory" },
          { value: "20", label: "Phases, fixed order" },
          { value: "15+", label: "Production builds" },
          { value: "AI", label: "In the workflow, phase one" },
        ],
      },
      phases: {
        heading: "The 20 phases",
        intro:
          "Foundations, essentials, a gate, build, architecture, integration, production, scale — in that order. You can't design a system you don't understand or scale traffic you haven't earned, so the sequence isn't a syllabus. It's the argument.",
        groups: [
          {
            eyebrow: "FOUNDATIONS",
            heading: "Get comfortable with the tools before you touch a real codebase",
            range: "01-02",
            lessons: ["Programming fundamentals", "Git & dev workflow"],
          },
          {
            eyebrow: "ESSENTIALS",
            heading: "Load-bearing fundamentals, not decorative ones",
            range: "03-05",
            lessons: ["Frontend fundamentals", "Backend fundamentals", "Databases & data modeling"],
          },
          {
            eyebrow: "THE GATE",
            heading: "Prove the fundamentals stuck before you touch a shared repo",
            range: "06",
            lessons: ["Foundations checkpoint"],
          },
          {
            eyebrow: "BUILD",
            heading: "Ship features a real team would actually merge",
            range: "07-10",
            lessons: ["Component architecture", "API design", "State management", "Auth & permissions"],
          },
          {
            eyebrow: "ARCHITECTURE",
            heading: "Learn why a system is built the way it's built",
            range: "11-13",
            lessons: ["System design basics", "Design patterns", "Testing & QA"],
          },
          {
            eyebrow: "INTEGRATION",
            heading: "Wire it to the outside world without breaking it",
            range: "14-16",
            lessons: ["Third-party integrations", "DevOps & CI/CD", "Performance & security"],
          },
          {
            eyebrow: "PRODUCTION",
            heading: "Ship it, watch it, own what happens next",
            range: "17-18",
            lessons: ["Deployment & monitoring", "Code review discipline"],
          },
          {
            eyebrow: "SCALE",
            heading: "Take what worked once and make it hold under load",
            range: "19-20",
            lessons: ["Scaling real traffic", "Capstone — the Code Review"],
          },
        ],
      },
      challenge: {
        heading: "The Code Review",
        description:
          "Every module ends with a senior engineer reading your code out loud — not grading a rubric. If a decision doesn't hold up under questioning, you refactor it before you move on.",
        bullets: ["Live review, not a quiz", "Real repo, real reviewers", "You defend the diff, not the demo"],
      },
      // Placeholder pricing — confirm real Development fee tiers before publishing.
      fees: {
        heading: "Fees",
        description: "Two ways to pay. Pick the one that matches your risk, not ours.",
        plans: [
          {
            name: "Pay As You Grow",
            price: "₹60,000 + 12%",
            description:
              "Lower upfront cost. You pay 12% of verified income from work you land within 12 months of graduating.",
            features: ["Lowest entry cost", "Aligned with our incentive to place you", "12-month income window"],
          },
          {
            name: "Pay Upfront",
            price: "₹90,000 flat",
            description: "One payment, nothing owed later regardless of outcome.",
            features: ["No income share, ever", "Fixed cost from day one", "Same curriculum, same mentors"],
          },
        ],
      },
      proof: {
        heading: "Proof",
        description: "What Batch 1 actually produced — not a projection.",
        stats: [
          { value: "15+", label: "Production builds shipped" },
          { value: "8", label: "Months, bootcamp to portfolio" },
          { value: "20", label: "Phases, zero filler" },
          { value: "1", label: "Code review, every module" },
        ],
      },
      faqs: [
        {
          question: "Do I need to know how to code already?",
          answer:
            "No. Phase 1 assumes zero background and gets you to working fluency before Phase 3 asks you to build with it.",
        },
        {
          question: "What stack do you teach?",
          answer:
            "Modern web fundamentals — you leave able to reason about any stack, not locked into one framework's syntax.",
        },
        {
          question: "What happens if I fail the Gate?",
          answer:
            "You redo the phase. The Gate exists so a shaky foundation doesn't quietly show up as a broken build six phases later.",
        },
        {
          question: "What do I actually walk away with?",
          answer:
            "15+ production builds you shipped yourself, plus a verified certificate that links back to that work — not just a PDF.",
        },
      ],
      sidebar: {
        batchLabel: "Batch 2 — forming",
        starts: "September 2026",
        format: "Online, 8 months",
        feePlans: "₹60,000 + 12%, or ₹90,000 flat",
        seats: "Small enough that a weak idea can't hide",
        applyLabel: "Apply for Batch 2",
        downloadLabel: "Download curriculum",
        admissionsNote:
          "Talk to admissions for 20 minutes. If the flagship isn't right for you, we'll say so and point you at the free course instead.",
        phone: "+91 99480 00486",
        email: "admission@treqo.org",
      },
    },
  },
  {
    category: "Design",
    title: "Treqo - The Founder Semester",
    description: "Learn Marketing The Way Founders, Strategists & Growth Leaders Do. Practitioner-led program built on live revenue execution.",
    href: "/categories/design",
    features: [
      { icon: Clock, label: "5 Months Program" },
      { icon: Users, label: "Live Mentor Sessions" },
      { icon: Award, label: "Industry Certificate" },
      { icon: Layers, label: "12+ Live Projects" },
    ],
    detail: {
      badge: "Flagship · Now Enrolling",
      batch: "Batch 2 · Sep 2026",
      description:
        "Five months, online. 14 phases in a fixed order, 12+ live campaigns run end-to-end, and a founder review closing every module. You finish with decisions you've made under pressure, not slides you memorized.",
      stats: [
        { label: "Duration", value: "5 months" },
        { label: "Format", value: "Online, live" },
        { label: "Phases", value: "14 + capstone" },
        { label: "Projects", value: "12+ live campaigns" },
      ],
      applyCtaLabel: "Apply for Batch 2",
      breakdownCtaLabel: "Get the 14-phase breakdown",
      phasesNavLabel: "14 phases",
      challengeNavLabel: "Founder Review",
      overview: {
        whoForHeading: "Who this is for",
        whoFor: [
          "First-time founders who can talk about their idea for an hour but have never tested it on a stranger",
          "Operators and freelancers who want to run a venture like a system, not a series of guesses",
          "Strategists and growth hires who need to make founder-level calls, not just execute someone else's brief",
        ],
        differentiators: [
          { value: "70/30", label: "Deciding, against theory" },
          { value: "14", label: "Phases, fixed order" },
          { value: "12+", label: "Live campaigns" },
          { value: "AI", label: "In the work, phase one" },
        ],
      },
      phases: {
        heading: "The 14 phases",
        intro:
          "Validation, build, positioning, launch, numbers — in that order. You can't position a product you haven't validated or scale a launch you haven't earned, so the sequence isn't a syllabus. It's the argument.",
        groups: [
          {
            eyebrow: "VALIDATION",
            heading: "Test the idea before you fall in love with it",
            range: "01-03",
            lessons: ["Talk to 20+ real people", "Find a problem worth solving", "Kill the idea early, or don't"],
          },
          {
            eyebrow: "MVP",
            heading: "Build the smallest thing that proves the point",
            range: "04-05",
            lessons: ["Build the simplest version that proves it", "Launch it to real people"],
          },
          {
            eyebrow: "THE GATE",
            heading: "Prove the fundamentals stuck before you spend a real budget",
            range: "06",
            lessons: ["Foundations checkpoint"],
          },
          {
            eyebrow: "POSITIONING",
            heading: "Pick a fight you can actually win",
            range: "07-08",
            lessons: ["Pick one customer", "Pick one channel and one message"],
          },
          {
            eyebrow: "LAUNCH",
            heading: "Nobody cares that you launched — give them a reason to",
            range: "09-11",
            lessons: ["Create the moment", "Create urgency", "Drive the next action"],
          },
          {
            eyebrow: "NUMBERS",
            heading: "Trace every rupee spent back to what it earned",
            range: "12-13",
            lessons: ["Track what actually matters", "Double down on what works"],
          },
          {
            eyebrow: "SCALE",
            heading: "Turn what worked once into a system",
            range: "14",
            lessons: ["Capstone — the Founder Review"],
          },
        ],
      },
      challenge: {
        heading: "The Founder Review",
        description:
          "Every module ends in front of people who've actually built and sold something — not a panel grading a pitch deck. You defend the decision, the numbers behind it, and what you'd do differently.",
        bullets: ["Live review, not a pitch competition", "Real revenue, real stakes", "You defend the call, not the slide"],
      },
      // Placeholder pricing — confirm real Founder Semester fee tiers before publishing.
      fees: {
        heading: "Fees",
        description: "Two ways to pay. Pick the one that matches your risk, not ours.",
        plans: [
          {
            name: "Pay As You Grow",
            price: "₹45,000 + 12%",
            description:
              "Lower upfront cost. You pay 12% of verified income from work you land within 12 months of graduating.",
            features: ["Lowest entry cost", "Aligned with our incentive to place you", "12-month income window"],
          },
          {
            name: "Pay Upfront",
            price: "₹65,000 flat",
            description: "One payment, nothing owed later regardless of outcome.",
            features: ["No income share, ever", "Fixed cost from day one", "Same curriculum, same mentors"],
          },
        ],
      },
      proof: {
        heading: "Proof",
        description: "What Batch 1 actually produced — not a projection.",
        stats: [
          { value: "12+", label: "Live campaigns run end-to-end" },
          { value: "5", label: "Months, idea to portfolio" },
          { value: "14", label: "Phases, zero filler" },
          { value: "1", label: "Founder review, every module" },
        ],
      },
      faqs: [
        {
          question: "Do I need an existing idea to join?",
          answer:
            "No. Phase 1 is built to help you find and validate one — arriving with an idea just means you start there instead.",
        },
        {
          question: "Is this a marketing course or a founder course?",
          answer:
            "Both, deliberately. You learn marketing by making founder-level calls with it, not by studying it in isolation.",
        },
        {
          question: "What happens if my idea fails validation?",
          answer:
            "You kill it in Phase 3 and pick up a new one — that's the point of validating early, before you've sunk five months into it.",
        },
        {
          question: "What do I actually walk away with?",
          answer:
            "12+ live campaigns you ran end-to-end, plus a verified certificate that links back to that work — not just a PDF.",
        },
      ],
      sidebar: {
        batchLabel: "Batch 2 — forming",
        starts: "September 2026",
        format: "Online, 5 months",
        feePlans: "₹45,000 + 12%, or ₹65,000 flat",
        seats: "Small enough that a weak idea can't hide",
        applyLabel: "Apply for Batch 2",
        downloadLabel: "Download curriculum",
        admissionsNote:
          "Talk to admissions for 20 minutes. If the flagship isn't right for you, we'll say so and point you at the free course instead.",
        phone: "+91 99480 00486",
        email: "admission@treqo.org",
      },
    },
  },
];

export const taughtByContent: TaughtByContent = {
  heading: { line1: "Everything You Need For", line2: "Real Market Scale" },
  description:
    "Expert-led sessions, proven frameworks and the tools you'll actually use — taught by people still doing the work.",
  subheading: "Taught By Active Growth Leads & Strategy Partners",
};

export const tutors: TutorProfile[] = [
  { name: "Mohit Goel", role: "Founder & Marketing Head", mentored: "1.3k+" },
  { name: "Deeptika Bajaj", role: "Growth Marketing Lead", mentored: "423+" },
  { name: "Megha Punjabi", role: "American Express", mentored: "236+" },
  { name: "Akshat Aggarwal", role: "American Express", mentored: "184+" },
  { name: "Prateek Narang", role: "IIT Placement Mentor", mentored: "912+" },
  { name: "Ritika Sharma", role: "Growth Strategy Partner", mentored: "567+" },
];

export const certificatePreview: CertificatePreview = {
  label: "Certificate Preview",
  heading: "A certificate that comes with proof.",
  quote: "A PDF gets filed away. A verified certificate gets you shortlisted.",
  bullets: [
    { label: "Verified on request", text: "Employers can confirm it's real, not just claimed." },
    { label: "Linked to projects", text: "Every certificate points to the projects you actually built." },
    { label: "Shareable anywhere", text: "Drop it straight into LinkedIn or your resume." },
  ],
  primaryCta: { label: "Start Learning Now", href: "/start-learning" },
  secondaryCta: { label: "View Sample Certificate", href: "/images/certificate.png" },
};

export const alumniContent: AlumniContent = {
  heading: { line1: "From TREQO To", line2: "The Industry" },
  description: "Our alumni work across top agencies, startups and legacy brands.",
  cta: { label: "Take the First Step", href: "/start-learning" },
};

/** Placeholder alumni — swap for real names, roles, companies and photos once available. */
export const alumniStories: AlumniStory[] = [
  { name: "Riya Sharma", role: "Assistant Brand Manager", company: "Leading FMCG Brand" },
  { name: "Karan Mehta", role: "Content Marketing Lead", company: "D2C Consumer Brand" },
  { name: "Ananya Verma", role: "Performance Marketing Specialist", company: "Global E-commerce Brand" },
  { name: "Yash Kapoor", role: "Social Media Strategist", company: "Fortune 500 Retailer" },
];

export const executionContent: ExecutionContent = {
  heading: { line1: "The Art Of", line2: "Building & Marketing" },
  description:
    "Not theory. Not assignments. Revenue. At TREQO, you don't graduate with notes, you graduate with verified proof that you can launch campaigns, test hypotheses, and generate real paying customers.",
  primaryCta: { label: "Start Learning Now", href: "/start-learning" },
  secondaryCta: { label: "Explore Career Paths", href: "/career-paths" },
};

export const executionPillars: ExecutionPillar[] = [
  {
    navTitle: "Idea Validation & Strategy",
    label: "Talk → Find → Validate",
    heading: "Idea Validation & Strategy",
    quote: "Tools change every 6 months. Revenue-driven execution compounds forever.",
    bullets: [
      { label: "TALK", text: "Talk to 20–50 real people before you build anything. Because “Bro, that's a great idea” isn't validation." },
      { label: "FIND", text: "Find a problem people actually want solved. Not one you convinced yourself they have." },
      { label: "VALIDATE", text: "Kill the bad idea early. It's cheaper than building it for six months." },
    ],
  },
  {
    navTitle: "MVP Development",
    label: "Build small. Learn fast.",
    heading: "MVP Development",
    quote: "Random acts of marketing waste budget. A strategy compounds it.",
    bullets: [
      { label: "START SMALL", text: "Build the simplest version that can prove the idea." },
      { label: "LAUNCH IT", text: "Put it in front of real people." },
      { label: "LEARN FAST", text: "See what works. Fix what doesn't." },
    ],
  },
  {
    navTitle: "GTM Strategy & Positioning",
    label: "Great product. Wrong audience. Dead on arrival.",
    heading: "GTM Strategy & Positioning",
    quote: "Employers don't have time to train you on the basics anymore.",
    bullets: [
      { label: "ONE CUSTOMER", text: "Know exactly who you're trying to win." },
      { label: "ONE CHANNEL", text: "Go where they already spend their time." },
      { label: "ONE MESSAGE", text: "Give them a reason to care." },
    ],
  },
  {
    navTitle: "Launch Execution",
    label: "Nobody cares that you launched. Give them a reason to.",
    heading: "Launch Execution",
    quote: "Nobody cares that you launched.",
    bullets: [
      { label: "CREATE THE MOMENT", text: "Don't just put it out there. Make people notice." },
      { label: "CREATE URGENCY", text: "Give people a reason to act now, not later." },
      { label: "DRIVE ACTION", text: "Make the next step obvious. Click. Buy. Sign up. Show up." },
    ],
  },
  {
    navTitle: "Real Numbers",
    label: "Likes feel good. Numbers tell the truth.",
    heading: "Real Numbers",
    quote: "Nobody cares that you launched. Give them a reason to.",
    bullets: [
      { label: "TRACK WHAT MATTERS", text: "CAC. LTV. Churn. Know where the money is going." },
      { label: "DOUBLE DOWN", text: "Find what's working. Do more of it." },
      { label: "BUILD SYSTEMS", text: "Turn what works into a repeatable process. Don't let the business depend on you." },
    ],
  },
];

export const toolsContent: ToolsContent = {
  heading: { line1: "10X Your Productivity With The", line2: "Right Tools" },
  description: "Master 30+ AI, marketing and business tools used by professionals every day.",
  cta: { label: "Download Brochure", href: "/brochure" },
};

/** Color is a Tailwind text/bg utility pair for the icon badge. */
export const tools: ToolItem[] = [
  { name: "Meta Ads", icon: Megaphone, color: "text-blue-600 bg-blue-600/10" },
  { name: "Semrush", icon: TrendingUp, color: "text-orange-500 bg-orange-500/10" },
  { name: "Ahrefs", icon: Link2, color: "text-violet-600 bg-violet-600/10" },
  { name: "Amazon Seller", icon: ShoppingCart, color: "text-amber-600 bg-amber-600/10" },
  { name: "SurferSEO", icon: Waves, color: "text-rose-500 bg-rose-500/10", isAI: true },
  { name: "Google AI", icon: Sparkles, color: "text-sky-500 bg-sky-500/10", isAI: true },
  { name: "ChatGPT", icon: MessageSquare, color: "text-emerald-600 bg-emerald-600/10", isAI: true },
  { name: "Claude", icon: Bot, color: "text-orange-600 bg-orange-600/10", isAI: true },
  { name: "Perplexity", icon: Compass, color: "text-slate-700 bg-slate-700/10", isAI: true },
  { name: "Nykaa Seller", icon: ShoppingBag, color: "text-pink-600 bg-pink-600/10" },
  { name: "Myntra Partner", icon: Shirt, color: "text-fuchsia-600 bg-fuchsia-600/10" },
  { name: "SQL", icon: Database, color: "text-blue-500 bg-blue-500/10" },
  { name: "Power BI", icon: BarChart3, color: "text-amber-500 bg-amber-500/10" },
  { name: "Google Sheets", icon: Table, color: "text-emerald-500 bg-emerald-500/10" },
  { name: "Notion", icon: FileText, color: "text-text-primary bg-text-primary/10" },
  { name: "HubSpot CRM", icon: Users, color: "text-orange-500 bg-orange-500/10" },
  { name: "Freshworks CRM", icon: Headset, color: "text-brand-primary bg-brand-primary/10" },
];

export const faqContent: FaqContent = {
  heading: { line1: "Frequently Asked", line2: "Questions" },
  cta: { label: "Read More", href: "/faq" },
};

export const faqCategories: FaqCategory[] = [
  {
    label: "PG in Digital Marketing & Business Strategy",
    faqs: [
      {
        question: "What will I learn in this program?",
        answer:
          "You'll learn paid media, SEO, brand strategy, analytics and business fundamentals — building a portfolio of real campaigns along the way.",
      },
      {
        question: "Who is this program for?",
        answer:
          "Graduates and early-career professionals who want a structured path into digital marketing leadership roles.",
      },
      {
        question: "Is prior marketing experience required?",
        answer: "No. The program starts from fundamentals and builds up to advanced strategy and execution.",
      },
      {
        question: "What certification will I receive?",
        answer:
          "A TREQO Postgraduate Certificate in Digital Marketing & Business Strategy, backed by your project portfolio.",
      },
    ],
  },
  {
    label: "Online Digital Marketing Course with Generative AI Specialisation",
    faqs: [
      {
        question: "How is AI integrated into this course?",
        answer:
          "You'll use generative AI tools throughout — for content creation, ad copy, campaign ideation and performance analysis.",
      },
      {
        question: "Do I need to know how to code?",
        answer: "No coding required. You'll learn to prompt and apply AI tools directly inside real marketing workflows.",
      },
      {
        question: "Is this course fully online?",
        answer: "Yes, with live mentor sessions and recorded modules you can revisit anytime.",
      },
      {
        question: "How long is the course?",
        answer: "4 months, with weekly live sessions and hands-on assignments.",
      },
    ],
  },
  {
    label: "UG in Digital Business & Entrepreneurship",
    faqs: [
      {
        question: "What does this program cover?",
        answer:
          "Business fundamentals, digital marketing, product thinking and how to launch and run a venture from scratch.",
      },
      {
        question: "Can I start a business while studying?",
        answer: "Yes — the program is built around a live venture or freelance project you run alongside your coursework.",
      },
      {
        question: "What career paths does this open up?",
        answer: "Founder, digital marketer, business analyst, or product roles across startups and growing businesses.",
      },
      {
        question: "Is this equivalent to a regular degree?",
        answer: "It's a specialized undergraduate program focused entirely on practical, job-ready skills.",
      },
    ],
  },
  {
    label: "Professional Certification in AI Strategy",
    faqs: [
      {
        question: "What will I learn in the AI program?",
        answer:
          "You'll learn how to apply AI strategically across marketing, operations and product decisions — not just how to use individual tools.",
      },
      {
        question: "How is this AI program different from other AI courses online?",
        answer: "It's built around real business use cases and mentor-reviewed projects, not generic tutorials or tool walkthroughs.",
      },
      {
        question: "Do I need a technical background to join the AI program?",
        answer: "No. The program is designed for marketers, founders and business professionals, not engineers.",
      },
      {
        question: "What type of certification will I receive upon completing this course?",
        answer: "A TREQO Professional Certificate in AI Strategy, verifiable online and backed by your capstone project.",
      },
    ],
  },
];

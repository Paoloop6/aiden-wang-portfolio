import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  ArrowLeft,
  Award,
  Brain,
  Calendar,
  Camera,
  CheckCircle2,
  ExternalLink,
  Leaf,
  Monitor,
  Rocket,
  School,
  Sparkles,
  Target,
  TrendingUp,
  Trophy,
  Users,
  Zap,
  Globe,
  Code2,
  GitBranch,
  BookOpen,
} from "lucide-react";
import { motion } from "framer-motion";
import { SiGithub } from "react-icons/si";
import { Link } from "wouter";

import heroPng from "/images/plantai-hero.jpg";
import dashboardPng from "/images/plantai-dashboard.jpg";
import mobilePng from "/images/plantai-mobile.jpg";
import teamPng from "/images/plantai-team.jpg";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5 },
};

const VERSION_HISTORY = [
  {
    version: "3.0",
    date: "Current",
    title: "PlantCare AI Platform",
    description:
      "Complete rebuild as an AI-powered educational platform. Integrated GPT-4o Vision for plant identification, added care schedules and educational activity generation for teachers and students.",
    highlights: [
      "GPT-4o Vision AI integration",
      "Educational activity generator",
      "Care schedule management",
      "Teacher & student dashboards",
    ],
    status: "live",
  },
  {
    version: "2.0",
    date: "2025",
    title: "Disease Detection Webapp",
    description:
      "Expanded to a full web application with user accounts, image upload, and AI-powered disease analysis. Reached 500+ active users across multiple schools.",
    highlights: [
      "Image upload & analysis",
      "Disease identification engine",
      "User accounts & history",
      "500+ active users",
    ],
    status: "completed",
  },
  {
    version: "1.0",
    date: "2024",
    title: "Initial Prototype",
    description:
      "First version built as a cross-school collaboration project with The Village School. Basic plant disease detection using machine learning models.",
    highlights: [
      "ML-based disease detection",
      "Cross-school collaboration",
      "Proof of concept",
      "Basic web interface",
    ],
    status: "completed",
  },
];

const FEATURES = [
  {
    icon: Camera,
    title: "AI Plant Identification",
    description:
      "Upload a photo and get instant plant identification powered by GPT-4o Vision with detailed species information.",
  },
  {
    icon: Leaf,
    title: "Disease Detection",
    description:
      "Detect plant diseases from leaf images with confidence scores and treatment recommendations.",
  },
  {
    icon: Calendar,
    title: "Care Schedules",
    description:
      "Create and manage watering, fertilizing, and care schedules for identified plants.",
  },
  {
    icon: BookOpen,
    title: "Educational Activities",
    description:
      "Auto-generate classroom activities, quizzes, and lesson plans based on identified plants.",
  },
  {
    icon: Users,
    title: "Multi-School Collaboration",
    description:
      "Built collaboratively across schools, enabling teachers and students to share plant data.",
  },
  {
    icon: Brain,
    title: "GPT-4o Vision",
    description:
      "Leverages OpenAI's most advanced vision model for accurate, real-time plant analysis.",
  },
];

const TECH_STACK = [
  { name: "React", category: "Frontend" },
  { name: "TypeScript", category: "Frontend" },
  { name: "Tailwind CSS", category: "Frontend" },
  { name: "Node.js", category: "Backend" },
  { name: "Express", category: "Backend" },
  { name: "PostgreSQL", category: "Database" },
  { name: "OpenAI GPT-4o", category: "AI" },
  { name: "Drizzle ORM", category: "Backend" },
];

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 h-16">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/" data-testid="link-back-home">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Portfolio
            </Link>
          </Button>
          <div className="flex items-center gap-2">
            <Button
              variant="default"
              size="sm"
              onClick={() => document.getElementById("live-preview")?.scrollIntoView({ behavior: "smooth" })}
              data-testid="button-nav-preview"
            >
              <Monitor className="w-4 h-4 mr-1" />
              Live Preview
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a
                href="https://plantai-health.com"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-plantai-live"
              >
                <Globe className="w-4 h-4 mr-1" />
                Visit Live Site
              </a>
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroPng}
          alt="PlantAI Health abstract illustration"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-background" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 text-center">
        <motion.div {...fadeUp}>
          <div className="inline-flex items-center gap-2 mb-6">
            <Badge variant="secondary" className="px-3 py-1 text-xs bg-green-500/20 text-green-300 border-green-500/30">
              <Sparkles className="w-3 h-3 mr-1" />
              500+ Users
            </Badge>
            <Badge variant="secondary" className="px-3 py-1 text-xs bg-blue-500/20 text-blue-300 border-blue-500/30">
              <School className="w-3 h-3 mr-1" />
              Cross-School Project
            </Badge>
          </div>
        </motion.div>

        <motion.h1
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4"
          data-testid="text-plantai-title"
        >
          PlantAI Health
        </motion.h1>

        <motion.p
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg sm:text-xl text-white/80 mb-4 max-w-2xl mx-auto"
          data-testid="text-plantai-subtitle"
        >
          AI-powered plant identification and disease detection platform for educators and students
        </motion.p>

        <motion.p
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-sm text-white/60 mb-8"
        >
          plantai-health.com &bull; Powered by GPT-4o Vision
        </motion.p>

        <motion.div
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-3"
        >
          <Button asChild>
            <a
              href="https://plantai-health.com"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="button-visit-plantai"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Visit PlantAI Health
            </a>
          </Button>
          <Button variant="outline" className="bg-white/10 border-white/20 text-white" asChild>
            <a
              href="https://github.com/Paoloop6"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SiGithub className="w-4 h-4 mr-2" />
              GitHub
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

function OverviewSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <motion.div {...fadeUp}>
            <Badge variant="secondary" className="mb-4">
              <Leaf className="w-3 h-3 mr-1" />
              About the Project
            </Badge>
            <h2
              className="text-3xl sm:text-4xl font-bold tracking-tight mb-4"
              data-testid="text-plantai-overview-title"
            >
              From classroom project to real-world impact
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              PlantAI Health started as a cross-school collaboration between students at
              The Village School. What began as a simple plant disease detection prototype
              has evolved into a full-featured AI-powered educational platform serving 500+ users.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              The platform uses OpenAI's GPT-4o Vision model to identify plants from photos,
              detect diseases, and generate educational content for classroom use. Teachers
              use it to create activities, and students learn about botany through hands-on
              AI interaction.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">500+</p>
                <p className="text-xs text-muted-foreground">Active Users</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">3</p>
                <p className="text-xs text-muted-foreground">Major Versions</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">GPT-4o</p>
                <p className="text-xs text-muted-foreground">AI Engine</p>
              </div>
            </div>
          </motion.div>

          <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.15 }}>
            <div className="rounded-md overflow-hidden border border-border">
              <img
                src={dashboardPng}
                alt="PlantAI Health dashboard interface"
                className="w-full h-auto"
                data-testid="img-plantai-dashboard"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/50">
      <div className="max-w-6xl mx-auto">
        <motion.div {...fadeUp} className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-md bg-primary/10 text-primary mb-4">
            <Zap className="w-6 h-6" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            Key Features
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Everything educators and students need for plant-based learning
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              {...fadeUp}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Card className="p-6 h-full hover-elevate">
                <div className="w-10 h-10 rounded-md bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <feature.icon className="w-5 h-5" />
                </div>
                <h3
                  className="text-lg font-semibold mb-2"
                  data-testid={`text-feature-title-${i}`}
                >
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LivePreviewSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [iframeFailed, setIframeFailed] = useState(false);
  const loadedRef = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!loadedRef.current) {
        setIframeFailed(true);
      }
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="live-preview" className="py-20 px-4 sm:px-6 lg:px-8 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <motion.div {...fadeUp} className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-md bg-primary/10 text-primary mb-4">
            <Monitor className="w-6 h-6" />
          </div>
          <h2
            className="text-3xl sm:text-4xl font-bold tracking-tight mb-3"
            data-testid="text-live-preview-title"
          >
            Live Preview
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Explore the platform right here — click around, upload a plant photo, and see AI in action
          </p>
        </motion.div>

        <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.1 }}>
          <Card className="overflow-hidden border-2 border-border">
            <div className="flex items-center gap-2 px-4 py-3 bg-muted/50 border-b border-border">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 mx-2">
                <div className="flex items-center gap-2 bg-background rounded-md px-3 py-1.5 text-xs text-muted-foreground max-w-md mx-auto">
                  <Globe className="w-3 h-3 shrink-0" />
                  <span className="truncate">plantai-health.com</span>
                </div>
              </div>
              <Button size="sm" variant="ghost" className="text-xs h-7" asChild>
                <a
                  href="https://plantai-health.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="link-preview-open"
                >
                  <ExternalLink className="w-3 h-3 mr-1" />
                  Open
                </a>
              </Button>
            </div>

            {iframeFailed && !isLoaded ? (
              <div className="relative" style={{ minHeight: "500px" }}>
                <img
                  src={dashboardPng}
                  alt="PlantAI Health dashboard preview"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
                  <p className="text-muted-foreground mb-4">
                    The live preview couldn't load in this browser. Visit the site directly to explore!
                  </p>
                  <Button asChild>
                    <a
                      href="https://plantai-health.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid="button-preview-fallback"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Open PlantAI Health
                    </a>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="relative bg-white" style={{ height: "600px" }}>
                {!isLoaded && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-muted/30 z-10">
                    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    <p className="text-sm text-muted-foreground">Loading PlantAI Health...</p>
                  </div>
                )}
                <iframe
                  src="https://plantai-health.com"
                  title="PlantAI Health Live Preview"
                  className="w-full h-full border-0"
                  onLoad={() => { loadedRef.current = true; setIsLoaded(true); }}
                  onError={() => setIframeFailed(true)}
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                  data-testid="iframe-plantai-preview"
                />
              </div>
            )}
          </Card>
          <p className="text-xs text-muted-foreground text-center mt-3">
            {isLoaded
              ? "Interactive preview of plantai-health.com — scroll and click to explore the full platform"
              : iframeFailed
                ? "Preview showing a screenshot — click the button above to visit the live site"
                : "Loading the live site..."}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

const ACCOMPLISHMENTS = [
  {
    icon: Users,
    stat: "500+",
    label: "Active Users",
    description: "Teachers and students across multiple schools actively using the platform for classroom learning",
  },
  {
    icon: TrendingUp,
    stat: "3 Versions",
    label: "Continuous Evolution",
    description: "Iterated from a basic ML prototype to a full GPT-4o Vision platform over 3 major releases",
  },
  {
    icon: School,
    stat: "Cross-School",
    label: "Collaboration",
    description: "Built as a collaborative project spanning students from The Village School and beyond",
  },
  {
    icon: Brain,
    stat: "GPT-4o Vision",
    label: "Cutting-Edge AI",
    description: "One of the first student-built apps to integrate OpenAI's most advanced vision model for real-world use",
  },
  {
    icon: Target,
    stat: "Real Impact",
    label: "Solving Real Problems",
    description: "Helps educators create science activities and students identify plants and diseases in the field",
  },
  {
    icon: Trophy,
    stat: "Production App",
    label: "Live & Deployed",
    description: "Not just a school project — a fully deployed, production-grade web application with real users",
  },
];

function AccomplishmentsSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/50">
      <div className="max-w-6xl mx-auto">
        <motion.div {...fadeUp} className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-md bg-primary/10 text-primary mb-4">
            <Award className="w-6 h-6" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            What We've Accomplished
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            From a classroom idea to a platform that's changing how students learn about plants
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ACCOMPLISHMENTS.map((item, i) => (
            <motion.div
              key={item.label}
              {...fadeUp}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Card className="p-6 h-full hover-elevate">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-md bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p
                      className="text-xl font-bold text-primary leading-tight"
                      data-testid={`text-accomplishment-stat-${i}`}
                    >
                      {item.stat}
                    </p>
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                  </div>
                </div>
                <p
                  className="text-sm text-muted-foreground leading-relaxed"
                  data-testid={`text-accomplishment-desc-${i}`}
                >
                  {item.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ScreenshotsSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div {...fadeUp} className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-md bg-primary/10 text-primary mb-4">
            <Camera className="w-6 h-6" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            The Platform
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Designed for ease of use in classroom environments
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div {...fadeUp}>
            <div className="rounded-md overflow-hidden border border-border">
              <img
                src={mobilePng}
                alt="PlantAI mobile interface"
                className="w-full h-auto"
                data-testid="img-plantai-mobile"
              />
            </div>
            <p className="text-sm text-muted-foreground mt-3 text-center">
              Mobile-friendly AI plant scanning interface
            </p>
          </motion.div>
          <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.1 }}>
            <div className="rounded-md overflow-hidden border border-border">
              <img
                src={teamPng}
                alt="Student team collaboration"
                className="w-full h-auto"
                data-testid="img-plantai-team"
              />
            </div>
            <p className="text-sm text-muted-foreground mt-3 text-center">
              Cross-school collaboration with The Village School
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function VersionHistorySection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/50">
      <div className="max-w-4xl mx-auto">
        <motion.div {...fadeUp} className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-md bg-primary/10 text-primary mb-4">
            <GitBranch className="w-6 h-6" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            Version History
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            How PlantAI Health evolved from prototype to production
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-px bg-border" />

          <div className="space-y-8">
            {VERSION_HISTORY.map((version, i) => (
              <motion.div
                key={version.version}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative pl-12 sm:pl-20"
              >
                <div className="absolute left-2 sm:left-6 top-1 w-4 h-4 rounded-full bg-background border-2 border-primary z-10" />

                <Card className="p-6">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <Badge
                      variant={version.status === "live" ? "default" : "secondary"}
                      data-testid={`badge-version-${version.version}`}
                    >
                      v{version.version}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {version.date}
                    </span>
                    {version.status === "live" && (
                      <Badge variant="outline" className="text-xs text-green-600 dark:text-green-400 border-green-500/30">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Live
                      </Badge>
                    )}
                  </div>
                  <h3
                    className="text-lg font-semibold mb-2"
                    data-testid={`text-version-title-${i}`}
                  >
                    {version.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {version.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {version.highlights.map((h) => (
                      <Badge key={h} variant="secondary" className="text-xs">
                        {h}
                      </Badge>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TechStackSection() {
  const categories = Array.from(new Set(TECH_STACK.map((t) => t.category)));

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div {...fadeUp} className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-md bg-primary/10 text-primary mb-4">
            <Code2 className="w-6 h-6" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            Tech Stack
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Built with modern, production-ready technologies
          </p>
        </motion.div>

        <motion.div {...fadeUp}>
          <Card className="p-6 sm:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {categories.map((cat) => (
                <div key={cat}>
                  <p className="text-sm font-semibold text-muted-foreground mb-3">
                    {cat}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {TECH_STACK.filter((t) => t.category === cat).map((t) => (
                      <Badge key={t.name} variant="secondary">
                        {t.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/50">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div {...fadeUp}>
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-md bg-primary/10 text-primary mb-4">
            <Rocket className="w-6 h-6" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            Try It Yourself
          </h2>
          <p className="text-muted-foreground mb-8">
            Visit plantai-health.com to explore AI-powered plant identification and create educational activities for your classroom.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button size="lg" asChild>
              <a
                href="https://plantai-health.com"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="button-cta-visit"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Visit PlantAI Health
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/" data-testid="button-cta-back">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Portfolio
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Aiden Wang &bull; PlantAI Health
        </p>
        <div className="flex items-center gap-3">
          <Button size="sm" variant="ghost" asChild>
            <a
              href="https://plantai-health.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Globe className="w-4 h-4 mr-1" />
              plantai-health.com
            </a>
          </Button>
          <Button size="sm" variant="ghost" asChild>
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Portfolio
            </Link>
          </Button>
        </div>
      </div>
    </footer>
  );
}

export default function PlantAIPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <OverviewSection />
      <LivePreviewSection />
      <FeaturesSection />
      <AccomplishmentsSection />
      <ScreenshotsSection />
      <VersionHistorySection />
      <TechStackSection />
      <CTASection />
      <Footer />
    </div>
  );
}

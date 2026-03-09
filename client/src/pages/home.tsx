import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Bot,
  Code2,
  ExternalLink,
  Gamepad2,
  Github,
  Globe,
  Leaf,
  Mail,
  Menu,
  Rocket,
  Trophy,
  X,
  ChevronDown,
  Eye,
  Cpu,
  Users,
  Folder,
  ArrowRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SiGithub } from "react-icons/si";
import { Link } from "wouter";
import { SnakeGame } from "@/components/games/snake-game";
import { SolarSystemGame } from "@/components/games/solar-system";

import plantaiDashboardPng from "/images/plantai-dashboard.png";
import plantaiMobilePng from "/images/plantai-mobile.png";

const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "PlantAI", href: "#plantai" },
  { label: "Robotics", href: "#robotics" },
  { label: "Games", href: "#games" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ["about", "robotics", "games", "projects", "contact"];
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < 200) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      }`}
      data-testid="navbar"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 h-16">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-bold text-lg tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md"
            aria-label="Scroll to top"
            data-testid="link-home"
          >
            <span className="text-primary">AW</span>
          </button>

          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                  activeSection === item.href.slice(1)
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
                data-testid={`link-nav-${item.label.toLowerCase()}`}
              >
                {item.label}
              </button>
            ))}
            <ThemeToggle />
          </div>

          <div className="md:hidden flex items-center gap-1">
            <ThemeToggle />
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              data-testid="button-mobile-menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border"
          >
            <div className="px-4 py-3 space-y-1">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className="block w-full text-left px-3 py-2.5 rounded-md text-sm font-medium text-muted-foreground"
                  data-testid={`link-mobile-${item.label.toLowerCase()}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 mb-6">
            <Badge variant="secondary" className="px-3 py-1 text-xs">
              <Code2 className="w-3 h-3 mr-1" />
              CS3 Student
            </Badge>
            <Badge variant="secondary" className="px-3 py-1 text-xs">
              <Trophy className="w-3 h-3 mr-1" />
              FLL State Finalist
            </Badge>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-4"
          data-testid="text-hero-name"
        >
          Aiden Wang
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg sm:text-xl text-muted-foreground mb-3"
          data-testid="text-hero-subtitle"
        >
          8th Grade CS3 Student &bull; Houston, Texas
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-base sm:text-lg text-muted-foreground/80 mb-8 max-w-2xl mx-auto"
          data-testid="text-hero-tagline"
        >
          FLL State Finalist &bull; FTC Team 31628 Programmer &bull; Built{" "}
          <Link href="/plantai">
            <span
              className="text-primary underline underline-offset-4 cursor-pointer"
              data-testid="link-plantai"
            >
              plantai-health.com
            </span>
          </Link>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-3"
        >
          <Button asChild data-testid="button-plantai-hero">
            <Link href="/plantai">
              <Leaf className="w-4 h-4 mr-2" />
              PlantAI Health
            </Link>
          </Button>
          <Button
            variant="secondary"
            onClick={() =>
              document.getElementById("games")?.scrollIntoView({ behavior: "smooth" })
            }
            data-testid="button-play-games"
          >
            <Gamepad2 className="w-4 h-4 mr-2" />
            Play My Games
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
            }
            data-testid="button-view-projects"
          >
            <Folder className="w-4 h-4 mr-2" />
            View Projects
          </Button>
          <Button variant="outline" asChild>
            <a
              href="https://github.com/Paoloop6"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="link-github-hero"
            >
              <SiGithub className="w-4 h-4 mr-2" />
              GitHub
            </a>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-16"
        >
          <button
            onClick={() =>
              document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
            }
            className="text-muted-foreground/50 animate-bounce focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-full p-1"
            aria-label="Scroll to About section"
            data-testid="button-scroll-down"
          >
            <ChevronDown className="w-6 h-6" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}

function SectionHeader({
  title,
  subtitle,
  icon: Icon,
}: {
  title: string;
  subtitle: string;
  icon: typeof Code2;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className="text-center mb-12"
    >
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-md bg-primary/10 text-primary mb-4">
        <Icon className="w-6 h-6" />
      </div>
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">{title}</h2>
      <p className="text-muted-foreground max-w-xl mx-auto">{subtitle}</p>
    </motion.div>
  );
}

function AboutSection() {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          icon={Code2}
          title="About Me"
          subtitle="Passionate about building things with code"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="p-6 sm:p-8">
            <p
              className="text-base sm:text-lg leading-relaxed text-muted-foreground"
              data-testid="text-about"
            >
              8th grader taking Computer Science 3 (CS3). Competed in FLL state
              championships and programmed autonomous robots for FTC Team 31628.
              Collaborated across schools to build{" "}
              <Link href="/plantai">
                <span className="text-primary underline underline-offset-4 cursor-pointer">
                  plantai-health.com
                </span>
              </Link>
              . Passionate about web development, game programming, and AI.
            </p>

            <div className="flex flex-wrap gap-2 mt-6">
              {[
                "Python",
                "JavaScript",
                "HTML/CSS",
                "Java",
                "React",
                "Git",
                "Computer Vision",
                "Robotics",
                "AI/ML",
              ].map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

function PlantAISection() {
  return (
    <section id="plantai" className="py-24 px-4 sm:px-6 lg:px-8 bg-card/50">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          icon={Leaf}
          title="PlantAI Health"
          subtitle="AI-powered plant identification platform — my biggest project"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <Badge className="bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/30">
                  Live Project
                </Badge>
                <Badge variant="secondary">500+ Users</Badge>
                <Badge variant="secondary">GPT-4o Vision</Badge>
              </div>

              <p
                className="text-muted-foreground leading-relaxed mb-4"
                data-testid="text-plantai-description"
              >
                Built a full-stack AI-powered web application that helps teachers and students
                identify plants, detect diseases, and create educational activities. Started as
                a cross-school collaboration at The Village School and grew into a platform
                serving 500+ active users.
              </p>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-3 bg-muted/50 rounded-md">
                  <p className="text-2xl font-bold text-primary" data-testid="text-plantai-stat-users">500+</p>
                  <p className="text-xs text-muted-foreground">Users</p>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-md">
                  <p className="text-2xl font-bold text-primary" data-testid="text-plantai-stat-versions">v3.0</p>
                  <p className="text-xs text-muted-foreground">Version</p>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-md">
                  <p className="text-2xl font-bold text-primary" data-testid="text-plantai-stat-ai">GPT-4o</p>
                  <p className="text-xs text-muted-foreground">AI Engine</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {["React", "TypeScript", "Node.js", "PostgreSQL", "OpenAI API", "Tailwind CSS"].map((tech) => (
                  <Badge key={tech} variant="outline" className="text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <Button asChild data-testid="button-plantai-learn-more">
                  <Link href="/plantai">
                    <ArrowRight className="w-4 h-4 mr-2" />
                    Full Project Details
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <a
                    href="https://plantai-health.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="button-plantai-visit"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Visit Live Site
                  </a>
                </Button>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <div className="rounded-md overflow-hidden border border-border shadow-lg">
              <img
                src={plantaiDashboardPng}
                alt="PlantAI Health dashboard"
                className="w-full h-auto"
                data-testid="img-plantai-dashboard-home"
              />
            </div>
            <div className="rounded-md overflow-hidden border border-border shadow-lg">
              <img
                src={plantaiMobilePng}
                alt="PlantAI Health mobile interface"
                className="w-full h-auto"
                data-testid="img-plantai-mobile-home"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const roboticsCards = [
  {
    icon: Trophy,
    title: "FLL State Team",
    description:
      "Programmer for state finalist team. Coded sensor fusion and autonomous routines.",
    badge: "State Finalist",
  },
  {
    icon: Bot,
    title: "FTC Team 31628",
    description:
      "Robot control systems and computer vision programmer.",
    badge: "Active Member",
  },
  {
    icon: Leaf,
    title: "PlantAI Health",
    description:
      "Collaborated with Village School on plant disease detection webapp (500+ users).",
    badge: "500+ Users",
    link: "/plantai",
  },
];

function RoboticsSection() {
  return (
    <section id="robotics" className="py-24 px-4 sm:px-6 lg:px-8 bg-card/50">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          icon={Cpu}
          title="Robotics Experience"
          subtitle="Building autonomous systems and competing at the state level"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {roboticsCards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card className="p-6 h-full hover-elevate">
                <div className="flex items-start justify-between gap-2 mb-4">
                  <div className="w-10 h-10 rounded-md bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <card.icon className="w-5 h-5" />
                  </div>
                  <Badge variant="outline" className="text-xs shrink-0">
                    {card.badge}
                  </Badge>
                </div>
                <h3
                  className="text-lg font-semibold mb-2"
                  data-testid={`text-robotics-title-${i}`}
                >
                  {card.title}
                </h3>
                <p
                  className="text-sm text-muted-foreground leading-relaxed"
                  data-testid={`text-robotics-desc-${i}`}
                >
                  {card.description}
                </p>
                {card.link && (
                  <Link href={card.link}>
                    <span
                      className="inline-flex items-center text-xs text-primary mt-3 cursor-pointer hover:underline"
                      data-testid={`link-robotics-${i}`}
                    >
                      Learn More
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </span>
                  </Link>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GamesSection() {
  return (
    <section id="games" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          icon={Gamepad2}
          title="Games"
          subtitle="Interactive games built from scratch - play them right here!"
        />

        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <Card className="overflow-visible">
              <div className="p-4 sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-xl font-semibold" data-testid="text-game-title-solar">
                      Solar System Explorer
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Interactive solar system - click planets to learn facts, drag to pan, scroll to zoom
                    </p>
                  </div>
                  <Button size="sm" variant="outline" asChild>
                    <a
                      href="https://github.com/Paoloop6/solar-system-explorer"
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid="link-game-github-solar"
                    >
                      <SiGithub className="w-4 h-4 mr-1" />
                      GitHub
                    </a>
                  </Button>
                </div>
                <SolarSystemGame />
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="overflow-visible">
              <div className="p-4 sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-xl font-semibold" data-testid="text-game-title-snake">
                      Snake Game
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Classic Snake with 3 game modes, levels, and obstacles
                    </p>
                  </div>
                  <Button size="sm" variant="outline" asChild>
                    <a
                      href="https://github.com/Paoloop6/snake-game"
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid="link-game-github-snake"
                    >
                      <SiGithub className="w-4 h-4 mr-1" />
                      GitHub
                    </a>
                  </Button>
                </div>
                <SnakeGame />
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const projects = [
  {
    title: "Solar System Explorer",
    description: "Interactive solar system exploration game built with JavaScript.",
    link: "https://github.com/Paoloop6/solar-system-explorer",
    icon: Rocket,
    tags: ["JavaScript", "Canvas", "Game"],
  },
  {
    title: "Snake Game",
    description: "Classic Snake game reimagined with modern graphics and smooth controls.",
    link: "https://github.com/Paoloop6/snake-game",
    icon: Gamepad2,
    tags: ["JavaScript", "Canvas", "Game"],
  },
  {
    title: "This Portfolio Website",
    description:
      "Built live on Replit with React, Tailwind CSS, and Framer Motion.",
    link: "#",
    icon: Globe,
    tags: ["React", "Tailwind", "TypeScript"],
  },
  {
    title: "PlantAI Health",
    description:
      "Collaborative plant disease detection web app serving 500+ users.",
    link: "/plantai",
    icon: Leaf,
    tags: ["AI/ML", "Web App", "Collaboration"],
  },
];

function ProjectsSection() {
  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 bg-card/50">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          icon={Folder}
          title="Projects"
          subtitle="A collection of things I've built"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Card className="p-6 h-full hover-elevate">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-md bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <project.icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3
                      className="text-lg font-semibold mb-1"
                      data-testid={`text-project-title-${i}`}
                    >
                      {project.title}
                    </h3>
                    <p
                      className="text-sm text-muted-foreground mb-3 leading-relaxed"
                      data-testid={`text-project-desc-${i}`}
                    >
                      {project.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-2">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {project.link !== "#" && (
                        project.link.startsWith("/") ? (
                          <Link href={project.link}>
                            <span
                              className="inline-flex items-center text-xs text-primary ml-auto cursor-pointer hover:underline"
                              data-testid={`link-project-${i}`}
                            >
                              Learn More
                              <ArrowRight className="w-3 h-3 ml-1" />
                            </span>
                          </Link>
                        ) : (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-xs text-primary ml-auto"
                            data-testid={`link-project-${i}`}
                          >
                            View
                            <ArrowRight className="w-3 h-3 ml-1" />
                          </a>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <SectionHeader
          icon={Mail}
          title="Get in Touch"
          subtitle="Interested in connecting? Reach out!"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-6 sm:p-8">
            <div className="space-y-4">
              <a
                href="mailto:aiden_wang@s.thevillageschool.com"
                className="flex items-center gap-3 text-muted-foreground group"
                data-testid="link-email"
              >
                <div className="w-10 h-10 rounded-md bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Email</p>
                  <p className="text-sm">aiden_wang@s.thevillageschool.com</p>
                </div>
              </a>

              <a
                href="https://github.com/Paoloop6"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-muted-foreground group"
                data-testid="link-github-contact"
              >
                <div className="w-10 h-10 rounded-md bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <SiGithub className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">GitHub</p>
                  <p className="text-sm">github.com/Paoloop6</p>
                </div>
              </a>

              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="w-10 h-10 rounded-md bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Deployed on Replit</p>
                  <p className="text-sm" data-testid="text-replit-url">
                    Live at this URL
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground" data-testid="text-footer">
          &copy; {new Date().getFullYear()} Aiden Wang. Built on Replit.
        </p>
        <div className="flex items-center gap-3">
          <Button size="sm" variant="ghost" asChild>
            <a
              href="https://github.com/Paoloop6"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="link-github-footer"
            >
              <SiGithub className="w-4 h-4 mr-1" />
              GitHub
            </a>
          </Button>
          <Button size="sm" variant="ghost" asChild>
            <a
              href="mailto:aiden_wang@s.thevillageschool.com"
              data-testid="link-email-footer"
            >
              <Mail className="w-4 h-4 mr-1" />
              Email
            </a>
          </Button>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <PlantAISection />
      <RoboticsSection />
      <GamesSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

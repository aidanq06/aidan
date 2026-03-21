"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Github, Linkedin, Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeProvider';

type Project = {
  name: string;
  slug: string;
  type: 'internal' | 'external';
  route?: string;
  description: string;
  tech: string;
  github?: string;
  image: { width: number; height: number };
  imageCount: number;
  iframeUrl?: string;
};

const LOVE_WORDS = [
  'building', 'tennis', 'vibecoding', 'working out', 'designing',
  'biking', 'hot weather', 'fried rice', 'late nights',
  'hanging with friends', 'long walks', 'reruns',
];
const LONGEST_LOVE_WORD = 'hanging with friends';

function RotatingWord() {
  const [wordIndex, setWordIndex] = useState(0);
  const [typedChars, setTypedChars] = useState(0);
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const word = LOVE_WORDS[wordIndex];
    const useHighlight = wordIndex % 2 === 1; // alternate: delete, highlight, delete, highlight...
    type Phase = 'in' | 'hold' | 'out' | 'select';
    let phase: Phase = 'in';
    let chars = 0;

    setTypedChars(0);
    setIsSelected(false);

    function step() {
      if (cancelled) return;
      if (phase === 'in') {
        chars++;
        setTypedChars(chars);
        if (chars < word.length) {
          setTimeout(step, 80);
        } else {
          phase = 'hold';
          setTimeout(step, 1200);
        }
      } else if (phase === 'hold') {
        if (useHighlight) {
          phase = 'select';
          setIsSelected(true);
          setTimeout(step, 500);
        } else {
          phase = 'out';
          setTimeout(step, 0);
        }
      } else if (phase === 'select') {
        setIsSelected(false);
        setTypedChars(0);
        setTimeout(() => {
          if (!cancelled) setWordIndex(i => (i + 1) % LOVE_WORDS.length);
        }, 150);
      } else {
        chars--;
        setTypedChars(chars);
        if (chars > 0) {
          setTimeout(step, 45);
        } else {
          setTimeout(() => {
            if (!cancelled) setWordIndex(i => (i + 1) % LOVE_WORDS.length);
          }, 200);
        }
      }
    }

    setTimeout(step, 80);
    return () => { cancelled = true; };
  }, [wordIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <span className="relative inline-block overflow-hidden align-bottom whitespace-nowrap">
      <span className="invisible select-none" aria-hidden>{LONGEST_LOVE_WORD}</span>
      <span className="absolute inset-0 flex items-center justify-start">
        <span
          style={{
            backgroundColor: isSelected ? 'var(--foreground)' : 'transparent',
            color: isSelected ? 'var(--background)' : 'inherit',
            borderRadius: '3px',
            padding: isSelected ? '0 2px' : '0',
            transition: 'background-color 0.12s ease, color 0.12s ease',
          }}
        >
          {LOVE_WORDS[wordIndex].slice(0, typedChars)}
        </span>
        {!isSelected && (
          <span className="animate-pulse" style={{ opacity: 0.5 }}>|</span>
        )}
      </span>
    </span>
  );
}

function ProjectItem({ project }: { project: Project }) {
  const [isHovered, setIsHovered] = useState(false);

  const content = (
    <div
      className="group cursor-pointer p-5 rounded-2xl relative overflow-hidden"
      style={{
        background: isHovered
          ? 'linear-gradient(135deg, var(--card-bg-hover-start) 0%, var(--card-bg-hover-end) 100%)'
          : 'transparent',
        border: '2px solid',
        borderColor: isHovered ? 'var(--card-border-hover)' : 'var(--card-border)',
        boxShadow: isHovered ? '0 8px 32px var(--card-shadow)' : '0 0 0 rgba(0,0,0,0)',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        if (project.iframeUrl) {
          window.open(project.iframeUrl, '_blank', 'noopener,noreferrer');
        } else {
          setIsHovered(!isHovered);
        }
      }}
    >
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 0%, var(--card-gradient-overlay), transparent 70%)',
          opacity: 0,
        }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      />

      <div className="mb-5 relative z-10">
        {project.iframeUrl ? (
          <motion.div
            className="relative overflow-hidden"
            style={{ borderRadius: '8px', height: '354px' }}
            animate={{ y: isHovered ? -8 : 0, scale: isHovered ? 1.02 : 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <iframe
              src={project.iframeUrl}
              title={project.name}
              style={{
                width: '1280px',
                height: '950px',
                transform: 'scale(0.425)',
                transformOrigin: 'top left',
                pointerEvents: 'none',
                border: 'none',
                borderRadius: '8px',
                overflow: 'hidden',
              }}
            />
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{ boxShadow: '0 0 20px var(--image-glow)', borderRadius: '8px', opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ border: '1px solid var(--image-border)', borderRadius: '8px' }}
            />
          </motion.div>
        ) : (
          <div className="flex gap-2.5">
            {Array.from({ length: project.imageCount }).map((_, idx) => (
              <motion.div
                key={idx}
                className="relative overflow-hidden"
                style={{
                  flex: 1,
                  aspectRatio: `${project.image.width} / ${project.image.height}`,
                  borderRadius: '8px',
                  minWidth: 0,
                }}
                animate={{ y: isHovered ? -8 : 0, scale: isHovered ? 1.02 : 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 30, delay: idx * 0.05 }}
              >
                <Image
                  src={`/images/projects/${project.slug}/${idx + 1}.png`}
                  alt={`${project.name} screenshot ${idx + 1}`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 300px"
                  style={{ borderRadius: '8px' }}
                />
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{ boxShadow: '0 0 20px var(--image-glow)', borderRadius: '8px', opacity: 0 }}
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ border: '1px solid var(--image-border)', borderRadius: '8px' }}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-2.5 relative z-10">
        <div className="flex items-baseline gap-3 flex-wrap">
          <motion.h3
            className="text-xl md:text-2xl font-semibold"
            animate={{ color: isHovered ? 'var(--foreground)' : 'var(--secondary)' }}
            transition={{ duration: 0.2 }}
          >
            {project.name.toLowerCase()}
          </motion.h3>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs hover:underline transition-all"
              onClick={(e) => e.stopPropagation()}
              style={{ color: 'var(--tertiary)' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--secondary)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--tertiary)'}
            >
              github →
            </a>
          )}
        </div>

        <div className="text-sm font-mono" style={{ color: 'var(--tertiary)' }}>
          {project.tech.toLowerCase()}
        </div>

        <motion.div
          initial={false}
          animate={{ height: isHovered ? 'auto' : 0, opacity: isHovered ? 1 : 0 }}
          transition={{
            height: { duration: 0.3, ease: "easeInOut" },
            opacity: { duration: 0.2, ease: "easeInOut" },
          }}
          className="overflow-hidden"
        >
          <p className="text-sm md:text-base pb-1" style={{ color: 'var(--tertiary)' }}>
            {project.description.toLowerCase()}
          </p>
        </motion.div>
      </div>
    </div>
  );

  if (project.type === 'internal') {
    return <Link href={project.route || '/'} className="block">{content}</Link>;
  }

  return content;
}

const projects: Project[] = [
  {
    name: 'WebBench',
    slug: 'webbench',
    type: 'external',
    description: 'browser-based llm benchmarking suite — no api key or setup required, runs entirely via webgpu',
    tech: 'Next.js, WebGPU, Transformers.js',
    github: 'https://github.com/aidanq06/WebBench',
    iframeUrl: 'https://web-bench-six.vercel.app',
    image: { width: 16, height: 9 },
    imageCount: 0,
  },
  {
    name: 'ChartSense',
    slug: 'chartsense',
    type: 'external',
    description: 'AI-powered stock sentiment tracker with real-time market data',
    tech: 'Next.js, Supabase, OpenAI',
    github: 'https://github.com/aidanq06/ChartSense',
    image: { width: 150, height: 300 },
    imageCount: 3,
  },
  {
    name: 'Carbon.AI₂',
    slug: 'carbonai',
    type: 'external',
    description: 'Real-time carbon footprint tracker using Vision AI',
    tech: 'Swift, Vision AI, Gemini',
    github: 'https://github.com/aidanq06/carbon.ai2',
    image: { width: 150, height: 300 },
    imageCount: 3,
  },
];

export default function Portfolio() {
  const { theme, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState<'about' | 'projects' | null>(null);
  const [time, setTime] = useState('');

  useEffect(() => {
    const startTime = performance.now();

    const updateTime = () => {
      const now = new Date();
      const perfNow = performance.now();
      const microseconds = Math.floor((perfNow - startTime) * 1000) % 1000000;

      const estTimeString = now.toLocaleString('en-US', {
        timeZone: 'America/New_York',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      });

      const [dateStr, timeStr] = estTimeString.split(', ');
      const [month, date, year] = dateStr.split('/');
      const [hours, minutes, seconds] = timeStr.split(':');

      const estDate = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));
      const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
      const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

      const day = days[estDate.getDay()];
      const monthName = months[parseInt(month) - 1];
      const ms = now.getMilliseconds().toString().padStart(3, '0');
      const us = Math.floor((microseconds % 1000) / 100).toString();

      setTime(`${day} ${monthName} ${date} ${year} ${hours}:${minutes}:${seconds}.${ms}${us} est`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">

        <motion.header
          className="mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-7xl md:text-9xl font-bold mb-4 tracking-tight">
            aidan quach
          </h1>

          <p className="text-2xl md:text-3xl mb-3 max-w-3xl leading-relaxed" style={{ color: 'var(--secondary)' }}>
            i am 19 and i love <RotatingWord />
          </p>
          <p className="text-2xl md:text-3xl mb-6 max-w-3xl leading-relaxed" style={{ color: 'var(--secondary)' }}>
            currently interning as a swe at afterquery (yc w25)
          </p>

          <div className="text-sm mb-3 font-mono" style={{ color: 'var(--tertiary)' }}>
            aidanquachdev[at]gmail[dot]com
          </div>
          <div className="text-sm mb-10 font-mono" style={{ color: 'var(--tertiary)' }}>
            {time}
          </div>

          <div className="flex gap-6 items-center mb-10">
            <a
              href="https://github.com/aidanq06"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors"
              style={{ color: 'var(--tertiary)' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--foreground)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--tertiary)'}
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/aidanq06/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors"
              style={{ color: 'var(--tertiary)' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--foreground)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--tertiary)'}
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <button
              onClick={toggleTheme}
              className="transition-colors"
              style={{ color: 'var(--tertiary)' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--foreground)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--tertiary)'}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          <div className="flex gap-8">
            <motion.button
              onClick={() => setActiveSection(activeSection === 'about' ? null : 'about')}
              className="text-xl md:text-2xl font-medium transition-all relative"
              style={{ color: activeSection === 'about' ? 'var(--foreground)' : 'var(--secondary)' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              about
              <div
                className="absolute bottom-0 left-0 right-0 h-0.5"
                style={{
                  backgroundColor: 'var(--foreground)',
                  opacity: activeSection === 'about' ? 1 : 0,
                  transition: 'opacity 0.2s ease',
                }}
              />
            </motion.button>
            <motion.button
              onClick={() => setActiveSection(activeSection === 'projects' ? null : 'projects')}
              className="text-xl md:text-2xl font-medium transition-all relative"
              style={{ color: activeSection === 'projects' ? 'var(--foreground)' : 'var(--secondary)' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              projects
              <div
                className="absolute bottom-0 left-0 right-0 h-0.5"
                style={{
                  backgroundColor: 'var(--foreground)',
                  opacity: activeSection === 'projects' ? 1 : 0,
                  transition: 'opacity 0.2s ease',
                }}
              />
            </motion.button>
          </div>
        </motion.header>

        {activeSection === 'about' && (
          <motion.div
            key="about"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="mb-8 pt-2"
          >
            <div className="space-y-4 text-lg md:text-xl leading-relaxed" style={{ color: 'var(--secondary)' }}>
              <p>i build systems around language models.</p>
              <p>right now i&apos;m interested in agentic workflows, context engineering, and how llms interact with real software.</p>
              <p>i&apos;m a computer science student at the university of florida and spend most of my time experimenting with ai systems and building products.</p>
              <p>in my free time, i love lifting, playing tennis, and burning through claude code credits :)</p>
            </div>
          </motion.div>
        )}

        {activeSection === 'projects' && (
          <motion.div
            key="projects"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="pt-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-start">
              {projects.map((project) => (
                <ProjectItem key={project.slug} project={project} />
              ))}
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
}

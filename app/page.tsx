
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useAnimate } from 'framer-motion';
import { 
  Github, 
  ExternalLink, 
  Mail, 
  Linkedin, 
  ChevronDown,
  X,
  Code,
  Briefcase,
  Terminal,
  MapPin,
  Clock,
  Menu
} from 'lucide-react';
import { Button } from "@/Components/ui/button";
import { Card } from "@/Components/ui/card";

import ProjectCard from '../Components/ProjectCard';
import SkillsGrid from '../Components/SkillsGrid';
import ContactTerminal from '../Components/ContactTerminal';

function Counter({ from, to, duration = 1.5 }: { from: number; to: number; duration?: number }) {
  const [scope, animate] = useAnimate();
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (isInView) {
      animate(scope.current, { innerHTML: to }, {
        duration: duration,
        ease: "easeOut",
        onUpdate: (latest) => {
          scope.current.innerHTML = Math.round(latest);
        }
      });
    }
  }, [isInView, animate, duration, scope, to]);

  return <motion.span ref={scope} onViewportEnter={() => setIsInView(true)}>{from}</motion.span>;
}

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  const [scope, animate] = useAnimate();
  const heroTaglineRef = useRef(null);

  useEffect(() => {
    const sequence: any[] = [
      [scope.current, { width: "auto" }, { duration: 1, delay: 1 }],
      [heroTaglineRef.current, { opacity: 1, y: 0 }, { duration: 0.8, at: "-0.5" }]
    ];
    animate(sequence);
  }, [animate, scope]);
  
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setScrollProgress(latest);
  });
  
  const projects = [
    {
      id: 1,
      name: 'ChartSense',
      category: 'AI-Powered Finance',
      tech: ['Next.js', 'Supabase', 'SwiftUI', 'OpenAI API'],
      description: 'A sleek stock sentiment tracker that combines live market data, financial news, and GPT-powered summaries into a clean Robinhood-inspired UI. Users can search tickers and instantly get real-time AI-driven insights with sentiment analysis graphs.',
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=800&fit=crop&q=80',
      github: '#',
      demo: '#',
      status: 'MVP',
      performance: 'In Development'
    },
    {
      id: 2,
      name: 'Compound',
      category: 'Fintech / Behavioral Finance',
      tech: ['React Native', 'Supabase', 'Tailwind', 'GPT APIs'],
      description: 'An app designed to combat revenge trading by reframing impulsive trades into "revenge investing." Compound intercepts emotional behaviors with AI-driven nudges and visually reframes them into healthier, long-term financial decisions.',
      image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200&h=800&fit=crop&q=80',
      github: '#',
      demo: '#',
      status: 'PROTOTYPE',
      performance: 'Early Stage'
    },
    {
      id: 3,
      name: 'HabitPilot',
      category: 'Productivity & Lifestyle',
      tech: ['SwiftUI', 'Firebase', 'GPT APIs'],
      description: 'An AI-powered habit tracking app that generates personalized study and lifestyle plans. HabitPilot combines clean, calendar-style interfaces with GPT-powered habit suggestions and motivational progress updates.',
      image: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=1200&h=800&fit=crop&q=80',
      github: '#',
      demo: '#',
      status: 'BETA',
      performance: 'Testing'
    }
  ];

  const navLinks = [
    { title: 'About', href: '#about' },
    { title: 'Projects', href: '#projects' },
    { title: 'Skills', href: '#skills' },
    { title: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-gray-50 text-gray-800 font-sans antialiased">
      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 z-50 origin-left"
        style={{ scaleX: scrollProgress }}
      />

      {/* Header */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 bg-gray-50/80 z-40 border-b border-gray-200/50"
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
          <motion.a 
            href="#"
            whileHover={{ scale: 1.05 }}
            className="text-lg font-bold tracking-tight"
          >
            Aidan Quach
          </motion.a>
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link, i) => (
              <motion.button
                key={link.title}
                onClick={() => scrollToSection(link.href)}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                whileHover={{ y: -2 }}
                className="text-gray-600 hover:text-blue-600 transition-all duration-300 relative group"
              >
                {link.title}
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300" />
              </motion.button>
            ))}
          </nav>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Menu className="w-6 h-6 text-gray-600" />
          </button>
        </div>
        
        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-gray-200 shadow-lg"
            >
              <div className="px-6 py-4 space-y-4">
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.title}
                    onClick={() => {
                      scrollToSection(link.href);
                      setMobileMenuOpen(false);
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                    className="block w-full text-left text-gray-600 hover:text-blue-600 transition-colors py-2"
                  >
                    {link.title}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Landing Section */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-16 px-6 text-center relative overflow-hidden">
        {/* Enhanced background pattern with parallax */}
        <motion.div 
          className="absolute inset-0 opacity-[0.03]"
          style={{ y: scrollProgress * 50 }}
        >
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="relative z-10"
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold tracking-tighter mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Aidan Quach
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-gray-500 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Tampa, Florida
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="inline-flex flex-wrap items-center justify-center bg-slate-900 text-white px-4 sm:px-6 py-3 rounded-2xl font-mono text-sm mb-8 shadow-2xl hover:shadow-3xl transition-all duration-500 group max-w-full mx-auto"
          >
            <div className="flex items-center">
              <Terminal className="w-4 h-4 mr-2 text-green-400 group-hover:text-green-300 transition-colors flex-shrink-0" />
              <span className="text-green-400 group-hover:text-green-300 transition-colors">$</span>
              <span ref={scope} className="ml-2 whitespace-nowrap overflow-hidden w-0">whoami</span>
            </div>
            <span ref={heroTaglineRef} className="ml-2 sm:ml-4 text-gray-300 group-hover:text-gray-200 transition-colors opacity-0 -translate-y-2 text-xs sm:text-sm">// Full-Stack Developer & Quant Enthusiast</span>
          </motion.div>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            Crafting full-stack applications that bridge technology and finance.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="mt-12"
          >
            <motion.button
              onClick={() => scrollToSection('#about')}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="group"
            >
              <ChevronDown className="w-8 h-8 mx-auto text-gray-400 group-hover:text-blue-600 animate-bounce transition-colors" />
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 bg-white relative">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-bold tracking-tight mb-8"
          >
            About Me
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: "4rem" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-12 rounded-full"
          />
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-600 leading-relaxed mb-16 max-w-3xl mx-auto"
          >
            Hi, I'm Aidan — a Computer Science student at the University of Florida (Class of 2029). I love building full-stack apps that are clean, fast, and useful. I'm especially interested in finance, AI, and quant, and I'm always excited to learn new ways to combine tech with markets.
          </motion.p>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <Card className="p-8 text-left shadow-lg hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-blue-50 to-white border-0 group">
                <div className="flex items-center gap-4 mb-4">
                  <motion.div 
                    className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <Code className="w-7 h-7 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold"><Counter from={0} to={800} />+ Commits</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">Across projects in full-stack development, finance, and AI.</p>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <Card className="p-8 text-left shadow-lg hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-green-50 to-white border-0 group">
                <div className="flex items-center gap-4 mb-4">
                  <motion.div 
                    className="p-4 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300"
                    whileHover={{ scale: 1.1, rotate: -5 }}
                  >
                    <Briefcase className="w-7 h-7 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold">Software Engineering Intern</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">Summer 2025 at DEX Imaging — contributed to automation + scalable system projects.</p>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      
      {/* Projects Section */}
      <section id="projects" className="py-32 px-6 bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center bg-slate-800 text-white px-4 py-2 rounded-lg font-mono text-sm mb-6">
              <span className="text-green-400">aidan@portfolio</span>
              <span className="text-gray-400 mx-2">:</span>
              <span className="text-blue-400">~/projects</span>
              <span className="text-gray-400 ml-2">$</span>
              <span className="ml-2">ls -la</span>
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-white mb-4">Featured Projects</h2>
            <p className="text-gray-400">A curated selection of my recent work in quantitative finance and software development.</p>
          </motion.div>
          <div className="grid lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onSelect={setSelectedProject}
              />
            ))}
          </div>
        </div>
      </section>


      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-6"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="bg-white rounded-3xl shadow-2xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-1">{selectedProject.name}</h3>
                  <div className="flex items-center gap-3">
                    <span className="text-gray-500">{selectedProject.category}</span>
                    <span className={`px-2 py-1 text-xs font-mono rounded ${
                      selectedProject.status === 'ACTIVE' ? 'bg-green-100 text-green-700' :
                      selectedProject.status === 'DEPLOYED' ? 'bg-blue-100 text-blue-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {selectedProject.status}
                    </span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedProject(null)}
                  className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-6 h-6" />
                </Button>
              </div>

              <div className="aspect-video w-full bg-gray-100 rounded-2xl mb-6 overflow-hidden">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                {selectedProject.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {selectedProject.tech.map((tech: string, i: number) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-4">
                <Button asChild className="bg-blue-600 hover:bg-blue-700 flex-1">
                  <a href={selectedProject.github} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-2" />
                    View Code
                  </a>
                </Button>
                <Button asChild variant="outline" className="flex-1">
                  <a href={selectedProject.demo} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Live Demo
                  </a>
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Skills Section */}
      <section id="skills" className="py-32 px-6 bg-white relative">
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-bold tracking-tight text-center mb-8"
          >
            Technical Skills
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: "4rem" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto mb-16 rounded-full"
          />
          <SkillsGrid />
        </div>
      </section>


      {/* Contact Section - Streamlined */}
      <ContactTerminal />

      {/* Footer */}
      <footer className="py-12 px-6 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <p className="text-slate-400 text-sm mb-2">
                © 2025 Aidan Quach — All rights reserved.
              </p>
              <div className="flex items-center justify-center md:justify-start gap-2 text-slate-500 text-xs">
                <MapPin className="w-3 h-3" />
                <span>Tampa, FL</span>
                <span className="mx-2">•</span>
                <Clock className="w-3 h-3" />
                <span>EST</span>
              </div>
            </div>
            <div className="flex gap-6">
              <motion.a 
                href="https://github.com/aidanq06" 
                whileHover={{ scale: 1.2, y: -2 }}
                className="text-slate-500 hover:text-blue-400 transition-colors p-2 rounded-full hover:bg-slate-800"
              >
                <Github className="w-5 h-5" />
              </motion.a>
              <motion.a 
                href="#" 
                whileHover={{ scale: 1.2, y: -2 }}
                className="text-slate-500 hover:text-blue-400 transition-colors p-2 rounded-full hover:bg-slate-800"
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
              <motion.a 
                href="mailto:aidanquachdev@gmail.com" 
                whileHover={{ scale: 1.2, y: -2 }}
                className="text-slate-500 hover:text-blue-400 transition-colors p-2 rounded-full hover:bg-slate-800"
              >
                <Mail className="w-5 h-5" />
              </motion.a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

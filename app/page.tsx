
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Github, 
  ExternalLink, 
  Mail, 
  Linkedin
} from 'lucide-react';

export default function Portfolio() {
  const projects = [
    {
      name: 'ChartSense',
      description: 'AI-powered stock sentiment tracker with real-time market data and GPT summaries.',
      tech: ['Next.js', 'Supabase', 'SwiftUI', 'OpenAI'],
      github: 'https://github.com/aidanq06/ChartSense',
      demo: 'https://github.com/aidanq06/ChartSense'
    },
    {
      name: 'Carbon.AI₂',
      description: 'Real-Time Carbon Footprint mobile application using Vision AI, Gemini, and Telemetry Fusion, built with swift.',
      tech: ['Swift', 'Vision AI', 'Gemini', 'Core Location', 'iOS'],
      github: 'https://github.com/aidanq06/carbon.ai2',
      demo: 'https://www.youtube.com/watch?v=RE9tpsIcT-4'
    },
    {
      name: 'HabitPilot',
      description: 'AI-powered habit tracking with personalized study and lifestyle plans.',
      tech: ['SwiftUI', 'Firebase', 'GPT APIs'],
      github: 'https://github.com/aidanq06/HabitPilot',
      demo: 'https://github.com/aidanq06/HabitPilot'
    }
  ];

  const skills = [
    'JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js',
    'Python', 'Swift', 'PostgreSQL', 'Supabase', 'Firebase',
    'Tailwind CSS', 'Framer Motion', 'Git', 'AWS'
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <div className="max-w-4xl mx-auto px-6 py-20">
        {/* Header */}
        <header className="mb-20">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-2">
            aidan quach
          </h1>
          <div className="text-xs text-gray-400 mb-6 font-mono tracking-wide leading-tight">
            <span>aidanquachdev[at]gmail[dot]com</span>
          </div>
          <p className="text-lg text-gray-600 mb-6">
            i am 18 and i love building — currently interning as a SWE at AfterQuery (YC W25)
          </p>
          <div className="flex gap-4">
            <a href="https://github.com/aidanq06" className="text-gray-600 hover:text-gray-900 transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/in/aidanq06/" className="text-gray-600 hover:text-gray-900 transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="mailto:aidanquachdev@gmail.com" className="text-gray-600 hover:text-gray-900 transition-colors">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </header>

        {/* About */}
        <section className="mb-20">
          <h2 className="text-2xl font-semibold mb-6">about</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            im currently a computer science student at the University of Florida (class of 2029). 
            i build full-stack applications focused on finance, AI, and quantitative analysis. 
            currently working on building AI training data with bash and python for AfterQuery&apos;s AI research infrastructure.
          </p>
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div>
              <span className="font-medium">experience</span>
              <ul className="mt-2 space-y-1 text-gray-600">
                <li>• ML Software Engineer @ AfterQuery (YC W25)</li>
                <li>• Software Engineering Intern @ DEX Imaging (Summer 2025)</li>
                <li>• 1st Place - FBLA Coding & Programming Competition (States)</li>
              </ul>
            </div>
            <div>
              <span className="font-medium">location</span>
              <p className="mt-2 text-gray-600">Tampa, Florida</p>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section className="mb-20">
          <h2 className="text-2xl font-semibold mb-6">projects</h2>
          <div className="space-y-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="border-l-2 border-gray-200 pl-6"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
                    <p className="text-gray-600 mb-3">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <a
                      href={project.github}
                      className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded transition-colors text-sm"
                    >
                      <Github className="w-4 h-4" />
                      code
                    </a>
                    <a
                      href={project.demo}
                      className="flex items-center gap-2 px-3 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded transition-colors text-sm"
                    >
                      <ExternalLink className="w-4 h-4" />
                      demo
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section className="mb-20">
          <h2 className="text-2xl font-semibold mb-6">skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">contact</h2>
          <p className="text-gray-600 mb-4">
            Let&apos;s build something together.
          </p>
          <a
            href="mailto:aidanquachdev@gmail.com"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded transition-colors"
          >
            <Mail className="w-4 h-4" />
            Get in touch
          </a>
        </section>
      </div>
    </div>
  );
}

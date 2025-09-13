"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Card } from "@/Components/ui/card";
import { ExternalLink, Github, TrendingUp } from 'lucide-react';

type Project = {
  name: string;
  category: string;
  tech: string[];
  description: string;
  status: string;
  performance: string;
  githubUrl?: string;
  liveUrl?: string;
};

type ProjectCardProps = {
  project: Project;
  index: number;
  onSelect: (project: Project) => void;
};

export default function ProjectCard({ project, index, onSelect }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="cursor-pointer group"
      onClick={() => onSelect(project)}
    >
      <Card className="bg-slate-800 border-slate-700 rounded-2xl overflow-hidden hover:bg-slate-700/50 transition-all duration-300 h-full flex flex-col">
        {/* Terminal Header */}
        <div className="flex items-center gap-2 p-4 border-b border-slate-700">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
          </div>
          <div className="flex-1 text-center">
            <span className="text-slate-400 text-sm font-mono">{project.name.toLowerCase().replace(/\s+/g, '_')}.exe</span>
          </div>
        </div>

        {/* Terminal Content */}
        <div className="p-6 flex-grow flex flex-col font-mono text-sm">
          {/* Project Info Display */}
          <div className="space-y-2 mb-4">
            <div className="flex text-slate-300">
              <span className="text-green-400">$</span>
              <span className="ml-2">cat project_info.json</span>
            </div>
            <div className="text-slate-400 pl-4 border-l-2 border-slate-600">
              <div className="text-white text-lg font-bold mb-1 font-sans">{project.name}</div>
              <div className="text-slate-300 mb-2">{project.category}</div>
              <div className="flex items-center gap-2 mb-3">
                <span className={`px-2 py-1 text-xs rounded ${
                  project.status === 'ACTIVE' ? 'bg-green-900/50 text-green-400 border border-green-700' :
                  project.status === 'DEPLOYED' ? 'bg-blue-900/50 text-blue-400 border border-blue-700' :
                  'bg-yellow-900/50 text-yellow-400 border border-yellow-700'
                }`}>
                  {project.status}
                </span>
                <div className="flex items-center gap-1 text-green-400">
                  <TrendingUp className="w-3 h-3" />
                  <span className="text-xs">{project.performance}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="mb-4">
            <div className="flex text-slate-300 mb-2">
              <span className="text-green-400">$</span>
              <span className="ml-2">npm list --depth=0</span>
            </div>
            <div className="pl-4 border-l-2 border-slate-600">
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, i) => (
                  <span
                    key={i}
                    className="text-xs px-2 py-1 bg-slate-700/50 text-slate-300 rounded border border-slate-600"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6 flex-grow">
            <div className="flex text-slate-300 mb-2">
              <span className="text-green-400">$</span>
              <span className="ml-2">head README.md</span>
            </div>
            <div className="pl-4 border-l-2 border-slate-600 text-slate-400 text-xs font-sans leading-relaxed">
              {project.description.substring(0, 120)}...
            </div>
          </div>

          {/* Commands */}
          <div className="mt-auto">
            <div className="flex text-slate-300 mb-2">
              <span className="text-green-400">$</span>
              <span className="ml-2 group-hover:text-blue-400 transition-colors">./explore_project.sh</span>
            </div>
            <div className="flex gap-4 pl-4">
              <div className="flex items-center gap-1 text-slate-500 hover:text-blue-400 transition-colors">
                <Github className="w-4 h-4" />
                <span className="text-xs">code</span>
              </div>
              <div className="flex items-center gap-1 text-slate-500 hover:text-blue-400 transition-colors">
                <ExternalLink className="w-4 h-4" />
                <span className="text-xs">demo</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
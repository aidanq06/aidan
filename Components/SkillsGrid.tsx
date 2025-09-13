
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Card } from "@/Components/ui/card";
import { Code, Database, BrainCircuit, Layers } from 'lucide-react';

export default function SkillsGrid() {
  const skills = [
    {
      category: 'Frontend',
      icon: Code,
      items: ['React / Next.js', 'React Native', 'SwiftUI', 'Tailwind CSS'],
      color: 'blue',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      category: 'Backend & Cloud',
      icon: Database,
      items: ['Node.js / Express', 'Supabase (Postgres, Auth, Realtime)', 'Firebase', 'REST / GraphQL APIs'],
      color: 'green',
      gradient: 'from-green-500 to-green-600'
    },
    {
      category: 'AI / Data',
      icon: BrainCircuit,
      items: ['GPT APIs (OpenAI)', 'PyTorch / TensorFlow', 'Pandas / NumPy'],
      color: 'purple',
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      category: 'Finance & Quantitative',
      icon: Layers,
      items: ['Algorithmic trading basics', 'Options Greeks & implied volatility', 'Monte Carlo simulations'],
      color: 'yellow',
      gradient: 'from-yellow-500 to-orange-500'
    },
  ];

  const colors = {
    blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200' },
    purple: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200' },
    green: { bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-200' },
    yellow: { bg: 'bg-yellow-50', text: 'text-yellow-600', border: 'border-yellow-200' },
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
      {skills.map((skill, index) => (
        <motion.div
          key={skill.category}
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          whileHover={{ y: -8, transition: { duration: 0.3 } }}
        >
          <Card className="p-8 h-full bg-white shadow-lg hover:shadow-2xl transition-all duration-500 border-0 group relative overflow-hidden">
            {/* Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${skill.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
            
            <div className="relative z-10">
              <motion.div 
                className={`p-4 inline-block rounded-2xl mb-6 bg-gradient-to-br ${skill.gradient} shadow-lg group-hover:shadow-xl transition-all duration-300`}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <skill.icon className="w-8 h-8 text-white" />
              </motion.div>
              
              <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-gray-800 transition-colors">
                {skill.category}
              </h3>
              
              <div className="space-y-3">
                {skill.items.map((item, itemIndex) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: (index * 0.1) + (itemIndex * 0.05) }}
                    className="flex items-center"
                  >
                    <motion.div 
                      className={`w-2 h-2 rounded-full mr-4 bg-gradient-to-r ${skill.gradient}`}
                    />
                    <span className="text-gray-600 group-hover:text-gray-700 transition-colors font-medium">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

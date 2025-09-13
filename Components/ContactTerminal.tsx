
"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import { Terminal, Send, CheckCircle } from 'lucide-react';

export default function ContactTerminal() {
  const [currentStep, setCurrentStep] = useState('idle');
  const [terminalLines, setTerminalLines] = useState([
    { type: 'system', text: 'Terminal initialized. Connection established.', delay: 0 },
    { type: 'system', text: 'Ready to receive your message...', delay: 500 },
    { type: 'prompt', text: '> ', delay: 1000 }
  ]);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [displayedLines, setDisplayedLines] = useState([]);

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];
    // Reset displayed lines when terminalLines change
    setDisplayedLines([]); 
    
    terminalLines.forEach((line) => {
      const timeoutId = setTimeout(() => {
        setDisplayedLines(prev => [...prev, line]);
      }, line.delay);
      timeouts.push(timeoutId);
    });
    return () => timeouts.forEach(clearTimeout);
  }, [terminalLines]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentStep !== 'idle' || !formData.name || !formData.email || !formData.message) return;

    setCurrentStep('processing');
    setDisplayedLines([]);
    
    const processingLines = [
      { type: 'user', text: `> send_message --name="${formData.name}" --email="${formData.email}"`, delay: 0 },
      { type: 'system', text: 'Initiating secure connection...', delay: 500 },
      { type: 'system', text: 'Encrypting message payload...', delay: 1300 },
      { type: 'system', text: 'Transmitting to aidanquachdev@gmail.com...', delay: 2100 },
      { type: 'loading', text: 'Processing transmission...', delay: 2900 }
    ];

    setTerminalLines(processingLines);

    setTimeout(() => {
      const successLines = [
        ...processingLines.slice(0, -1),
        { type: 'success', text: '✓ Message delivered successfully!', delay: 0 },
        { type: 'success', text: '✓ Auto-reply: "Thanks for reaching out! I\'ll get back to you within 24 hours."', delay: 500 },
        { type: 'system', text: 'Connection closed. Have a great day!', delay: 1000 }
      ];
      setTerminalLines(successLines);
      setCurrentStep('success');
      
      setTimeout(() => {
        setFormData({ name: '', email: '', message: '' });
        setCurrentStep('idle');
        setTerminalLines([
          { type: 'system', text: 'Terminal rebooted. Ready for new message.', delay: 0 },
          { type: 'prompt', text: '> ', delay: 500 }
        ]);
      }, 5000);
    }, 4500);
  };

  return (
    <section id="contact" className="py-32 px-6 bg-slate-900 relative">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold text-white mb-6"
        >
          Let's Connect
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl text-slate-300 leading-relaxed mb-12 max-w-2xl mx-auto"
        >
          Ready to discuss new projects, collaborations, or opportunities in full-stack development, AI, or quantitative finance? Use the interface below to send me a message directly.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative"
        >
          <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden">
            <div className="flex items-center gap-3 px-6 py-4 bg-slate-800 border-b border-slate-700">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="flex items-center gap-2 text-slate-400 text-sm font-mono">
                <Terminal className="w-4 h-4" />
                <span>contact@aidan.dev</span>
              </div>
              <div className="ml-auto">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              </div>
            </div>

            <div className="p-6 min-h-[150px] font-mono text-sm text-left">
              <AnimatePresence>
                {displayedLines.map((line, index) => (
                  <motion.div
                    key={`${line.text}-${index}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`mb-2 whitespace-pre-wrap ${
                      line.type === 'system' ? 'text-blue-400' :
                      line.type === 'success' ? 'text-green-400' :
                      line.type === 'user' ? 'text-white' :
                      line.type === 'loading' ? 'text-yellow-400' :
                      'text-slate-300'
                    }`}
                  >
                    {line.type === 'loading' ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-yellow-400/30 border-t-yellow-400 rounded-full animate-spin" />
                        <span>{line.text}</span>
                      </div>
                    ) : (
                      line.text
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-8 bg-slate-800/50 border border-slate-700 rounded-2xl p-6"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="bg-slate-900/50 border-slate-600 text-white placeholder-slate-400 focus:border-blue-400 transition-colors"
                  required
                  disabled={currentStep !== 'idle'}
                />
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="bg-slate-900/50 border-slate-600 text-white placeholder-slate-400 focus:border-blue-400 transition-colors"
                  required
                  disabled={currentStep !== 'idle'}
                />
              </div>
              <Textarea
                placeholder="Tell me about your project or just say hello..."
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                className="min-h-[120px] bg-slate-900/50 border-slate-600 text-white placeholder-slate-400 focus:border-blue-400 transition-colors resize-none"
                required
                disabled={currentStep !== 'idle'}
              />
              <Button
                type="submit"
                disabled={currentStep !== 'idle'}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white border-0 py-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {currentStep === 'processing' ? 'Processing...' :
                 currentStep === 'success' ? <><CheckCircle className="w-5 h-5 mr-2" /> Message Sent!</> :
                 <><Send className="w-5 h-5 mr-2" /> Execute Command</>}
              </Button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

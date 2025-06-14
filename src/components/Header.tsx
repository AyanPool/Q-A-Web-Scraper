import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Github, ExternalLink } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="glass-effect border-b border-white/20 sticky top-0 z-50"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-primary-600 to-indigo-600 rounded-lg">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Wikipedia Q&A</h1>
              <p className="text-sm text-gray-600">AI-Powered Knowledge Assistant</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-600 hover:text-primary-600 transition-colors duration-200"
              title="View on GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            
            <div className="hidden sm:flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              API Connected
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
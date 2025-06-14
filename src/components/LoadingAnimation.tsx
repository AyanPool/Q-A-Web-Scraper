import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Search, Sparkles } from 'lucide-react';

const LoadingAnimation: React.FC = () => {
  const steps = [
    { icon: Search, text: "Searching Wikipedia content...", delay: 0 },
    { icon: Brain, text: "Analyzing semantic similarity...", delay: 0.5 },
    { icon: Sparkles, text: "Generating AI response...", delay: 1 }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-effect rounded-2xl p-8 text-center"
    >
      <div className="mb-6">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary-600 to-indigo-600 rounded-full mb-4"
        >
          <Brain className="w-8 h-8 text-white" />
        </motion.div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Processing Your Query</h3>
        <p className="text-gray-600">Our AI is working hard to find the best answer for you</p>
      </div>
      
      <div className="space-y-4">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: step.delay }}
            className="flex items-center gap-3 p-3 bg-white/50 rounded-lg"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: step.delay }}
              className="p-2 bg-primary-100 rounded-lg"
            >
              <step.icon className="w-4 h-4 text-primary-600" />
            </motion.div>
            
            <span className="text-gray-700 font-medium">{step.text}</span>
            
            <div className="ml-auto">
              <motion.div
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: step.delay }}
                className="w-2 h-2 bg-primary-500 rounded-full"
              />
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-6 text-sm text-gray-500">
        This may take a few seconds depending on query complexity
      </div>
    </motion.div>
  );
};

export default LoadingAnimation;
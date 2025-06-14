import React from 'react';
import { motion } from 'framer-motion';
import { Search, Send, Loader2 } from 'lucide-react';

interface QueryInputProps {
  query: string;
  setQuery: (query: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

const QueryInput: React.FC<QueryInputProps> = ({ query, setQuery, onSubmit, isLoading }) => {
  return (
    <motion.div 
      className="glass-effect rounded-2xl p-6 shadow-2xl"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask me anything about Luke Skywalker... (e.g., 'What is Luke's relationship to Darth Vader?')"
            className="w-full pl-12 pr-4 py-4 bg-white/50 border border-gray-200 rounded-xl input-focus resize-none text-gray-900 placeholder-gray-500"
            rows={3}
            disabled={isLoading}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            {query.length > 0 && (
              <span className={query.length > 500 ? 'text-red-500' : ''}>
                {query.length}/500 characters
              </span>
            )}
          </div>
          
          <motion.button
            type="submit"
            disabled={!query.trim() || isLoading || query.length > 500}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Ask Question
              </>
            )}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default QueryInput;
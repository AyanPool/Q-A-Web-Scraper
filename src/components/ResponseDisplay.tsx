import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, AlertCircle, Copy, Check, Volume2 } from 'lucide-react';

interface ResponseDisplayProps {
  answer: string;
  error: string;
  query: string;
}

const ResponseDisplay: React.FC<ResponseDisplayProps> = ({ answer, error, query }) => {
  const [copied, setCopied] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (answer && !error) {
      setIsTyping(true);
      setDisplayedText('');
      
      let index = 0;
      const text = answer;
      const timer = setInterval(() => {
        if (index < text.length) {
          setDisplayedText(text.slice(0, index + 1));
          index++;
        } else {
          setIsTyping(false);
          clearInterval(timer);
        }
      }, 20);

      return () => clearInterval(timer);
    } else if (error) {
      setDisplayedText(error);
      setIsTyping(false);
    }
  }, [answer, error]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(answer || error);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const handleSpeak = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(answer);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  if (!answer && !error) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-effect rounded-2xl p-6 shadow-2xl"
    >
      <div className="flex items-start gap-4 mb-4">
        <div className={`p-2 rounded-lg ${error ? 'bg-red-100' : 'bg-primary-100'}`}>
          {error ? (
            <AlertCircle className="w-5 h-5 text-red-600" />
          ) : (
            <MessageSquare className="w-5 h-5 text-primary-600" />
          )}
        </div>
        
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-2">
            {error ? 'Error' : 'Answer'}
          </h3>
          
          {query && (
            <div className="bg-gray-50 rounded-lg p-3 mb-4 border-l-4 border-primary-500">
              <p className="text-sm text-gray-600 font-medium">Your question:</p>
              <p className="text-gray-800">{query}</p>
            </div>
          )}
          
          <div className={`prose max-w-none ${error ? 'text-red-700' : 'text-gray-800'}`}>
            <p className="leading-relaxed whitespace-pre-wrap">
              {displayedText}
              {isTyping && <span className="animate-pulse">|</span>}
            </p>
          </div>
        </div>
      </div>
      
      {!error && answer && (
        <div className="flex items-center gap-2 pt-4 border-t border-gray-200">
          <motion.button
            onClick={handleCopy}
            className="btn-secondary flex items-center gap-2 text-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-green-600" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy
              </>
            )}
          </motion.button>
          
          {typeof window !== 'undefined' && 'speechSynthesis' in window && (
            <motion.button
              onClick={handleSpeak}
              className="btn-secondary flex items-center gap-2 text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Volume2 className="w-4 h-4" />
              Listen
            </motion.button>
          )}
          
          <div className="ml-auto text-xs text-gray-500">
            Powered by Gemini AI
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ResponseDisplay;
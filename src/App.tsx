import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MessageCircle, Brain, Sparkles, Clock, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import Header from './components/Header';
import QueryInput from './components/QueryInput';
import ResponseDisplay from './components/ResponseDisplay';
import FeatureCard from './components/FeatureCard';
import LoadingAnimation from './components/LoadingAnimation';

interface QueryHistory {
  id: string;
  query: string;
  answer: string;
  timestamp: Date;
  status: 'success' | 'error';
}

function App() {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [queryHistory, setQueryHistory] = useState<QueryHistory[]>([]);
  const [error, setError] = useState('');
  const responseRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isLoading) return;

    setIsLoading(true);
    setError('');
    setCurrentAnswer('');

    try {
      const response = await fetch('http://localhost:5000/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: query.trim() }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      const newQuery: QueryHistory = {
        id: Date.now().toString(),
        query: query.trim(),
        answer: data.answer,
        timestamp: new Date(),
        status: 'success'
      };

      setCurrentAnswer(data.answer);
      setQueryHistory(prev => [newQuery, ...prev.slice(0, 4)]);
      setQuery('');

      // Scroll to response
      setTimeout(() => {
        responseRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      
      const errorQuery: QueryHistory = {
        id: Date.now().toString(),
        query: query.trim(),
        answer: errorMessage,
        timestamp: new Date(),
        status: 'error'
      };
      
      setQueryHistory(prev => [errorQuery, ...prev.slice(0, 4)]);
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Advanced semantic similarity matching to find the most relevant content chunks"
    },
    {
      icon: Search,
      title: "Wikipedia Integration",
      description: "Direct access to Wikipedia's vast knowledge base with intelligent content extraction"
    },
    {
      icon: Sparkles,
      title: "Gemini AI Responses",
      description: "Powered by Google's Gemini AI for accurate, context-aware answers"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Powered by AI & Wikipedia
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Ask Anything About
            <span className="bg-gradient-to-r from-primary-600 to-indigo-600 bg-clip-text text-transparent">
              {" "}Luke Skywalker
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Get instant, accurate answers about Luke Skywalker using our AI-powered Wikipedia scraper. 
            Ask complex questions and receive detailed, contextual responses.
          </p>
        </motion.div>

        {/* Query Input Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <QueryInput
            query={query}
            setQuery={setQuery}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </motion.div>

        {/* Loading Animation */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="max-w-4xl mx-auto mb-8"
            >
              <LoadingAnimation />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Response Display */}
        <div ref={responseRef}>
          <AnimatePresence>
            {(currentAnswer || error) && !isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl mx-auto mb-12"
              >
                <ResponseDisplay
                  answer={currentAnswer}
                  error={error}
                  query={queryHistory[0]?.query || ''}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Query History */}
        {queryHistory.length > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-4xl mx-auto mb-12"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Clock className="w-6 h-6 text-primary-600" />
              Recent Queries
            </h3>
            
            <div className="space-y-4">
              {queryHistory.slice(1).map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="glass-effect rounded-xl p-6"
                >
                  <div className="flex items-start gap-3 mb-3">
                    {item.status === 'success' ? (
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 mb-1">{item.query}</p>
                      <p className="text-sm text-gray-500">
                        {item.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className={`text-sm p-3 rounded-lg ${
                    item.status === 'success' 
                      ? 'bg-gray-50 text-gray-700' 
                      : 'bg-red-50 text-red-700'
                  }`}>
                    {item.answer.length > 200 
                      ? `${item.answer.substring(0, 200)}...` 
                      : item.answer
                    }
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            How It Works
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={index * 0.2}
              />
            ))}
          </div>
        </motion.div>

        {/* Example Queries */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="max-w-4xl mx-auto mt-16 text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Try These Example Queries</h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "What is Luke Skywalker's relationship to Darth Vader?",
              "How did Luke become a Jedi?",
              "What happened to Luke in the sequel trilogy?",
              "Who trained Luke Skywalker?"
            ].map((example, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                onClick={() => setQuery(example)}
                className="btn-secondary text-left p-4 hover:bg-primary-50 hover:border-primary-200"
              >
                <MessageCircle className="w-4 h-4 inline mr-2 text-primary-600" />
                {example}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}

export default App;
import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import RecommendationTab from './components/RecommendationTab';
import BrowseTab from './components/BrowseTab';
import AnalyticsTab from './components/AnalyticsTab';
import { ContentBasedRecommendationEngine } from './utils/recommendationEngine';
import { movieDataset } from './data/movieDataset';

function App() {
  const [activeTab, setActiveTab] = useState('recommendations');

  // Initialize the recommendation engine
  const engine = useMemo(() => {
    return new ContentBasedRecommendationEngine(movieDataset);
  }, []);

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'recommendations':
        return <RecommendationTab engine={engine} />;
      case 'browse':
        return <BrowseTab engine={engine} />;
      case 'analytics':
        return <AnalyticsTab engine={engine} />;
      default:
        return <RecommendationTab engine={engine} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-950">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderActiveTab()}
      </main>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Project Info */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">
                Netflix ML Recommendation System
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                An advanced content-based filtering system that leverages machine learning 
                algorithms to deliver personalized movie recommendations. Built with modern 
                web technologies and sophisticated NLP techniques.
              </p>
              <div className="flex items-center space-x-2 text-sm">
                <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold">
                  PRODUCTION READY
                </span>
                <span className="text-gray-500">•</span>
                <span className="text-gray-400">Enterprise Grade</span>
              </div>
            </div>

            {/* Technical Stack */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Technology Stack</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-400">React + TypeScript</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-400">TF-IDF Vectorization</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-gray-400">Cosine Similarity</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-gray-400">Natural Language Processing</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-gray-400">Tailwind CSS</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                  <span className="text-gray-400">Recharts Analytics</span>
                </div>
              </div>
            </div>

            {/* Developer Info */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Developed By</h4>
              <div className="space-y-3">
                <div>
                  <h5 className="text-white font-medium">Ajay Dhangar</h5>
                  <p className="text-gray-400 text-sm">Full-Stack Developer & ML Engineer</p>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Passionate about creating intelligent systems that enhance user experiences 
                  through the power of machine learning and modern web development.
                </p>
                <div className="flex space-x-4 text-sm">
                  <a href="#" className="text-red-400 hover:text-red-300 transition-colors">
                    Portfolio
                  </a>
                  <a href="#" className="text-red-400 hover:text-red-300 transition-colors">
                    GitHub
                  </a>
                  <a href="#" className="text-red-400 hover:text-red-300 transition-colors">
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 mt-8 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-center md:text-left">
                <p className="text-gray-400 text-sm">
                  © 2025 Ajay Dhangar. Crafted with precision and powered by artificial intelligence.
                </p>
              </div>
              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <span className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>System Online</span>
                </span>
                <span>•</span>
                <span>Machine Learning</span>
                <span>•</span>
                <span>Content-Based Filtering</span>
                <span>•</span>
                <span>Recommendation Engine</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
import React from 'react';
import { Film, Play, BarChart3, Sparkles } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'recommendations', label: 'AI Recommendations', icon: Sparkles },
    { id: 'browse', label: 'Movie Catalog', icon: Play },
    { id: 'analytics', label: 'Data Insights', icon: BarChart3 }
  ];

  return (
    <header className="bg-black border-b border-gray-800 sticky top-0 z-50 backdrop-blur-sm bg-black/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-red-600 to-red-700 rounded-xl shadow-lg">
              <Film className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Netflix ML Engine</h1>
              <p className="text-xs text-gray-400 font-medium">
                Powered by Content-Based Filtering • By Ajay Dhangar
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex space-x-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl transition-all duration-300 font-medium ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-600/25 transform scale-105'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800/50 hover:scale-105'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
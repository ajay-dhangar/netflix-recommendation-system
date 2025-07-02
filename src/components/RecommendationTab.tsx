import React, { useState } from 'react';
import { AlertTriangle, Lightbulb, Target, Brain, Zap } from 'lucide-react';
import SearchBar, { FilterOptions } from './SearchBar';
import MovieCard from './MovieCard';
import { ContentBasedRecommendationEngine, RecommendationResult } from '../utils/recommendationEngine';

interface RecommendationTabProps {
  engine: ContentBasedRecommendationEngine;
}

const RecommendationTab: React.FC<RecommendationTabProps> = ({ engine }) => {
  const [recommendations, setRecommendations] = useState<RecommendationResult[]>([]);
  const [searchedMovie, setSearchedMovie] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setError('Please enter a movie title to discover your next favorite film');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const results = engine.recommendMovies(query, 8);
      
      if (results.length === 0) {
        setError(`No movie found matching "${query}". Try searching for popular titles like: ${engine.getAllGenres().slice(0, 3).join(', ')} movies`);
        setRecommendations([]);
      } else {
        setRecommendations(results);
        setSearchedMovie(query);
      }
    } catch (err) {
      setError('Our AI recommendation engine encountered an issue. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFilters = (filters: FilterOptions) => {
    // Filters would be applied to the recommendation results here
    // For now, we'll keep the existing recommendations
  };

  const popularMovies = [
    'The Dark Knight',
    'Inception',
    'Pulp Fiction',
    'The Matrix',
    'Forrest Gump'
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-red-900 via-gray-900 to-black rounded-2xl p-8 border border-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-transparent"></div>
        <div className="relative z-10">
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-2xl shadow-lg">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-white mb-2">
                AI-Powered Movie Discovery
              </h2>
              <p className="text-red-400 text-lg font-medium">
                Engineered by Ajay Dhangar • Next-Generation Recommendation System
              </p>
            </div>
          </div>
          
          <p className="text-gray-300 text-lg mb-8 leading-relaxed max-w-4xl">
            Experience the future of personalized entertainment with our advanced content-based filtering system. 
            Our proprietary algorithm analyzes over 15 different movie attributes including genres, cast dynamics, 
            directorial styles, and narrative themes to deliver recommendations that truly match your taste.
          </p>
          
          {/* Key Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <div className="flex items-center space-x-3 mb-4">
                <Zap className="w-6 h-6 text-yellow-400" />
                <h3 className="text-white font-semibold">Lightning Fast</h3>
              </div>
              <p className="text-gray-300 text-sm">
                Get instant recommendations powered by optimized TF-IDF vectorization 
                and cosine similarity calculations.
              </p>
            </div>
            
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <div className="flex items-center space-x-3 mb-4">
                <Target className="w-6 h-6 text-red-400" />
                <h3 className="text-white font-semibold">Precision Matching</h3>
              </div>
              <p className="text-gray-300 text-sm">
                Advanced NLP techniques analyze movie metadata to find the most 
                relevant content based on your preferences.
              </p>
            </div>
            
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <div className="flex items-center space-x-3 mb-4">
                <Lightbulb className="w-6 h-6 text-blue-400" />
                <h3 className="text-white font-semibold">Smart Insights</h3>
              </div>
              <p className="text-gray-300 text-sm">
                Understand why each movie was recommended with detailed explanations 
                of matching attributes and similarity scores.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Algorithm Deep Dive */}
      <div className="bg-gray-900 rounded-xl p-8 border border-gray-800">
        <div className="flex items-center space-x-3 mb-6">
          <Brain className="w-6 h-6 text-purple-400" />
          <h3 className="text-2xl font-bold text-white">How Our AI Works</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-8 h-8 bg-red-600 rounded-full text-white font-bold text-sm">1</div>
              <h4 className="text-red-400 font-semibold">Content Analysis</h4>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Our system extracts and processes movie metadata including genres, cast, directors, 
              plot keywords, and narrative themes to create comprehensive content profiles.
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-8 h-8 bg-red-600 rounded-full text-white font-bold text-sm">2</div>
              <h4 className="text-red-400 font-semibold">Vector Transformation</h4>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Advanced TF-IDF (Term Frequency-Inverse Document Frequency) vectorization converts 
              textual content into numerical vectors, enabling mathematical similarity calculations.
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-8 h-8 bg-red-600 rounded-full text-white font-bold text-sm">3</div>
              <h4 className="text-red-400 font-semibold">Similarity Matching</h4>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Cosine similarity algorithms calculate the angular distance between movie vectors, 
              identifying content with the highest relevance scores for personalized recommendations.
            </p>
          </div>
        </div>
      </div>

      {/* Search Interface */}
      <SearchBar 
        onSearch={handleSearch}
        onFilterChange={handleFilters}
        availableGenres={engine.getAllGenres()}
      />

      {/* Popular Suggestions */}
      {recommendations.length === 0 && !loading && (
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-8 border border-gray-700">
          <h3 className="text-white font-bold text-xl mb-4">
            🎬 Start Your Discovery Journey
          </h3>
          <p className="text-gray-300 mb-6">
            Try searching for these critically acclaimed films to see our AI recommendation engine in action:
          </p>
          <div className="flex flex-wrap gap-3">
            {popularMovies.map((movie) => (
              <button
                key={movie}
                onClick={() => handleSearch(movie)}
                className="bg-gray-800 hover:bg-gradient-to-r hover:from-red-600 hover:to-red-700 text-gray-300 hover:text-white px-6 py-3 rounded-xl transition-all duration-300 font-medium transform hover:scale-105 shadow-lg hover:shadow-red-600/25"
              >
                {movie}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-16">
          <div className="text-center">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-700 border-t-red-600 mx-auto mb-6"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Brain className="w-6 h-6 text-red-400 animate-pulse" />
              </div>
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">AI Engine Processing</h3>
            <p className="text-gray-400">
              Analyzing movie features and calculating similarity vectors...
            </p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-gradient-to-r from-red-900/20 to-red-800/20 border border-red-800/50 rounded-xl p-6 backdrop-blur-sm">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-6 h-6 text-red-400 flex-shrink-0" />
            <div>
              <h4 className="text-red-300 font-semibold mb-1">Recommendation Error</h4>
              <p className="text-red-200">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Recommendations Results */}
      {recommendations.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-3xl font-bold text-white mb-2">
                🎯 Perfect Matches for "{searchedMovie}"
              </h3>
              <p className="text-gray-400">
                Our AI found {recommendations.length} highly compatible movies based on content analysis
              </p>
            </div>
            <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-3 rounded-xl shadow-lg">
              <span className="text-white font-semibold">
                {recommendations.length} Recommendations
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {recommendations.map((result) => (
              <MovieCard
                key={result.movie.id}
                movie={result.movie}
                similarity={result.similarity}
                explanation={result.explanation}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecommendationTab;
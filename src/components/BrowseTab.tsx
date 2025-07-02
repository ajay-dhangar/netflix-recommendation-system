import React, { useState, useMemo } from 'react';
import { Filter, Grid, List, Star, Search, Film } from 'lucide-react';
import MovieCard from './MovieCard';
import { ContentBasedRecommendationEngine } from '../utils/recommendationEngine';
import { Movie } from '../data/movieDataset';

interface BrowseTabProps {
  engine: ContentBasedRecommendationEngine;
}

const BrowseTab: React.FC<BrowseTabProps> = ({ engine }) => {
  const [selectedGenre, setSelectedGenre] = useState<string>('');
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>('rating');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const allMovies = useMemo(() => {
    // Get all movies from the engine
    const stats = engine.getDatasetStats();
    return engine.getMoviesByRating(0); // Get all movies
  }, [engine]);

  const filteredAndSortedMovies = useMemo(() => {
    let filtered = allMovies;

    // Apply genre filter
    if (selectedGenre) {
      filtered = engine.getMoviesByGenre(selectedGenre);
    }

    // Apply rating filter
    filtered = filtered.filter(movie => movie.vote_average >= minRating);

    // Sort movies
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.vote_average - a.vote_average;
        case 'year':
          return new Date(b.release_date).getTime() - new Date(a.release_date).getTime();
        case 'title':
          return a.title.localeCompare(b.title);
        case 'revenue':
          return b.revenue - a.revenue;
        default:
          return 0;
      }
    });
  }, [allMovies, selectedGenre, minRating, sortBy, engine]);

  const genres = engine.getAllGenres();

  return (
    <div className="space-y-8">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-blue-900 via-gray-900 to-black rounded-2xl p-8 border border-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-transparent"></div>
        <div className="relative z-10">
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-lg">
              <Film className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-white mb-2">Premium Movie Catalog</h2>
              <p className="text-blue-400 text-lg font-medium">
                Curated by Ajay Dhangar • {allMovies.length} Handpicked Films
              </p>
            </div>
          </div>
          
          <p className="text-gray-300 text-lg leading-relaxed max-w-4xl">
            Explore our meticulously curated collection of cinematic masterpieces spanning {genres.length} genres. 
            Each film has been selected for its artistic merit, cultural impact, and entertainment value. 
            Use our advanced filtering system to discover your next favorite movie.
          </p>
        </div>
      </div>

      {/* Advanced Filters */}
      <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 shadow-xl">
        <div className="flex items-center space-x-3 mb-6">
          <Search className="w-6 h-6 text-gray-400" />
          <h3 className="text-xl font-bold text-white">Smart Discovery Filters</h3>
        </div>
        
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-6">
            {/* Genre Filter */}
            <div className="flex items-center space-x-3">
              <Filter className="w-5 h-5 text-gray-400" />
              <div>
                <label className="block text-gray-400 text-sm font-medium mb-1">Genre</label>
                <select
                  value={selectedGenre}
                  onChange={(e) => setSelectedGenre(e.target.value)}
                  className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[140px]"
                >
                  <option value="">All Genres</option>
                  {genres.map((genre) => (
                    <option key={genre} value={genre}>{genre}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Rating Filter */}
            <div className="flex items-center space-x-3">
              <Star className="w-5 h-5 text-yellow-400" />
              <div>
                <label className="block text-gray-400 text-sm font-medium mb-1">
                  Min Rating: {minRating.toFixed(1)}⭐
                </label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="0.1"
                  value={minRating}
                  onChange={(e) => setMinRating(Number(e.target.value))}
                  className="accent-yellow-500 w-32"
                />
              </div>
            </div>

            {/* Sort Options */}
            <div>
              <label className="block text-gray-400 text-sm font-medium mb-1">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="rating">⭐ Highest Rated</option>
                <option value="year">📅 Latest Release</option>
                <option value="title">🔤 Alphabetical</option>
                <option value="revenue">💰 Box Office</option>
              </select>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="bg-gray-800 px-4 py-2 rounded-lg border border-gray-700">
              <span className="text-gray-400 text-sm font-medium">
                {filteredAndSortedMovies.length} movies found
              </span>
            </div>
            
            <div className="flex bg-gray-800 rounded-lg p-1 border border-gray-700">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded transition-all duration-200 ${
                  viewMode === 'grid' 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded transition-all duration-200 ${
                  viewMode === 'list' 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Movies Grid/List */}
      <div className={
        viewMode === 'grid' 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          : "space-y-4"
      }>
        {filteredAndSortedMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {/* Empty State */}
      {filteredAndSortedMovies.length === 0 && (
        <div className="text-center py-16">
          <div className="bg-gray-900 rounded-2xl p-12 border border-gray-800 max-w-md mx-auto">
            <Filter className="w-16 h-16 mx-auto mb-6 text-gray-600" />
            <h3 className="text-2xl font-bold text-white mb-4">No Movies Found</h3>
            <p className="text-gray-400 mb-6">
              Your current filters didn't match any movies in our catalog. 
              Try adjusting your criteria to discover more films.
            </p>
            <button
              onClick={() => {
                setSelectedGenre('');
                setMinRating(0);
                setSortBy('rating');
              }}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105"
            >
              Reset Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BrowseTab;
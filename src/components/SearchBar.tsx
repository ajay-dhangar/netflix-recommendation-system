import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onFilterChange: (filters: FilterOptions) => void;
  availableGenres: string[];
}

export interface FilterOptions {
  genre: string;
  minRating: number;
  year: number | null;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onFilterChange, availableGenres }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    genre: '',
    minRating: 0,
    year: null
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleFilterChange = (newFilters: Partial<FilterOptions>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const clearFilters = () => {
    const emptyFilters = { genre: '', minRating: 0, year: null };
    setFilters(emptyFilters);
    onFilterChange(emptyFilters);
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

  return (
    <div className="bg-gray-900 rounded-xl p-6 shadow-xl border border-gray-800">
      {/* Search Form */}
      <form onSubmit={handleSearch} className="flex items-center space-x-4 mb-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a movie to get recommendations..."
            className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>
        
        <button
          type="submit"
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center space-x-2"
        >
          <Search className="w-4 h-4" />
          <span>Get Recommendations</span>
        </button>
        
        <button
          type="button"
          onClick={() => setShowFilters(!showFilters)}
          className={`p-3 rounded-lg font-semibold transition-colors duration-200 ${
            showFilters ? 'bg-red-600 text-white' : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
          }`}
        >
          <Filter className="w-4 h-4" />
        </button>
      </form>

      {/* Filters */}
      {showFilters && (
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold">Advanced Filters</h3>
            <button
              onClick={clearFilters}
              className="text-gray-400 hover:text-white flex items-center space-x-1 text-sm"
            >
              <X className="w-4 h-4" />
              <span>Clear</span>
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Genre Filter */}
            <div>
              <label className="block text-gray-400 text-sm font-medium mb-2">Genre</label>
              <select
                value={filters.genre}
                onChange={(e) => handleFilterChange({ genre: e.target.value })}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">All Genres</option>
                {availableGenres.map((genre) => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>
            </div>

            {/* Rating Filter */}
            <div>
              <label className="block text-gray-400 text-sm font-medium mb-2">
                Min Rating: {filters.minRating.toFixed(1)}
              </label>
              <input
                type="range"
                min="0"
                max="10"
                step="0.1"
                value={filters.minRating}
                onChange={(e) => handleFilterChange({ minRating: Number(e.target.value) })}
                className="w-full accent-red-600"
              />
            </div>

            {/* Year Filter */}
            <div>
              <label className="block text-gray-400 text-sm font-medium mb-2">Release Year</label>
              <select
                value={filters.year || ''}
                onChange={(e) => handleFilterChange({ year: e.target.value ? Number(e.target.value) : null })}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">All Years</option>
                {years.map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
import React from 'react';
import { Star, Clock, Calendar, TrendingUp } from 'lucide-react';
import { Movie } from '../data/movieDataset';

interface MovieCardProps {
  movie: Movie;
  similarity?: number;
  explanation?: string[];
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, similarity, explanation }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatYear = (dateString: string) => {
    return new Date(dateString).getFullYear();
  };

  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group">
      {/* Poster Image */}
      <div className="relative overflow-hidden">
        <img
          src={movie.poster_url}
          alt={movie.title}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Similarity Score */}
        {similarity !== undefined && (
          <div className="absolute top-3 right-3 bg-red-600 text-white px-2 py-1 rounded-full text-sm font-semibold flex items-center space-x-1">
            <TrendingUp className="w-4 h-4" />
            <span>{(similarity * 100).toFixed(1)}%</span>
          </div>
        )}
        
        {/* Rating */}
        <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded-full text-sm font-semibold flex items-center space-x-1">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span>{movie.vote_average.toFixed(1)}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors">
          {movie.title}
        </h3>
        
        {/* Movie Info */}
        <div className="flex items-center space-x-4 text-gray-400 text-sm mb-3">
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>{formatYear(movie.release_date)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{movie.runtime}min</span>
          </div>
        </div>

        {/* Genres */}
        <div className="flex flex-wrap gap-2 mb-3">
          {movie.genres.slice(0, 3).map((genre) => (
            <span
              key={genre}
              className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-full"
            >
              {genre}
            </span>
          ))}
        </div>

        {/* Overview */}
        <p className="text-gray-300 text-sm mb-4 line-clamp-3">
          {movie.overview}
        </p>

        {/* Director and Cast */}
        <div className="space-y-2 mb-4">
          <div>
            <span className="text-gray-400 text-xs">Director:</span>
            <span className="text-white text-sm ml-2">{movie.director}</span>
          </div>
          <div>
            <span className="text-gray-400 text-xs">Cast:</span>
            <span className="text-white text-sm ml-2">
              {movie.cast.slice(0, 2).join(', ')}
            </span>
          </div>
        </div>

        {/* Explanation */}
        {explanation && explanation.length > 0 && (
          <div className="bg-gray-800 rounded-lg p-3 border-l-4 border-red-600">
            <h4 className="text-red-400 text-sm font-semibold mb-2">Why recommended:</h4>
            <ul className="space-y-1">
              {explanation.slice(0, 3).map((reason, index) => (
                <li key={index} className="text-gray-300 text-xs flex items-start">
                  <span className="text-red-400 mr-2">•</span>
                  {reason}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Financial Info */}
        <div className="flex justify-between items-center pt-3 border-t border-gray-800 text-xs text-gray-400">
          <span>Budget: {formatCurrency(movie.budget)}</span>
          <span>Revenue: {formatCurrency(movie.revenue)}</span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
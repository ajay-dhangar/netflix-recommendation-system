import { Movie } from '../data/movieDataset';

export interface TFIDFVector {
  [term: string]: number;
}

export interface RecommendationResult {
  movie: Movie;
  similarity: number;
  explanation: string[];
}

export class ContentBasedRecommendationEngine {
  private vocabulary: Set<string> = new Set();
  private documentFrequency: Map<string, number> = new Map();
  private tfidfVectors: Map<number, TFIDFVector> = new Map();
  
  constructor(private movies: Movie[]) {
    this.buildVocabulary();
    this.calculateTFIDF();
  }

  private tokenize(text: string): string[] {
    return text
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(token => token.length > 2);
  }

  private buildVocabulary(): void {
    // Build vocabulary from all movies
    this.movies.forEach(movie => {
      const content = this.getMovieContent(movie);
      const tokens = this.tokenize(content);
      
      const uniqueTokens = new Set(tokens);
      uniqueTokens.forEach(token => {
        this.vocabulary.add(token);
        this.documentFrequency.set(
          token, 
          (this.documentFrequency.get(token) || 0) + 1
        );
      });
    });
  }

  private getMovieContent(movie: Movie): string {
    return [
      movie.title,
      movie.overview,
      movie.genres.join(' '),
      movie.cast.join(' '),
      movie.director,
      movie.keywords.join(' ')
    ].join(' ');
  }

  private calculateTF(tokens: string[]): Map<string, number> {
    const tf = new Map<string, number>();
    const totalTokens = tokens.length;
    
    tokens.forEach(token => {
      tf.set(token, (tf.get(token) || 0) + 1);
    });
    
    // Normalize by total tokens
    tf.forEach((count, token) => {
      tf.set(token, count / totalTokens);
    });
    
    return tf;
  }

  private calculateIDF(term: string): number {
    const df = this.documentFrequency.get(term) || 0;
    return Math.log(this.movies.length / (df + 1));
  }

  private calculateTFIDF(): void {
    this.movies.forEach(movie => {
      const content = this.getMovieContent(movie);
      const tokens = this.tokenize(content);
      const tf = this.calculateTF(tokens);
      const tfidfVector: TFIDFVector = {};
      
      this.vocabulary.forEach(term => {
        const tfValue = tf.get(term) || 0;
        const idfValue = this.calculateIDF(term);
        tfidfVector[term] = tfValue * idfValue;
      });
      
      this.tfidfVectors.set(movie.id, tfidfVector);
    });
  }

  private cosineSimilarity(vectorA: TFIDFVector, vectorB: TFIDFVector): number {
    let dotProduct = 0;
    let normA = 0;
    let normB = 0;
    
    this.vocabulary.forEach(term => {
      const a = vectorA[term] || 0;
      const b = vectorB[term] || 0;
      
      dotProduct += a * b;
      normA += a * a;
      normB += b * b;
    });
    
    const magnitude = Math.sqrt(normA) * Math.sqrt(normB);
    return magnitude === 0 ? 0 : dotProduct / magnitude;
  }

  private getExplanation(movieA: Movie, movieB: Movie): string[] {
    const explanations: string[] = [];
    
    // Genre similarity
    const commonGenres = movieA.genres.filter(genre => 
      movieB.genres.includes(genre)
    );
    if (commonGenres.length > 0) {
      explanations.push(`Shares genres: ${commonGenres.join(', ')}`);
    }
    
    // Director similarity
    if (movieA.director === movieB.director) {
      explanations.push(`Same director: ${movieA.director}`);
    }
    
    // Cast similarity
    const commonCast = movieA.cast.filter(actor => 
      movieB.cast.includes(actor)
    );
    if (commonCast.length > 0) {
      explanations.push(`Common cast: ${commonCast.slice(0, 2).join(', ')}`);
    }
    
    // Keyword similarity
    const commonKeywords = movieA.keywords.filter(keyword => 
      movieB.keywords.includes(keyword)
    );
    if (commonKeywords.length > 0) {
      explanations.push(`Similar themes: ${commonKeywords.slice(0, 3).join(', ')}`);
    }
    
    return explanations;
  }

  public recommendMovies(movieTitle: string, topN: number = 5): RecommendationResult[] {
    const targetMovie = this.movies.find(
      movie => movie.title.toLowerCase().includes(movieTitle.toLowerCase())
    );
    
    if (!targetMovie) {
      return [];
    }
    
    const targetVector = this.tfidfVectors.get(targetMovie.id);
    if (!targetVector) {
      return [];
    }
    
    const similarities: RecommendationResult[] = [];
    
    this.movies.forEach(movie => {
      if (movie.id === targetMovie.id) return;
      
      const movieVector = this.tfidfVectors.get(movie.id);
      if (!movieVector) return;
      
      const similarity = this.cosineSimilarity(targetVector, movieVector);
      const explanation = this.getExplanation(targetMovie, movie);
      
      similarities.push({
        movie,
        similarity,
        explanation
      });
    });
    
    return similarities
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, topN);
  }

  public getMoviesByGenre(genre: string): Movie[] {
    return this.movies.filter(movie => 
      movie.genres.some(g => g.toLowerCase().includes(genre.toLowerCase()))
    );
  }

  public getMoviesByRating(minRating: number): Movie[] {
    return this.movies.filter(movie => movie.vote_average >= minRating);
  }

  public getMoviesByYear(year: number): Movie[] {
    return this.movies.filter(movie => 
      new Date(movie.release_date).getFullYear() === year
    );
  }

  public getAllGenres(): string[] {
    const genres = new Set<string>();
    this.movies.forEach(movie => {
      movie.genres.forEach(genre => genres.add(genre));
    });
    return Array.from(genres).sort();
  }

  public getDatasetStats() {
    const genres = this.getAllGenres();
    const avgRating = this.movies.reduce((sum, movie) => sum + movie.vote_average, 0) / this.movies.length;
    const avgRuntime = this.movies.reduce((sum, movie) => sum + movie.runtime, 0) / this.movies.length;
    
    return {
      totalMovies: this.movies.length,
      totalGenres: genres.length,
      averageRating: avgRating,
      averageRuntime: avgRuntime,
      vocabularySize: this.vocabulary.size,
      genres
    };
  }
}
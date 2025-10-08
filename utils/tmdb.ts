import axios from 'axios';

const API_KEY = '935386f1adb33802dffaa2d89bcf4539';
const BASE_URL = 'https://api.themoviedb.org/3';

const tmdb = axios.create({
  baseURL: BASE_URL,
  params: { api_key: API_KEY, language: 'en-US' },
});

export async function getTrendingMovies() {
  const res = await tmdb.get('/trending/movie/day');
  return res.data.results;
}

export async function getPopularMovies(page = 1) {
  const res = await tmdb.get('/movie/popular', { params: { page, sort_by: 'popularity.desc' } });
  return res.data;
}

export async function getMovieDetails(id: number) {
  const res = await tmdb.get(`/movie/${id}`);
  return res.data;
}

// Get all available movie genres
export async function getMovieGenres() {
  const res = await tmdb.get('/genre/movie/list');
  return res.data.genres;
}

// Get movies for a specific genre (with pagination)
export async function getMoviesByGenre(genreId: number, page = 1) {
  const res = await tmdb.get('/discover/movie', {
    params: { with_genres: genreId, page, sort_by: 'popularity.desc' },
  });
  return res.data.results;
}

// Get movie videos (trailers, teasers, clips)
export async function getMovieVideos(id: number) {
  const res = await tmdb.get(`/movie/${id}/videos`);
  return res.data.results;
}

// Get movie credits (cast & crew)
export async function getMovieCredits(id: number) {
  const res = await tmdb.get(`/movie/${id}/credits`);
  return res.data;
}

// Get movie recommendations
export async function getMovieRecommendations(id: number, page = 1) {
  const res = await tmdb.get(`/movie/${id}/recommendations`, { params: { page } });
  return res.data.results;
}

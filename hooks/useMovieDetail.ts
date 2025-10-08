// hooks/useMovieDetail.ts
import { useMovieLists } from '@/hooks/useMovieLists';
import { TMDBMovie } from '@/type/types';
import {
  getMovieCredits,
  getMovieDetails,
  getMovieRecommendations,
  getMovieVideos,
} from '@/utils/tmdb';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

export const useMovieDetail = (id?: string | string[]) => {
  const [movie, setMovie] = useState<TMDBMovie | null>(null);
  const [loading, setLoading] = useState(true);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [cast, setCast] = useState<any[]>([]);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [selectedCast, setSelectedCast] = useState<any | null>(null);
  const [inWatchlist, setInWatchlist] = useState(false);
  const [watchlistId, setWatchlistId] = useState<string | null>(null);

  const {
    lists,
    createList,
    addMovieToList,
    removeMovieFromList,
    loading: listsLoading,
  } = useMovieLists();

  // Fetch movie details, cast, videos, and recommendations
  useEffect(() => {
    if (!id) return;
    const fetchMovie = async () => {
      try {
        const [movieData, videos, credits, recs] = await Promise.all([
          getMovieDetails(Number(id)),
          getMovieVideos(Number(id)),
          getMovieCredits(Number(id)),
          getMovieRecommendations(Number(id)),
        ]);

        setMovie(movieData);

        const trailer = videos.find((v: any) => v.type === 'Trailer' && v.site === 'YouTube');
        if (trailer) setTrailerKey(trailer.key);

        setCast(credits.cast || []);
        setRecommendations(recs || []);
      } catch (err) {
        console.error('Movie fetch failed:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  // Watchlist sync
  useEffect(() => {
    if (!id || listsLoading) return;

    const watchlist = lists.find(l => l.name.toLowerCase() === 'watchlist');

    if (watchlist) {
      setWatchlistId(watchlist.id);
      const exists = watchlist.movies.some(m => m.id === Number(id));
      setInWatchlist(exists);
    } else {
      setWatchlistId(null);
      setInWatchlist(false);
    }
  }, [id, lists, listsLoading]);

  // Add/Remove Watchlist
  const toggleWatchlist = async () => {
    if (!movie) return;

    let targetListId = watchlistId;
    let targetList = lists.find(l => l.name.toLowerCase() === 'watchlist');

    // Create "Watchlist" if not exists
    if (!targetList) {
      const createdList = await createList('Watchlist');
      if (!createdList) {
        Alert.alert('Error', 'Could not create or locate Watchlist.');
        return;
      }
      targetListId = createdList.id;
      setWatchlistId(createdList.id);
    } else {
      targetListId = targetList.id;
    }

    if (inWatchlist) {
      await removeMovieFromList(targetListId!, movie.id);
      Alert.alert('Removed', `${movie.title} has been removed from your Watchlist.`);
    } else {
      await addMovieToList(targetListId!, movie);
      Alert.alert('Added', `${movie.title} has been added to your Watchlist.`);
    }
  };

  return {
    movie,
    loading,
    listsLoading,
    trailerKey,
    cast,
    recommendations,
    selectedCast,
    setSelectedCast,
    inWatchlist,
    toggleWatchlist,
  };
};

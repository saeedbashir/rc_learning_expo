// hooks/useMovieDetail.ts
import { useMovieLists } from '@/hooks/useMovieLists';
import {
  useGetMovieCreditsQuery,
  useGetMovieDetailsQuery,
  useGetMovieRecommendationsQuery,
  useGetMovieVideosQuery,
} from '@/redux/tmdb';
import { useEffect, useMemo, useState } from 'react';
import { Alert } from 'react-native';

export const useMovieDetail = (id?: string | string[]) => {
  const movieId = Number(id);
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

  // Fetch data with RTK Query
  const {
    data: movie,
    isLoading: detailsLoading,
    isError: detailsError,
  } = useGetMovieDetailsQuery(movieId, { skip: !movieId });

  const { data: videos, isLoading: videosLoading } = useGetMovieVideosQuery(movieId, {
    skip: !movieId,
  });

  const { data: credits, isLoading: creditsLoading } = useGetMovieCreditsQuery(movieId, {
    skip: !movieId,
  });

  const { data: recommendations, isLoading: recsLoading } = useGetMovieRecommendationsQuery(
    { id: movieId, page: 1 },
    { skip: !movieId },
  );

  const loading = detailsLoading || videosLoading || creditsLoading || recsLoading || listsLoading;

  // Extract trailer key
  const trailerKey = useMemo(() => {
    if (!videos) return null;
    const trailer = videos.results?.find((v: any) => v.type === 'Trailer' && v.site === 'YouTube');
    return trailer ? trailer.key : null;
  }, [videos]);

  // Extract cast
  const cast = useMemo(() => credits?.cast || [], [credits]);

  // Watchlist Sync
  useEffect(() => {
    if (!movieId || listsLoading) return;

    const watchlist = lists.find(l => l.name.toLowerCase() === 'watchlist');
    if (watchlist) {
      setWatchlistId(watchlist.id);
      setInWatchlist(watchlist.movies.some(m => m.id === movieId));
    } else {
      setWatchlistId(null);
      setInWatchlist(false);
    }
  }, [movieId, lists, listsLoading]);

  // Toggle watchlist
  const toggleWatchlist = async () => {
    if (!movie) return;

    let targetListId = watchlistId;
    let targetList = lists.find(l => l.name.toLowerCase() === 'watchlist');

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
    trailerKey,
    cast,
    recommendations: recommendations || [],
    selectedCast,
    setSelectedCast,
    inWatchlist,
    toggleWatchlist,
  };
};

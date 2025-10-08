// hooks/useGenresMovies.ts
import { MovieGenre, SectionData, TMDBMovie } from '@/type/types';
import { getMovieGenres, getMoviesByGenre } from '@/utils/tmdb';
import { useCallback, useEffect, useState } from 'react';

export const useSearchMovies = () => {
  const [sections, setSections] = useState<SectionData[]>([]);
  const [loading, setLoading] = useState(true);

  // Helper: merge and remove duplicates by movie ID
  const mergeUniqueMovies = useCallback((existing: TMDBMovie[], incoming: TMDBMovie[]) => {
    const all = [...existing, ...incoming];
    const unique = Array.from(new Map(all.map(m => [m.id, m])).values());
    return unique;
  }, []);

  useEffect(() => {
    const fetchGenresAndMovies = async () => {
      try {
        const genres: MovieGenre[] = await getMovieGenres();
        if (!genres?.length) return;

        const initialSections: SectionData[] = [];

        // Preload first 3 genres (parallel to speed up)
        const firstBatch = await Promise.all(
          genres.slice(0, 3).map(async g => {
            const movies = await getMoviesByGenre(g.id, 1);
            if (movies.length) {
              return {
                title: g.name,
                genreId: g.id,
                data: movies,
                page: 1,
                totalPages: 1,
                loadingMore: false,
              };
            }
            return null;
          }),
        );

        setSections(firstBatch.filter(Boolean) as SectionData[]);

        // Fetch the rest progressively (non-blocking)
        for (let i = 3; i < genres.length; i++) {
          const movies = await getMoviesByGenre(genres[i].id, 1);
          if (movies.length) {
            setSections(prev => [
              ...prev,
              {
                title: genres[i].name,
                genreId: genres[i].id,
                data: movies,
                page: 1,
                totalPages: 1,
                loadingMore: false,
              },
            ]);
          }
        }
      } catch (err) {
        console.error('Error fetching genres or movies:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGenresAndMovies();
  }, []);

  const loadMoreMovies = useCallback(
    async (genreId: number) => {
      // Show loading state for that genre
      setSections(prev => prev.map(s => (s.genreId === genreId ? { ...s, loadingMore: true } : s)));

      try {
        const section = sections.find(s => s.genreId === genreId);
        if (!section) return;

        const nextPage = section.page + 1;
        const movies: TMDBMovie[] = await getMoviesByGenre(genreId, nextPage);

        // Merge without duplicates
        setSections(prev =>
          prev.map(s =>
            s.genreId === genreId
              ? {
                  ...s,
                  data: mergeUniqueMovies(s.data, movies),
                  page: nextPage,
                  loadingMore: false,
                }
              : s,
          ),
        );
      } catch (err) {
        console.error('Error loading more movies:', err);
        setSections(prev =>
          prev.map(s => (s.genreId === genreId ? { ...s, loadingMore: false } : s)),
        );
      }
    },
    [sections, mergeUniqueMovies],
  );

  return { sections, loading, loadMoreMovies };
};

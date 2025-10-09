// hooks/useSearchMovies.ts
import { useGetMovieGenresQuery, useLazyGetMoviesByGenreLazyQuery } from '@/redux/tmdb';
import { MovieGenre, SectionData, TMDBMovie } from '@/type/types';
import { useCallback, useEffect, useState } from 'react';

export const useSearchMovies = () => {
  const [sections, setSections] = useState<SectionData[]>([]);
  const [loading, setLoading] = useState(true);

  const {
    data: genres,
    error: genresError,
    isLoading: genresLoading,
  } = useGetMovieGenresQuery(undefined);

  const [fetchMoviesByGenre] = useLazyGetMoviesByGenreLazyQuery();

  // Merge two arrays of movies while keeping unique movies by id
  const mergeUniqueMovies = useCallback((existing: TMDBMovie[], incoming: TMDBMovie[]) => {
    const all = [...existing, ...incoming];
    const unique = Array.from(new Map(all.map(m => [m.id, m])).values());
    return unique;
  }, []);

  useEffect(() => {
    const fetchInitialSections = async () => {
      if (!genres?.genres || genres.genres.length === 0) {
        setLoading(false);
        return;
      }

      const genreList: MovieGenre[] = genres.genres;

      try {
        // Show loader while fetching first batch
        setLoading(true);

        // Fetch first 3 genres in parallel
        const firstBatch = await Promise.all(
          genreList.slice(0, 3).map(async (g: MovieGenre) => {
            const res: TMDBMovie[] = await fetchMoviesByGenre({
              genreId: g.id,
              page: 1,
            }).unwrap();

            if (res.length) {
              return {
                title: g.name,
                genreId: g.id,
                data: res,
                page: 1,
                totalPages: 1,
                loadingMore: false,
              } as SectionData;
            }
            return null;
          }),
        );

        setSections(firstBatch.filter(Boolean) as SectionData[]);

        // Fetch remaining genres sequentially (optional)
        for (let i = 3; i < genreList.length; i++) {
          const g = genreList[i];
          const res: TMDBMovie[] = await fetchMoviesByGenre({
            genreId: g.id,
            page: 1,
          }).unwrap();

          if (res.length) {
            setSections(prev => [
              ...prev,
              {
                title: g.name,
                genreId: g.id,
                data: res,
                page: 1,
                totalPages: 1,
                loadingMore: false,
              } as SectionData,
            ]);
          }
        }
      } catch (err) {
      } finally {
        // Hide loader after first batch
        setLoading(false);
      }
    };

    // Only fetch when genres are loaded
    if (!genresLoading) {
      fetchInitialSections();
    }
  }, [genres, genresLoading, fetchMoviesByGenre]);

  const loadMoreMovies = useCallback(
    async (genreId: number) => {
      setSections(prev => prev.map(s => (s.genreId === genreId ? { ...s, loadingMore: true } : s)));

      try {
        const section = sections.find(s => s.genreId === genreId);
        if (!section) return;

        const nextPage = section.page + 1;
        const res: TMDBMovie[] = await fetchMoviesByGenre({
          genreId,
          page: nextPage,
        }).unwrap();

        setSections(prev =>
          prev.map(s =>
            s.genreId === genreId
              ? {
                  ...s,
                  data: mergeUniqueMovies(s.data, res),
                  page: nextPage,
                  loadingMore: false,
                }
              : s,
          ),
        );
      } catch (err) {
        setSections(prev =>
          prev.map(s => (s.genreId === genreId ? { ...s, loadingMore: false } : s)),
        );
      }
    },
    [sections, mergeUniqueMovies, fetchMoviesByGenre],
  );

  return { sections, loading, loadMoreMovies };
};

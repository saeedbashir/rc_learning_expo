//components/home/HomeMoviesHeader.tsx
import { ScrollWrapper, SectionTitle, TrendingCard } from '@/theme/styles/homeStyles';
import { TMDBMovie } from '@/type/types';
import { Link } from 'expo-router';
import React from 'react';

interface Props {
  trending: TMDBMovie[];
}

const HomeMoviesHeader: React.FC<Props> = ({ trending }) => (
  <>
    <SectionTitle>🔥 Trending</SectionTitle>
    <ScrollWrapper>
      {trending.map(item => (
        <Link key={item.id} href={`/home/movie/${item.id}`} asChild>
          <TrendingCard
            movie={{
              id: item.id.toString(),
              title: item.title,
              year: item.release_date?.split('-')[0],
              genre: 'N/A',
              rating: item.vote_average,
              poster: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
              description: item.overview,
            }}
          />
        </Link>
      ))}
    </ScrollWrapper>
    <SectionTitle>⭐ Popular</SectionTitle>
  </>
);

export default HomeMoviesHeader;

import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, Text, View } from 'react-native';
import { getMovieDetails } from '../../../../utils/tmdb';
import styles from '../../home/styles';

type MovieDetail = {
  id: number;
  title: string;
  release_date?: string;
  vote_average: number;
  poster_path: string;
  overview: string;
  runtime?: number;
  genres?: { id: number; name: string }[];
};

export default function MovieDetailScreen() {
  const { id } = useLocalSearchParams();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(true);

  // Define local tags (not from API)
  const tags = ['Action', 'Drama', 'Thriller'];

  useEffect(() => {
    if (!id) return;
    const fetchMovie = async () => {
      try {
        const data = await getMovieDetails(Number(id));
        setMovie(data);
      } catch (err) {
        console.error('Movie fetch failed:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  if (loading) {
    return (
      <View style={[styles.container, { flex: 1, justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="dodgerblue" />
      </View>
    );
  }

  if (!movie) return <Text style={{ padding: 16 }}>Movie not found</Text>;

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 24 }}>
      {/* Poster */}
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
        style={{
          width: '100%',
          aspectRatio: 2 / 3, // ensures poster proportions
          borderRadius: 8,
        }}
        resizeMode="cover"
      />

      {/* Title */}
      <Text style={styles.title}>{movie.title}</Text>

      {/* Subtitle */}
      <Text style={styles.subtitle}>
        {movie.genres?.map(g => g.name).join(', ') || 'N/A'} |{' '}
        {movie.release_date?.split('-')[0] || 'Unknown'} | ⭐ {movie.vote_average.toFixed(1)}
      </Text>

      {/* Description */}
      <Text style={styles.description}>{movie.overview}</Text>

      {/* Extra info */}
      <View style={{ marginTop: 16 }}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>⏱ Duration</Text>
          <Text style={styles.infoValue}>{movie.runtime ? `${movie.runtime} min` : 'N/A'}</Text>
        </View>
        {/* Director is not in TMDB /movie/{id}, you’d need /credits for it.
            For now we’ll just mock it */}
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>🎬 Director</Text>
          <Text style={styles.infoValue}>Unknown</Text>
        </View>
      </View>

      {/* Tags */}
      <View style={styles.tagContainer}>
        {tags.map((tag, index) => (
          <View key={index} style={styles.tagBox}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

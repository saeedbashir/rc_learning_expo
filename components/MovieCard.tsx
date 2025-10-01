import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export type Movie = {
  id: string;
  title: string;
  year?: number | string;
  genre?: string;
  rating?: number;
  duration?: string;
  director?: string;
  poster: string;
  description?: string;
};

type MovieCardProps = {
  movie: Movie;
  onPress?: () => void;
  style?: object; // allow parent to override styles
};

export default function MovieCard({ movie, onPress, style }: MovieCardProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={!onPress}
      style={[styles.card, style]}
      activeOpacity={0.8}>
      <Image source={{ uri: movie.poster }} style={styles.poster} />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {movie.title}
        </Text>
        <Text style={styles.meta}>
          {movie.year ? `${movie.year}` : ''} {movie.genre ? `• ${movie.genre}` : ''}
        </Text>
        <Text style={styles.meta}>{movie.rating ? `⭐ ${movie.rating}` : ''}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1, // 🔑 makes card expand in grid
    margin: 8,
    borderRadius: 8,
    backgroundColor: '#fff',
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  poster: {
    width: '100%',
    height: 200,
  },
  info: {
    padding: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 2,
    color: '#333',
  },
  meta: {
    fontSize: 12,
    color: '#666',
  },
});

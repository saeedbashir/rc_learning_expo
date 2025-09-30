import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export type Movie = {
  id: string;
  title: string;
  year: number;
  genre: string;
  rating: number;
  duration?: string;
  director?: string;
  poster: string;
  description: string;
};

type MovieCardProps = {
  movie: Movie;
  onPress?: () => void;
};

export default function MovieCard({ movie, onPress }: MovieCardProps) {
  return (
    <TouchableOpacity onPress={onPress} disabled={!onPress} style={styles.card}>
      <Image source={{ uri: movie.poster }} style={styles.poster} />
      
      <View style={styles.info}>
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.meta}>
          {movie.year} • {movie.genre}
        </Text>
        <Text style={styles.meta}>
          ⭐ {movie.rating} • {movie.duration}
        </Text>
        {movie.director && (
          <Text style={styles.meta}>🎬 {movie.director}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

// Using inline styling in this file for different flavour
const styles = StyleSheet.create({
  card: {
    flexDirection: "row",      // Poster + Info side by side
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",      // Align poster + text vertically
  },
  poster: {
    width: 90,
    height: 120,
    borderRadius: 5,
    marginRight: 10,
  },
  info: {
    flex: 1,                   // Take remaining space
    flexDirection: "column",   // Stack texts vertically
    justifyContent: "space-between",
    gap: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  meta: {
    fontSize: 14,
    color: "#555",
    marginBottom: 2,
  },
});

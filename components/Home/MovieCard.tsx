import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export type Movie = {
  id: string;
  title: string;
  year: number;
  genre: string;
  rating: number;
  poster: string;
  description: string;
};

type MovieCardProps = {
  movie: Movie;
  onPress?: () => void; // now optional
};

export default function MovieCard({ movie, onPress }: MovieCardProps) {
  return (
    <TouchableOpacity onPress={onPress} disabled={!onPress} style={styles.card}>
      <Image source={{ uri: movie.poster }} style={styles.poster} />
      <View style={styles.info}>
        <Text style={styles.title}>{movie.title}</Text>
        <Text>{movie.year} • {movie.genre}</Text>
        <Text>⭐ {movie.rating}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
  },
  poster: {
    width: 60,
    height: 90,
    borderRadius: 5,
    marginRight: 10,
  },
  info: { flex: 1 },
  title: { fontSize: 16, fontWeight: "bold" },
});

import React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { getMovieById } from "../../utils/dataParser";
import styles from "./styles";

export default function MovieDetailScreen({ route }: any) {
  const { movieId } = route.params;
  const movie = getMovieById(movieId);

  if (!movie) return <Text>Movie not found</Text>;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: movie.poster }} style={styles.poster} />
      <Text style={styles.title}>{movie.title}</Text>
      <Text style={styles.subtitle}>
        {movie.genre} | {movie.year} | ⭐ {movie.rating}
      </Text>
      <Text style={styles.description}>{movie.description}</Text>
    </ScrollView>
  );
}

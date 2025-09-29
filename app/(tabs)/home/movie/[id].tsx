import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, ScrollView, Text } from "react-native";
import { getMovieById } from "../../../../utils/dataParser";
import styles from "../../home/styles";

export default function MovieDetailScreen() {
  const { id } = useLocalSearchParams();
  const movie = getMovieById(id as string);

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
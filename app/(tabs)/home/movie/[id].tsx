import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, View } from "react-native";
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
      <View style={{ marginTop: 16 }}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>⏱ Duration</Text>
          <Text style={styles.infoValue}>{movie.duration}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>🎬 Director</Text>
          <Text style={styles.infoValue}>{movie.director}</Text>
        </View>
      </View>

      {/* tags */}
      {movie.tags && (
        <View style={styles.tagContainer}>
          {movie.tags.map((tag, index) => (
            <View key={index} style={styles.tagBox}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

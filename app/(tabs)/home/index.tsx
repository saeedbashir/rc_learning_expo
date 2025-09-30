import { Link } from "expo-router";
import React from "react";
import { FlatList, View } from "react-native";
import MovieCard from "../../../components/MovieCard";
import { getMovies } from "../../../utils/dataParser";
import styles from "../home/styles";

export default function MoviesListScreen() {
  const movies = getMovies();

  return (
    <View style={styles.container}>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link href={`/home/movie/${item.id}`} asChild>
            <MovieCard movie={item} />
          </Link>
        )}
      />
    </View>
  );
}
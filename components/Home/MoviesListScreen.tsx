import React from "react";
import { FlatList, View } from "react-native";
import { getMovies } from "../../utils/dataParser";
import MovieCard from "../../components/MovieCard";
import styles from "./styles";

export default function MoviesListScreen({ navigation }: any) {
  const movies = getMovies();

  return (
    <View style={styles.container}>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MovieCard
            movie={item}
            onPress={() => navigation.navigate("MovieDetail", { movieId: item.id })}
          />
        )}
      />
    </View>
  );
}

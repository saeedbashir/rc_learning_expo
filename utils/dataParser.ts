import moviesData from "../assets/data/movies.json";
import profileData from "../assets/data/profile.json";

export const getMovies = () => {
  return moviesData;
};

export const getMovieById = (id: string) => {
  return moviesData.find((movie) => movie.id === id);
};

export const getProfile = () => {
  return profileData;
};
    
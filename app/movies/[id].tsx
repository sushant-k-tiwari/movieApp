import HeartIcon from "@/components/HeartIcon";
import { icons } from "@/constants/icons";
import { useSavedMovies } from "@/contexts/SavedMoviesContext";
import { fetchMovieDetails } from "@/services/api";
import useFetch from "@/services/useFetch";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface MovieInfoProps {
  label: string;
  value?: string | null;
}
const MovieInfo = ({ label, value }: MovieInfoProps) => (
  <View className="flex-col items-start justify-center mt-5">
    <Text
      className="text-light-200 text-sm"
      style={{ fontFamily: "Montserrat-Medium" }}
    >
      {label}
    </Text>
    <Text
      className="text-light-100 text-sm mt-1"
      style={{ fontFamily: "Montserrat-SemiBold" }}
    >
      {value || "N/A"}
    </Text>
  </View>
);

const MovieDetails = () => {
  const { id } = useLocalSearchParams();
  const {
    data: movie,
    loading,
    error,
  } = useFetch(() => fetchMovieDetails(id as string));
  const { isMovieSaved, toggleSavedMovie } = useSavedMovies();

  if (loading) {
    return (
      <View className="flex-1 bg-primary justify-center items-center">
        <ActivityIndicator size="large" color="#0000FF" />
        <Text className="text-white mt-4">Loading movie details...</Text>
      </View>
    );
  }

  if (error || !movie) {
    return (
      <View className="flex-1 bg-primary justify-center items-center">
        <Text className="text-white text-center">
          {error
            ? `Error: ${typeof error === "string" ? error : error.message}`
            : "Movie not found"}
        </Text>
      </View>
    );
  }

  const posterUrl =
    movie.Poster && movie.Poster !== "N/A" ? movie.Poster : null;

  return (
    <View className="flex-1 bg-primary">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View>
          {posterUrl ? (
            <Image
              source={{ uri: posterUrl }}
              className="w-full h-[600px]"
              resizeMode="stretch"
            />
          ) : (
            <View className="w-full h-96 bg-gray-700 justify-center items-center">
              <Text className="text-white text-lg">No poster available</Text>
            </View>
          )}
        </View>

        <View className="flex-col items-start justify-center mt-5 px-5">
          <View className="flex-row items-center justify-between w-full mb-2">
            <Text
              className="text-white text-xl flex-1 mr-3"
              style={{ fontFamily: "Montserrat-Bold" }}
            >
              {movie?.Title}
            </Text>
            {movie && (
              <HeartIcon
                isSaved={isMovieSaved(movie.imdbID)}
                onPress={() => toggleSavedMovie(movie)}
                size={28}
                savedColor="#ff4757"
              />
            )}
          </View>
          <View className="flex-row items-center gap-x-2 mt-2 ">
            <Text
              className="text-light-200 text-sm"
              style={{ fontFamily: "Montserrat-SemiBold" }}
            >
              {movie?.Year}
            </Text>
            <Text
              className="text-light-200 text-sm"
              style={{ fontFamily: "Montserrat-SemiBold" }}
            >
              {movie?.Runtime}
            </Text>
          </View>
          <View className="flex-row items-center bg-dark-100 rounded-md px-2 py-1 mt-2 gap-x-2">
            <Image source={icons.star} className="size-4" />
            <Text
              className="text-white text-sm"
              style={{ fontFamily: "Montserrat-Bold" }}
            >
              {movie.imdbRating}
            </Text>
            <Text
              className="text-light-200 text-sm"
              style={{ fontFamily: "Montserrat-SemiBold" }}
            >
              ({movie.imdbVotes} votes)
            </Text>
          </View>
          <MovieInfo label="Overview" value={movie.Plot} />
          <View className="flex flex-row items-center justify-between w-full">
            <MovieInfo label="Genre" value={movie.Genre || "N/A"} />
            <MovieInfo label="Language" value={movie.Language || "N/A"} />
          </View>
          <MovieInfo label="Revenue" value={movie.BoxOffice || "N/A"} />
          <MovieInfo label="Director" value={movie.Director || "N/A"} />
          <MovieInfo label="Actors" value={movie.Actors || "N/A"} />
        </View>
      </ScrollView>
      <TouchableOpacity
        className="absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50 "
        onPress={router.back}
      >
        <Text
          className="text-white text-base"
          style={{ fontFamily: "Montserrat-SemiBold" }}
        >
          Go Back
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default MovieDetails;

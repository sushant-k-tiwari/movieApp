import HeartIcon from "@/components/HeartIcon";
import { icons } from "@/constants/icons";
import { useSavedMovies } from "@/contexts/SavedMoviesContext";
import { Link } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const MovieCard = ({
  Title,
  Poster,
  Year,
  imdbRating,
  imdbID,
  Type,
}: Movie) => {
  const { isMovieSaved, toggleSavedMovie } = useSavedMovies();
  const movie = { Title, Poster, Year, imdbRating, imdbID, Type };

  return (
    <View className="w-32">
      <View className="relative">
        <Link href={`/movies/${imdbID}`} asChild>
          <TouchableOpacity>
            <Image
              source={{ uri: Poster }}
              className="w-full h-52 rounded-lg"
              resizeMode="cover"
            />
          </TouchableOpacity>
        </Link>
        <View className="absolute top-2 right-2">
          <HeartIcon
            isSaved={isMovieSaved(imdbID)}
            onPress={() => toggleSavedMovie(movie)}
            size={20}
            savedColor="#ff4757"
          />
        </View>
      </View>
      <Text
        className="text-sm text-white mt-2"
        style={{ fontFamily: "Montserrat-Bold" }}
        numberOfLines={1}
      >
        {Title}
      </Text>
      <View className="flex-row items-center justify-start gap-x-1">
        <Image source={icons.star} className="size-4" />
        <Text
          className="text-xs text-white"
          style={{ fontFamily: "Montserrat-Regular" }}
        >
          {imdbRating && imdbRating > 0 ? imdbRating : "N/A"}
        </Text>
      </View>
      <View className="flex-row items-center justify-between">
        <Text
          className="text-xs mt-1 text-light-300"
          style={{ fontFamily: "Montserrat-Medium" }}
        >
          {Year}
        </Text>
        <Text
          className="text-xs mt-1 text-light-300 "
          style={{ fontFamily: "Montserrat-SemiBold" }}
        >
          {Type.toUpperCase()}
        </Text>
      </View>
    </View>
  );
};

export default MovieCard;

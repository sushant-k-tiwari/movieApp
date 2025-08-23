import HeartIcon from "@/components/HeartIcon";
import { icons } from "@/constants/icons";
import { useSavedMovies } from "@/contexts/SavedMoviesContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

const Saved = () => {
  const { savedMovies, removeSavedMovie } = useSavedMovies();

  const renderSavedMovie = ({ item: movie }: { item: any }) => (
    <TouchableOpacity
      className="flex-row items-center bg-dark-100 rounded-lg p-4 mb-3 mx-4"
      onPress={() => router.push(`/movies/${movie.imdbID}`)}
    >
      <Image
        source={{
          uri:
            movie.Poster && movie.Poster !== "N/A" ? movie.Poster : undefined,
        }}
        className="w-16 h-24 rounded-lg"
        resizeMode="cover"
        defaultSource={require("@/assets/images/logo.png")}
      />
      <View className="flex-1 ml-4">
        <Text
          className="text-white text-lg mb-1"
          style={{ fontFamily: "Montserrat-Bold" }}
          numberOfLines={2}
        >
          {movie.Title}
        </Text>
        <View className="flex-row items-center gap-x-2 mb-2">
          <Text
            className="text-light-200 text-sm"
            style={{ fontFamily: "Montserrat-Medium" }}
          >
            {movie.Year}
          </Text>
          {movie.Runtime && movie.Runtime !== "N/A" && (
            <Text
              className="text-light-200 text-sm"
              style={{ fontFamily: "Montserrat-Medium" }}
            >
              • {movie.Runtime}
            </Text>
          )}
        </View>
        <View className="flex-row items-center gap-x-2">
          <Image source={icons.star} className="size-4" />
          <Text
            className="text-white text-sm"
            style={{ fontFamily: "Montserrat-Bold" }}
          >
            {movie.imdbRating && movie.imdbRating > 0
              ? movie.imdbRating
              : "N/A"}
          </Text>
        </View>
      </View>
      <HeartIcon
        isSaved={true}
        onPress={() => removeSavedMovie(movie.imdbID)}
        size={24}
        savedColor="#ff4757"
      />
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={require("@/assets/images/bg.png")}
        className="flex-1 absolute w-full z-0"
        resizeMode="cover"
      />
      <View className="w-full flex-row items-center justify-center ">
        <Image
          source={icons.logo}
          className="w-12 h-10 z-10 mx-auto mt-20 mb-5"
        />
      </View>
      <View className="flex-1 z-10">
        <View className="pt-12 pb-6 px-4">
          <Text
            className="text-white text-2xl"
            style={{ fontFamily: "Montserrat-Bold" }}
          >
            Saved Movies
          </Text>
          <Text
            className="text-light-200 text-base mt-1"
            style={{ fontFamily: "Montserrat-Medium" }}
          >
            {savedMovies.length} movie{savedMovies.length !== 1 ? "s" : ""}{" "}
            saved
          </Text>
        </View>

        {savedMovies.length === 0 ? (
          <View className="flex-1 justify-center items-center px-4">
            <Ionicons
              name="bookmark-outline"
              size={64}
              color="#AB8BFF"
              style={{ opacity: 0.5, marginBottom: 16 }}
            />
            <Text
              className="text-light-200 text-lg text-center"
              style={{ fontFamily: "Montserrat-Medium" }}
            >
              No movies saved yet
            </Text>
            <Text
              className="text-light-300 text-sm text-center mt-2"
              style={{ fontFamily: "Montserrat-Regular" }}
            >
              Tap the heart icon on any movie to save it here
            </Text>
          </View>
        ) : (
          <FlatList
            data={savedMovies}
            renderItem={renderSavedMovie}
            keyExtractor={(item) => item.imdbID}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
          />
        )}
      </View>
    </View>
  );
};

export default Saved;

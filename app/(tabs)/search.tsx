import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovieData } from "@/services/api";
import useFetch from "@/services/useFetch";
import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StatusBar,
  Text,
  View,
} from "react-native";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch<Movie[]>(async () => {
    return await fetchMovieData(searchQuery);
  }, false);

  return (
    <View className="flex-1 bg-primary">
      <StatusBar barStyle="light-content" />
      <Image
        source={images.bg}
        className="flex-1 absolute w-full z-0"
        resizeMode="cover"
      />

      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.imdbID.toString()}
        className="px-5 w-full"
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "space-between",
          marginBottom: 16,
        }}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        ListHeaderComponent={
          <>
            <View className="w-full flex-row items-center justify-center ">
              <Image
                source={icons.logo}
                className="w-12 h-10 z-10 mx-auto mt-20 mb-5"
              />
            </View>

            <View className="my-5">
              <SearchBar
                placeholder="Search for a movie or TV show..."
                onPress={() => {}}
                value={searchQuery}
                onChangeText={(text) => setSearchQuery(text)}
              />
            </View>
            {moviesLoading ? (
              <ActivityIndicator size="large" color={"#0000FF"} />
            ) : moviesError ? (
              <Text className="text-red-500 text-center mt-10">
                Error:{" "}
                {typeof moviesError === "string"
                  ? moviesError
                  : moviesError?.message}
              </Text>
            ) : null}

            {!moviesLoading &&
              !moviesError &&
              searchQuery.trim() &&
              !!movies &&
              movies?.length > 0 && (
                <Text
                  className="text-xl text-white"
                  style={{ fontFamily: "Montserrat-Bold" }}
                >
                  Search Results for {""}
                  <Text className="text-accent">{searchQuery}</Text>
                </Text>
              )}
          </>
        }
      />
    </View>
  );
};

export default Search;

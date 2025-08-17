import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovieData } from "@/services/api";
import useFetch from "@/services/useFetch";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
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
  const [hasSearched, setHasSearched] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
    refetch,
    reset,
  } = useFetch<Movie[]>(async () => {
    return await fetchMovieData(searchQuery);
  }, false);

  // Debounced search effect
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (searchQuery.trim()) {
      debounceRef.current = setTimeout(() => {
        setHasSearched(true);
        refetch();
      }, 1000); // 1 second delay
    } else {
      setHasSearched(false);
      reset(); // Clear previous search results when search is cleared
    }

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [searchQuery, refetch, reset]);

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

            {/* Show placeholder text when no search has been performed */}
            {!hasSearched && !searchQuery.trim() && (
              <View className="items-center justify-center py-20">
                <Ionicons
                  name="search"
                  size={64}
                  color="#AB8BFF"
                  style={{ opacity: 0.5, marginBottom: 16 }}
                />
                <Text
                  className="text-white text-lg text-center mb-2"
                  style={{ fontFamily: "Montserrat-Bold" }}
                >
                  Search for Movies & TV Shows
                </Text>
                <Text
                  className="text-gray-300 text-center px-8"
                  style={{ fontFamily: "Montserrat-Regular" }}
                >
                  Discover your next favorite entertainment by searching for
                  movies, TV shows, and more
                </Text>
              </View>
            )}

            {/* Show loading indicator when searching */}
            {hasSearched && moviesLoading && (
              <View className="items-center py-10">
                <ActivityIndicator size="large" color={"#AB8BFF"} />
                <Text
                  className="text-white mt-4"
                  style={{ fontFamily: "Montserrat-Medium" }}
                >
                  Searching for &ldquo;{searchQuery}&rdquo;...
                </Text>
              </View>
            )}

            {/* Show error message */}
            {hasSearched && moviesError && (
              <Text className="text-red-500 text-center mt-10">
                Error:{" "}
                {typeof moviesError === "string"
                  ? moviesError
                  : moviesError?.message}
              </Text>
            )}

            {/* Show search results */}
            {hasSearched &&
              !moviesLoading &&
              !moviesError &&
              searchQuery.trim() &&
              !!movies &&
              movies?.length > 0 && (
                <Text
                  className="text-xl text-white mb-4"
                  style={{ fontFamily: "Montserrat-Bold" }}
                >
                  Search Results for{" "}
                  <Text className="text-accent">
                    &ldquo;{searchQuery}&rdquo;
                  </Text>
                </Text>
              )}

            {/* Show no results message */}
            {hasSearched &&
              !moviesLoading &&
              !moviesError &&
              searchQuery.trim() &&
              !!movies &&
              movies?.length === 0 && (
                <View className="items-center py-10">
                  <Text
                    className="text-white text-lg text-center"
                    style={{ fontFamily: "Montserrat-Medium" }}
                  >
                    No results found for &ldquo;{searchQuery}&rdquo;
                  </Text>
                  <Text
                    className="text-gray-300 text-center mt-2 px-8"
                    style={{ fontFamily: "Montserrat-Regular" }}
                  >
                    Try searching with different keywords or check your spelling
                  </Text>
                </View>
              )}
          </>
        }
      />
    </View>
  );
};

export default Search;

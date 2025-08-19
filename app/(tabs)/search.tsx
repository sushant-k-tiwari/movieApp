import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovieData } from "@/services/api";
import useFetch from "@/services/useFetch";
import { Ionicons } from "@expo/vector-icons";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [failedSearches, setFailedSearches] = useState<Set<string>>(new Set());
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const searchQueryRef = useRef(searchQuery);
  const failedSearchesRef = useRef(failedSearches);

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
    refetch,
    reset,
  } = useFetch<Movie[]>(async () => {
    return await fetchMovieData(searchQuery);
  }, false);

  // Keep refs in sync with latest values
  const refetchRef = useRef(refetch);
  const resetRef = useRef(reset);
  useEffect(() => {
    refetchRef.current = refetch;
  }, [refetch]);
  useEffect(() => {
    resetRef.current = reset;
  }, [reset]);
  useEffect(() => {
    failedSearchesRef.current = failedSearches;
  }, [failedSearches]);

  // Function to retry a failed search
  const retrySearch = useCallback(() => {
    setFailedSearches((prev) => {
      const normalized = searchQueryRef.current.trim().toLowerCase();
      if (!prev.has(normalized)) return prev;
      const newSet = new Set(prev);
      newSet.delete(normalized);
      return newSet;
    });
    setHasSearched(true);
    refetchRef.current();
  }, []);

  // Debounced search effect
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    const normalized = searchQuery.trim().toLowerCase();

    if (normalized) {
      // Check if this search query has already failed
      if (failedSearchesRef.current.has(normalized)) {
        return; // Don't search again for failed queries
      }

      debounceRef.current = setTimeout(() => {
        setHasSearched(true);
        refetchRef.current();
      }, 500); // 0.5 second delay
    } else {
      setHasSearched(false);
      setFailedSearches(new Set()); // Clear all failed searches when search is cleared
      resetRef.current(); // Clear previous search results when search is cleared
    }

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [searchQuery]);

  // Update refs when searchQuery changes
  useEffect(() => {
    searchQueryRef.current = searchQuery;
  }, [searchQuery]);

  // Effect to track failed searches - only run when search results change
  useEffect(() => {
    if (
      hasSearched &&
      !moviesLoading &&
      !moviesError &&
      movies &&
      movies.length === 0 &&
      searchQueryRef.current.trim()
    ) {
      // Add this search query to failed searches, guard against duplicates
      setFailedSearches((prev) => {
        const normalized = searchQueryRef.current.trim().toLowerCase();
        if (prev.has(normalized)) return prev;
        const newSet = new Set(prev);
        newSet.add(normalized);
        return newSet;
      });
    }
  }, [hasSearched, moviesLoading, moviesError, movies]);

  // Clear failed searches when user starts typing a new query
  useEffect(() => {
    if (searchQuery.trim()) {
      // Clear failed searches for different queries
      setFailedSearches((prev) => {
        const newSet = new Set(prev);
        // Remove entries that don't start with the current search query
        // Also remove entries that are very similar (within 2 characters difference)
        for (const failedSearch of newSet) {
          const currentQuery = searchQuery.trim().toLowerCase();
          if (
            !failedSearch.startsWith(currentQuery) &&
            Math.abs(failedSearch.length - currentQuery.length) > 2
          ) {
            newSet.delete(failedSearch);
          }
        }
        return newSet;
      });
    }
  }, [searchQuery]);

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
                  <Text
                    className="text-gray-400 text-center mt-2 px-8 text-sm"
                    style={{ fontFamily: "Montserrat-Regular" }}
                  >
                    This search won&apos;t be repeated automatically
                  </Text>
                  <View className="mt-4">
                    <TouchableOpacity
                      onPress={retrySearch}
                      className="bg-accent px-6 py-3 rounded-full"
                    >
                      <Text
                        className="text-white font-medium"
                        style={{ fontFamily: "Montserrat-Medium" }}
                      >
                        Retry Search
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}

            {/* Show message when search is blocked due to previous failure */}
            {searchQuery.trim() &&
              failedSearches.has(searchQuery.trim().toLowerCase()) &&
              !hasSearched && (
                <View className="items-center py-10">
                  <Ionicons
                    name="information-circle"
                    size={48}
                    color="#AB8BFF"
                    style={{ opacity: 0.7, marginBottom: 16 }}
                  />
                  <Text
                    className="text-white text-lg text-center"
                    style={{ fontFamily: "Montserrat-Medium" }}
                  >
                    No results found previously for &ldquo;{searchQuery}&rdquo;
                  </Text>
                  <Text
                    className="text-gray-300 text-center mt-2 px-8"
                    style={{ fontFamily: "Montserrat-Regular" }}
                  >
                    Try a different search term or modify your current query
                  </Text>
                  <View className="mt-4">
                    <TouchableOpacity
                      onPress={retrySearch}
                      className="bg-accent px-6 py-3 rounded-full"
                    >
                      <Text
                        className="text-white font-medium"
                        style={{ fontFamily: "Montserrat-Medium" }}
                      >
                        Retry Search
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
          </>
        }
      />
    </View>
  );
};

export default Search;

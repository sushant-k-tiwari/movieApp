import { fetchMovieDetails } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, ScrollView, View } from "react-native";

const MovieDetails = () => {
  const { id } = useLocalSearchParams();
  const { data: loading, error } = useFetch(() =>
    fetchMovieDetails(id as string)
  );

  return (
    <View className="flex-1 bg-primary">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View>
          <Image
            source={{
              uri: "poster_path",
            }}
            className="w-full h-96"
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default MovieDetails;

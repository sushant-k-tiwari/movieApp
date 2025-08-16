import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovieData, Movie } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";

export default function Index() {
  const router = useRouter();
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch<Movie[]>(async () => {
    return await fetchMovieData("");
  });

  return (
    <View className="flex-1 bg-primary">
      <StatusBar barStyle="light-content" />
      <Image
        source={images.bg}
        className="flex-1 absolute w-full z-0"
        resizeMode="cover"
      />

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <View className="px-5">
          <Image
            source={icons.logo}
            className="w-12 h-10 z-10 mx-auto mt-20 mb-5"
          />

          {moviesLoading ? (
            <ActivityIndicator
              size="large"
              color={"#0000FF"}
              className="mt-10 self-center"
            />
          ) : moviesError ? (
            <Text className="text-red-500 text-center mt-10">
              Error:{" "}
              {typeof moviesError === "string"
                ? moviesError
                : moviesError?.message}
            </Text>
          ) : (
            <View className="mt-5">
              <SearchBar
                onPress={() => {
                  router.push("/search");
                }}
                placeholder="Search for a movie or TV show..."
              />

              <Text
                className="text-lg text-white mt-5 mb-3"
                style={{ fontFamily: "Montserrat-SemiBold" }}
              >
                Latest Movies
              </Text>
              <>
                <FlatList
                  data={movies}
                  renderItem={({ item }) => {
                    return (
                      <View className="flex-1 p-2 ">
                        <MovieCard {...item} />
                      </View>
                    );
                  }}
                  numColumns={3}
                  columnWrapperStyle={{
                    justifyContent: "center",
                    gap: 14,
                    paddingRight: 5,
                    marginBottom: 10,
                  }}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(item) => item.imdbID.toString()}
                  className="mt-2 pb-20"
                  scrollEnabled={false}
                />
              </>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

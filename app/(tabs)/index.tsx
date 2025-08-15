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
      <Image source={images.bg} className="absolute w-full  z-0" />

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ height: "100%", marginBottom: 10 }}
      >
        <View className="flex-1 px-5">
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
            <Text>
              Error:{" "}
              {typeof moviesError === "string"
                ? moviesError
                : moviesError?.message}
            </Text>
          ) : (
            <View className="flex-1 mt-5">
              <SearchBar
                onPress={() => {
                  router.push("/search");
                }}
                placeholder="Search for a movie or TV show"
              />
              <>
                <Text
                  className="text-lg text-white mt-5 mb-3"
                  style={{ fontFamily: "Montserrat-SemiBold" }}
                >
                  Latest Movies
                </Text>

                <FlatList
                  horizontal
                  data={movies?.slice(0, 10)}
                  renderItem={({ item }) => {
                    return (
                      <View className="flex-1 p-2 ">
                        <View className="justify-center items-center">
                          <Image
                            source={{ uri: item.Poster }}
                            className="w-[200px] h-[300px] gap-4 rounded-xl "
                          />
                          <Text
                            className="text-white text-lg text-wrap w-[200px] text-center"
                            style={{
                              fontFamily: "Montserrat-Medium",
                            }}
                          >
                            {item.Title}
                          </Text>
                        </View>
                      </View>
                    );
                  }}
                />
              </>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

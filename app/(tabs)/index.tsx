import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { useRouter } from "expo-router";
import { Image, ScrollView, StatusBar, View } from "react-native";
export default function Index() {
  const router = useRouter();
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
          <View className="flex-1 mt-5">
            <SearchBar
              onPress={() => {
                router.push("/search");
              }}
              placeholder="Search for a movie or TV show" 
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

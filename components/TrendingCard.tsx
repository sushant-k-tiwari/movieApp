import { images } from "@/constants/images";
import MaskedView from "@react-native-masked-view/masked-view";
import { Link } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const TrendingCard = ({
  movie: { title, poster, movie_id },
  index,
}: TrendingCardProps) => {
  return (
    <Link href={`/movies/${movie_id}`} asChild>
      <TouchableOpacity className="w-48 relative pl-5 ">
        <Image
          source={{ uri: poster }}
          className="w-48 h-64 rounded-lg"
          resizeMode="cover"
        />
        <View className="absolute bottom-9 -left-3.5 px-2 py-1 rounded-full">
          <MaskedView
            maskElement={
              <Text
                className="text-white text-6xl pl-3.5 pt-1"
                style={{ fontFamily: "Montserrat-Bold" }}
              >
                {index + 1}
              </Text>
            }
          >
            <Image
              source={images.rankingGradient}
              className="size-14"
              resizeMode="cover"
            />
          </MaskedView>
        </View>
        <Text
          className="text-white text-sm mt-2"
          style={{ fontFamily: "Montserrat-Bold" }}
          numberOfLines={1}
        >
          {title}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

export default TrendingCard;

const styles = StyleSheet.create({});

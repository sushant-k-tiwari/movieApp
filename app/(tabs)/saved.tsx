import { images } from "@/constants/images";
import React from "react";
import { Image, StatusBar, View } from "react-native";

const saved = () => {
  return (
    <View className="flex-1 bg-primary">
      <StatusBar barStyle="light-content" />
      <Image
        source={images.bg}
        className="flex-1 absolute w-full z-0"
        resizeMode="cover"
      />
    </View>
  );
};

export default saved;

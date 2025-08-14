import { icons } from "@/constants/icons";
import React from "react";
import { Image, StyleSheet, TextInput, View } from "react-native";

interface Props {
  placeholder: string;
  onPress: () => void;
}
const SearchBar = ({ onPress, placeholder }: Props) => {
  return (
    <View className="flex-row items-center bg-dark-200 rounded-full px-6 py-2">
      <Image
        source={icons.search}
        className="size-5"
        resizeMode="contain"
        tintColor={"#AB8BFF"}
      />
      <TextInput
        style={{ fontFamily: "Montserrat-Regular" }}
        placeholder={placeholder}
        onPress={onPress}
        className="flex-1 ml-2 text-white"
        onChangeText={() => {}}
        placeholderTextColor={"#AB8BFF"}
        keyboardType="default"
        autoCapitalize="words"
        autoCorrect={false}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({});

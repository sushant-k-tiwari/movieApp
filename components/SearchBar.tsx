import { icons } from "@/constants/icons";
import React from "react";
import { Image, TextInput, View } from "react-native";

interface Props {
  placeholder: string;
  onPress: () => void;
  onSubmitText?: (text: string) => void;
  value?: string;
  onChangeText?: (text: string) => void;
}

const SearchBar = ({
  onPress,
  placeholder,
  onSubmitText,
  value,
  onChangeText,
}: Props) => {
  const handleChangeText = (text: string) => {
    if (onChangeText) {
      onChangeText(text);
    }
    // If text is cleared, notify parent to reset search results
    if (onSubmitText && !text.trim()) {
      onSubmitText("");
    }
  };

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
        onChangeText={handleChangeText}
        value={value}
        onSubmitEditing={() => {}}
        returnKeyType="search"
        placeholderTextColor={"#AB8BFF"}
        keyboardType="default"
        autoCorrect={false}
      />
    </View>
  );
};

export default SearchBar;

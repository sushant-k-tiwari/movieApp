import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity } from "react-native";

interface HeartIconProps {
  isSaved: boolean;
  onPress: () => void;
  size?: number;
  color?: string;
  savedColor?: string;
}

const HeartIcon: React.FC<HeartIconProps> = ({
  isSaved,
  onPress,
  size = 24,
  color = "#ffffff",
  savedColor = "#ff4757",
}) => {
  return (
    <TouchableOpacity onPress={onPress} className="p-2">
      <Ionicons
        name={isSaved ? "heart" : "heart-outline"}
        size={size}
        color={isSaved ? savedColor : color}
      />
    </TouchableOpacity>
  );
};

export default HeartIcon;

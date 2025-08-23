import ProfileComponent from "@/components/ProfileComponent";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const profile = () => {
  return (
    <View className="flex-1 bg-primary">
      <Text
        className="text-white text-2xl text-center mt-20"
        style={{ fontFamily: "Montserrat-Bold" }}
      >
        Profile
      </Text>

      {/* Avatar */}
      <View className="size-32 rounded-full bg-accent flex justify-center items-center self-center mt-8">
        <Text
          className="text-white text-lg"
          style={{ fontFamily: "Montserrat-Medium" }}
        >
          Sushant
        </Text>
      </View>
      {/* Dummy data */}
      <ProfileComponent />
    </View>
  );
};

export default profile;

const styles = StyleSheet.create({});

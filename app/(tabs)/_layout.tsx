import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { Tabs } from "expo-router";
import React from "react";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";

interface TabIconProps {
  icon: any;
  title: string;
  focused: any;
}
const TabIcon = ({ icon, title, focused }: TabIconProps) => {
  if (focused) {
    return (
      <ImageBackground
        source={images.highlight}
        className="flex flex-row w-full flex-1 min-w-[100px] min-h-16 mt-4 items-center justify-center rounded-full overflow-hidden"
      >
        <Image source={icon} tintColor="#151312" className="size-5" />
        <Text className="text-secondary font-semibold ml-2 text-base">
          {title}
        </Text>
      </ImageBackground>
    );
  }
  return (
    <View className="size-full justify-center items-center mt-4 rounded-full">
      <Image source={icon} tintColor="#A8B5DB" className="size-5" />
    </View>
  );
};
const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#151312",
        tabBarShowLabel: false,
        tabBarItemStyle: {
          flex: 1,
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
        },
        tabBarStyle: {
          // overflow: "hidden",
          backgroundColor: "#0F0D23",
          elevation: 0,
          borderRadius: 50,
          marginHorizontal: 20,
          marginBottom: 36,
          height: 52,
          position: "absolute",
          borderWidth: 1,
          borderColor: "#0F0D23",
        },

        tabBarBackground: () => (
          <View style={StyleSheet.absoluteFill}>
            {/* Glass blur */}
            <BlurView
              tint="dark"
              intensity={0}
              style={StyleSheet.absoluteFill}
            />
            {/* Gloss overlay */}
            <LinearGradient
              colors={[
                "rgba(255,255,255,0.25)",
                "rgba(255,255,255,0.05)",
                "rgba(255,255,255,0.25)",
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={StyleSheet.absoluteFill}
            />
          </View>
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <TabIcon icon={icons.home} title="Home" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <TabIcon icon={icons.search} title="Search" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: "Saved",
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <TabIcon icon={icons.save} title="Saved" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <TabIcon icon={icons.person} title="Profile" focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;

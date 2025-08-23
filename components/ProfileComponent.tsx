import React from "react";
import { Text, View } from "react-native";

interface ProfileInfoProps {
  label: string;
  value: string;
}

const ProfileInfo = ({ label, value }: ProfileInfoProps) => (
  <View className="flex-row justify-between items-center py-3 border-b border-gray-700">
    <Text
      className="text-light-200 text-base"
      style={{ fontFamily: "Montserrat-Medium" }}
    >
      {label}
    </Text>
    <Text
      className="text-white text-base"
      style={{ fontFamily: "Montserrat-SemiBold" }}
    >
      {value}
    </Text>
  </View>
);

const ProfileComponent = () => {
  return (
    <View className="w-full px-6 mt-8">
      {/* Profile Stats */}
      <View className="flex-row justify-around mb-8">
        <View className="items-center">
          <Text
            className="text-white text-2xl font-bold"
            style={{ fontFamily: "Montserrat-Bold" }}
          >
            127
          </Text>
          <Text
            className="text-light-200 text-sm"
            style={{ fontFamily: "Montserrat-Medium" }}
          >
            Movies Watched
          </Text>
        </View>
        <View className="items-center">
          <Text
            className="text-white text-2xl font-bold"
            style={{ fontFamily: "Montserrat-Bold" }}
          >
            89
          </Text>
          <Text
            className="text-light-200 text-sm"
            style={{ fontFamily: "Montserrat-Medium" }}
          >
            Movies Saved
          </Text>
        </View>
        <View className="items-center">
          <Text
            className="text-white text-2xl font-bold"
            style={{ fontFamily: "Montserrat-Bold" }}
          >
            4.2
          </Text>
          <Text
            className="text-light-200 text-sm"
            style={{ fontFamily: "Montserrat-Medium" }}
          >
            Avg Rating
          </Text>
        </View>
      </View>

      {/* Profile Details */}
      <View className="bg-dark-100 rounded-lg p-4">
        <Text
          className="text-white text-lg font-bold mb-4"
          style={{ fontFamily: "Montserrat-Bold" }}
        >
          Personal Information
        </Text>

        <ProfileInfo label="Full Name" value="Sushant Kumar" />
        <ProfileInfo label="Email" value="sushant@example.com" />
        <ProfileInfo label="Location" value="Mumbai, India" />
        <ProfileInfo label="Member Since" value="January 2024" />
        <ProfileInfo label="Favorite Genre" value="Action & Sci-Fi" />
        <ProfileInfo label="Watch Time" value="1,247 hours" />
      </View>

      {/* Recent Activity */}
      <View className="bg-dark-100 rounded-lg p-4 mt-4">
        <Text
          className="text-white text-lg font-bold mb-4"
          style={{ fontFamily: "Montserrat-Bold" }}
        >
          Recent Activity
        </Text>

        <View className="space-y-3">
          <View className="flex-row items-center">
            <View className="w-2 h-2 bg-accent rounded-full mr-3" />
            <Text
              className="text-light-200 text-sm flex-1"
              style={{ fontFamily: "Montserrat-Medium" }}
            >
              Saved &quot;Inception&quot; to your list
            </Text>
            <Text
              className="text-light-300 text-xs"
              style={{ fontFamily: "Montserrat-Regular" }}
            >
              2h ago
            </Text>
          </View>

          <View className="flex-row items-center">
            <View className="w-2 h-2 bg-accent rounded-full mr-3" />
            <Text
              className="text-light-200 text-sm flex-1"
              style={{ fontFamily: "Montserrat-Medium" }}
            >
              Rated &quot;The Dark Knight&quot; 5 stars
            </Text>
            <Text
              className="text-light-300 text-xs"
              style={{ fontFamily: "Montserrat-Regular" }}
            >
              1d ago
            </Text>
          </View>

          <View className="flex-row items-center">
            <View className="w-2 h-2 bg-accent rounded-full mr-3" />
            <Text
              className="text-light-200 text-sm flex-1"
              style={{ fontFamily: "Montserrat-Medium" }}
            >
              Watched &quot;Interstellar&quot;
            </Text>
            <Text
              className="text-light-300 text-xs"
              style={{ fontFamily: "Montserrat-Regular" }}
            >
              3d ago
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProfileComponent;

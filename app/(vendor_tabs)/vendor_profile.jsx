import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import EmptyState from "../../components/EmptyState";
import { getUserPosts, SignOut } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import Card from "../../components/Card";
import { useGlobalContext } from "../../context/GlobalProvider";
import { icons } from "../../constants";
import InfoBox from "../../components/InfoBox";
import { router } from "expo-router";

const VendorProfile = () => {
  const [selectedTab, setSelectedTab] = useState("Photos"); // State to manage selected tab
  const { user, setUser, setIsLogged } = useGlobalContext();
  const { data } = useAppwrite(() => getUserPosts(user.$id));

  const logout = async () => {
    await SignOut();
    setUser(null);
    setIsLogged(false);
    router.replace("/");
  };

  // Filter data based on selected tab
  const filteredData = data?.filter((item) => {
    if (selectedTab === "Photos") return item.type === "photo";
    if (selectedTab === "Videos") return item.type === "video";
  });
console.log(data)
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={data}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => selectedTab === 'Videos' ? <Card post={item} /> : null}
        ListHeaderComponent={() => (
          <View className="w-full justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity
              className="w-full items-end mb-10"
              onPress={logout}
            >
              <Image
                source={icons.logout}
                resizeMode="contain"
                className="w-6 h-6"
              />
            </TouchableOpacity>
            <View className="w-16 h-16 border border-secondary rounded-lg justify-center items-end">
              <Image
                source={{ uri: user?.avatar }}
                className="w-[100%] h-[100%] rounded-lg"
                resizeMode="cover"
              />
            </View>

            <InfoBox
              title={user?.username}
              containerStyles="mt-5"
              titleStyles="text-lg"
            />
            <View className="mt-5 flex-row">
              <InfoBox
                title={data?.length || 0}
                subtitle={"Posts"}
                containerStyles="mr-10"
                titleStyles="text-xl"
              />
              <InfoBox
                title={"1.2k"}
                subtitle={"Followers"}
                titleStyles="text-xl"
              />
            </View>

            {/* Segmented Control / Tabs */}
            <View className="mt-10 flex-row w-full justify-around">
              <TouchableOpacity onPress={() => setSelectedTab("Photos")}>
                <Text
                  className={`text-lg ${
                    selectedTab === "Photos" ? "text-white" : "text-gray-400"
                  }`}
                >
                  Photos
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setSelectedTab("Videos")}>
                <Text
                  className={`text-lg ${
                    selectedTab === "Videos" ? "text-white" : "text-gray-400"
                  }`}
                >
                  Videos
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title={`No ${selectedTab} Found`}
            subtitle={`No ${selectedTab.toLowerCase()} found for this search query`}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default VendorProfile;

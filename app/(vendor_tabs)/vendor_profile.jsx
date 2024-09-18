import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getUserImages, getUserPosts, getUserReview, getUserReviews, SignOut } from "../../lib/appwrite"; // Assuming getUserReviews is the API function
import useAppwrite from "../../lib/useAppwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import { icons } from "../../constants";
import InfoBox from "../../components/InfoBox";
import { router } from "expo-router";
import Card from "../../components/Card";
import ImgCard from "../../components/ImgCard";
import EmptyState from "../../components/EmptyState";
import ReviewCard from "../../components/ReviewCard";
const VendorProfile = () => {
  const [selectedTab, setSelectedTab] = useState("Photos");
  const { user, setUser, setIsLogged } = useGlobalContext();
  const { data } = useAppwrite(() => getUserPosts(user.$id));
  const { data: image } = useAppwrite(() => getUserImages(user.$id));
  const { data: reviews } = useAppwrite(() => getUserReview(user.$id)); 
  const logout = async () => {
    await SignOut();
    setUser(null);
    setIsLogged(false);
    router.replace("/");
  };
  let filteredData;
  if (selectedTab === "Photos") {
    filteredData = image;
  } else if (selectedTab === "Videos") {
    filteredData = data;
  } else if (selectedTab === "Review") {
    filteredData = reviews;
  }
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) =>
          selectedTab === "Videos" ? (
            <Card post={item} />
          ) : selectedTab === "Photos" ? (
            <ImgCard post={item} />
          ) : (
            <ReviewCard post={item}/>
          )
        }
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
                title={reviews?.length || 0}
                subtitle={"Reviews"}
                containerStyles="mr-10"
                titleStyles="text-xl"
              />
              <InfoBox
                title={data.length+image.length||0}
                subtitle={"Posts"}
                titleStyles="text-xl"
              />
            </View>
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
              <TouchableOpacity onPress={() => setSelectedTab("Review")}>
                <Text
                  className={`text-lg ${
                    selectedTab === "Review" ? "text-white" : "text-gray-400"
                  }`}
                >
                  Review
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title={`No ${selectedTab} Found`}
            subtitle={`No ${selectedTab.toLowerCase()} `}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default VendorProfile;
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import EmptyState from "../../components/EmptyState";
import { getUser, getUserImages, getUserPosts, getUserReview, SignOut, startChatting } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import Card from "../../components/Card";
import InfoBox from "../../components/InfoBox";
import { router, useLocalSearchParams } from 'expo-router';
import ImgCard from "../../components/ImgCard";
import ReviewCard from "../../components/ReviewCard";
import CustomButton from "../../components/CustomButton";
import { useGlobalContext } from "../../context/GlobalProvider";
const vndr_profile = () => {
  const { user:currentUser } = useGlobalContext();
    const [selectedTab, setSelectedTab] = useState("Photos"); 
    const { id } = useLocalSearchParams();
    const { data } = useAppwrite(() => getUserPosts(id));
    const {data:image} =useAppwrite(() => getUserImages(id));
    const {data:user}=useAppwrite(() => getUser(id));
  const { data: reviews } = useAppwrite(() => getUserReview(id)); 
  let filteredData;
  if (selectedTab === "Photos") {
    filteredData = image;
  } else if (selectedTab === "Videos") {
    filteredData = data;
  } else if (selectedTab === "Review") {
    filteredData = reviews;
  }
const startChat=async()=>{
  try {
    const result=  await startChatting(currentUser?.$id,id)
    let res = [];
    if (typeof result === 'string') {
      try {
        res = JSON.parse(result);
      } catch (error) {
        console.error('Error parsing result:', error);
      }
    } else if (typeof result === 'object' && result !== null) {
      res = result;
    }
   
    router.push({
      pathname: '/screens/messages',
      params: {
        chat_id:res.data.chat_id,
        avatar:
        user?.$id === res.data.user1_id.$id 
          ? res.data.user2_id.avatar
          : res.data.user1_id.avatar,
      username:
        user?.$id === res.data.user1_id.$id
          ? res.data.user2_id.username
          : res.data.user1_id.username,
          user_id:
          user?.$id ===res.data.user2_id.$id
        ? res.data.user1_id.$id
        : res.data.user2_id.$id,
      } 
    });
  } catch (error) {
    console.error('Error:', error);
  }
}
const ReviewPage=()=>{
  router.push({
    pathname:'/screens/CreateReview',
    params:{
      user_id:id,
      user_name:user.username,
      Reviewer_id:currentUser?.$id
    }
  })
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
              <View className="m-auto ml-5">
              <TouchableOpacity 
              onPress={ReviewPage}
              >
              <InfoBox
                title={"Write a Review"}
                 titleStyles="text-sm"
              />
              </TouchableOpacity>
              <TouchableOpacity 
              onPress={startChat}
              >
              <InfoBox
                title={"Send a Message"}
                 titleStyles="text-sm"
              />
              </TouchableOpacity>
              </View>
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

export default vndr_profile
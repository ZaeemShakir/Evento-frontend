import {
  View,
  Text,
  FlatList,
  RefreshControl,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "../../components/SearchInput";
import Trending from "../../components/Trending";
import EmptyState from "../../components/EmptyState";
import { getAllPosts, getLatestPosts } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import Card from "../../components/Card";
import { useGlobalContext } from "../../context/GlobalProvider";
const home = () => {
  {/*gets all the video post from the databse*/}
  {/*the useappwrite is custom hook that calls the function when the page loads and the reftch function helps recall when page refreshes*/}
  const {data, refetch} =useAppwrite(getAllPosts)
  {/*gets the recent images from the databse*/}
  const {data:latestPosts, refetch:latestReftch} =useAppwrite(getLatestPosts)
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    await latestReftch();
    setRefreshing(false);
  };
  const {user}=useGlobalContext()
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={data}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
        <Card post={item}/>  
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="mb-6 justify-between items-center flex-row">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back,
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  {user?.username}
                </Text>
              </View>
              <View className="mt-1.5">
              <Text className="text-4xl w-9 h-10 font-pregular text-white">E</Text>
              </View>
            </View>
            <SearchInput />
            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-gray-100 text-lg font-pregular mb-3">
                RECENTLY POSTED
              </Text>
              <Trending posts={latestPosts} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState title="nothing to show" subtitle="nothing posted" />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default home;

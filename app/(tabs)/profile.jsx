import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import React, { useCallback, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import EmptyState from "../../components/EmptyState";
import {
  deleteCurrentPost,
  getCustomerPosts,
  SignOut,
} from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import { icons } from "../../constants";
import InfoBox from "../../components/InfoBox";
import { router, useFocusEffect } from "expo-router";
import PostCard from "../../components/PostCard";
const profile = () => {
  const logout = async () => {
    await SignOut();
    setUser(null);
    setIsLogged(false);
    router.replace("/");
  };

  const { user, setUser, setIsLogged } = useGlobalContext();
  const { data, refetch } = useAppwrite(() => getCustomerPosts(user.$id));
  useEffect(() => {
    refetch();
  }, []);
  const deletePost = async (id) => {
    await deleteCurrentPost(id);
    refetch();
  };
  useFocusEffect(
    useCallback(() => {
      refetch(); 
    }, [])
  );
 
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={data}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <PostCard post={item} btn="X" btnFn={() => deletePost(item?.$id)} />
        )}
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
                title={"RECENT POSTS"}
                containerStyles="mt-5"
                titleStyles="text-lg"
              />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos found for this search query"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default profile;

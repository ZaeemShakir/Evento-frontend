import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useCallback } from "react";
import { useGlobalContext } from "../context/GlobalProvider";
import { getMessages } from "../lib/appwrite";
import useAppwrite from "../lib/useAppwrite";
import { router, useFocusEffect } from "expo-router";
const ChatList = ({ items }) => {
  const { user } = useGlobalContext();
  const { data, refetch } = useAppwrite(() => getMessages(items.chat_id));
  const lastMessage = data?.length > 0 ? data[data.length - 1] : null;
  useFocusEffect(
    useCallback(() => {
      const interval = setInterval(() => {
        refetch();
      }, 1000); // 2000ms = 2 second
      // Cleanup interval when the screen is unfocused
      return () => clearInterval(interval); 
    }, [])
  );
  return (
    <View className="flex justify-center items-center">
    <TouchableOpacity
      className="flex-row p-7 mb-6 border border-b-secondary-100 border-t-0 w-[90%] border-r-0 border-l-0  "
      onPress={() => {
        router.push({
          pathname: "/screens/messages",
          params: {
            chat_id: items.chat_id,
            avatar:
              user?.$id === items.user1_id.$id
                ? items.user2_id.avatar
                : items.user1_id.avatar,
            username:
              user?.$id === items.user1_id.$id
                ? items.user2_id.username
                : items.user1_id.username,
            user_id:
              user?.$id === items.user1_id.$id
                ? items.user1_id.$id
                : items.user2_id.$id,
          },
        });
      }}
    >
      <View className="w-12 h-12 border border-secondary rounded-lg justify-center ">
        <Image
          source={{
            uri:
              user?.$id === items.user1_id.$id
                ? items.user2_id.avatar
                : items.user1_id.avatar,
          }}
          className="w-[100%] h-[100%] rounded-lg"
          resizeMode="cover"
        />
      </View>
      <View className="flex-row justify-between w-full">
        <View className="my-auto pl-4">
          <Text className="text-secondary-100 font-psemibold text-md">
            {user?.$id === items.user1_id.$id
              ? items.user2_id.username
              : items.user1_id.username}
          </Text>
          <Text className="text-white text-sm pt-1">
            {lastMessage
              ? lastMessage.body.split(" ").slice(0, 5).join(" ") +
                (lastMessage.body.split(" ").length > 10 ? "..." : "")
              : "No messages yet."}
          </Text>
        </View>
        <View className="m-auto ">
          <Text className="text-gray-300 font-pregular text-xs">
            {lastMessage
              ? new Date(lastMessage.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : null}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
    </View>
  );
};

export default ChatList;

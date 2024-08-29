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
      refetch();
    }, [])
  );

  return (
    <TouchableOpacity
      className="flex-row px-4 py-6 mb-14 border border-b-secondary-100 border-t-0 "
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
      <View className="w-12 h-12 border border-secondary rounded-lg justify-center items-end">
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
  );
};

export default ChatList;

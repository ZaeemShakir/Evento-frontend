import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
const ReviewCard = ({ post }) => {
  console.log(post);

  return (
    <View className="flex-col items-center px-4 py-6 mb-14 border border-secondary-100 rounded-xl w-[90%] mx-auto">
      <View className="flex-row gap-3 items-start w-full">
        <View className="flex-row flex-1 items-center">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center">
            <Image
              source={{ uri: post.reviewer_id.avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>
          <View className="flex-1 ml-3">
            <Text
              numberOfLines={1}
              className="text-white font-psemibold text-sm"
            >
              {post.reviewer_id.username}
            </Text>
          </View>
        </View>
      </View>

      <View className="w-full mt-5 p-5 items-center">
        <Text className="text-white font-psemibold text-sm">{post.body}</Text>
      </View>

      <View className="w-full flex-row justify-between mt-5">
        <Text className="text-lg text-secondary-100 font-psemibold">
          Rating {post.rating}/5
        </Text>
        <Text className="text-md text-secondary-100 font-pregular">
          {new Date(post.timestamp).toLocaleDateString([], {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </Text>
      </View>
    </View>
  );
};
export default ReviewCard;

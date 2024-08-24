import { View, Text, Image } from "react-native";
import React from "react";
import icons from "../constants/icons";
import CustomButton from "./CustomButton";

const PostCard = ({ post,btn,btnFn,userid}) => {

  const eventDate = new Date(post.event_data);

  const formattedDate = eventDate.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
  const loop = () => {
    const isApplied = post.vendor_appliation.some(btns => btns.$id === userid);
    return isApplied ? "Applied" : "Apply";
  }
  const btnTitle=loop()

  return (
    <View className="flex-col items-center px-4 py-6 mb-14 border border-secondary-100 rounded-xl w-[90%] mx-auto">
      <View className="flex-row gap-3 items-start w-full">
        <View className="flex-row flex-1 items-center">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center">
            <Image
              source={{ uri: post.userCustomers.avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>
          <View className="flex-1 ml-3">
            <Text
              numberOfLines={1}
              className="text-white font-psemibold text-sm"
            >
              {post.event_name}
            </Text>
            <Text
              className="text-xs text-gray-100 font-pregular"
              numberOfLines={1}
            >
              {post.userCustomers.username}
            </Text>
          </View>
        </View>
        <View className="pt-2">
          <CustomButton  
          title={btnTitle}
          containerStyles={`${btn==='X'?'w-10':'w-20'} min-h-[25px] `}
          handlePress={btnFn}
        />
        </View>
      </View>

      <View className="w-full mt-5 p-5">
        <Text className="text-white font-psemibold text-sm">
          {post.event_desc}
        </Text>
      </View>

      <View className="w-full flex-row justify-between mt-5">
        <Text className="text-xs text-gray-100 font-pregular">
          Will be on {formattedDate}
        </Text>
        <Text className="text-xs text-gray-100 font-pregular">
          Location {post.event_loc}
        </Text>
      </View>
    </View>
  );
};

export default PostCard;

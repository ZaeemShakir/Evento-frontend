import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import icons from "../constants/icons";
import { ResizeMode, Video } from "expo-av";

const ImgCard = ({ post }) => {
  return (
   <View className="flex-col items-center px-4 mb-14">
      <View className="flex-row gap-3 items-start">
        <View className="justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center ">
            <Image
              source={{ uri: post.userCustomers.avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>
          <View className="justify-center flex-1 ml-3 gap-y-1">
            <Text
              numberOfLines={1}
              className="text-white font-psemibold text-sm"
            >
              {post.title}
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
          <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
        </View>
      </View>
     
        <TouchableOpacity
          activeOpacity={0.7}
          className="w-full h-60 rounded-xl mt-3 relative justify-center items-center"
        >
          <Image
            source={{ uri: post.image }}
            className="w-full h-full rounded-xl mt-3"
            resizeMode="cover"
          />
       
        </TouchableOpacity>
   
       <View className=" w-[60%] justify-between mt-5 flex-row items-center ">
            
            <Text
              className="text-sm text-gray-100 font-pregular "
              numberOfLines={1}
            >
              #{post.prompt1}
            </Text>
            <Text
              className="text-sm text-gray-100 font-pregular"
              numberOfLines={1}
            >
              #{post.prompt2}
            </Text>
            <Text
              className="text-sm text-gray-100 font-pregular"
              numberOfLines={1}
            >
              #{post.prompt3}
            </Text>
          </View>
    </View>
  );
};

export default ImgCard
import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import icons from "../constants/icons";
import { ResizeMode, Video } from "expo-av";
import { router } from "expo-router";
const Card = ({ post }) => {
  const [play, setPlay] = useState(false);
  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className="flex-row gap-3 items-start">
        <TouchableOpacity 
        onPress={()=>(router.push(`/vndr_profile/${post.userCustomers?.$id}`))}
        className="justify-center items-center flex-row flex-1">
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
        </TouchableOpacity>
        <View className="pt-2">
          <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
        </View>
      </View>
      {play ? (
        <Video
          source={{ uri: post.video }}
          className="w-full h-60 rounded-xl mt-3 "
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(!play)}
          className="w-full h-60 rounded-xl mt-3 relative justify-center items-center"
        >
          <Image
            source={{ uri: post.thumbnail }}
            className="w-full h-full rounded-xl mt-3"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
       <View className=" w-[50%] justify-between  ml-3 gap-y-1 mt-5 flex-row items-center">
            
            <Text
              className="text-xs text-gray-100 font-pregular"
              numberOfLines={1}
            >
              #{post.prompt}
            </Text>
            <Text
              className="text-xs text-gray-100 font-pregular"
              numberOfLines={1}
            >
              #{post.prompt2}
            </Text>
            <Text
              className="text-xs text-gray-100 font-pregular"
              numberOfLines={1}
            >
              #{post.prompt3}
            </Text>
          </View>
    </View>
  );
};

export default Card;

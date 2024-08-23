import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import icons from "../constants/icons";
import { ResizeMode, Video } from "expo-av";

const Card = ({ post }) => {
  const [play, setPlay] = useState(false);
  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className="flex-row gap-3 items-start">
        <View className="justify-center items-center flex-row flex-1">
         
          <View className="justify-center items-center flex-1 ml-3 gap-y-1">
            <Text
              numberOfLines={1}
              className="text-white font-psemibold text-lg"
            >
              {post.title}
            </Text>
           
          </View>
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
       <View className=" w-[60%] justify-between mt-5 flex-row items-center ">
            
            <Text
              className="text-sm text-gray-100 font-pregular "
              numberOfLines={1}
            >
              #{post.prompt}
            </Text>
            <Text
              className="text-sm text-gray-100 font-pregular"
              numberOfLines={1}
            >
              #{post.prompt}
            </Text>
            <Text
              className="text-sm text-gray-100 font-pregular"
              numberOfLines={1}
            >
              #{post.prompt}
            </Text>
          </View>
    </View>
  );
};

export default Card;

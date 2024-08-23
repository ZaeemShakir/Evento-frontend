import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import React, { useState } from "react";
import * as Animatable from "react-native-animatable";
import { icons } from "../constants";
import {Video,ResizeMode} from 'expo-av'
const zoomIn = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1,
  },
};
const zoomOut = {
  0: {
    scale: 1,
  },
  1: {
    scale: 0.9,
  },
};

const TrendingItem = ({ activeItem, item }) => {
  const [play, setplay] = useState(false);
  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      <TouchableOpacity
        className="relative justify-center items-center"
        activeOpacity={0.7}
      >
        <Image
          source={{ uri: item.image }}
          className="w-52 h-72 rounded-[35px] mt-3 bg-white/10"
          resizeMode="cover"
        />

        <View className="absolute bottom-0 w-full p-4 bg-black bg-opacity-50 rounded-b-[35px]">
          <View className="flex-row items-center">
            <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center">
              <Image
                source={{ uri: item.userCustomers.avatar }}
                className="w-full h-full rounded-lg"
                resizeMode="cover"
              />
            </View>
            <View className="flex-1 ml-3">
              <Text
                numberOfLines={1}
                className="text-white font-psemibold text-sm"
              >
                {item.title}
              </Text>
              <Text
                className="text-xs text-gray-100 font-pregular"
                numberOfLines={1}
              >
                {item.userCustomers.username}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Animatable.View>
  );
};

const Trending = ({ posts }) => {
  const [active, setActive] = useState(posts[1]);
  const viewableItemschanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActive(viewableItems[0].key);
    }
  };

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={active} item={item} />
      )}
      onViewableItemsChanged={viewableItemschanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{
        x: 170,
      }}
      horizontal
    />
  );
};

export default Trending;

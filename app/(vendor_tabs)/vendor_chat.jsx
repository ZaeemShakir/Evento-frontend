import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useFocusEffect } from 'expo-router';
import { useGlobalContext } from '../../context/GlobalProvider';
import { getChats } from '../../lib/appwrite';
import ChatList from '../../components/ChatList';
import useAppwrite from '../../lib/useAppwrite';

const vendor_chat = () => {
  const {user}=useGlobalContext()
  const { data, refetch } = useAppwrite(() => getChats(user.$id));
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
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={data}
        keyExtractor={(item) => item.chat_id}
        renderItem={({item})=>(<ChatList items={item}/>)}
        ListHeaderComponent={() => (
          <View className="w-full justify-center items-center mt-6 mb-12 px-4 ">
            <View className="w-full h-16 rounded-lg justify-center items-center">
              <Text className="text-white font-pbold text-xl">Recent Chats</Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default vendor_chat;
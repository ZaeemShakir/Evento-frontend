import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { router, useLocalSearchParams } from 'expo-router';
import EmptyState from '../../components/EmptyState';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGlobalContext } from '../../context/GlobalProvider';
import { startChatting } from '../../lib/appwrite';

const vendor_list = () => {
  const {user}=useGlobalContext()
  const { vendors } = useLocalSearchParams();
  let vendorDetails = [];
  if (typeof vendors === 'string') {
    try {
      vendorDetails = JSON.parse(vendors);
    } catch (error) {
      console.error('Error parsing vendors:', error);
    }
  } else if (typeof vendors === 'object' && vendors !== null) {
    vendorDetails = vendors;
  }
  const startChat= async (user2_id)=>{
  try {
    const result=  await startChatting(user?.$id,user2_id)
    let res = [];
    if (typeof result === 'string') {
      try {
        res = JSON.parse(result);
      } catch (error) {
        console.error('Error parsing result:', error);
      }
    } else if (typeof result === 'object' && result !== null) {
      res = result;
    }
  
    router.push({
      pathname: '/screens/messages',
      params: {
        chat_id:res.data.chat_id,
        avatar:
        user?.$id === res.data.user1_id.$id 
          ? res.data.user2_id.avatar
          : res.data.user1_id.avatar,
      username:
        user?.$id === res.data.user1_id.$id
          ? res.data.user2_id.username
          : res.data.user1_id.username,
          user_id:
          user?.$id ===res.data.user1_id.$id
        ? res.data.user1_id.$id
        : res.data.user2_id.$id,
      } 
    });
  } catch (error) {
    console.error('Error:', error);
  }
  }
  const renderVendorCard = ({ item }) => (
    <View className="border border-secondary-100 p-4 mb-4 rounded-lg items-center w-[80%] mx-auto ">
      <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center">
            <Image
              source={{ uri: item.avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>
      <Text className="text-white font-pbold text-lg mt-4">{item.username}</Text>
      <View className="flex-row mt-4">
        <TouchableOpacity
          className="border border-secondary-200 px-4 py-2 rounded-lg mr-2"
          onPress={() =>startChat(item.accountId)}
        >
          <Text className="text-white font-pmedium">Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="border border-secondary-200 px-4 py-2 rounded-lg"
          onPress={() => router.push(`/vndr_profile/${item.accountId}`)}
        >
          <Text className="text-white font-pmedium">Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={vendorDetails}
        keyExtractor={(item) => item.accountId}
        renderItem={renderVendorCard}
        ListHeaderComponent={() => (
          <View className="w-full justify-center items-center mt-6 mb-12 px-4 ">
            <View className="w-full h-16 rounded-lg justify-center items-center">
              <Text className="text-white font-pbold text-xl">List Of Applicants</Text>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Applicants Found"
            subtitle="Give it a while for people to apply"
          />
        )}
      />
    </SafeAreaView>
  );
};


export default vendor_list
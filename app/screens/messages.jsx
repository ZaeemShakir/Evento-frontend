import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getMessages, sendMessage } from "../../lib/appwrite";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { useGlobalContext } from "../../context/GlobalProvider";
import useAppwrite from "../../lib/useAppwrite";
import InfoBox from "../../components/InfoBox";
import FormField from "../../components/FormField";

const Messages = () => {
  const { chat_id, avatar, username, user_id } = useLocalSearchParams();

  const { data, refetch } = useAppwrite(() => getMessages(chat_id));
  const { user } = useGlobalContext();
  const [form, setForm] = useState();
  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [])

  );
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const handleSend = async () => {
    try {
      await sendMessage(chat_id, user?.$id, form);
      setForm("");
      refetch();
    } catch (error) {
      console.error("Error sending message:", error.message);
    }
  };

  const renderMessage = ({ item }) => 
    (
    <View
      className={` w-[100%]rounded-lg mt-2 p-1 flex ${
        item.sender_id.$id === user_id ? "items-end" : "items-start"
      }`}
    >
      <View className="border border-secondary-100 p-3 rounded-md w-[50%] ">
        <Text className="text-white font-pregular">{item.body}</Text>
        <Text className="text-gray-400 font-plight text-xs pt-1">{
          new Date(item.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="bg-primary h-full flex">
      <FlatList
        data={data}
        keyExtractor={(item) => item.$id}
        renderItem={renderMessage}
        ListHeaderComponent={() => (
          <View className="w-full justify-center items-center mt-6 mb-12 px-4">
            <View className="w-12 h-12 border border-secondary rounded-lg justify-center items-end">
              <Image
                source={{ uri: avatar }}
                className="w-[100%] h-[100%] rounded-lg"
                resizeMode="cover"
              />
            </View>
            <InfoBox
              title={username}
              containerStyles="mt-5"
              titleStyles="text-lg"
            />
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
   
      />
      <View className="flex-row w-full p-2 items-center">
        <View className="flex-1 mr-2">
          <FormField
          
          value={form}
          handleChange={(e)=>setForm(e)}
         
        
          />
        </View>
        <TouchableOpacity
          onPress={handleSend}
          className="bg-secondary-100 justify-end mt-5 items-baseline p-4 rounded-md"
        >
          <Text className="font-psemibold text-sm text-primary">Send</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Messages;

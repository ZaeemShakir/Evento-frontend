import {
    View,
    Text,
    FlatList,
    Image,
    RefreshControl,
    Alert,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import { SafeAreaView } from "react-native-safe-area-context";
  import { images } from "../../constants";
  import SearchInput from "../../components/SearchInput";
  import EmptyState from "../../components/EmptyState";
  import { applyJob, getAllCustomPosts, getAllPosts } from "../../lib/appwrite";
  import useAppwrite from "../../lib/useAppwrite";
  import { useGlobalContext } from "../../context/GlobalProvider";
import PostCard from "../../components/PostCard";
const vendor_home = () => {
  
    const {data, refetch} =useAppwrite(getAllCustomPosts)
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = async () => {
      setRefreshing(true);
      await refetch();
      setRefreshing(false);
    };
    
    const {user}=useGlobalContext()
    const jobApply=async(id,userid)=>{
    
      try{
        await applyJob(id,userid)
        Alert.alert("Success","You have applied for the job")
        await refetch()
          } 
        catch(error){
          Alert.alert('Error',error)
        }
        }
     
    return (
      <SafeAreaView className="bg-primary h-full">
        <FlatList
          data={data}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => (
          <PostCard post={item} btn={"Apply"} btnFn={()=>jobApply(item?.$id,user?.$id)} userid={user?.$id}/>  
          )}
          ListHeaderComponent={() => (
            <View className="my-6 px-4 space-y-6">
              <View className="mb-6 justify-between items-center flex-row">
                <View>
                  <Text className="font-pmedium text-sm text-gray-100">
                    Welcome provider,
                  </Text>
                  <Text className="text-2xl font-psemibold text-white">
                    {user?.username}
                  </Text>
                </View>
                <View className="mt-1.5">
                  <Text className="text-4xl w-9 h-10 font-pregular text-white">E</Text>
                 
                </View>
              </View>
              <SearchInput />
              <View className="w-full flex-1 pt-5 pb-5">
                <Text className="text-gray-100 text-lg font-pregular mb-3">
                  Latest Jobs
                </Text>
              </View>
            </View>
          )}
          ListEmptyComponent={() => (
            <EmptyState title="nothing to show" subtitle="nothing posted" />
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </SafeAreaView>
    );
  };

export default vendor_home
import {
    View,
    Text,
    FlatList,
  } from "react-native";
  import React, { useEffect } from "react";
  import { SafeAreaView } from "react-native-safe-area-context";
  import SearchInput from "../../components/SearchInput";
  import EmptyState from "../../components/EmptyState";
  import useAppwrite from "../../lib/useAppwrite";
  import { useLocalSearchParams } from "expo-router";
import PostCard from "../../components/PostCard";
import { searchLatestJobs } from "../../lib/appwrite";
  const Search = () => {
    const { query } = useLocalSearchParams();
    const { data, refetch } = useAppwrite(() => searchLatestJobs(query));
    useEffect(() => {
      refetch();
    }, [query]);
    return (
      <SafeAreaView className="bg-primary h-full">
        <FlatList
          data={data}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => (
            
              <PostCard post={item} btn="apply" />
             
          )}
          ListHeaderComponent={() => (
            <>
              <View className="flex my-6 px-4">
                <Text className="font-pmedium text-gray-100 text-sm">
                  Search Results
                </Text>
                <Text className="text-2xl font-psemibold text-white mt-1">
                  {query}
                </Text>
  
                <View className="mt-6 mb-8">
                  <SearchInput initialQuery={query} refetch={refetch} />
                </View>
              </View>
            </>
          )}
          ListEmptyComponent={() => (
            <EmptyState
              title="No Results Found"
              subtitle="No results found for this search query"
            />
          )}
        />
      </SafeAreaView>
    );
  };
  
  export default Search;
  
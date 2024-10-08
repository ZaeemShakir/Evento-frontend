import {
  View,
  Text,
  FlatList,
} from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "../../components/SearchInput";
import EmptyState from "../../components/EmptyState";
import { searchLatestImage, searchLatestPosts } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import Card from "../../components/Card";
import { useLocalSearchParams } from "expo-router";
import ImgCard from "../../components/ImgCard";
const Search = () => {
  const { query } = useLocalSearchParams();
  const { data, refetch } = useAppwrite(() => searchLatestPosts(query));
  const { data: data1, refetch: refetch1 } = useAppwrite(() => searchLatestImage(query));
  useEffect(() => {
    refetch();
    refetch1();
  }, [query]);
  
  const combinedData = data.length !== 0
  ? data.map((item, index) => ({
      ...item,
      imageItem: data1[index] || null,
    }))
  : data1.map((item, index) => ({
      imageItem: item
    }));
console.log(combinedData)
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={combinedData}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
         <>{data.length!==0?<>
            <Card post={item} />
            {item.imageItem ? <ImgCard post={item.imageItem} /> : null}
          </>:<ImgCard post={item.imageItem}/>}</>
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

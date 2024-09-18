import { View, Text, ScrollView, Alert,  } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { router, useLocalSearchParams } from 'expo-router';
import { createReview } from '../../lib/appwrite';
const CreateReview = () => {
  const { user_id,user_name,Reviewer_id } = useLocalSearchParams();
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    body: "",
    rating: 0,
  });
  const submit = async () => {
    if (!form.body) {
      return Alert.alert('Please fill in all the required data');
    }
    const rating = parseInt(form.rating, 10);
    if (isNaN(rating)) {
      return Alert.alert('Please enter a valid rating');
    }
    setUploading(true); 
    try {
      await createReview(user_id, form.body, rating, Reviewer_id); 
      Alert.alert('Success', 'Post uploaded');
      router.push(`/vndr_profile/${user_id}`);
    } catch (error) {
      Alert.alert("Something went wrong", error.message);
    } finally {
      setForm({
        body: "",
        rating: 0,
      });
      setUploading(false);
    }
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white font-psemibold">
          Write a review for {user_name}
        </Text>
        <FormField
          title={"Write a review"}
          value={form.body}
          placeholder={"Review"}
          handleChange={(e) => setForm({ ...form, body: e })}
          otherStyles="mt-10 w-full h-40 mb-10"
          inputBoxStyle="h-40 items-baseline"
        />
        <FormField
          title={"Rating"}
          value={form.rating}
          placeholder={"Give a rating out of 5"}
          handleChange={(e) => setForm({ ...form, rating: e })}
          otherStyles="mt-10"
        />
        <CustomButton
          title="Submit"
          handlePress={submit}
          containerStyles={"mt-7 min-h-[62px]"}
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
export default CreateReview;

import { View, Text, ScrollView, TouchableOpacity, Image, Alert, Platform } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { router } from 'expo-router';
import { createPost } from '../../lib/appwrite';
import { useGlobalContext } from '../../context/GlobalProvider';
import DateTimePicker from '@react-native-community/datetimepicker';
const Create = () => {
  {/*getting the user id from context*/}
  const { user } = useGlobalContext();
  {/*getting setting the uploading to true and false when uploading the form*/}
  const [uploading, setUploading] = useState(false);
  {/*the form that is to be filled and submitted*/}
  const [form, setForm] = useState({
    event_name: "",
    event_desc: "",
    event_date: new Date(),
    event_loc: ""
  });
  {/*to show the date time picker*/}
  const [showDatePicker, setShowDatePicker] = useState(false);
  const submit = async () => {
    if (!form.event_name || !form.event_desc || !form.event_date || !form.event_loc) {
      return Alert.alert('Please fill in all the required data');
    }
    setUploading(true);
    try {
      {/*function to submit the form in the data base*/}
      await createPost({
        ...form,
        userId: user.$id
      });
      Alert.alert('Success', 'Post uploaded');
      router.push('/profile');
    } catch (error) {
      Alert.alert("Something went wrong", error);
    } finally {
      {/*if successful setting the form to null*/}
      setForm({
        event_name: "",
        event_desc: "",
        event_date: new Date(),
        event_loc: ""
      });
      setUploading(false);
    }
  };
  {/*function to show the date on the form when changed*/}
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || form.event_date;
    setShowDatePicker(Platform.OS === 'ios');
    setForm({ ...form, event_date: currentDate });
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white font-psemibold">
          Upload Post
        </Text>
        <FormField
          title={"What type of service you looking for?"}
          value={form.event_name}
          placeholder={"What type of event is it?"}
          handleChange={(e) => setForm({ ...form, event_name: e })}
          otherStyles="mt-10"
        />
        <FormField
          title={"Event Description"}
          value={form.event_desc}
          placeholder={"Describe the event"}
          handleChange={(e) => setForm({ ...form, event_desc: e })}
          otherStyles="mt-10 w-full h-40 mb-10"
          inputBoxStyle="h-40 items-baseline"
        />
        <TouchableOpacity onPress={() => setShowDatePicker(true)} className="mt-10">
          <Text className="text-white text-lg">Select Event Date </Text>
          <Text className="text-gray-300 text-base mt-2">
            {form.event_date.toLocaleString()}
          </Text>
        </TouchableOpacity>
         {showDatePicker && (
           <DateTimePicker
           testID="dateTimePicker"
           value={form.event_date}
           mode='date'
           is24Hour={false} 
           display="default" 
           onChange={onChange}
          
         />
        )} 
        <FormField
          title={"Event Location"}
          value={form.event_loc}
          placeholder={"Where will the event be held?"}
          handleChange={(e) => setForm({ ...form, event_loc: e })}
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

export default Create;

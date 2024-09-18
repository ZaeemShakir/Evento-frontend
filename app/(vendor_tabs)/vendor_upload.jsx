import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import { Video, ResizeMode } from "expo-av";
import { icons } from "../../constants";
import CustomButton from "../../components/CustomButton";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { createImage, createVideo } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
const vendor_upload = () => {
  const [selectedTab, setSelectedTab] = useState("video");
  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    video: null,
    thumbnail: null,
    prompt: "",
    prompt2: "",
    prompt3: "",
  });
  const [imgForm, setImgForm] = useState({
    title: "",
    image: null,
    prompt1: "",
    prompt2: "",
    prompt3: "",
  });
  const submit = async () => {
    //checking if everything is filled
    if (!form.prompt || !form.title || !form.thumbnail || !form.video) {
      return Alert.alert("Please fill in all the required data");
    }
    setUploading(true);
    try {
      //sending the data to the backend
      await createVideo({
        ...form,
        userId: user.$id,
      });
      Alert.alert("success", "post uploaded");
      router.push("/vendor_profile");
    } catch (error) {
      Alert.alert("Something went wrong", error);
    } finally {
      setForm({
        title: "",
        video: null,
        thumbnail: null,
        prompt: "",
        prompt2: "",
        prompt3: "",
      });
      setUploading(false);
    }
  };
  //submitting image
  const submitImg = async () => {
    if (
      !imgForm.prompt1 ||
      !imgForm.title ||
      !imgForm.image ||
      !imgForm.prompt2 ||
      !imgForm.prompt3
    ) {
      return Alert.alert("Please fill in all the required data");
    }
    setUploading(true);
    try {
      await createImage({
        ...imgForm,
        userId: user.$id,
      });
      Alert.alert("success", "post uploaded");
      router.push("/vendor_profile");
    } catch (error) {
      Alert.alert("Something went wrong", error);
    } finally {
      setImgForm({
        title: "",
        image: null,
        prompt1: "",
        prompt2: "",
        prompt3: "",
      });
      setUploading(false);
    }
  };
  //gallery opener
  const openPicker = async (selectType, selectedTab) => {
    //opens image or video library depending on the use choice
    if (selectedTab === "video") {
      //opening library setting the video quality and aspect atio
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes:
          selectType === "image"
            ? ImagePicker.MediaTypeOptions.Images
            : ImagePicker.MediaTypeOptions.Videos,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) {
        if (selectType === "image") {
          setForm({ ...form, thumbnail: result.assets[0] });
        } else if (selectType === "video") {
          setForm({ ...form, video: result.assets[0] });
        }
      }
    } else {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes:
          selectType === "image"
            ? ImagePicker.MediaTypeOptions.Images
            : ImagePicker.MediaTypeOptions.Videos,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) {
        setImgForm({ ...imgForm, image: result.assets[0] });
      }
    }
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <View className="flex-row mt-5 mb-7 justify-around">
          <TouchableOpacity onPress={() => setSelectedTab("video")}>
            <Text
              className={`text-lg ${
                selectedTab === "video" ? "text-white" : "text-gray-400"
              }`}
            >
              Upload Video
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelectedTab("image")}>
            <Text
              className={`text-lg ${
                selectedTab === "image" ? "text-white" : "text-gray-400"
              }`}
            >
              Upload Image
            </Text>
          </TouchableOpacity>
        </View>
        {selectedTab === "video" ? (
          <>
            <FormField
              title={"Title"}
              value={form.title}
              placeholder={"Tell about the event"}
              handleChange={(e) => setForm({ ...form, title: e })}
              otherStyles="mt-2"
            />
            <View className="mt-7 space-y-2">
              <Text className="text-base text-gray-100 font-pmedium">
                Upload Video
              </Text>
              <TouchableOpacity
                onPress={() => openPicker("video", selectedTab)}
              >
                {form.video ? (
                  <Video
                    source={{ uri: form.video.uri }}
                    className="w-full h-64 rounded-2xl"
                    resizeMode={ResizeMode.COVER}
                  />
                ) : (
                  <View className="w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center">
                    <View className="w-14 h-14  justify-center items-center">
                      <Image
                        source={icons.upload}
                        ResizeMode="contain"
                        className="w-5 h-1/2"
                      />
                    </View>
                  </View>
                )}
              </TouchableOpacity>
            </View>
            <View className="mt-7 space-y-2">
              <Text className="text-2xl text-white font-psemibold">
                Upload Image
              </Text>
              <TouchableOpacity
                onPress={() => openPicker("image", selectedTab)}
              >
                {form.thumbnail ? (
                  <Image
                    source={{ uri: form.thumbnail.uri }}
                    className="w-full h-64 rounded-2xl"
                    resizeMode="cover"
                  />
                ) : (
                  <View className="w-full h-16 flex-row space-x-2 px-4 bg-black-100 rounded-2xl justify-center items-center">
                    <Image
                      source={icons.upload}
                      ResizeMode="contain"
                      className="w-5 h-1/2"
                    />
                    <Text className="text-sm text-gray-100 font-pmedium">
                      choose a file
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
            <FormField
              title={"prompt 1"}
              value={form.prompt}
              placeholder={"prompt"}
              handleChange={(e) => setForm({ ...form, prompt: e })}
              otherStyles="mt-7"
            />
             <FormField
              title={"prompt 2"}
              value={form.prompt2}
              placeholder={"prompt"}
              handleChange={(e) => setForm({ ...form, prompt2: e })}
              otherStyles="mt-7"
            />
             <FormField
              title={"prompt 3"}
              value={form.prompt3}
              placeholder={"prompt"}
              handleChange={(e) => setForm({ ...form, prompt3: e })}
              otherStyles="mt-7"
            />
            <CustomButton
              title="Submit"
              handlePress={submit}
              containerStyles={"mt-7 min-h-[62px]"}
              isLoading={uploading}
            />
          </>
        ) : (
          <>
            <FormField
              title={"Title"}
              value={imgForm.title}
              placeholder={"Tell about the event"}
              handleChange={(e) => setImgForm({ ...imgForm, title: e })}
              otherStyles="mt-2"
            />
            <View className="mt-7 space-y-2"></View>
            <View className="mt-7 space-y-2">
              <Text className="text-2xl text-white font-psemibold">
                Upload Image
              </Text>
              <TouchableOpacity
                onPress={() => openPicker("image", selectedTab)}
              >
                {imgForm.image ? (
                  <Image
                    source={{ uri: imgForm.image.uri }}
                    className="w-full h-64 rounded-2xl"
                    resizeMode="cover"
                  />
                ) : (
                  <View className="w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center">
                    <View className="w-14 h-14  justify-center items-center">
                      <Image
                        source={icons.upload}
                        ResizeMode="contain"
                        className="w-5 h-1/2"
                      />
                    </View>
                    <Text className="text-sm text-gray-100 font-pmedium">
                      choose a file
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
            <FormField
              title={"prompt 1"}
              value={imgForm.prompt1}
              placeholder={"prompt"}
              handleChange={(e) => setImgForm({ ...imgForm, prompt1: e })}
              otherStyles="mt-7"
            />
            <FormField
              title={"prompt 2"}
              value={imgForm.prompt2}
              placeholder={"prompt"}
              handleChange={(e) => setImgForm({ ...imgForm, prompt2: e })}
              otherStyles="mt-7"
            />
            <FormField
              title={"prompt 3"}
              value={imgForm.prompt3}
              placeholder={"prompt"}
              handleChange={(e) => setImgForm({ ...imgForm, prompt3: e })}
              otherStyles="mt-7"
            />
            <CustomButton
              title="Submit"
              handlePress={submitImg}
              containerStyles={"mt-7 min-h-[62px]"}
              isLoading={uploading}
            />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default vendor_upload;

import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../../components/FormField'
import {Video, ResizeMode} from "expo-av"
import { icons } from '../../constants'
import CustomButton from '../../components/CustomButton'
import * as DocumentPicker from 'expo-document-picker'
const create = () => {
  const [uploading, setUploading] = useState(false)
  const [form, setForm] = useState({
    title:"",
    video:null,
    thumbnail:null,
    prompt:''
  })

  const submit=()=>{

  }
  const openPicker= async(selectType)=>{
    const result= await DocumentPicker.getDocumentAsync({
      type:selectType==='image'
      ? ('image.png','image/jpg'):('video/mp4','video/gif')
    })
  }
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white font-psemibold">
          Upload Post
        </Text>
        <FormField 
        title={"Title"}
        value={form.title}
        placeholder={"Tell about the event"}
        handleChange={(e)=>setForm({...form, title:e})}
        otherStyles="mt-10"
        />
        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">Upload Video</Text>
          <TouchableOpacity onPress={()=>openPicker('video')}>
           {form.video?(<Video
           source={{uri:form.video.uri}}
           className="w-full h-64 rounded-2xl"
           useNativeControls
           resizeMode={ResizeMode.COVER}
           isLooping
           />):(
            <View className="w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center">
                <View className="w-14 h-14  justify-center items-center">
                  <Image source={icons.upload} ResizeMode="contain" className="w-5 h-1/2"/>

                </View>
            </View>
           )} 
          </TouchableOpacity >
        </View>
        <View className="mt-7 space-y-2">
        <Text className="text-2xl text-white font-psemibold">
          Upload Image
        </Text>
        <TouchableOpacity  onPress={()=>openPicker('image')}>
           {form.thumbnail?(<Image source={{uri:form.thumbnail.uri}}
           className="w-full h-64 rounded-2xl"
           resizeMode='cover'
           />):(
            <View className="w-full h-16 flex-row space-x-2 px-4 bg-black-100 rounded-2xl justify-center items-center">
                
                  <Image source={icons.upload} ResizeMode="contain" className="w-5 h-1/2"/>
                <Text className="text-sm text-gray-100 font-pmedium"> choose a file</Text>
            </View>
           )} 
          </TouchableOpacity>
        </View>
        <FormField 
        title={"prompt"}
        value={form.prompt}
        placeholder={"prompt"}
        handleChange={(e)=>setForm({...form, prompt:e})}
        otherStyles="mt-7"
        />
      <CustomButton title="Submit"
      handlePress={submit}
      containerStyles={"mt-7"}
      isLoading={uploading}
      />
      </ScrollView>
    </SafeAreaView>
  )
}

export default create
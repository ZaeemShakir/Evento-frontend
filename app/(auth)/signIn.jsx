import { View, Text, ScrollView ,Image, Alert} from 'react-native'
import React,{useState} from 'react'
import {SafeAreaView} from "react-native-safe-area-context"
import {images} from "../../constants"
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import {Link, router} from "expo-router"
import { SignIn } from '../../lib/appwrite'
const signIn = () => {

  const submit= async()=>{
    if(!form.email || !form.password){
      Alert.alert('Error','Please fill all the fields')
    }
    setloading(true)
    try{
      const result=await SignIn(form.email,form.password)
    
    router.replace('/home')
    }
    catch(error){
      Alert.alert('Error',error.message)
    }finally{
      setloading(false)
    }
    
  }
  const [form, setForm] = useState({
    email:'',
    password:''
  })
  const [loading, setloading] = useState(false)
  return (
   <SafeAreaView className="bg-primary h-full">
    <ScrollView>
      <View className="w-full justify-center items-center min-h-[85vh] px-4 my-6">
        <Image source={images.logo} resizeMode='contain' className='w-[115px] h-[100px]'/>
        <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">Log in to Evento</Text>
      <FormField
      title="Email"
      value={form.email}
      handleChange={(e)=>setForm({...form,email:e})}
      otherStyles="mt-7"
      keyboardType="email-address"
      />
      <FormField
      title="Password"
      value={form.password}
      handleChange={(e)=>setForm({...form,password:e})}
      otherStyles="mt-7"
      keyboardType="password"
      />

      <CustomButton
      title="Sign In"
      handlePress={submit}
      containerStyles="mt-7 w-full"
      isLoading={loading}
      />
      <View className="justify-center pt-5 flex-row gap-2">
        <Text className="text-lg text-gray-100 font-pregular">Don't have an account?</Text>
      <Link href="/signUp" className='text-lg font-semibold text-secondary'>Sign Up</Link>
      </View>
      </View>
    </ScrollView>
   </SafeAreaView>
  )
}

export default signIn
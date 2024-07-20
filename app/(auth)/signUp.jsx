import { View, Text, ScrollView ,Image, Alert} from 'react-native'
import React,{useState} from 'react'
import {SafeAreaView} from "react-native-safe-area-context"
import {images} from "../../constants"
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import {Link, router} from "expo-router"
import {createUser} from "../../lib/appwrite"
import {useGlobalContext} from "../../context/GlobalProvider.js"
const signUp = () => {
  const { setUser, setIsLogged } = useGlobalContext();
  const [form, setForm] = useState({
    username:'',
    email:'',
    password:''
  })
  const submit= async()=>{
    if(!form.email || !form.password||!form.username){
      Alert.alert('Error','Please fill all the fields')
    }
    setloading(true)
    try{
      const result=await createUser(form.email,form.password,form.username)
    setUser(result)
    setIsLogged(true)
    router.replace('/home')
    }
    catch(error){
      Alert.alert('Error',error.message)
    }finally{
      setloading(false)
    }
    
  }

  const [loading, setloading] = useState(false)
  return (
   <SafeAreaView className="bg-primary h-full">
    <ScrollView>
      <View className="w-full justify-center items-center min-h-[85vh] px-4 my-6">
        <Image source={images.logo} resizeMode='contain' className='w-[115px] h-[100px]'/>
        <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">Sign Up to Evento</Text>
        <FormField
      title="User Name"
      value={form.username}
      handleChange={(e)=>setForm({...form,username:e})}
      otherStyles="mt-10"
  
      />
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
      title="Sign Up"
      handlePress={submit}
      containerStyles="mt-7 w-full"
      isLoading={loading}
      />
      <View className="justify-center pt-5 flex-row gap-2">
        <Text className="text-lg text-gray-100 font-pregular">Have an account?</Text>
      <Link href="/signIn" className='text-lg font-semibold text-secondary'>Sign In</Link>
      </View>
      </View>
    </ScrollView>
   </SafeAreaView>
  )
}

export default signUp
import { View, Text, ScrollView ,Image, Alert, TouchableOpacity} from 'react-native'
import React,{useState} from 'react'
import {SafeAreaView} from "react-native-safe-area-context"
import {images} from "../../constants"
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import {Link, router} from "expo-router"
import { getCurrentUser, SignIn, SignOut } from '../../lib/appwrite'
import { useGlobalContext } from "../../context/GlobalProvider";
const signIn = () => {
  {/*getting the setter for islogged and setting the user id and user type*/}
  const { setUser, setIsLogged,user } = useGlobalContext();
  const submit= async()=>{
    if(!form.email || !form.password){
      Alert.alert('Error','Please fill all the fields')
    }
    setloading(true)
    try{
       {/*sending data to appwrite to authenticate if the user exist or not*/}
      await SignIn(form.email,form.password)
      const result= await getCurrentUser()
      if(result.usertype==='customer'){
      setUser(result);
      setIsLogged(true);
    router.replace('/home')
      }
      else{
        await SignOut()
        Alert.alert('Invalid user email or password')
      }
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
        <TouchableOpacity onPress={()=>router.replace('/')}>
        <Image source={images.logo} resizeMode='contain' className='w-[115px] h-[100px]'/>
        </TouchableOpacity>
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
      containerStyles="mt-7 w-full min-h-[62px]"
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
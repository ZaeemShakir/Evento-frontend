import { StatusBar } from 'expo-status-bar';
import { Image, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import {images} from '../constants'
export default function App() {
  return (
  <SafeAreaView className="bg-primary h-full">
    <ScrollView contentContainerStyle={{height:'100%'}}>
      <View className="w-full h-full justify-center items-center px-4">
    <Image source={images.logo} 
    className="w-[200px] h-[150px]"
    resizeMode='contain'
    />
    <Image
     source={images.cards}
     className="max-w-[380px] w-full h-[250px]"
     resizeMode='contain'
     />
     <View className="mt-5 relative">
      <Text className="text-3xl font-bold text-center text-white">Welcome To {' '}
<Text className="text-secondary-200">Evento</Text>
      </Text>
      <Image source={images.path}
      className="w-[132px] h-[15px] absolute -bottom-2 -right-8"
      resizeMode='contain'
      />
     
     </View>
      <Text className="text-sm font-pregular text-gray-100 text-center mt-7">Making event planning easier</Text>
      </View>
    </ScrollView>
  </SafeAreaView>
  );
}



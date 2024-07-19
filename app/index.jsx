import { StatusBar } from 'expo-status-bar';
import {  Text, View } from 'react-native';

import { Link } from 'expo-router';
export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-3xl font-serif">Evento</Text>
      <Link className='text-xl text-blue-500' href={'/profile'}>Go To Profile</Link>
     
    </View>
  );
}



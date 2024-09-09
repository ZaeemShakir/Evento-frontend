import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import { StatusBar } from 'expo-status-bar'
import CustomButton from "../components/CustomButton.jsx"
import {Redirect,router} from "expo-router"
import {useGlobalContext} from "../context/GlobalProvider.js"
export default function App() {
  {/*getting the global value stored in useContext*/}
  const { loading, isLogged,user } = useGlobalContext();
  {/*routing to screens using usertype*/}
  if (!loading && isLogged && user?.usertype==="customer") return <Redirect href="/home" />;
  if (!loading && isLogged && user?.usertype==="vendor") return <Redirect href="/vendor_home" />;
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View 
        className="w-full justify-center items-center min-h-[85vh] px-4">
          <Image
            source={images.logo}
            className="w-[200px] h-[120px]"
            resizeMode="contain"
          />
          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[250px]"
            resizeMode="contain"
          />
          <View className="mt-5 relative">
            <Text className="text-3xl font-bold text-center text-white">
              Welcome To <Text className="text-secondary-200">Evento</Text>
            </Text>
            <Image
              source={images.path}
              className="w-[132px] h-[15px] absolute -bottom-2 -right-8"
              resizeMode="contain"
            />
          </View>
          <Text className="text-sm font-pregular text-gray-100 text-center mt-7">
            Making event planning easier
          </Text>
          {/*Custom component takes to customer login*/}
      <CustomButton title="Continue as customers"
      handlePress={()=>router.push('/signIn')}
      containerStyles="w-full mt-7 min-h-[62px]"
      />
   {/*Custom component takes to vendor login*/}
        <CustomButton title="Continue as Vendor"
      handlePress={()=>router.push('/signIn_vendor')}
      containerStyles="w-full mt-7 min-h-[62px]"
      />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light"/>
    </SafeAreaView>
  );
}

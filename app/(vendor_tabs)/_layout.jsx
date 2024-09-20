import { View, Text, Image } from "react-native";
import { Tabs, Redirect } from "expo-router";
import { icons } from "../../constants";
const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="items-center justify-center gap-2">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
      style={{color:color}}
      >
        {name}
      </Text>
    </View>
  );
};
const tabLayout = () => {

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor:'#ffa001',
          tabBarInactiveTintColor:'#cdcde0',
          tabBarStyle:{
            backgroundColor:"#161622",
            borderTopWidth:1,
            borderTopColor:'#232533',
            height:84,
          },
          headerShown:false,
        }}
      >
        <Tabs.Screen
          name="vendor_home"
          options={{
            title: "vendor_home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.home}
                color={color}
                name="Home"
                focused={focused}
              />
            ),
          }}
        />
         <Tabs.Screen
          name="vendor_upload"
          options={{
            title: "vendor_upload",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.plus}
                color={color}
                name="Upload"
                focused={focused}
              />
            ),
          }}
        />
        
        <Tabs.Screen
          name="vendor_chat"
          options={{
            title: "Vendor_chat",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.chat}
                color={color}
                name="Chat"
                focused={focused}
              />
            ),
          }}
        />

         <Tabs.Screen
          name="vendor_profile"
          options={{
            title: "Vendor_profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.profile}
                color={color}
                name="Profile"
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
};



export default tabLayout;

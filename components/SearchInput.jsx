import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";
const SearchInput = ({
  title,
  value,
  handleChange,
  otherStyles,
  keyboardType,
  placeholder,
  ...props
}) => {
  const [showPassword, setshowPassword] = useState(false);
  return (
    <View className="space-x-4  border-2 flex-row border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center">
      <TextInput
        className="text-base mt-0.5 text-white flex-1 fomt-pregular"
        value={value}
        placeholder="Search"
        placeholderTextColor="#7b7b8b"
        onChangeText={handleChange}
        secureTextEntry={title === "Password" && !showPassword}
      />
     <TouchableOpacity>
        <Image source={icons.search}
        resizeMode="contain"
        className="w-5 h-5"
        />
     </TouchableOpacity>
    </View>
  );
};

export default SearchInput;

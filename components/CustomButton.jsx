import { TouchableOpacity,Text } from 'react-native'
import React from 'react'

const CustomButton = ({title , handlePress, containerStyles, textStyle,isLoading}) => {
  return (
    <TouchableOpacity 
    onPress={handlePress}
    activeOpacity={0.7}
    disabled={isLoading}
    className={`bg-secondary rounded-xl  items-center justify-center ${containerStyles} ${isLoading?'opacity-50':''}`}>
        <Text 
        className={`text-primary font-psemibold text-lg ${textStyle}`}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton
import { View, Text } from 'react-native'
import React from 'react'

const Card = ({post}) => {
  return (
    <View className="flex-col items-center px-4 mb-14">
      <Text className="text-2xl text-white">{post.title}</Text>
    </View>
  )
}

export default Card
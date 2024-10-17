import { View, Text, TouchableWithoutFeedback, Pressable, PressableProps } from 'react-native'
import React, { FC, RefAttributes } from 'react'

const Button = (props: any) => {

  const { android_disableSound , ...rest } = props

  return (

    <Pressable android_disableSound={!android_disableSound ? true : false } {...props}>
      {props.children}
    </Pressable>

  )
}

export default Button
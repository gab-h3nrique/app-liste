import { Animated, NativeModules, ScrollView, StatusBar, Text, TouchableWithoutFeedback, View } from 'react-native'
import React, { memo, useEffect, useRef, useState } from 'react'
import AnimatedScreen from '../../components/view/AnimatedScreen';
import Button from '../../components/buttons/Button';


import { useDeviceContext, useAppColorScheme } from 'twrnc';
import Storage from '../../providers/storage/storage';
import { useTheme } from '../../context/ThemeProvider';
import { useNavigation } from '../../context/navigation/NavigationProvider';
import tw from '../../libs/tailwind';


const UserScreen = () => {

  const { theme, setAppTheme } = useTheme()
  
  useEffect(()=>{
    

  },[theme])

  return (

    <View style={tw`flex justify-center items-center w-full h-full bg-slate-200 dark:bg-slate-800 relative`}>

      <Button onPress={()=> setAppTheme('dark')} style={tw`p-3 rounded-[.9rem] bg-violet-500`}>
        <Text style={tw`text-white font-bold text-[1.2rem]`}>Dark</Text>
      </Button>

      <Button onPress={()=> setAppTheme('light')} style={tw`p-3 rounded-[.9rem] bg-violet-500`}>
        <Text style={tw`text-white font-bold text-[1.2rem]`}>Light</Text>
      </Button>

    </View>

  )
}

export default memo(UserScreen)

import { Animated, NativeModules, ScrollView, StatusBar, Text, TouchableWithoutFeedback, View } from 'react-native'
import React, { memo, useEffect, useRef, useState } from 'react'
import AnimatedScreen from '../../components/view/AnimatedScreen';
import Button from '../../components/buttons/Button';


import { useDeviceContext, useAppColorScheme } from 'twrnc';
import Storage from '../../providers/storage/storage';
import { useTheme } from '../../context/ThemeProvider';
import tw from '../../libs/tailwind';
import Svg from '../../components/svg/Svg';


const UserScreen = () => {

  const { theme, setAppTheme } = useTheme()
  
  useEffect(()=>{
    

  },[theme])

  return (

    <View style={tw`flex justify-start items-center w-full h-full bg-slate-200 dark:bg-slate-800 relative`}>

      <View style={tw`p-2 items-center justify-center flex flex-row w-full relative`}>

      <Text style={tw`text-slate-500 dark:text-slate-300 text-[2rem] text-center font-bold `}>Configuração</Text>

      </View>

      <View style={tw`flex p-4 w-full`}>

      <Button onPress={()=> setAppTheme(theme == 'dark' ? 'light' : 'dark')} style={tw`p-7 gap-2 justify-center items-center rounded-[1.2rem] flex flex-row w-50 bg-white dark:bg-slate-700 relative`}>
        <View style={tw`mr-3`}>
          <Svg.Sun height={28} width={28} fill={theme == 'dark' ? '#CBD5E1':'#94A3B8'} style={tw` ${theme == 'light' ? 'hidden' : ''}`}/>
          <Svg.Moon height={28} width={28} fill={theme == 'dark' ? '#CBD5E1':'#94A3B8'} style={tw` ${theme == 'dark' ? 'hidden' : ''}`}/>
        </View>
        <Text style={tw`text-slate-400 dark:text-slate-300 text-[1.15rem] text-center font-bold `}>Trocar tema</Text>
      </Button>

      </View>

    </View>

  )
}

export default memo(UserScreen)

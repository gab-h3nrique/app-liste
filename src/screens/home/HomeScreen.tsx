import { View, Text } from 'react-native'
import React, { memo, useEffect } from 'react'
import tw from '../../libs/tailwind';
import { useTheme } from '../../context/ThemeProvider';
import { SkeletonCard } from '../../ui/SkeletonCard';

const HomeScreen = () => {

  const { theme } = useTheme()
  

  useEffect(()=>{

  },[theme])

  return (


    <View style={tw`flex justify-center items-center w-full h-full bg-slate-200 dark:bg-slate-800`}>


      <Text style={tw`bg-white dark:bg-slate-700 py-8 px-16 rounded-full text-slate-400 dark:text-slate-300 font-bold`}>Em breve</Text>
      {/* <SkeletonCard isLoading={true}/> */}

    </View>


  )
}

export default memo(HomeScreen)

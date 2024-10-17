import { Animated, NativeModules, StyleSheet, Text, Touchable, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { memo, useEffect, useRef, useState } from 'react'
import HouseSvg from '../svg/icons/HouseSvg';
import ListSvg from '../svg/icons/ListSvg';
import HeartSvg from '../svg/icons/HeartSvg';
import UserSvg from '../svg/icons/UserSvg';
import Button from '../buttons/Button';
import { useTheme } from '../../context/ThemeProvider';
import tw from '../../libs/tailwind';
import LocationDotSvg from '../svg/icons/LocationDotSvg';
import { useNavigation } from '../../../Navigator';

const {UIManager} = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

interface Props {
  screen: string;
  setScreen?: any;
}

const Tabs = () => {

  const { theme } = useTheme()

  const navigator = useNavigation()

  const [ selectedScreen, setSelectedScreen ] = useState('')

  function switchTo(screen: string) {

    if(!screen) return console.warn('no screen was selected in tabs');

    navigator.change(screen)

    setSelectedScreen(screen)

  }



  useEffect(()=>{

    switchTo('HomeScreen')

  },[])

  useEffect(()=>{

  },[theme])

  return (

    <View style={[tw`py-[.7rem] px-8 rounded-t-[30px] bottom-0 absolute flex flex-row justify-between items-center w-full bg-white dark:bg-slate-700`]}>

      <Button onPress={()=> switchTo('HomeScreen')}>
        <HouseSvg height={36} width={36} fill={theme == 'dark' ? ( selectedScreen == 'HomeScreen' ? '#8B5CF6' : '#CBD5E1') : ( selectedScreen  == 'HomeScreen' ? '#A78BFA' : '#D1D5DB') }/>
      </Button>

      <Button onPress={()=> switchTo('ListScreen')}>
        <ListSvg height={36} width={36} fill={theme == 'dark' ? ( selectedScreen == 'ListScreen' ? '#8B5CF6' : '#CBD5E1') : ( selectedScreen  == 'ListScreen' ? '#A78BFA' : '#D1D5DB') }/>
      </Button>

      <Button onPress={()=> switchTo('SelectListTopMap')}>
        <LocationDotSvg height={36} width={36} fill={theme == 'dark' ? ( selectedScreen == 'SelectListTopMap' ? '#8B5CF6' : '#CBD5E1') : ( selectedScreen  == 'SelectListTopMap' ? '#A78BFA' : '#D1D5DB') }/>
      </Button>

      <Button onPress={()=> switchTo('UserScreen')}>
        <UserSvg height={36} width={36} fill={theme == 'dark' ? ( selectedScreen == 'UserScreen' ? '#8B5CF6' : '#CBD5E1') : ( selectedScreen  == 'UserScreen' ? '#A78BFA' : '#D1D5DB') }/>
      </Button>

    </View>

  )
}

export default memo(Tabs)
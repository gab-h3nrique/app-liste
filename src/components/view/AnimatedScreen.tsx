import { View, Text, NativeModules, Animated } from 'react-native'
import React, { useEffect, useRef } from 'react'
import tw from 'twrnc';

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

export interface Props {
  open: boolean
  style: any;
  children: React.ReactNode
}

const AnimatedScreen = ({open, style, children}: Props) => {


  // ------------animation--------------//
  const positionScreen = useRef(new Animated.Value(400)).current;

  function changeScreen() {

    if(open) Animated.timing(positionScreen, { toValue: 0, duration: 300, useNativeDriver: false, }).start();
    if(!open) Animated.timing(positionScreen, { toValue: -500, delay: 1000, duration: 300, useNativeDriver: false}).start();
    
  }
  
  // ------------animation--------------//

  useEffect(()=>{

    changeScreen()

  }, [])

  return (

    <Animated.View style={[style, { transform: [{translateX: positionScreen}],}]}>
        
      {children}

    </Animated.View>

  )
}

export default AnimatedScreen
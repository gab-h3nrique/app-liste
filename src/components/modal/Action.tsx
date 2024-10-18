import { View, Text, Animated, PanResponder, NativeModules, Platform } from 'react-native'
import React, { memo, useEffect, useRef, useState } from 'react'
import tw from '../../libs/tailwind'
import Button from '../buttons/Button'


const {UIManager} = NativeModules;

UIManager && UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

interface Props {

    children: React.ReactNode
    height?: number

}

const Action = ({ children, height }: Props) => {

    const difference = Platform.OS === 'android' ? 45 : 75


    const sizeScreen = useRef(0)
    const [ heightSize ] = useState(new Animated.Value(500)) 

    const [ viewHeight, setViewHeight ] = useState(height || 40)
  
    const panResponder = useRef(
        PanResponder.create({   
  
            onMoveShouldSetPanResponder: () => true,
    
            onPanResponderGrant: (evt, gestureState) => {

                
    
                // const porcent = 100 - ((gestureState.y0 / sizeScreen.current) * 100)
        
                // initialHeight.current = porcent
            
            },
    
            
            onPanResponderMove: (evt, gestureState) => {

                
                // const porcent = 100 - ((gestureState.moveY / sizeScreen.current) * 100)
                const size = sizeScreen.current - gestureState.moveY + difference
                // const size = sizeScreen.current - gestureState.moveY + 80
                
                
                // setViewHeight(() => porcent + 9)
                heightSize.setValue(size)

    
            },
            onPanResponderRelease: (evt, gestureState) => {

                const porcent = 100 - ((gestureState.moveY / sizeScreen.current) * 100)
                const size = sizeScreen.current - gestureState.moveY + difference
    
                // if((porcent + 9) <= 30) setViewHeight(() => 30)

                // if((porcent + 9) >= 70) setViewHeight(() => 70)

                if((porcent + 9) <= 30) Animated.spring(heightSize, { toValue: (sizeScreen.current * .30), friction: 6, useNativeDriver: false }).start();

                if((porcent + 9) >= 70) Animated.spring(heightSize, { toValue: (sizeScreen.current * .70), friction: 6, useNativeDriver: false }).start();
    
            },
     
        }),
    ).current;



    return (

        <View onLayout={({nativeEvent}) => sizeScreen.current = nativeEvent.layout.height } style={tw`flex w-full h-full bg-transparent absolute`}>

            {/* <Animated.View style={[tw`rounded-t-[30px] flex flex-col w-full bg-slate-200 dark:bg-slate-800 absolute bottom-0`, {height: `${viewHeight}%`} ]}> */}
            <Animated.View style={[tw`rounded-t-[30px] flex flex-col w-full bg-slate-200 dark:bg-slate-800 absolute bottom-0`, {height: heightSize} ]}>
                <View style={tw` flex flex-col items-center h-full w-full relative`}>

                    <View style={tw`w-100 p-2`} {...panResponder.panHandlers}>
                        <Button style={tw`m-auto w-12 h-[.33rem] rounded-full bg-slate-400 dark:bg-slate-600`}/>
                    </View>

                    {children}

                </View>
            </Animated.View>

        </View>


    )
}

export default memo(Action)

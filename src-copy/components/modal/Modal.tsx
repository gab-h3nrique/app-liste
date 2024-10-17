import { View, Text, Pressable } from 'react-native'
import React from 'react'
import tw from '../../libs/tailwind'

const Modal = (props: any) => {

    const { animation, active, onClose , ...rest } = props


  return (

    <>
        {
            active ? 
            
                <View style={[tw`flex justify-center items-center w-full h-full absolute`]}>

                    <Pressable onPress={onClose} style={[tw`flex justify-center items-center w-full h-full absolute bg-black opacity-90`]}></Pressable>
                    <View style={[tw`flex justify-center items-center max-w-[90%]`]} {...rest}>
                        {props.children}
                    </View>

                </View>
            
            : null
        }

    </>

  )
}

export default Modal
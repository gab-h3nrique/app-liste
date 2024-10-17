import { View, Text } from 'react-native'
import React from 'react'
import Button from './Button'
import ChevronSvg from '../svg/icons/ChevronSvg'
import { useTheme } from '../../context/ThemeProvider'
import tw from '../../libs/tailwind'

interface Props {
    onPress: any
}

const BackButton = ({ onPress }: Props) => {

    const { theme } = useTheme()

  return (

    <Button onPress={onPress} style={tw`left-2 top-5 w-9 h-8 rounded-[.6rem] bg-slate-400 dark:bg-slate-700 flex items-center justify-center absolute`} >
        <ChevronSvg height={20} width={20} fill={theme == 'dark' ? '#CBD5E1':'#ffffff'} style={{ transform: [{ rotateY: '180deg' }] }}/>
    </Button>
    
  )
}

export default BackButton
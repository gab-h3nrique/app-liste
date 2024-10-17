import { View, Text, StyleProp, TextStyle } from 'react-native'
import React, { memo } from 'react'
import { List } from '../../../providers/storage/functions/UserStorageFunctions'
import Button from '../../../components/buttons/Button'
import tw from '../../../libs/tailwind'
import ChevronSvg from '../../../components/svg/icons/ChevronSvg'
import ShoppingSvg from '../../../components/svg/icons/ShoppingSvg'
import { useTheme } from '../../../context/ThemeProvider'
import UserSvg from '../../../components/svg/icons/UserSvg'


interface Props {

  index: Number
  length: Number
  onPress: any
  style?: StyleProp<TextStyle> | undefined;

}

const MarketItem = ({ index, length, onPress, style }: Props) => {

  const { theme } = useTheme()

  const lastItem = index === length as number - 1

  return (

    <Button onPress={onPress} style={tw`p-2 gap-2 justify-start items-center flex flex-row w-full bg-white dark:bg-slate-700 ${Number(index) % 2 == 0 ? 'bg-slate-200 dark:bg-slate-800' : ''} ${lastItem ? 'mb-[5.4rem]' : 'mb-[.6rem]'}`}>
      
      <View style={tw`p-2 flex bg-violet-100 dark:bg-violet-500 rounded-[.5rem]`}>
        <ShoppingSvg height={25} width={25} fill={theme == 'dark' ? '#cbd5e1':'#a78bfa'}/>
      </View>

      <View style={tw`gap-1 flex`}>

        <Text style={tw`text-slate-400 dark:text-slate-300 text-[1.2rem] font-bold`}>Mart Minas</Text>

        <View style={tw`gap-2 flex flex-row`}>

          <View style={tw`flex flex-row justify-center items-center gap-1`}>
            <UserSvg height={9} width={9} fill={'#FACC15'}/>
            <Text style={tw`text-yellow-400 text-[.7rem] font-bold`}>4.3</Text>
          </View>

          <View style={tw`flex flex-row justify-center items-center gap-1`}>
            <UserSvg height={9} width={9} fill={'#16A34A'}/>
            <Text style={tw`text-green-600 text-[.7rem] font-bold`}>24</Text>
          </View>

        </View>

      </View>

      <Text style={tw`ml-auto text-[1.3rem] font-bold text-center text-violet-400`}>R$ 321.54</Text>

    </Button>


  )
}

export default memo(MarketItem)

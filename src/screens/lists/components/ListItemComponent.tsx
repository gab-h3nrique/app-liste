import { View, Text, StyleProp, TextStyle } from 'react-native'
import React from 'react'
import { List } from '../../../providers/storage/functions/UserStorageFunctions'
import Button from '../../../components/buttons/Button'
import tw from '../../../libs/tailwind'
import ChevronSvg from '../../../components/svg/icons/ChevronSvg'
import ShoppingSvg from '../../../components/svg/icons/ShoppingSvg'
import { useTheme } from '../../../context/ThemeProvider'


interface Props {
    index: Number
    length: Number
    item: List
    onPress: any
    style?: StyleProp<TextStyle> | undefined;
}

const ListItemComponent = ({ index, length, item, onPress, style }: Props) => {

  const { theme } = useTheme()

  const sum = item && item.itens && item.itens.filter(({price})=> Number(price) > 0).map(e=> Number(e.price) * e.quantity).reduce((a, c) => a + c, 0)

  const lastItem = index === length as number - 1

  return (

    <Button onPress={onPress} style={tw`p-2 gap-4 justify-start items-center rounded-[1.2rem] flex flex-row w-full bg-white dark:bg-slate-700 mb-3 ${lastItem ? 'mb-[5.4rem]' : 'mb-3'}`}>
      
      <View style={tw`p-2 flex bg-violet-100 dark:bg-violet-500 rounded-[.7rem]`}>
        <ShoppingSvg height={25} width={25} fill={theme == 'dark' ? '#cbd5e1':'#a78bfa'}/>
      </View>

      <View style={tw`gap-1 flex`}>

        <Text style={tw`text-slate-400 dark:text-slate-300 text-[.8rem] font-bold`}>{item.name}</Text>

        <View style={tw`gap-2 flex flex-row`}>

          <View style={tw`px-2 py-1 rounded-full bg-slate-200 dark:bg-slate-300`}>
            <Text style={tw`text-[.51rem] font-bold text-center text-slate-500 text-slate-700`}>{ item.itens && item.itens.length || 0 } itens</Text>
          </View>

          <View style={tw`px-2 py-1 rounded-full bg-slate-200 dark:bg-slate-300`}>
            <Text style={tw`text-[.51rem] font-bold text-center text-slate-500 text-slate-700`}>R${ sum }</Text>
          </View>

        </View>

      </View>

      <ChevronSvg height={25} width={25} fill={'#a78bfa'} marginLeft={"auto"}/>

    </Button>


  )
}

export default ListItemComponent

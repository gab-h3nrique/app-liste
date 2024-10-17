import { View, Text, TouchableWithoutFeedback, NativeModules, Animated, Image, StyleSheet, TextInput, BackHandler, Alert, Pressable } from 'react-native'
import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import ChevronSvg from '../../../components/svg/icons/ChevronSvg';

import CookieSvg from '../../../components/svg/icons/CookieSvg'
import PlusSvg from '../../../components/svg/icons/PlusSvg';
import MinusSvg from '../../../components/svg/icons/MinusSvg';
import tw from '../../../libs/tailwind';
import { useTheme } from '../../../context/ThemeProvider';
import Button from '../../../components/buttons/Button';
import { Item, List } from '../../../providers/storage/functions/UserStorageFunctions';
import { User, useUser } from '../../../context/UserProvider';
import Storage from '../../../providers/storage/storage';
import { useNavigation } from '../../../../Navigator';
import useDataStorage from '../../../hooks/useDataStorage';
import useList from '../../../hooks/useList';
import ArrowSvg from '../../../components/svg/icons/ArrowSvg';


const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);


interface Props {

  item: Item;

}


const QuantityScreen = ({ item }: Props) => {

  const { theme } = useTheme()

  const { selectedList, saveSelectedList } = useList()

  const navigator = useNavigation()

  const [ quantity, setQuantity ] = useState(item?.quantity || 1)

  const subtractQuantity = () => {

    setQuantity(prev=> prev > 0 ? prev - 1 : 1)

  }

  const sumQuantity = () => {

    setQuantity(prev=> prev + 1)

  }

  const addItemToList = () => {

    if(!selectedList || !selectedList.id) return console.warn('this list is null')

    const id = new Date().getTime()

    const newItem: Item = { ...item, id: id, quantity: quantity, listId: selectedList.id, updatedAt: new Date().getTime(), createdAt: new Date().getTime() }

    saveSelectedList({...selectedList, itens: [newItem, ...selectedList.itens]})

    navigator.close('ProductsScreen')
    navigator.close('CategoryScreen')
    navigator.close('QuantityScreen')

  }


  return (

    <View style={tw`p-3 gap-30 w-full h-full bg-slate-200 dark:bg-slate-800 flex justify-start`}>

      <View style={tw`items-center justify-center flex flex-row w-full relative`}>

        <Button onPress={navigator.pop} style={tw`left-0 top-2 w-10 h-10 rounded-full bg-slate-400 dark:bg-slate-700 flex items-center justify-center absolute`} >
          <ArrowSvg height={20} width={20} fill={theme == 'dark' ? '#CBD5E1':'#ffffff'} style={{ transform: [{ rotateY: '180deg' }] }}/>
        </Button>

        <Text style={tw`text-slate-500 dark:text-slate-300 text-[2rem] text-center font-bold `}>Quantidade</Text>

      </View>

      <View style={tw`p-3 gap-5 w-full`}>

        <View style={tw`p-4 gap-3 rounded-[1.3rem] w-full flex flex-col justify-start items-center bg-white dark:bg-slate-700`}>

          <View style={tw`p-4 flex bg-violet-100 dark:bg-violet-500 rounded-[.9rem]`}>
            {
              item?.image ? <Image style={tw`w-12 h-12`} source={{ uri: item.image }} />
              : <CookieSvg height={40} width={40} fill={'#a78bfa'}/>
            }
          </View>

          <Text  style={tw`mb-3 text-slate-500 dark:text-slate-300 text-[1rem] text-center font-bold `}>{item?.name || 'produto sem nome'}</Text>

        </View>

        <View style={tw`px-3 flex flex-row w-full justify-between`}>
            
          <Button onPress={subtractQuantity} style={tw`w-14 h-14 rounded-[.9rem] flex justify-center items-center bg-violet-400`}>
            <MinusSvg height={36} width={36} fill={theme == 'dark' ? '#334155':'#FFFFFF'} style={{ transform: [{ rotateY: '180deg' }] }}/>
          </Button>

          <View style={tw`flex w-11/20 rounded-[1rem] items-center justify-center bg-white dark:bg-slate-700`}>

            {/* <TextInput
            style={tw`text-slate-500 text-center font-bold text-[1.2rem]`}
            onChangeText={(event)=> setItem({...item, quantity: Number(event) })}
            value={item.quantity}
            keyboardType="numeric"
            /> */}
            <Text style={tw`text-slate-500 dark:text-slate-300 text-[1.9rem] text-center font-bold `}>{quantity || 0}</Text>

          </View>

          <Button onPress={sumQuantity} style={tw`w-14 h-14 rounded-[.9rem] flex justify-center items-center bg-violet-400`}>
            <PlusSvg height={38} width={38} fill={theme == 'dark' ? '#334155':'#FFFFFF'} style={{ transform: [{ rotateY: '180deg' }] }}/>
          </Button>


        </View>

      </View>

      <View style={tw`px-6 gap-5 mt-auto w-full flex`}>

        <Button disabled={!quantity} onPress={addItemToList} style={tw`p-3 rounded-[.9rem] flex justify-center items-center bg-violet-400 ${quantity ? 'opacity-100' : 'opacity-50'}`}>
          <Text style={tw`text-white dark:text-slate-700 text-[1.4rem] text-center font-bold `}>Confirmar</Text>
        </Button>

      </View>

    </View>


  )
}

export default memo(QuantityScreen)


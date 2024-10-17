import { View, Text, TouchableWithoutFeedback, NativeModules, Animated, Image, StyleSheet, TextInput, BackHandler, Alert, KeyboardAvoidingView, Platform } from 'react-native'
import React, { memo, useEffect, useRef, useState } from 'react'
import ChevronSvg from '../../../components/svg/icons/ChevronSvg';

import CookieSvg from '../../../components/svg/icons/CookieSvg'
import PlusSvg from '../../../components/svg/icons/PlusSvg';
import MinusSvg from '../../../components/svg/icons/MinusSvg';
import Button from '../../../components/buttons/Button';
import { useTheme } from '../../../context/ThemeProvider';
import tw from '../../../libs/tailwind';
import { Item, List } from '../../../providers/storage/functions/UserStorageFunctions';
import { useNavigation } from '../../../../Navigator';
import Storage from '../../../providers/storage/storage';
import useList from '../../../hooks/useList';
import ArrowSvg from '../../../components/svg/icons/ArrowSvg';

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);


interface Props {

  selectedItem: Item;

}



const EditItemScreen = ({ selectedItem }: Props) => {

  const { theme } = useTheme()

  const navigator = useNavigation()

  const { selectedList, saveSelectedList } = useList()

  const [ item, setItem ] = useState<Item>(selectedItem)

  function subtractQuantity() {

    if(!item) return;

    setItem(prev=> ({...prev, quantity: prev.quantity > 1 ? prev.quantity - 1 : 1}))

  }

  function sumQuantity() {

    if(!item) return;

    setItem(prev=> ({...prev, quantity: prev.quantity + 1 }))

  }

  function editPrice(text: any) {

    setItem((prev)=>({...prev, price: brMask(text)}))

    console.log('item', item)

  }

  function removeItem(id: number) {

    if(!selectedList) return console.warn('this list is null')

    saveSelectedList({...selectedList, itens: selectedList.itens.filter((i)=> i.id !== id) })

    navigator.pop()

  }

  function saveItem(item: Item) {

    if(!selectedList || !selectedList.id) return console.warn('this list is null')

    const newDate = new Date().getTime()

    saveSelectedList({...selectedList, itens: selectedList.itens.map((i)=> i.id === item.id ? {...item, updatedAt: newDate} : i) })

    navigator.pop()

  }

  const positionPlusButton = useRef(new Animated.Value(0)).current;
  const scalePlusButton = useRef(new Animated.Value(1)).current;

  let currentOffset = 0;
  let scrollDirection = ''
  const handleScroll = (event: any) => {

    if(event.nativeEvent.contentOffset.y <= 0) return

    let direciton = event.nativeEvent.contentOffset.y > currentOffset ? 'down' : 'up';

    currentOffset = event.nativeEvent.contentOffset.y;

    if(direciton == scrollDirection) return;

    scrollDirection = direciton

    if(direciton == 'down') Animated.timing(positionPlusButton, { toValue: 80, duration: 200, useNativeDriver: true }).start();
    else Animated.timing(positionPlusButton, { toValue: 0, duration: 200, useNativeDriver: true }).start();

    if(direciton == 'down') Animated.timing(scalePlusButton, { toValue: 0, duration: 200, useNativeDriver: true }).start();
    else Animated.timing(scalePlusButton, { toValue: 1, duration: 200, useNativeDriver: true }).start();

  };

  function brMask(i:any) {

    let v = i.replace(/\D/g,'');
    v = (v/100).toFixed(2) + '';
    // v = v.replace(".", ",");
    i = v;
    return i

  }


  return (

    <View style={tw`w-full h-full flex absolute`}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} enabled={false}>

        <View style={tw`p-3 gap-2 w-full h-full bg-slate-200 dark:bg-slate-800 flex justify-start`}>

          <View style={tw`items-center justify-center flex flex-row w-full relative`}>

            <Button onPress={navigator.pop} style={tw`left-0 top-2 w-10 h-10 rounded-full bg-slate-400 dark:bg-slate-700 flex items-center justify-center absolute`} >
              <ArrowSvg height={20} width={20} fill={theme == 'dark' ? '#CBD5E1':'#ffffff'} style={{ transform: [{ rotateY: '180deg' }] }}/>
            </Button>

            <Text style={tw`text-slate-500 dark:text-slate-300 text-[2rem] text-center font-bold`}>Editar</Text>
          </View>

          <View style={tw`p-3 gap-5 w-full`}>

            <View style={tw`p-4 gap-3 rounded-[1.3rem] w-full flex flex-col justify-start items-center bg-white dark:bg-slate-700`}>

              <View style={tw`p-4 flex bg-violet-100 dark:bg-violet-500 rounded-[.9rem]`}>
                {
                 item && item.image ? <Image style={tw`w-12 h-12`} source={{ uri: item.image }} />
                  : <CookieSvg height={40} width={40} fill={'#a78bfa'}/>
                }
              </View>

              <Text  style={tw`mb-3 text-slate-400 text-[1rem] text-center font-bold `}>{item?.name || 'produto sem nome'}</Text>

            </View>

            <Text style={tw`text-slate-500 dark:text-slate-300 text-[1.8rem] text-center font-bold`}>Quantidade</Text>

            <View style={tw`px-3 flex flex-row w-full justify-between`}>
                
              <Button onPress={subtractQuantity} style={tw`w-14 h-14 rounded-[.9rem] flex justify-center items-center bg-violet-400`}>
                <MinusSvg height={36} width={36} fill={theme == 'dark' ? '#334155':'#FFFFFF'} style={{ transform: [{ rotateY: '180deg' }] }}/>
              </Button>

              <View style={tw`flex w-11/20 rounded-[1rem] items-center justify-center bg-white dark:bg-slate-700`}>

                <Text style={tw`text-slate-500 dark:text-slate-300 text-[1.9rem] text-center font-bold`}>{item && item.quantity || 0}</Text>

              </View>

              <Button onPress={sumQuantity} style={tw`w-14 h-14 rounded-[.9rem] flex justify-center items-center bg-violet-400`}>
                <PlusSvg height={38} width={38} fill={theme == 'dark' ? '#334155':'#FFFFFF'} style={{ transform: [{ rotateY: '180deg' }] }}/>
              </Button>


            </View>

            <Text style={tw`text-slate-500 dark:text-slate-300 text-[1.8rem] text-center font-bold`}>{`Qual o preço\nunitário do item?`}</Text>

            <View style={tw`px-3 flex flex-row w-full justify-center`}>
    
              <View style={tw`flex flex-row gap-2 py-2 px-12 rounded-[1rem] items-center justify-center bg-white dark:bg-slate-700`}>

                <Text style={tw`p-0 text-violet-400 text-[1.9rem] text-center font-bold `}>R$</Text>
                <TextInput onChangeText={editPrice} value={`${item?.price}`} keyboardType="numeric" style={tw`p-0 text-violet-400 text-[1.9rem] text-center font-bold relative`} />
  
              </View>
    
            </View>

          </View>
          
          <View style={tw`px-6 gap-5 justify-center items-center mt-auto w-full flex flex-row`}>

            <Button onPress={()=> item && removeItem(item.id)}  style={tw`p-3 w-1/2 rounded-[.9rem] flex justify-center items-center bg-slate-400 dark:bg-slate-700 ${item && item.quantity ? 'opacity-100' : 'opacity-50'}`}>
              <Text style={tw`text-white dark:text-slate-300 text-[1.4rem] text-center font-bold `}>remover</Text>
            </Button>

            <Button disabled={!item?.quantity} onPress={()=> item && saveItem(item)} style={tw`p-3 w-1/2 rounded-[.9rem] flex justify-center items-center bg-violet-400 ${item && item.quantity ? 'opacity-100' : 'opacity-50'}`}>
              <Text style={tw`text-white dark:text-slate-700 text-[1.4rem] text-center font-bold `}>salvar</Text>
            </Button>

          </View>

        </View>

      </KeyboardAvoidingView>
    </View>

  )
}

export default memo(EditItemScreen)


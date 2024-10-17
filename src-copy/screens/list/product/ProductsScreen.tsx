import { View, Text, TouchableWithoutFeedback, NativeModules, Animated, Image, FlatList, VirtualizedList, SectionList } from 'react-native'
import React, { memo, useCallback, useEffect, useRef, useState, useTransition } from 'react'
import ChevronSvg from '../../../components/svg/icons/ChevronSvg';

import ItemComponent from './components/ItemComponent';
import Button from '../../../components/buttons/Button';
import PenSvg from '../../../components/svg/icons/PenSvg';
import SearchSvg from '../../../components/svg/icons/SearchSvg';
import { useTheme } from '../../../context/ThemeProvider';
import tw from '../../../libs/tailwind';
import { Category } from '../../../providers/storage/functions/CategoryFunctions';
import { Product } from '../../../providers/storage/functions/ProductFunctions';
import { Item, List } from '../../../providers/storage/functions/UserStorageFunctions';
import { useNavigation } from '../../../../Navigator';
import useDataStorage from '../../../hooks/useDataStorage';
import ArrowSvg from '../../../components/svg/icons/ArrowSvg';

const {UIManager} = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
interface Props {

  category: Category | null;

}

const ProductsScreen = ({ category }: Props) => {

  const [isPending, startTransition] = useTransition()

  const { theme } = useTheme()

  const { product } = useDataStorage()

  const navigator = useNavigation()
  

  const [ itens, setItens ] = useState<Product[]>([])

  const setItensList = useCallback(()=>{
    setTimeout(()=>{

      startTransition(()=>{
        setItens(()=>  product.filter((e)=> category ? e.categoryId === category.id : e ))

      })


    }, 150)

  },[])

  // const selectItem = useCallback((product: Product) => {

  //   const item: Item = {
  //     id: -1,
  //     name: product.name,
  //     price: 0,
  //     quantity: 0,
  //     checked: false,
  //     image: product.image || '',
  //     productId: product.id || null,
  //   }

  //   navigator.open('QuantityScreen', { item })

  // }, [])

  const selectItem = (product: Product) => {

    const item: Item = {
      id: -1,
      name: product.name,
      price: 0,
      quantity: 0,
      checked: false,
      image: product.image || '',
      productId: product.id || null,
    }

    navigator.open('QuantityScreen', { item })

  }

  useEffect(()=>{
    setItensList()
  },[])



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

  return (

    <View style={tw`flex p-3 gap-5 w-full h-full bg-slate-200 dark:bg-slate-800 relative`}>

      <View style={tw`items-center justify-center flex flex-row w-full relative`}>

        <Button onPress={navigator.pop} style={tw`left-0 top-2 w-10 h-10 rounded-full bg-slate-400 dark:bg-slate-700 flex items-center justify-center absolute`} >
          <ArrowSvg height={20} width={20} fill={theme == 'dark' ? '#CBD5E1':'#ffffff'} style={{ transform: [{ rotateY: '180deg' }] }}/>
        </Button>

        <Text style={tw`text-slate-500 dark:text-slate-300 text-[2rem] text-center font-bold `}>Itens</Text>

      </View>

      <FlatList onScroll={handleScroll} data={itens} style={tw`gap-2 flex-1 w-full h-full`}
        renderItem={({item}) => <ItemComponent item={item} onPress={() => selectItem(item)} />}
        keyExtractor={(item, index) => String(index)}
      />

      {/* <VirtualizedList
        initialNumToRender={10}
        renderItem={(item) => <ItemComponent item={item} onPress={() => {}}/>}
        keyExtractor={(item, index) => String(index)}
        getItemCount={()=> itens.length}
        getItem={()=> itens}
      /> */}

      {/* <SectionList
        sections={DATA}
        keyExtractor={(item, index) => item.name + index}
        renderItem={(item) => (<Text>aaa</Text>)}
      /> */}

      <Animated.View style={[tw`gap-2 flex items-center bottom-6 absolute right-3`, { transform: [{ translateY: positionPlusButton }, { scale: scalePlusButton}] }]}>

        <Button onPress={() => {}} style={tw`w-8 h-8 rounded-full flex justify-center items-center bg-slate-400 dark:bg-slate-700`}>
          <PenSvg height={13} width={13} fill={theme == 'dark' ? '#CBD5E1':'#ffffff'}/>
        </Button>

        <Button onPress={() => {}} style={tw`w-14 h-14 rounded-full flex justify-center items-center bg-violet-400`} >
          <SearchSvg height={28} width={28} fill={theme == 'dark' ? '#334155':'#FFFFFF'}/>
        </Button>
        
      </Animated.View>

    </View>

  )
}

export default memo(ProductsScreen)


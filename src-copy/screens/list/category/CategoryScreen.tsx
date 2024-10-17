import { View, Text, TouchableWithoutFeedback, NativeModules, Animated, Image, StyleSheet, Pressable, FlatList } from 'react-native'
import React, { memo, useEffect, useRef, useState } from 'react'
import ArrowSvg from '../../../components/svg/icons/ArrowSvg';
import ShoppingSvg from '../../../components/svg/icons/ShoppingSvg';
import ChevronSvg from '../../../components/svg/icons/ChevronSvg';
import PlusSvg from '../../../components/svg/icons/PlusSvg';
import SearchSvg from '../../../components/svg/icons/SearchSvg';
import PenSvg from '../../../components/svg/icons/PenSvg';
import { useTheme } from '../../../context/ThemeProvider';
import tw from '../../../libs/tailwind';
import ItemComponent from './ItemComponent';
import Button from '../../../components/buttons/Button';
import { Category } from '../../../providers/storage/functions/CategoryFunctions';
import Storage from '../../../providers/storage/storage';
import { User, useUser } from '../../../context/UserProvider';
import { useNavigation } from '../../../../Navigator';
import useDataStorage from '../../../hooks/useDataStorage';
import { List } from '../../../providers/storage/functions/UserStorageFunctions';

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

interface Props {

  selectedList: List,
  saveLists: (list: List[]) => void,

}

const CategoryScreen = () => {

  const { theme } = useTheme()

  const navigator = useNavigation()

  const { category } = useDataStorage()
  

  function selectCategory(category: Category) {

    navigator.open('ProductsScreen', { category })

  }
  
  return (

    <View style={tw`flex p-3 gap-5 w-full h-full bg-slate-200 dark:bg-slate-800 relative`}>


      <View style={tw`items-center justify-center flex flex-row w-full relative`}>

        <Button onPress={navigator.pop} style={tw`left-0 top-2 w-10 h-10 rounded-full bg-slate-400 dark:bg-slate-700 flex items-center justify-center absolute`} >
          <ArrowSvg height={20} width={20} fill={theme == 'dark' ? '#CBD5E1':'#ffffff'} style={{ transform: [{ rotateY: '180deg' }] }}/>
        </Button>

        <Text style={tw`text-slate-500 dark:text-slate-300 text-[2rem] text-center font-bold `}>Categorias</Text>

      </View>

      <FlatList data={category} style={tw`gap-2 flex-1 w-full h-full`}
        renderItem={({item}) => <ItemComponent item={item} onPress={() => selectCategory(item)} />}
        keyExtractor={(item, index) => String(index)}
      />

      <View style={tw`gap-2 flex items-center bottom-6 right-3 absolute`}>

        <Button onPress={() => {}} style={tw`w-8 h-8 rounded-full flex justify-center items-center bg-slate-400 dark:bg-slate-700`}>
          <PenSvg height={13} width={13} fill={theme == 'dark' ? '#CBD5E1':'#ffffff'}/>
        </Button>

        <Button onPress={() => {}} style={tw`w-14 h-14 rounded-full flex justify-center items-center bg-violet-400`} >
          <SearchSvg height={28} width={28} fill={theme == 'dark' ? '#334155':'#FFFFFF'}/>
        </Button>
        
      </View>

    </View>

  )
}

export default memo(CategoryScreen)


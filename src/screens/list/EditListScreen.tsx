import { View, Text, TextInput, Image, NativeModules, FlatList, VirtualizedList, ScrollView, Animated } from 'react-native'
import React, { memo, useEffect, useRef, useState } from 'react'
import PlusSvg from '../../components/svg/icons/PlusSvg';
import ChevronSvg from '../../components/svg/icons/ChevronSvg';
import Button from '../../components/buttons/Button';
import tw from '../../libs/tailwind';
import { useTheme } from '../../context/ThemeProvider';
import ItemListComponent from './ItemListComponent';
import PenSvg from '../../components/svg/icons/PenSvg';
import { Item, List } from '../../providers/storage/functions/UserStorageFunctions';
import Storage from '../../providers/storage/storage';
import { useNavigation } from '../../../Navigator';
import useList from '../../hooks/useList';
import ArrowSvg from '../../components/svg/icons/ArrowSvg';

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

interface Props {

  selectedList: List,

}




const EditListScreen = () => {


  const { theme } = useTheme()
  const navigator = useNavigation()

  const { selectedList, saveSelectedList } = useList()

  function openEditItemScreen(item: Item) {

    navigator.open('EditItemScreen', { selectedItem: item })

  }

  function editCheckItem(item: Item) {

    if(!selectedList || !selectedList.id) return console.warn('this list is null')

    saveSelectedList({...selectedList, itens: selectedList.itens.map((e)=> e.id === item.id ? item : e)})

  }

  function addNewItem() {

    navigator.open('CategoryScreen')

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

  return (
    
    <View style={tw`w-full h-full bg-slate-200 dark:bg-slate-800 relative z-0`}>

      <ScrollView onScroll={handleScroll} scrollEventThrottle={100}>

        <View style={tw`p-3 justify-center items-center flex flex-row w-full relative`}>

          <Button onPress={navigator.pop} style={tw`left-3 top-5 w-10 h-10 rounded-full bg-slate-400 dark:bg-slate-700 flex items-center justify-center absolute`} >
            <ArrowSvg height={20} width={20} fill={theme == 'dark' ? '#CBD5E1':'#ffffff'} style={{ transform: [{ rotateY: '180deg' }] }}/>
          </Button>

          <TextInput onChangeText={(text)=> selectedList && saveSelectedList({...selectedList, name: text})} value={selectedList?.name} style={tw`text-slate-400 dark:text-slate-300 text-center font-bold text-[1.2rem]`}/>
          {/* <TextInput onChangeText={(event)=> list && editSelectedList({...list, name: event})} value={list.name} style={tw`text-slate-400 dark:text-slate-300 text-center font-bold text-[1.2rem]`}/> */}

        </View>

        <View style={tw`px-4 mt-8 gap-3 flex justify-start items-center`}>

          {
            selectedList && selectedList.itens.length > 0 ? (

              selectedList.itens.map(( item: Item, i: number) =>
                <React.Fragment key={i}>
                  <ItemListComponent index={i} item={item} onPress={() => openEditItemScreen(item)} onPressCheck={() => editCheckItem({...item, checked: !item.checked})}/>
                </React.Fragment>
              )

            ) : (

              <View style={tw`p-5 gap-8 justify-center items-center flex w-full`}>

                <View style={tw`p-10 rounded-[2rem] bg-white dark:bg-slate-700`}>
                  <Image height={130} width={130} source={require('../../assets/images/foods.png')} />
                </View>

                <Button onPress={addNewItem} style={tw`p-4 gap-4 rounded-[1.2rem] w-full flex flex-row justify-center items-center bg-white dark:bg-slate-700`} >
                  <PlusSvg height={28} width={28} fill={theme == 'dark' ? '#CBD5E1':'#94A3B8'} style={{ transform: [{ rotateY: '180deg' }] }}/>
                  <Text style={tw`text-slate-400 dark:text-slate-300 text-[1.15rem] text-center font-bold `}>Adicione um item</Text>
                </Button>

              </View>
              
            )
          }

          {/* {
            selectedList && selectedList.itens && 
              <VirtualizedList style={tw`gap-4`}
                initialNumToRender={10}
                data={selectedList.itens}
                renderItem={({item, index}) => <ItemListComponent index={index} item={item} onPress={() => openEditItemScreen(item)} onPressCheck={() => editCheckItem({...item, checked: !item.checked})}/>}
                keyExtractor={(item, index) => String(index)}
                getItemCount={()=> selectedList.itens.length}
                getItem={()=> selectedList.itens}
              />
          } */}


        {/* <SectionList
          sections={DATA}
          keyExtractor={(item, index) => item.name + index}
          renderItem={(item) => (<Text>aaa</Text>)}
        /> */}

        </View>

      </ScrollView>

      <Animated.View style={[tw`flex gap-2 items-center bottom-6 absolute  right-3`, { transform: [{ translateY: positionPlusButton }, { scale: scalePlusButton}] }]}>

        <Button onPress={() => {}} style={tw`w-8 h-8 rounded-full flex justify-center items-center bg-slate-400 dark:bg-slate-700`}>
          <PenSvg height={13} width={13} fill={theme == 'dark' ? '#CBD5E1':'#ffffff'}/>
        </Button>

        <Button onPress={addNewItem} style={tw`w-14 h-14 rounded-full flex justify-center items-center bg-violet-400`}>
          <PlusSvg height={36} width={36} fill={theme == 'dark' ? '#334155':'#FFFFFF'} style={{ transform: [{ rotateY: '180deg' }] }}/>
        </Button>

      </Animated.View>


    </View>

  )
}

export default memo(EditListScreen)
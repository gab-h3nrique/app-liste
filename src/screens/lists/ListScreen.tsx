import { FlatList, ScrollView, Animated, Text, TouchableWithoutFeedback, View } from 'react-native'
import React, { memo, useContext, useEffect, useRef, useState } from 'react'
import ShoppingSvg from '../../components/svg/icons/ShoppingSvg';
import PlusSvg from '../../components/svg/icons/PlusSvg';
import Button from '../../components/buttons/Button';
import tw from '../../libs/tailwind';
import { useTheme } from '../../context/ThemeProvider';
import ListItemComponent from './components/ListItemComponent';
import { List } from '../../providers/storage/functions/UserStorageFunctions';
import { useNavigation } from '../../../Navigator';
import useList from '../../hooks/useList';





const ListScreen = () => {
  
  const { theme } = useTheme()
  const navigator = useNavigation()

  const { lists, saveLists, createList, saveSelectedList } = useList()





  function createNewList() {

    const newList = createList({name: `Nova lista`, checked: false})

    if(!newList) return console.error('list was not created')

    saveSelectedList(newList)

    navigator.open('EditListScreen')

  }

  async function openPressedList(selectedList: List) {

    saveSelectedList(selectedList)

    navigator.open('EditListScreen')

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

    <View style={tw`flex justify-start items-center w-full h-full bg-slate-200 dark:bg-slate-800 relative`}>

      {/* <Text style={tw`text-violet-400 text-[1.5rem] h-9 text-center font-bold absolute z-2 m-auto top-3 bottom-0`}>Minhas Listas</Text> */}

    {/* {
      lists && lists.length > 0 ?

        <View style={tw`p-2 mt-2`}>
          <Text  style={tw`text-violet-400 text-[1.5rem] text-center font-bold `}>Minhas Listas</Text>
        </View>

        : 

        <View style={tw`px-5 py-8 gap-2 items-start flex w-full bg-violet-300 dark:bg-violet-500 rounded-[1.7rem]`}>
          <Text style={tw`text-white dark:text-slate-300 text-[1.3rem] font-bold`}>Crie sua Lista</Text>
          <Text style={tw`text-white dark:text-slate-300 text-[1.10rem] font-bold `}>Compare os preços de diferentes supermercados</Text>
        </View>
        
    } */}

      {
        lists && lists.length > 0 ?

          <FlatList style={tw`p-4 gap-0 flex w-full h-full `} 
          ListHeaderComponent={<View style={tw`mt--1 mb-4`}><Text style={tw`text-violet-400 text-[1.5rem] text-center font-bold`}>Minhas Listas</Text></View>}
          onScroll={handleScroll}
          data={lists} 
          initialNumToRender={14} 
          keyExtractor={(item, index) => String(index)}
          renderItem={({item, index}) => <ListItemComponent index={index} length={lists.length} item={item} onPress={() => openPressedList(item)} />}
          />
        :
          <View style={tw`p-5 mt-28 gap-8 justify-center items-center flex w-full`}>
            
            <View style={tw`p-14 rounded-full bg-white dark:bg-slate-700`}>
              <ShoppingSvg height={200} width={200} fill={theme == 'dark' ? '#cbd5e1':'#FFFFFF'} />
            </View>

            <Button onPress={createNewList} style={tw`p-3 gap-4 rounded-[1.2rem] w-full flex flex-row justify-center items-center bg-white dark:bg-slate-700`}>

              <PlusSvg height={35} width={35} fill={'#cbd5e1'} style={{ transform: [{ rotateY: '180deg' }] }}/>
              <Text  style={tw`text-slate-400 dark:text-slate-300 text-[1.15rem] text-center font-bold `}>Crie uma lista</Text>
              
            </Button>

          </View>

      }

      {/* <ScrollView>

        <View style={tw`mb-[3.5rem] p-4 gap-3 flex justify-start items-center w-full h-full`}>

          {
            lists && lists.length > 0 ? lists.map((e: List, i) => 
              <React.Fragment key={i}>
                <ListItemComponent item={e} onPress={() => openPressedList(e)} /> 
              </React.Fragment>
            )

            : <View style={tw`p-5 gap-8 justify-center items-center flex w-full`}>
                
                <View style={tw`p-14 rounded-full bg-slate-300 dark:bg-slate-700`}>
                  <ShoppingSvg height={200} width={200} fill={theme == 'dark' ? '#cbd5e1':'#FFFFFF'} />
                </View>

                <Button onPress={createNewList} style={tw`p-3 gap-4 rounded-[1.2rem] w-full flex flex-row justify-center items-center bg-white dark:bg-slate-700`}>

                  <PlusSvg height={35} width={35} fill={theme == 'dark' ? '#cbd5e1':'#94A3B8'} style={{ transform: [{ rotateY: '180deg' }] }}/>
                  <Text  style={tw`text-slate-400 dark:text-slate-300 text-[1.15rem] text-center font-bold `}>Crie uma lista</Text>
                  
                </Button>

              </View>

          }

        </View>

      </ScrollView> */}

      <Animated.View style={[tw`bottom-20 absolute  right-3`, { transform: [{ translateY: positionPlusButton }, { scale: scalePlusButton}] }]}>
        
        <Button onPress={createNewList} style={tw`w-14 h-14 rounded-full flex justify-center items-center bg-violet-400`}>
          <PlusSvg height={36} width={36} fill={theme == 'dark' ? '#334155':'#FFFFFF'} style={{ transform: [{ rotateY: '180deg' }] }}/>
        </Button>

      </Animated.View>


      {/* <Button onPress={createNewList} style={tw`bottom-22 right-3 w-16 h-16 rounded-full flex justify-center items-center bg-violet-400 absolute`}>
        <PlusSvg height={38} width={38} fill={theme == 'dark' ? '#334155':'#FFFFFF'} style={{ transform: [{ rotateY: '180deg' }] }}/>
      </Button> */}

    </View>

  )
}

export default memo(ListScreen)

import { View, Text, StyleSheet, PermissionsAndroid, Platform, FlatList } from 'react-native'
import React, { memo, useState } from 'react'
import tw from '../../libs/tailwind'
import { useTheme } from '../../context/ThemeProvider';
import Button from '../../components/buttons/Button';
import ShopCartSearch from '../../components/svg/icons/ShopCartSearch';
import ArrowSvg from '../../components/svg/icons/ArrowSvg';
import { useNavigation } from '../../../Navigator';
import Modal from '../../components/modal/Modal';
import useList from '../../hooks/useList';
import ShoppingSvg from '../../components/svg/icons/ShoppingSvg';
import PlusSvg from '../../components/svg/icons/PlusSvg';
import ListItemComponent from '../lists/components/ListItemComponent';
import { List } from '../../providers/storage/functions/UserStorageFunctions';




const SelectListTopMap = () => {

  const { theme } = useTheme()

  const navigator = useNavigation()

  const { lists, saveLists, createList, saveSelectedList } = useList()

  const [isOpen, setIsOpen] = useState(false);


  const initialRegion = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }

  const selectList = async () => {

    setIsOpen(()=> true)

  }

  async function openPressedList(selectedList: List) {

    saveSelectedList(selectedList)

    navigator.open('MapScreen')

    setTimeout(()=> setIsOpen(()=> false), 300)

  }




  return (

    <View style={tw`flex justify-start items-center w-full h-full bg-slate-200 dark:bg-slate-800 relative`}>

      <View style={tw`p-2 items-center justify-center flex flex-row w-full relative`}>

        <Text style={tw`text-slate-500 dark:text-slate-300 text-[2rem] text-center font-bold `}>Mapa</Text>

      </View>

      <View style={tw`flex p-4 w-full`}>

        <Button onLongPress={()=> console.log('ordenação')} onPress={selectList} style={tw`p-4 gap-2 justify-center items-center rounded-[1.2rem] flex flex-col w-50 bg-white dark:bg-slate-700 relative`}>
          <View style={tw`mr-3`}>
            <ShopCartSearch height={80} width={80}/>
          </View>
          <Text style={tw`text-slate-400 dark:text-slate-300 text-[1.15rem] text-center font-bold `}>ver mapa de preços</Text>
        </Button>

      </View>

      <Modal active={isOpen} onClose={()=> setIsOpen(()=> false)}>

        <View style={tw`rounded-[2rem] px-2 max-w-[90%] h-full items-center justify-center flex relative`}>
          {
            lists && lists.length > 0 ?

              <FlatList style={tw`p-4 gap-0 flex w-full h-full `} 
              ListHeaderComponent={<View style={tw`mt--1 mb-4`}><Text style={tw`text-violet-400 text-[1.5rem] text-center font-bold`}>Escolha uma lista</Text></View>}
              data={lists.filter(({itens})=> itens.length > 0)} 
              initialNumToRender={14} 
              keyExtractor={(item, index) => String(index)}
              renderItem={({item, index}) => <ListItemComponent index={index} length={lists.length} item={item} onPress={() => openPressedList(item)} />}
              />
            :
              <View style={tw`p-5 mt-28 gap-8 justify-center items-center flex w-full`}>
                
                <View style={tw`p-14 rounded-full bg-white dark:bg-slate-700`}>
                  <ShoppingSvg height={200} width={200} fill={theme == 'dark' ? '#cbd5e1':'#FFFFFF'} />
                </View>

              </View>

          }

        </View>

      </Modal>

    </View>

    // <View style={tw`flex p-3 gap-5 w-full h-full bg-green-200 dark:bg-slate-800 relative`}>


    //   <View style={tw`items-center justify-center flex flex-row w-full relative`}>

    //     <Text style={tw`text-slate-500 dark:text-slate-300 text-[2rem] text-center font-bold `}>Mapa</Text>

    //   </View>

    //   <View style={tw`items-center justify-center flex flex-row w-full h-full relative`}>

    //     <Text style={tw`text-slate-500 dark:text-slate-300 text-[2rem] text-center font-bold `}>Mapa</Text>

    //   </View>



    // </View>


  )

}

export default memo(SelectListTopMap)


import { View, Text, StyleSheet, Animated, PanResponder, Dimensions, useWindowDimensions, FlatList, TextInput } from 'react-native'
import React, { memo, useEffect, useRef, useState } from 'react'
import tw from '../../libs/tailwind'
import { useTheme } from '../../context/ThemeProvider';
import Button from '../../components/buttons/Button';
import ArrowSvg from '../../components/svg/icons/ArrowSvg';
import { useNavigation } from '../../../Navigator';
import ChevronSvg from '../../components/svg/icons/ChevronSvg';
import Crosshairs from '../../components/svg/icons/Crosshairs';
import MarketItem from './components/MarketItem';
import SearchSvg from '../../components/svg/icons/SearchSvg';
import Action from '../../components/modal/Action';

import MapView, {Marker, PROVIDER_GOOGLE, Geojson} from 'react-native-maps';
import Location from '../../utils/location';




const MapScreen = () => {

  const { theme } = useTheme()

  const navigator = useNavigation()

  const [ position, setPosition ] = useState({ longitude: 0, latitude: 0})

  const mapLocation = Location.getPosition()

  function getPosition() {

    const { latitude, longitude } = Location.getPosition()

    if(!latitude || !longitude) return

    setPosition({ latitude, longitude })

  }

  const markets: any[] = [1,2,3,4,5]

  useEffect(()=> {

    getPosition()

  }, [])

  return (

    <View style={tw`flex w-full h-full bg-slate-200 dark:bg-slate-800 relative z-10`}>

      <Button onPress={navigator.pop} style={tw`z-1 left-3 top-4 w-10 h-10 rounded-full bg-slate-400 dark:bg-slate-700 flex items-center justify-center absolute`} >
        <ArrowSvg height={20} width={20} fill={theme == 'dark' ? '#CBD5E1':'#ffffff'} style={{ transform: [{ rotateY: '180deg' }] }}/>
      </Button>

      <View style={tw`flex w-full h-full z-0`}>

        <MapView provider={PROVIDER_GOOGLE} style={styles.map}  initialRegion={{     
            latitude: mapLocation.latitude || 0,
            longitude: mapLocation.longitude || 0,
            // latitude: -19.751457,
            // longitude: -43.9601293,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }
        }>
          <Marker coordinate={position} title='aa' description='bbb' image={{uri: 'https://cdn-icons-png.flaticon.com/512/3306/3306079.png'}}/>
        </MapView>
        
      </View>

      <Action>

        <Button style={tw`absolute -top-10 left-4 px-4 h-8 flex flex-row gap-2 rounded-full bg-slate-400 dark:bg-slate-700 flex items-center justify-center`} >
          <Text style={tw`text-white dark:text-slate-300 text-[.8rem] font-bold`}>Distância</Text>
          <ChevronSvg height={15} width={15} fill={theme == 'dark' ? '#CBD5E1':'#ffffff'} marginLeft={"auto"} style={{ transform: [{ rotate: '90deg' }] }}/>
        </Button>

        <Button onPress={navigator.pop} style={tw`absolute -top-12 right-4 w-10 h-10 rounded-full bg-slate-400 dark:bg-slate-700 flex items-center justify-center`} >
          <Crosshairs height={23} width={23} fill={theme == 'dark' ? '#CBD5E1':'#ffffff'} style={{ transform: [{ rotateY: '180deg' }] }}/>
        </Button>

        <Text style={tw`pb-2 text-slate-400 dark:text-slate-300 text-[.9rem] font-bold`}>Compare os preços</Text>

        <FlatList style={tw`flex w-full h-full`} 
          // ListHeaderComponent={<Text style={tw` text-center pb-2 text-slate-400 dark:text-slate-300 text-[.9rem] font-bold`}>Compare os preços</Text>}
          // onScroll={()=> console.log('scrolling')}
          data={markets} 
          initialNumToRender={14} 
          keyExtractor={(item, index) => String(index)}
          renderItem={({item, index}) => <MarketItem index={index} length={markets.length} onPress={() => console.log('pressed market')} />}
        />

        {/* <View style={tw`px-2 bottom-1 w-full absolute z-1`}>
          <View style={tw`w-full flex flex-row px-4 py-3 items-center rounded-[1rem] bottom-2 w-full bg-white dark:bg-slate-700`}>
            <SearchSvg height={28} width={28} fill={theme == 'dark' ? '#CBD5E1':'#FFFFFF'}/>
            <TextInput onChangeText={(text)=> console.log('sdflk')} style={tw`flex-1 text-slate-400 dark:text-slate-300 text-center font-bold text-[1.2rem]`}/>
          </View>
        </View> */}

      </Action>    

    </View>

  )

}

export default memo(MapScreen)

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
 });
import { View, Text, Image } from 'react-native'
import React from 'react'
import { Item } from '../../providers/storage/functions/UserStorageFunctions'
import { useTheme } from '../../context/ThemeProvider'
import tw from '../../libs/tailwind'
import Button from '../../components/buttons/Button'
import CookieSvg from '../../components/svg/icons/CookieSvg'
import ChevronSvg from '../../components/svg/icons/ChevronSvg'
import CheckOutSvg from '../../components/svg/icons/CheckOutSvg'
import CheckSolidSvg from '../../components/svg/icons/CheckSolidSvg'

interface Props {

    index: number
    item: Item
    onPress: any
    onPressCheck: any
}

const ItemListComponent = ({index, item, onPress, onPressCheck}: Props) => {

    const { theme } = useTheme()

    const sum = item.price * item.quantity


    return (

        <Button onLongPress={()=> console.log('ordenação')} onPress={onPress} style={tw`p-2 gap-4 justify-start items-center rounded-[1.2rem] flex flex-row w-full bg-white dark:bg-slate-700 relative`}>

            <View style={tw`p-2 flex bg-violet-100 dark:bg-violet-500 rounded-[.7rem]`}>
                {
                    item.image ? <Image style={tw`w-6 h-6`} source={{ uri: item.image }} />
                    : <CookieSvg height={25} width={25}  fill={theme == 'dark' ? '#cbd5e1':'#a78bfa'}/>
                }
            </View>

            <View style={tw`gap-1 flex`}>

                <Text style={tw`text-slate-400 dark:text-slate-300 text-[.8rem] font-bold`}>{item.name}</Text>

                <View style={tw`gap-2 flex flex-row`}>
                    <View style={tw`px-2 py-1 rounded-full bg-slate-200 dark:bg-slate-300`}>
                        <Text style={tw`text-[.51rem] font-bold text-center text-slate-500 text-slate-700`}>R${ sum }</Text>
                    </View>
                </View>

            </View>

            <Button onPress={onPressCheck} style={tw`ml-auto`}>
            {
            item.checked ? <CheckSolidSvg height={25} width={25} fill={theme == 'dark' ? '#22c55e':'#22c55e'}/>
            : <CheckOutSvg height={25} width={25} fill={'#CBD5E1'} />
            }
            </Button>

            <View style={tw`-top-2 -left-2 w-8 h-8 rounded-full flex justify-center items-center absolute z-40 ${item.checked ? 'bg-violet-400' : 'bg-slate-300'}`}>
                <Text style={tw`${item.checked ? 'text-white' : 'text-white dark:text-slate-500'} text-[1rem] font-bold`}>{ (item.quantity && item.quantity > 99 ? '+99' : item.quantity) || 0}</Text>
            </View>

        </Button>

    )
}

export default ItemListComponent


{/* <Button key={i} onLongPress={()=> console.log('ordenação')} onPress={() => openEditItemScreen(item)} style={tw`mb-3 p-2 gap-4 justify-start items-center rounded-[1.2rem] flex flex-row w-full bg-white dark:bg-slate-700 relative`}>

        <View style={tw`p-2 flex bg-violet-100 dark:bg-violet-500 rounded-[.7rem]`}>
            {
                item.image ? <Image style={tw`w-6 h-6`} source={{ uri: item.image }} />
                : <CookieSvg height={25} width={25}  fill={theme == 'dark' ? '#cbd5e1':'#a78bfa'}/>
            }
        </View>

        <View style={tw`gap-1 flex`}>

            <Text style={tw`text-slate-400 dark:text-slate-300 text-[.8rem] font-bold`}>{item.name}</Text>

            <View style={tw`gap-2 flex flex-row`}>

                <Text style={tw`px-2 py-1 bg-slate-200 text-slate-500 text-[.51rem] font-bold text-center rounded-full`}>R${item.price || ' -'}</Text>

            </View>

        </View>

<Button onPress={() => editItem({...item, checked: !item.checked})} style={tw`ml-auto`}>
  {
    item.checked ? <CheckSolidSvg height={25} width={25} fill={'#a78bfa'}/>
    : <CheckOutSvg height={25} width={25} fill={'#CBD5E1'} />
  }
</Button>

<View style={tw`-top-2 -left-2 w-8 h-8 rounded-full flex justify-center items-center absolute z-40 ${item.checked ? 'bg-violet-400' : 'bg-slate-300'}`}>
  <Text style={tw`text-white text-[1rem] font-bold`}>{ (item.quantity && item.quantity > 99 ? '+99' : item.quantity) || 0}</Text>
</View>

</Button> */}
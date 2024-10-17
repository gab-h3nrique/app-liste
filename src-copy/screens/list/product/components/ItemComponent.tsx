import { View, Text, Image } from 'react-native'
import React, { memo } from 'react'
import Button from '../../../../components/buttons/Button'
import { Category } from '../../../../providers/storage/functions/CategoryFunctions'
import tw from '../../../../libs/tailwind'
import ChevronSvg from '../../../../components/svg/icons/ChevronSvg'
import CookieSvg from '../../../../components/svg/icons/CookieSvg'
import { useTheme } from '../../../../context/ThemeProvider'
import { Product } from '../../../../providers/storage/functions/ProductFunctions'

interface Props {

    item: any
    onPress: any
}

const ItemComponent = memo(function Component({ item, onPress}: Props) {

    const { theme } = useTheme()

  return (

    <Button onPress={onPress} style={tw`mb-3 p-2 gap-4 justify-start items-center rounded-[1.2rem] flex flex-row w-full bg-white dark:bg-slate-700`}>

        <View style={tw`p-2 flex bg-violet-100 dark:bg-violet-500 rounded-[.7rem]`}>
            {
                item.image ? <Image style={tw`w-6 h-6`} source={{ uri: item.image }} />
                : <CookieSvg height={25} width={25}  fill={theme == 'dark' ? '#cbd5e1':'#a78bfa'}/>
            }
        </View>

        <Text style={tw`text-slate-400 dark:text-slate-300 text-[1.1rem] font-bold`}>{item.name}</Text>

        <ChevronSvg height={25} width={25} fill={'#a78bfa'} marginLeft={"auto"}/>

    </Button>

  )
})

export default ItemComponent
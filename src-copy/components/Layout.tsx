import { Fragment, memo, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native'
// import tw from 'twrnc';


import { useAppColorScheme, useDeviceContext } from 'twrnc';
import Storage from '../providers/storage/storage';
import { useTheme } from '../context/ThemeProvider';
import tw from '../libs/tailwind';

interface Props {
    children: React.ReactNode
}

const Layout = (props :Props) => {

    const { theme, setAppTheme } = useTheme()

    return (

        // <SafeAreaView style={[tw`flex-1 bg-slate-200 dark:bg-slate-800 w-full h-full`, styles.safeArea]}>
        <SafeAreaView style={[tw`flex-1 bg-white dark:bg-slate-700 w-full h-full`, styles.safeArea]}>
            {/* <StatusBar translucent={true} backgroundColor={theme == 'dark' ? '#334155' : '#FFFFFF'} barStyle={theme == 'dark' ? 'light-content' : 'dark-content'} /> */}
            <StatusBar translucent={true} backgroundColor={'#8B5CF6'} />
            <View style={tw`flex w-full h-full relative`}>

                {props.children}

            </View>
        </SafeAreaView>

    )

}


const styles = StyleSheet.create({
    safeArea:{
        paddingTop: Platform.OS === 'android' ? 25 : 0
     }
})

export default memo(Layout)
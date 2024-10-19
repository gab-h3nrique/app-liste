import { View, Text, TextInput, ScrollView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import tw from '../../libs/tailwind'
import Svg from '../svg/Svg'
import { useTheme } from '../../context/ThemeProvider'
import Button from '../buttons/Button'
import Pulsar from 'pulsar-socket';

interface Message {
    message: string
    id: number
}

const url = 'ws://138.0.172.170:3001/pool/pulsar-cm26sbz9e0000i70i0v4z2w19'
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoicHVsc2FyIiwiaWF0IjoxNzI4Nzc1NTYwfQ.rWZ0L3G49INSlF9jIvylXEtpcEKS78cIRU9oX6m2YJA'

const socket = Pulsar(url, token);

const Chat = () => {

    const { theme, setAppTheme } = useTheme()

    const id = parseInt(String(Math.random() * 483848))

    const [ messages, setMessages ] = useState<Message[]>([{ message: 'hehehe', id: 102}])

    const [ input, setInput ] = useState<string>('')


    function send() {

        const message = {id: id, message: input }

        setMessages((prev)=>([...prev, message]))

        socket.emit('chat', message)

        setInput('')

    }

    function reciveMessage(message: Message) {

        setMessages((prev)=>([...prev, message]))

    }

    socket.on('chat', reciveMessage)

    useEffect(()=> {

    })

    return (

        <View style={tw`p-2 gap-5 flex flex-col w-full h-full justify-end`}>

            <ScrollView style={{ flexDirection: 'column-reverse' }}>
                <View style={tw`h-full gap-2 flex-1 items-end`}>

                    {
                        messages && messages.length && messages.map((item, i)=> (
                            <View key={`id-${i}`} style={tw`p-3 rounded-[.8rem] bg-white dark:bg-slate-700 ${ id == item.id ? 'mr-auto' : ''}`}>
                                <Text style={tw`text-slate-400 dark:text-slate-300 text-[1.15rem] text-center font-bold `}>{item.message}</Text>
                            </View>
                        ))
                    }
                </View>
            </ScrollView>
            {/* <FlatList style={tw`flex w-full h-full pb-3 mt-auto`} 
                data={messages} 
                initialNumToRender={14} 
                keyExtractor={(item, index) => String(index)}
                renderItem={({message, id}: any) => (
                    <View key={id}>
                        <Text style={tw`text-slate-400 bg-black dark:text-slate-300 text-[1.15rem] text-center font-bold `}>{message}</Text>
                    </View>
                )}
            /> */}
            {/* <FlatList data={messages} style={tw`gap-2 flex-1 w-full h-full`}
                renderItem={(item: any) => (
                    <View key={id} style={tw`flex-row w-50 bg-white dark:bg-slate-700`} >
                        <Text style={tw`text-black text-[1.15rem] text-center font-bold `}>{item.message}</Text>
                    </View>
                )}
                keyExtractor={(item, index) => String(index)}
            /> */}

            <View style={tw`w-full flex flex-row p-3 gap-2 mb-14 items-center rounded-[1rem] bottom-2 w-full bg-white dark:bg-slate-700`}>
                <TextInput onChangeText={(text)=> setInput(()=> text)} value={input} style={tw`flex-1 p-3 rounded-[.5rem] bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-300 font-bold text-[1.2rem]`}/>
                <Button onPress={send}>
                    <Svg.Plane height={18} width={18} fill={theme == 'dark' ? '#CBD5E1':'#94A3B8'} marginRight={4}/>
                </Button>
            </View>

        </View>

    )

}

export default Chat
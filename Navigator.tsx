

import { View, Text, StyleSheet, Animated, Dimensions, NativeModules, PanResponder, StyleProp, TextStyle, BackHandler } from 'react-native'
import React, { Children, ElementType, ReactNode, createContext, memo, useCallback, useContext, useEffect, useMemo, useRef, useState, useTransition } from 'react'
// import tw from 'twrnc';

// const { UIManager } = NativeModules;

// UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

const { width } = Dimensions.get('window');

const DURATION_TRASITION = 250

interface Props {

    children: ReactNode[]
    tab?: ElementType;

}

interface ChildrenType {

    name: string;
    component: ElementType;
    props?: {}
    options?: {
        style?: StyleProp<TextStyle> | undefined;
    };

}

interface Config {

    rootElements: ChildrenType[];
    stacks: ChildrenType[];

}

interface ContextValue {
    open: (name: string, props?: any)=> void,
    change: (name: string, props?: any)=> void,
    close: (name: string | string[])=> void,
    back: (rollback: number)=> void,
    pop: ()=> void,
}

const formatElement = (children: ReactNode[]) => {

    const elements: ChildrenType[] = [];

    Children.forEach(children, (child: any) =>{

        elements.push({ ...child.props })

    })

    return elements;

};

export const NavigationContext = createContext({});

const Navigator = ({ tab: Tab, children }: Props) => {

    const [isPending, startTransition] = useTransition()

    const rootElements = useMemo(() => formatElement(children) ,[children])

    const [ config, setConfig ] = useState<Config>({rootElements, stacks: [rootElements[0]]})

    const positionScreen = useRef(new Animated.Value(0)).current;
    const lastPositionScreen = useRef(new Animated.Value(0)).current;

    // const panResponder = React.useRef(
    //     PanResponder.create({
    //         onMoveShouldSetPanResponder: (evt, gestureState) => {

    //             const isFirstScreen = config.stacks.length === 1
    //             const isFarLeft = evt.nativeEvent.pageX < Math.floor(width * 0.25);
            
    //             if(!isFirstScreen && isFarLeft)  return true;

    //             return false;

    //         },

    //         onPanResponderMove: (evt, gestureState) => positionScreen.setValue(gestureState.moveX),

    //         onPanResponderTerminationRequest: (evt, gestureState) => true,
            
    //         onPanResponderRelease: (evt, gestureState) => {
    //             if (Math.floor(gestureState.moveX) >= width / 2) {
    //                 pop();
    //             } else {
    //                 Animated.timing(positionScreen, {
    //                 toValue: 0,
    //                 duration: 250,
    //                 useNativeDriver: true,
    //                 }).start();
    //             }
    //         },
    //         onPanResponderTerminate: (evt, gestureState) => {
    //             Animated.timing(positionScreen, {
    //                 toValue: 0,
    //                 duration: 250,
    //                 useNativeDriver: true,
    //             }).start();
    //         },
    //     }),
    // ).current;


    const open = useCallback((name: string, props?: {}) => {

        (async()=>{

            // startTransition(() => {

                setConfig(prev => {
    
                    const foundElement = prev.rootElements.find((e: ChildrenType) => e.name === name);
    
                    if(foundElement) return { ...prev, stacks: [...prev.stacks.filter((e) => e.name !== name), {...foundElement, props}] };
                    else return prev;
    
                });

            // })
            
        })().then(()=>{

            lastPositionScreen.setValue(0);
            Animated.timing(lastPositionScreen, { toValue: - (width / 4), duration: DURATION_TRASITION, useNativeDriver: true }).start();

            positionScreen.setValue(width);
            Animated.timing(positionScreen, { toValue: 0, duration: DURATION_TRASITION, useNativeDriver: true }).start();

        })

    },[])

    const change = useCallback((name: string, props?: {}) => {

        // (async()=>{

        startTransition(() => {

            setConfig(prev => {
    
                const foundElement = prev.rootElements.find((e: ChildrenType) => e.name === name);
    
                if(foundElement) return { ...prev, stacks: [{...foundElement, props}] };
                else return prev;
    
            });

        })
    
            
        // })().then(()=>{

        //     positionScreen.setValue(width);
        //     Animated.timing(positionScreen, { toValue: 0, duration: DURATION_TRASITION, useNativeDriver: true }).start();

        // })

    },[])

    const close = useCallback((name: string | string[]) => {


        lastPositionScreen.setValue(- (width / 4));
        Animated.timing(lastPositionScreen, { toValue: 0, duration: DURATION_TRASITION, useNativeDriver: true }).start();

        positionScreen.setValue(0);
        Animated.timing(positionScreen, { toValue: width, duration: DURATION_TRASITION, useNativeDriver: true, }).start(() => {

            startTransition(() => {
    
                setConfig(prev => {

                    if(prev.stacks.length > 1) return { ...prev, stacks: prev.stacks.filter((e)=> !name.includes(e.name)) };
                    else return prev;
                    
                });
            })
    
        });



    },[])

    const back = useCallback((rollback: number) => {

        (async()=>{

            
            setConfig((prev: any) => {

                if(prev.stacks.length, rollback > 1) return { ...prev, stacks: prev.stacks.splice((prev.stacks.length - 1) - rollback, rollback - 1) };
                else return prev;
                
            });
            


            
        })().then(()=>{

            positionScreen.setValue(0)
            Animated.timing(positionScreen, { toValue: width, duration: DURATION_TRASITION, useNativeDriver: true}).start();

            lastPositionScreen.setValue(- (width / 4));
            Animated.timing(lastPositionScreen, { toValue: 0, duration: DURATION_TRASITION, useNativeDriver: true }).start();

            setTimeout(()=> {

                setConfig((prev: any) => {
    
                    if(prev.stacks.length > 1) return { ...prev, stacks: prev.stacks.slice(0, prev.stacks.length - 1) };
                    else return prev;
                    
                });
                
                
            }, DURATION_TRASITION)

        })




    },[])

    const pop = useCallback(() => {

        positionScreen.setValue(0)

        lastPositionScreen.setValue(- (width / 4));
        Animated.timing(lastPositionScreen, { toValue: 0, duration: DURATION_TRASITION, useNativeDriver: true }).start();

        Animated.timing(positionScreen, { toValue: width, duration: DURATION_TRASITION, useNativeDriver: true}).start(() => {

            // setTimeout(()=> positionScreen.setValue(0), 50)
            // positionScreen.setValue(0)

            // startTransition(() => {

                

                // setConfig((prev: any) => {
    
                //     if(prev.stacks.length > 1) return { ...prev, stacks: prev.stacks.slice(0, prev.stacks.length - 1) };
                //     else return prev;
                    
                // });

                
            // })
            

        });

        setTimeout(()=> {

            setConfig((prev: any) => {
        
                if(prev.stacks.length > 1) return { ...prev, stacks: prev.stacks.slice(0, prev.stacks.length - 1) };
                else return prev;
                
            });

        }, DURATION_TRASITION)


    },[])

    

    const contextValue: ContextValue = useMemo(() => ({ open, change, close, back, pop }), []);

    const onBackPress = () => {

        if(config.stacks.length > 1) pop();
        else BackHandler.exitApp();

        return true;
    
    }
    
    BackHandler.addEventListener('hardwareBackPress', onBackPress);
    
    useEffect(()=> {
        

    }, [])

    // console.log('--------------------------------renderizando Navigator------------------------------------------')

    return (

        <NavigationContext.Provider value={contextValue}>
            {/* <View style={tw`w-full h-full relative flex`} {...panResponder.panHandlers}> */}
                {config.stacks.map((stack, index)=>{

                    const style = stack.options?.style

                    const Component = stack.component;

                    let translateX: any = 0;


                    // screens behind current
                    if(index <= (config.stacks.length -2)) translateX = lastPositionScreen

                    // current screen
                    if(index === (config.stacks.length -1) && index > 0) translateX = positionScreen

                    return (

                        // <Animated.View key={`Animated-${stack.name}`} style={[tw`flex w-full h-full absolute`, { transform: [{ translateX: translateX }] }, style]}>
                        <Animated.View key={`Animated-${stack.name}`} style={{...style as any, display: 'flex', width: '100%', height: '100%', position: 'absolute' ,transform: [{ translateX: translateX }]}}>
                            <Component key={`Screen-${stack.name}-${index}`} {...stack.props}/>
                        </Animated.View>

                    )
                })}
            {/* </View> */}

            {Tab && <Tab/>}

        </NavigationContext.Provider>

    )
  

}

interface StackProps {

    name: string;
    component: ElementType;
    options?: {
        style?: StyleProp<TextStyle> | undefined;
    };

}

export const Stack = memo((props: StackProps) => null);

export default memo(Navigator)

export const useNavigation = () => useContext(NavigationContext) as ContextValue;




// #####################################################################################################################################
// #####################################################################################################################################
// #####################################################################################################################################
// #####################################################################################################################################
// #####################################################################################################################################
// #####################################################################################################################################
// #####################################################################################################################################
// #####################################################################################################################################
// #####################################################################################################################################
// #####################################################################################################################################
// #####################################################################################################################################
// #####################################################################################################################################
// #####################################################################################################################################
// #####################################################################################################################################
// #####################################################################################################################################
// #####################################################################################################################################
// #####################################################################################################################################
// #####################################################################################################################################
// #####################################################################################################################################










// import { View, Text, StyleSheet, Animated, Dimensions, NativeModules } from 'react-native'
// import React, { Children, ElementType, ReactNode, createContext, memo, useCallback, useContext, useMemo, useRef, useState, useTransition } from 'react'
// import tw from 'twrnc';

// // const { UIManager } = NativeModules;

// // UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

// const { width } = Dimensions.get('window');

// interface Props {
//     children: ReactNode[]
// }

// interface ChildrenType {
//     name: string;
//     component: ElementType;
// }

// interface Config {

//     rootElements: ChildrenType[];
//     stacks: ChildrenType[];

// }

// const formatElement = (children: ReactNode[]) => {

//     const elements: ChildrenType[] = [];

//     Children.forEach(children, (child: any) =>{

//         elements.push({ name: child.props.name, component: child.props.component })

//     })
  
//     return elements;

// };


// export const NavigationContext = createContext({});


// const Navigator = ({ children }: Props) => {

//     const rootElements = useMemo(() => formatElement(children) ,[children])

//     const [ config, setConfig ] = useState<Config>({rootElements, stacks: [rootElements[0]]})

//     const positionScreen = useRef(new Animated.Value(0)).current;


//     const push = useCallback((name: string) => {
//         (async()=>{
            
//             console.log('-----------------------------------------------------push')
//             setConfig((prev) => {

//                 const foundElement = prev.rootElements.find((e: ChildrenType) => e.name === name);

//                 if(foundElement) return { ...prev, stacks: [...prev.stacks.filter((e) => e.name !== name), foundElement] };
//                 else return prev;

//             });
            
//         })().then(()=>{

//             positionScreen.setValue(width);
//             Animated.timing(positionScreen, { toValue: 0, duration: 250, useNativeDriver: true }).start();

//         })

//     },[])

//     const pop = useCallback(() => {
//         console.log('-----------------------------------------------------pop')
//         Animated.timing(positionScreen, {
//           toValue: width,
//           duration: 250,
//           useNativeDriver: true,
//         }).start(() => {

//             positionScreen.setValue(0);
//             setConfig((prev: any) => {

//                 if(prev.stacks.length > 1) return { ...prev, stacks: prev.stacks.slice(0, prev.stacks.length - 1) };
//                 else return prev;
                
//             });

//         });

//     },[])

//     const contextValue = useMemo(() => ({
//         pop,
//         push
//     }), []);

//     // const navigator = {
//     //     push: handlePush,
//     //     pop: handlePop,
//     // }

//     console.log('-----------------------------------------------------renderizando Navigator')

//     return (

//         <NavigationContext.Provider value={contextValue}>

//             { 
//                 children.map((child: any, i)=>{

//                     const Component = child.props.component;
//                     console.log('child', child)



//                     return (
//                         <Component key={child.props.name} />
//                     )

//                 })
//             }


//             {/* <View key={stack.name} style={[tw`flex w-full h-full absolute`]}>
//                 <Component navigator={{ push: handlePush, pop: handlePop }} />
//             </View> */}

//         </NavigationContext.Provider>
//     )
  

// }

// export const Stack = (props: ChildrenType) => null;

// export default Navigator

// export const useNavigation:any = () => useContext(NavigationContext);





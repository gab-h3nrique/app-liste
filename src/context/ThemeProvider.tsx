import React, { createContext, useContext, useEffect, useState } from "react";

import Storage from "../providers/storage/storage";
import { useAppColorScheme } from "twrnc";
import tw from "../libs/tailwind";

interface Theme {
    theme: string;
    setAppTheme:(theme: string) => void;
}

export const ThemeContext = createContext({ });

export const useTheme = (): Theme => {

    return useContext(ThemeContext) as Theme;

};

export const ThemeProvider = ({ children }:any) => {

    const [ theme, setTheme ] = useState<string>()
    
    const [colorScheme, toggleColorScheme, setColorScheme] = useAppColorScheme(tw, Storage.storage.getItem('THEME'));

    function setAppTheme(value: string) {

        Storage.storage.setItem('THEME', value)

        setTheme(()=> value)

        setColorScheme(value as any)        

    }

    useEffect(()=>{

        setAppTheme(Storage.storage.getItem('THEME'))
        
    }, [])
    
    return (

        <ThemeContext.Provider value={{ theme, setAppTheme }}>

            {children}

        </ThemeContext.Provider>
        
    )

}
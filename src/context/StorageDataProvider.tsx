import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { List } from "../providers/storage/functions/UserStorageFunctions";
import { Category } from "../providers/storage/functions/CategoryFunctions";
import { Brand } from "../providers/storage/functions/BrandFunctions";
import { Product } from "../providers/storage/functions/ProductFunctions";
import Storage from "../providers/storage/storage";

export interface DataStorage {

    selectedList: List | null,
    list: List[],
    category: Category[],
    brand: Brand[],
    product: Product[],

}

export interface DataStorageProvider {

    dataStorage: DataStorage,
    setSelectedStorageList: (list: List)=> void
    setStorageList: (list: List[])=> void

}

export const DataStorageContext = createContext({});

export const DataStorageProvider = ({ children }:any) => {

    const [ dataStorage, setDataStorage ] = useState<DataStorage>({

        selectedList: null,
        list: Storage.List.getMany(),
        category: Storage.Category.getMany(),
        brand: Storage.Brand.getMany(),
        product: Storage.Product.getMany(),

    })

    const setSelectedStorageList = useCallback((selectedList: List)=>{

        setDataStorage(prev=>({ ...prev, selectedList: selectedList }))

    }, [])

    const setStorageList = useCallback((list: List[])=>{

        setDataStorage(prev=>({ ...prev, list: list }))
        
    }, [])


    const contextValue: DataStorageProvider = useMemo(() => (

        { dataStorage, setSelectedStorageList, setStorageList }

    ), []);


    return (

        <DataStorageContext.Provider value={{ dataStorage, setSelectedStorageList, setStorageList }}>
            {children}
        </DataStorageContext.Provider>
        
    )

}
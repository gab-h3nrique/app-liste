import { useContext } from "react";
import { DataStorage, DataStorageContext, DataStorageProvider } from "../context/StorageDataProvider";



export default function useDataStorage() {

    const selectedList = (useContext(DataStorageContext) as DataStorageProvider).dataStorage.selectedList
    const list =  (useContext(DataStorageContext) as DataStorageProvider).dataStorage.list
    const category =  (useContext(DataStorageContext) as DataStorageProvider).dataStorage.category
    const brand =  (useContext(DataStorageContext) as DataStorageProvider).dataStorage.brand
    const product =  (useContext(DataStorageContext) as DataStorageProvider).dataStorage.product
    const setStorageList = (useContext(DataStorageContext) as DataStorageProvider).setStorageList
    const setSelectedStorageList = (useContext(DataStorageContext) as DataStorageProvider).setSelectedStorageList
    
    return {
        selectedList,
        list,
        category,
        brand,
        product,
        setStorageList,
        setSelectedStorageList,
    }
}
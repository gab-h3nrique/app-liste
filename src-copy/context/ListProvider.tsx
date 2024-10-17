import { ReactNode, createContext, useCallback, useContext, useMemo, useState } from "react";
import { List } from "../utils/storage/functions/UserStorageFunctions";
import Storage from "../utils/storage/core";

interface Props {

    children: ReactNode

}

export interface ListContextType {

  lists: List[],
  selectedList: List | null,
  saveLists: (lists: List[])=> void,
  createList: (lists: {name: `Nova lista`, checked: false})=> List | null,
  saveSelectedList: (list: List)=> void,
  

}

export const ListContext = createContext({} as ListContextType);

export default function ListProvider({ children }: Props) {


  

  const [ lists, setLists ] = useState(Storage.List.getMany());
  const [ selectedList, setSelectedList ] = useState<List | null>(null);

  const createList = async(lists: {name: string, checked: boolean}) => {

    const newList = await Storage.List.create(lists)

    await setLists(()=> Storage.List.getMany())

    return newList
  
  }

  const saveLists = async(lists: List[]) => {

    await Storage.List.updateMany(lists)
    setLists(()=> lists as any)
  
  }

  const saveSelectedList = async(list: List) => {

    const updated = await Storage.List.update(list.id, list)
    
    setSelectedList(()=> updated)

    const data =  Storage.List.getMany()
    setLists(()=> data)

  }
  
  const contextValue = {
    
    lists,
    selectedList,
    saveLists,
    createList,
    saveSelectedList,
    
  }

  // const saveLists = useCallback((lists: List[]) => {

  //   setLists(()=> lists)
  
  // }, []);
  // const saveSelectedList = useCallback((list: List) => {
    
  //   setSelectedList(()=> list)

  // }, []);
  
  // const contextValue = useMemo(() => ({
    
  //   lists,
  //   selectedList,
  //   saveLists,
  //   saveSelectedList,
    
  // }), [lists, selectedList]);
    

  return (

    <ListContext.Provider value={contextValue as any}>
      {children}
    </ListContext.Provider>

  )
}



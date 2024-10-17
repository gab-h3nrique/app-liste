import { ReactNode, createContext, useCallback, useContext, useMemo, useState } from "react";
import Storage from "../providers/storage/storage";
import { List } from "../providers/storage/functions/UserStorageFunctions";

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

  const createList = (lists: {name: string, checked: boolean}) => {

    const newList = Storage.List.create(lists)

    setLists(()=> Storage.List.getMany())

    return newList
  
  }

  const saveLists =(lists: List[]) => {

    Storage.List.updateMany(lists)
    setLists(()=> lists)
  
  }

  const saveSelectedList =(list: List) => {
    
    setSelectedList(()=> Storage.List.update(list.id, list))
    setLists(()=> Storage.List.getMany())

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

    <ListContext.Provider value={contextValue}>
      {children}
    </ListContext.Provider>

  )
}



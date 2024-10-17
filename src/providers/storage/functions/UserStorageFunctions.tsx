import AsyncStorageFunctions from './AsyncStorageFunctions';

const LISTS =  'USER_LISTS';
const ITENS =  'USER_ITENS';

export interface List {
    id: number; 
    name: string; 
    itens: Item[];
    checked: boolean; 
    updatedAt?: any;
    createdAt?: any;
}

export interface Item {
    id: number; 
    name: string; 
    price: number; 
    quantity: number; 
    checked: boolean; 
    image?: string;
    updatedAt?: any;
    createdAt?: any;
    listId?: number | null;
    productId?: number | null;
}


function functionList() {

    const SET = (array: List[]) => AsyncStorageFunctions.setItem(LISTS, array);

    const GET_ALL = (): List[] => AsyncStorageFunctions.getItem(LISTS) || [];

    const GET_BY_ID = (id: number): List | null => GET_ALL().find((e: List)=> e.id === id) || null;

    return {

        get(id: number):List | null {

            try {

                const list = GET_BY_ID(id)

                if(!list) return null

                return list

            } catch(error) { console.error('erro in get list on storage', error); return null}

        },

        getMany(name?: string): List[] {

            try {

                const data = GET_ALL()
                
                if(!data) return []
                
                let filteredList: List[];

                if(name) filteredList = data.filter((e)=> e.name.includes(name))
                else filteredList = data

                return filteredList

            } catch(error) { console.error('erro in getMany list on storage', error); return []}

        },

        create(list: { name: string, checked: boolean; itens?: Item[] }): List | null {

            try{

                const data = GET_ALL()

                const repeatedName = data.filter(li=>li.name.includes(list.name))

                const id = new Date().getTime()

                const notRepeatedName = `${list.name}${ repeatedName.length + 1 > 1 ? ` (${repeatedName.length + 1})` : ''}`

                const newList = { 
                    ...list,
                    id: id,
                    name: notRepeatedName,
                    checked: list.checked,
                    itens: list.itens || [],
                    updatedAt: new Date().getTime(),
                    createdAt: new Date().getTime(),
                }

                SET([newList, ...data])

                return GET_BY_ID(id)

            } catch(error) { console.error('erro in create list on storage', error); return null }

        },

        update(id: number, list: List): List | null {

            try {

                const data = GET_ALL()

                const newDate = new Date().getTime()
    
                // SET(data.map((e)=> e.id === id ? {...list, id: e.id, updatedAt: newDate, itens: []} : e))
                SET(data.map((e)=> e.id === id ? {...list, id: e.id, updatedAt: newDate} : e))

                return GET_BY_ID(id)

            } catch(error) { console.error('erro in update list on storage', error); return null }

        },

        updateMany(lists: List[]): List[] | null {

            try {

                const data = GET_ALL()

                SET(lists)
    
                return GET_ALL()

            } catch(error) { console.error('erro in update lists on storage', error); return null }

        },

        delete(id: number): boolean {

            try {

                const data = GET_ALL()
    
                SET(data.filter((e: List)=> e.id !== id))
    
                return !GET_BY_ID(id) ? true : false;

            } catch(error) { console.error('erro in delete List on storage', error); return false }


        },

    }

}

function functionItem() {

    const SET = (array: Item[]) => AsyncStorageFunctions.setItem(ITENS, array);

    const GET_ALL = (): Item[] => AsyncStorageFunctions.getItem(ITENS) || [];

    const GET_BY_ID = (id: number): Item | null => GET_ALL().find((e: Item)=> e.id === id) || null;


    return {

        get(id: number):Item | null {

            try {

                return GET_BY_ID(id) || null

            } catch(error) { console.error('erro in get Item on storage', error); return null}

        },

        getMany(name?: string): Item[] {
            
            try {

                const data = GET_ALL()

                if(!data) return [];
    
                if(name) return data.filter(li => li.name.includes(name))
                
                return data

            } catch(error) { console.error('erro in get Item on storage', error); return []}

        },

        create(item: Item): Item | null {

            try{

                const data = GET_ALL()
    
                const id = new Date().getTime()

                const newItem: Item = { ...item, id: id,  updatedAt: new Date().getTime(), createdAt: new Date().getTime() }
    
                SET([newItem, ...data])
    
                return GET_BY_ID(id)

            } catch(error) { console.error('erro in create Item on storage', error); return null }

        },

        update(id: number, item: Item): Item | null {

            try {

                const data = GET_ALL()

                const newDate = new Date().getTime()
    
                SET(data.map((e)=> e.id === id ? {...item, id: e.id, updatedAt: newDate} : e))
    
                return GET_BY_ID(id)

            } catch(error) { console.error('erro in update Item on storage', error); return null }

        },

        delete(id: number): boolean {

            try {

                const data = GET_ALL()
    
                SET(data.filter(e=> e.id !== id))
    
                return !GET_BY_ID(id) ? true : false;

            } catch(error) { console.error('erro in delete Item on storage', error); return false }


        },

        getByName(name: string): Item[] {
            
            try{
                
                const data = GET_ALL()
    
                return data.filter(li=> li.name.includes(name))

            } catch(error) { console.error('erro in update Item on storage', error); return [] }

        },

        getByList(listId: number): Item[] {
            
            try{
                
                const data = GET_ALL()
    
                return data.filter(li=> li.listId == listId)

            } catch(error) { console.error('erro in update Item on storage', error); return [] }

        },

    }

}

export const ListFunctions = functionList()
export const itemFunctions = functionItem()
import asyncStorageAdapter from '../adaptors/AsyncStorage';

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

    const storage = asyncStorageAdapter

    const SET = async(array: List[]) => await storage.setItem(LISTS, array);

    const GET_ALL = async(): Promise<List[]> => await storage.getItem(LISTS) || [];

    const GET_BY_ID = async(id: number): Promise<List | null> => (await GET_ALL()).find((e: List)=> e.id === id) || null;

    return {

        async get(id: number): Promise<List | null> {

            try {

                const list = await GET_BY_ID(id)

                if(!list) return null

                return list

            } catch(error) { console.error('erro in get list on storage', error); return null}

        },

        async getMany(name?: string): Promise<List[]> {

            try {

                const data = await GET_ALL()
                
                if(!data) return []
                
                let filteredList: List[];

                if(name) filteredList = data.filter((e)=> e.name.includes(name))
                else filteredList = data

                return filteredList

            } catch(error) { console.error('erro in getMany list on storage', error); return []}

        },

        async create(list: { name: string, checked: boolean; itens?: Item[] }): Promise<List | null> {

            try{

                const data = await GET_ALL()

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

                await SET([newList, ...data])

                return await GET_BY_ID(id)

            } catch(error) { console.error('erro in create list on storage', error); return null }

        },

        async update(id: number, list: List): Promise<List | null> {

            try {

                const data = await GET_ALL()

                const newDate = new Date().getTime()
    
                // SET(data.map((e)=> e.id === id ? {...list, id: e.id, updatedAt: newDate, itens: []} : e))
                await SET(data.map((e)=> e.id === id ? {...list, id: e.id, updatedAt: newDate} : e))

                return await GET_BY_ID(id)

            } catch(error) { console.error('erro in update list on storage', error); return null }

        },

        async updateMany(lists: List[]): Promise<List[] | null> {

            try {

                const data = await GET_ALL()

                await SET(lists)
    
                return await GET_ALL()

            } catch(error) { console.error('erro in update lists on storage', error); return null }

        },

        async delete(id: number): Promise<boolean> {

            try {

                const data = await GET_ALL()
    
                await SET(data.filter((e: List)=> e.id !== id))
    
                return !(await GET_BY_ID(id)) ? true : false;

            } catch(error) { console.error('erro in delete List on storage', error); return false }


        },

    }

}

function functionItem() {

    const storage = asyncStorageAdapter

    const SET = async(array: Item[]) => await storage.setItem(ITENS, array);

    const GET_ALL = async(): Promise<Item[]> => await storage.getItem(ITENS) || [];

    const GET_BY_ID = async(id: number): Promise<Item | null> => (await GET_ALL()).find((e: Item)=> e.id === id) || null;


    return {

        async get(id: number): Promise<Item | null> {

            try {

                return await GET_BY_ID(id) || null

            } catch(error) { console.error('erro in get Item on storage', error); return null}

        },

        async getMany(name?: string): Promise<Item[]>  {
            
            try {

                const data = await GET_ALL()

                if(!data) return [];
    
                if(name) return data.filter(li => li.name.includes(name))
                
                return data

            } catch(error) { console.error('erro in get Item on storage', error); return []}

        },

        async create(item: Item): Promise<Item | null> {

            try{

                const data = await GET_ALL()
    
                const id = new Date().getTime()

                const newItem: Item = { ...item, id: id,  updatedAt: new Date().getTime(), createdAt: new Date().getTime() }
    
                await SET([newItem, ...data])
    
                return await GET_BY_ID(id)

            } catch(error) { console.error('erro in create Item on storage', error); return null }

        },

        async update(id: number, item: Item): Promise<Item | null> {

            try {

                const data = await GET_ALL()

                const newDate = new Date().getTime()
    
                await SET(data.map((e)=> e.id === id ? {...item, id: e.id, updatedAt: newDate} : e))
    
                return await GET_BY_ID(id)

            } catch(error) { console.error('erro in update Item on storage', error); return null }

        },

        async delete(id: number): Promise<boolean>  {

            try {

                const data = await GET_ALL()
    
                await SET(data.filter(e=> e.id !== id))
    
                return !(await GET_BY_ID(id)) ? true : false;

            } catch(error) { console.error('erro in delete Item on storage', error); return false }


        },

        async getByName(name: string): Promise<Item[]>  {
            
            try{
                
                const data = await GET_ALL()
    
                return data.filter(li=> li.name.includes(name))

            } catch(error) { console.error('erro in update Item on storage', error); return [] }

        },

        async getByList(listId: number): Promise<Item[]>  {
            
            try{
                
                const data = await GET_ALL()
    
                return data.filter(li=> li.listId == listId)

            } catch(error) { console.error('erro in update Item on storage', error); return [] }

        },

    }

}

export const ListFunctions = functionList()
export const itemFunctions = functionItem()
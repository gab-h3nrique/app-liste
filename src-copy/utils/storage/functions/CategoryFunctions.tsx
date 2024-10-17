import asyncStorageAdapter from '../adaptors/AsyncStorage';

const CATEGORIES =  'CATEGORIES';

export interface Category {
    id: number;
    name: string;
    image?: string;
}


function functions() {

    const storage = asyncStorageAdapter

    const SET = async(array: Category[]) => await storage.setItem(CATEGORIES, array);

    const GET_ALL = async(): Promise<Category[]> => await storage.getItem(CATEGORIES) || [];

    const GET_BY_ID = async(id: number): Promise<Category | null> => (await GET_ALL()).find((e: Category)=> e.id === id) || null;



    return {

        async get(id: number): Promise<Category | null> {

            try {

                return await GET_BY_ID(id) || null

            } catch(error) { console.log('erro in get category on storage', error); return null}

        },

        async getMany(name?: string): Promise<Category[]> {
            
            try {

                const data = await GET_ALL()
    
                if(name) return data.filter(li => li.name.includes(name))
                
                return data

            } catch(error) { console.log('erro in get list on storage', error); return []}

        },

        async create(category: { name: string, image?: string}): Promise<Category | null>{

            try{

                const data = await GET_ALL()

                const repeatedName = data.filter(li=>li.name.includes(category.name))

                const id = new Date().getTime()

                const notRepeatedName = `${category.name}${ repeatedName.length + 1 > 1 ? ` (${repeatedName.length + 1})` : ''}`

                const newCategory = { ...category, id: id,name: notRepeatedName }

                await SET([newCategory, ...data])

                return await GET_BY_ID(id)

            } catch(error) { console.log('erro in create category on storage', error); return null }

        },

        async update(id: number, category: Category): Promise<Category | null> {

            try {

                const data = await GET_ALL()
    
                await SET(data.map((e)=> e.id === id ? {...category, id: e.id} : e ))
    
                return await GET_BY_ID(id)

            } catch(error) { console.log('erro in update category on storage', error); return null }

        },

        async delete(id: number): Promise< boolean> {

            try {

                const data = await GET_ALL()
    
                await SET(data.filter((e: Category)=> e.id !== id))
    
                return !(await GET_BY_ID(id)) ? true : false;

            } catch(error) { console.log('erro in update delete on storage', error); return false }


        },

        async getByName(name: string): Promise<Category[]>  {
            
            try{
                
                const data = await GET_ALL()
    
                return data.filter(li=> li.name.includes(name))

            } catch(error) { console.log('erro in update category on storage', error); return [] }

        },

    }

}

const CategoryFunctions = functions();

export default CategoryFunctions;

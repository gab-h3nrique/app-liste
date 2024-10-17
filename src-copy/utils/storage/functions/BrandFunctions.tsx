import asyncStorageAdapter from "../adaptors/AsyncStorage";

const BRANDS =      'BRANDS';

export interface Brand {
    id: number;
    name: string;
    image?: string;
}


function functions() {

    const storage = asyncStorageAdapter

    const SET = async(array: Brand[]) => await storage.setItem(BRANDS, array);

    const GET_ALL = async(): Promise<Brand[]> => await storage.getItem(BRANDS) || [];

    const GET_BY_ID = async(id: number): Promise<Brand | null> => (await GET_ALL()).find((e: Brand)=> e.id === id) || null;



    return {

        async get(id: number): Promise<Brand | null>{

            try {

                return await GET_BY_ID(id) || null

            } catch(error) { console.log('erro in get Brand on storage', error); return null}

        },

        async getMany(name?: string): Promise<Brand[]> {
            
            try {

                const data = await GET_ALL()
    
                if(name) return data.filter(li => li.name.includes(name))
                
                return data

            } catch(error) { console.log('erro in get Brand on storage', error); return []}

        },

        async create(brand: { name: string, image?: string}): Promise<Brand | null> {

            try{

                const data = await GET_ALL()

                const repeatedName = data.filter(li=>li.name.includes(brand.name))

                const id = new Date().getTime()

                const notRepeatedName = `${brand.name}${ repeatedName.length + 1 > 1 ? ` (${repeatedName.length + 1})` : ''}`

                const newData = { ...brand, id: id,name: notRepeatedName }

                await SET([newData, ...data])

                return await GET_BY_ID(id)

            } catch(error) { console.log('erro in create Brand on storage', error); return null }

        },

        async update(id: number, brand: Brand): Promise<Brand | null> {

            try {

                const data = await GET_ALL()
    
                await SET(data.map((e)=> e.id === id ? {...brand, id: e.id} : e))
    
                return GET_BY_ID(id)

            } catch(error) { console.log('erro in update brand on storage', error); return null }

        },

        async delete(id: number): Promise< boolean> {

            try {

                const data = await GET_ALL()
    
                await SET(data.filter((e: Brand)=> e.id !== id))
    
                return !(await GET_BY_ID(id)) ? true : false;

            } catch(error) { console.log('erro in delete Brand on storage', error); return false }


        },

        async getByName(name: string): Promise<Brand[]> {
            
            try{
                
                const data = await GET_ALL()
    
                return data.filter(li=> li.name.includes(name))

            } catch(error) { console.log('erro in update Brand on storage', error); return [] }

        },

    }

}

const BrandFunctions = functions();

export default BrandFunctions
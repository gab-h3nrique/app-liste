import AsyncStorageFunctions from './AsyncStorageFunctions';

const BRANDS =      'BRANDS';

export interface Brand {
    id: number;
    name: string;
    image?: string;
}


function functions() {

    const SET = (array: Brand[]) => AsyncStorageFunctions.setItem(BRANDS, array);

    const GET_ALL = (): Brand[] => AsyncStorageFunctions.getItem(BRANDS) || [];

    const GET_BY_ID = (id: number): Brand | null => GET_ALL().find((e: Brand)=> e.id === id) || null;



    return {

        get(id: number):Brand | null {

            try {

                return GET_BY_ID(id) || null

            } catch(error) { console.log('erro in get Brand on storage', error); return null}

        },

        getMany(name?: string): Brand[] {
            
            try {

                const data = GET_ALL()
    
                if(name) return data.filter(li => li.name.includes(name))
                
                return data

            } catch(error) { console.log('erro in get Brand on storage', error); return []}

        },

        create(brand: { name: string, image?: string}): Brand | null {

            try{

                const data = GET_ALL()

                const repeatedName = data.filter(li=>li.name.includes(brand.name))

                const id = new Date().getTime()

                const notRepeatedName = `${brand.name}${ repeatedName.length + 1 > 1 ? ` (${repeatedName.length + 1})` : ''}`

                const newData = { ...brand, id: id,name: notRepeatedName }

                SET([newData, ...data])

                return GET_BY_ID(id)

            } catch(error) { console.log('erro in create Brand on storage', error); return null }

        },

        update(id: number, brand: Brand): Brand | null {

            try {

                const data = GET_ALL()
    
                SET(data.map((e)=> e.id === id ? {...brand, id: e.id} : e))
    
                return GET_BY_ID(id)

            } catch(error) { console.log('erro in update brand on storage', error); return null }

        },

        delete(id: number): boolean {

            try {

                const data = GET_ALL()
    
                SET(data.filter((e: Brand)=> e.id !== id))
    
                return !GET_BY_ID(id) ? true : false;

            } catch(error) { console.log('erro in delete Brand on storage', error); return false }


        },

        getByName(name: string): Brand[] {
            
            try{
                
                const data = GET_ALL()
    
                return data.filter(li=> li.name.includes(name))

            } catch(error) { console.log('erro in update Brand on storage', error); return [] }

        },

    }

}

const BrandFunctions = functions();

export default BrandFunctions
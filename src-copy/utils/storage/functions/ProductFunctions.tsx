import asyncStorageAdapter from '../adaptors/AsyncStorage';

const PRODUCTS =  'PRODUCTS';

export interface Product {
    id: number;
    name: string;
    categoryId?: number;
    brandId?: number;
    price?: number;
    image?: string;
}


function functions() {

    const storage = asyncStorageAdapter

    const SET = async(array: Product[]) => await storage.setItem(PRODUCTS, array);

    const GET_ALL = async(): Promise<Product[]> => await storage.getItem(PRODUCTS) || [];

    const GET_BY_ID = async(id: number): Promise<Product | null> => (await GET_ALL()).find((e: Product)=> e.id === id) || null;



    return {

        async get(id: number): Promise<Product | null> {

            try {

                return await GET_BY_ID(id) || null

            } catch(error) { console.error('erro in get product on storage', error); return null}

        },

        async getMany(name?: string): Promise<Product[]> {
            
            try {

                const data = await GET_ALL()
    
                if(name) return data.filter(li => li.name.includes(name))
                
                return data

            } catch(error) { console.error('erro in get product on storage', error); return []}

        },

        async create(product: { name: string, image?: string}): Promise<Product | null> {

            try{

                const data = await GET_ALL()

                const repeatedName = data.filter(li=>li.name.includes(product.name))

                const id = new Date().getTime()

                const notRepeatedName = `${product.name}${ repeatedName.length + 1 > 1 ? ` (${repeatedName.length + 1})` : ''}`

                const newCategory = { ...product, id: id,name: notRepeatedName }

                await SET([newCategory, ...data])

                return GET_BY_ID(id)

            } catch(error) { console.error('erro in create product on storage', error); return null }

        },

        async update(id: number, product: Product): Promise<Product | null> {

            try {

                const data = await GET_ALL()
    
                await SET(data.map((e)=> e.id === id ? {...product, id: e.id} : e))
    
                return await GET_BY_ID(id)

            } catch(error) { console.error('erro in update product on storage', error); return null }

        },

        async delete(id: number): Promise<boolean> {

            try {

                const data = await GET_ALL()
    
                await SET(data.filter((e: Product)=> e.id !== id))
    
                return !(await GET_BY_ID(id)) ? true : false;

            } catch(error) { console.error('erro in delete product on storage', error); return false }


        },

        async getByName(name: string): Promise<Product[]> {
            
            try{
                
                const data = await GET_ALL()

                return data.filter(e=> e.name.includes(name))

            } catch(error) { console.error('erro in update product on storage', error); return [] }

        },

        async getByCategory(categoryId: number): Promise<Product[]> {
            
            try{
                
                const data = await GET_ALL()

                if(!data) return [];

                return data.filter(li=> li.categoryId === categoryId )

            } catch(error) { console.error('erro in getByCategory product on storage', error); return [] }

        },

    }

}

const ProductFunctions = functions();

export default ProductFunctions
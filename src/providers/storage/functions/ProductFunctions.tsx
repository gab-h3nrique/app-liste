import AsyncStorageFunctions from './AsyncStorageFunctions';

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

    const SET = (array: Product[]) => AsyncStorageFunctions.setItem(PRODUCTS, array);

    const GET_ALL = (): Product[] => AsyncStorageFunctions.getItem(PRODUCTS) || [];

    const GET_BY_ID = (id: number): Product | null => GET_ALL().find((e: Product)=> e.id === id) || null;



    return {

        get(id: number):Product | null {

            try {

                return GET_BY_ID(id) || null

            } catch(error) { console.error('erro in get product on storage', error); return null}

        },

        getMany(name?: string): Product[] {
            
            try {

                const data = GET_ALL()
    
                if(name) return data.filter(li => li.name.includes(name))
                
                return data

            } catch(error) { console.error('erro in get product on storage', error); return []}

        },

        create(product: { name: string, image?: string}): Product | null {

            try{

                const data = GET_ALL()

                const repeatedName = data.filter(li=>li.name.includes(product.name))

                const id = new Date().getTime()

                const notRepeatedName = `${product.name}${ repeatedName.length + 1 > 1 ? ` (${repeatedName.length + 1})` : ''}`

                const newCategory = { ...product, id: id,name: notRepeatedName }

                SET([newCategory, ...data])

                return GET_BY_ID(id)

            } catch(error) { console.error('erro in create product on storage', error); return null }

        },

        update(id: number, product: Product): Product | null {

            try {

                const data = GET_ALL()
    
                SET(data.map((e)=> e.id === id ? {...product, id: e.id} : e))
    
                return GET_BY_ID(id)

            } catch(error) { console.error('erro in update product on storage', error); return null }

        },

        delete(id: number): boolean {

            try {

                const data = GET_ALL()
    
                SET(data.filter((e: Product)=> e.id !== id))
    
                return !GET_BY_ID(id) ? true : false;

            } catch(error) { console.error('erro in delete product on storage', error); return false }


        },

        getByName(name: string): Product[] {
            
            try{
                
                const data = GET_ALL()

                return data.filter(e=> e.name.includes(name))

            } catch(error) { console.error('erro in update product on storage', error); return [] }

        },

        getByCategory(categoryId: number): Product[] {
            
            try{
                
                const data = GET_ALL()

                if(!data) return [];

                return data.filter(li=> li.categoryId === categoryId )

            } catch(error) { console.error('erro in getByCategory product on storage', error); return [] }

        },

    }

}

const ProductFunctions = functions();

export default ProductFunctions
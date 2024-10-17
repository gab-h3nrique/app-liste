import AsyncStorageFunctions from './AsyncStorageFunctions';

const CATEGORIES =  'CATEGORIES';

export interface Category {
    id: number;
    name: string;
    image?: string;
}


function functions() {

    const SET = (array: Category[]) => AsyncStorageFunctions.setItem(CATEGORIES, array);

    const GET_ALL = (): Category[] => AsyncStorageFunctions.getItem(CATEGORIES) || [];

    const GET_BY_ID = (id: number): Category | null => GET_ALL().find((e: Category)=> e.id === id) || null;



    return {

        get(id: number):Category | null {

            try {

                return GET_BY_ID(id) || null

            } catch(error) { console.log('erro in get category on storage', error); return null}

        },

        getMany(name?: string): Category[] {
            
            try {

                const data = GET_ALL()
    
                if(name) return data.filter(li => li.name.includes(name))
                
                return data

            } catch(error) { console.log('erro in get list on storage', error); return []}

        },

        create(category: { name: string, image?: string}): Category | null {

            try{

                const data = GET_ALL()

                const repeatedName = data.filter(li=>li.name.includes(category.name))

                const id = new Date().getTime()

                const notRepeatedName = `${category.name}${ repeatedName.length + 1 > 1 ? ` (${repeatedName.length + 1})` : ''}`

                const newCategory = { ...category, id: id,name: notRepeatedName }

                SET([newCategory, ...data])

                return GET_BY_ID(id)

            } catch(error) { console.log('erro in create category on storage', error); return null }

        },

        update(id: number, category: Category): Category | null {

            try {

                const data = GET_ALL()
    
                SET(data.map((e)=> e.id === id ? {...category, id: e.id} : e ))
    
                return GET_BY_ID(id)

            } catch(error) { console.log('erro in update category on storage', error); return null }

        },

        delete(id: number): boolean {

            try {

                const data = GET_ALL()
    
                SET(data.filter((e: Category)=> e.id !== id))
    
                return !GET_BY_ID(id) ? true : false;

            } catch(error) { console.log('erro in update delete on storage', error); return false }


        },

        getByName(name: string): Category[] {
            
            try{
                
                const data = GET_ALL()
    
                return data.filter(li=> li.name.includes(name))

            } catch(error) { console.log('erro in update category on storage', error); return [] }

        },

    }

}

const CategoryFunctions = functions();

export default CategoryFunctions;

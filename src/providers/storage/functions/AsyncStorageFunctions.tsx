import { MMKV } from 'react-native-mmkv'

export const AsyncStorage = new MMKV();

const AsyncStorageFunctions = {

    setItem: (key: string, value: any)=> {

        try {

            AsyncStorage.set(key, JSON.stringify(value));
        
        } catch (error) { 

            console.warn('Error setting data on storage')
            console.error('error setting data on storage.', error, 'key: ', key, 'value: ', value)

        }

    },

    getItem: (key: string)=> {

        try {

            const data = AsyncStorage.getString(key);
            
            return JSON.parse(data || '[]');

        
        } catch (error) { 

            console.warn('Error getting data on storage')
            console.error('error getting data on storage.', error, 'key: ', key)

        }

    },

    _clearAll: ()=> AsyncStorage.clearAll()

    
}
// const AsyncStorageFunctions = Functions()

export default AsyncStorageFunctions;


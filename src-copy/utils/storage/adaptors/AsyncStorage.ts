import AsyncStorage from '@react-native-async-storage/async-storage';

const storage = AsyncStorage;
// const storage = new MMKV();

function factory() {


    return {

        async setItem(key: string, value: any): Promise<any> {

            try {
    
                await storage.setItem(key, JSON.stringify(value));
            
            } catch (error) { 
    
                console.warn('Error setting data on storage')
                console.error('error setting data on storage.', error, 'key: ', key, 'value: ', value)
    
            }
    
        },

        async getItem(key: string): Promise<any> {

            try {
    
                const data = await storage.getItem(key);
                
                return JSON.parse(data || '[]');
    
            
            } catch (error) { 
    
                console.warn('Error getting data on storage')
                console.error('error getting data on storage.', error, 'key: ', key)
    
            }
    
        },
    
        _clearAll: async()=> await storage.clear()

    }
}


const asyncStorageAdapter = factory()

export default asyncStorageAdapter;
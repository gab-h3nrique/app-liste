
import { ThemeProvider } from './src/context/ThemeProvider';
import { UserProvider } from './src/context/UserProvider';
import Index from './src/screens/Index';
import Layout from './src/components/Layout';
import Navigator, { Stack } from './Navigator';
import ListScreen from './src/screens/lists/ListScreen';
import UserScreen from './src/screens/user/UserScreen';
import EditListScreen from './src/screens/list/EditListScreen';
import Tabs from './src/components/navigation/Tabs';
import HomeScreen from './src/screens/home/HomeScreen';
import MapScreen from './src/screens/map/MapScreen';
import CategoryScreen from './src/screens/list/category/CategoryScreen';
import ProductsScreen from './src/screens/list/product/ProductsScreen';
import QuantityScreen from './src/screens/list/quantity/QuantityScreen';
import { DataStorageProvider } from './src/context/StorageDataProvider';
import ListProvider from './src/context/ListProvider';
import EditItemScreen from './src/screens/list/editItem/EditItemScreen';
import SelectListToMap from './src/screens/map/SelectListToMap';

function App(): JSX.Element {
  
  return (
    
    <ThemeProvider>
      <DataStorageProvider>
        <UserProvider>
          <ListProvider>


            <Layout>

              <Navigator tab={Tabs}>
  
                <Stack name="HomeScreen" component={HomeScreen} />
                <Stack name="ListScreen" component={ListScreen} />
                <Stack name="SelectListToMap" component={SelectListToMap} />
                <Stack name="UserScreen" component={UserScreen} />

                <Stack name="EditListScreen" component={EditListScreen} options={{style: {zIndex: 1} }}/>
                <Stack name="CategoryScreen" component={CategoryScreen} options={{style: {zIndex: 1} }}/>
                <Stack name="ProductsScreen" component={ProductsScreen} options={{style: {zIndex: 1} }}/>
                <Stack name="QuantityScreen" component={QuantityScreen} options={{style: {zIndex: 1} }}/>
                <Stack name="EditItemScreen" component={EditItemScreen} options={{style: {zIndex: 1} }}/>
                <Stack name="MapScreen" component={MapScreen} options={{style: {zIndex: 1} }}/>

              </Navigator>

            </Layout>


          </ListProvider>
        </UserProvider>
      </DataStorageProvider>
    </ThemeProvider>

  );

}


export default App;

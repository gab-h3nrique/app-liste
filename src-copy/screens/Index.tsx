import { View, Text } from 'react-native'
import React from 'react'
import Layout from '../components/Layout'
import ListScreen from './lists/ListScreen'
import Tabs from '../components/navigation/Tabs'
import { Navigation } from '../context/navigation/NavigationProvider'
import UserScreen from './user/UserScreen'
import MapScreen from './map/MapScreen'
import EditListScreen from './list/EditListScreen'
import CategoryScreen from './list/category/CategoryScreen'
import ItensScreen from './list/itens/ProductsScreen'
import QuantityScreen from './list/quantity/QuantityScreen'
import HomeScreen from './home/HomeScreen'
import Navigator, { Stack } from '../../Navigator'

const Index = () => {

    return (


        <Layout>

            <Navigator>
                <Stack name="HomeScreen" component={HomeScreen} />
                <Stack name="ListScreen" component={ListScreen} />
                <Stack name="UserScreen" component={UserScreen} />
                <Stack name="EditListScreen" component={EditListScreen} />
            </Navigator>

        </Layout>
        

    )
}

export default Index

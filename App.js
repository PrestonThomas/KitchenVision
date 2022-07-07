import * as React from 'react';
import { Button, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import InventoryScreen from './src/screens/InventoryScreen';
import GroceryScreen from './src/screens/GroceryScreen';
import HomeScreen from './src/screens/HomeScreen';
import {useEffect} from 'react'
import { PermissionsAndroid, View, Text } from 'react-native';

const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Inventory" component={InventoryScreen} />
            <Tab.Screen name="Grocery" component={GroceryScreen} />
        </Tab.Navigator>
    );
}


export default function App() {

    const permission =()=>{
        PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA,PermissionsAndroid.INTERNET).then(result =>  { console.log("The permissions are: ", result) });    
    }

    useEffect(()=>{permission()},[])


    return (
        <NavigationContainer>
            <MyTabs />
        </NavigationContainer>
    );

}

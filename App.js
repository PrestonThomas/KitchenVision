import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import InventoryScreen from './src/screens/InventoryScreen';
import GroceryScreen from './src/screens/GroceryScreen';
import HomeScreen from './src/screens/HomeScreen';
import {useEffect} from 'react'
import { PermissionsAndroid, View, Text, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Splash from './src/components/SplashAnimate';

const Tab = createBottomTabNavigator();


function MyTabs() {
    return (
        <Tab.Navigator  screenOptions={({ route }) => ({
            tabBarButton: [
                "KITCHENVISION",
            ].includes(route.name)
                ? () => {
                    return null;
                }
                : undefined,
            })}>
            <Tab.Screen name="KITCHENVISION" component={Splash} options={{
                tabBarOptions: ({ showLabel }) => (
                    <Icon name="." showLabel={false} />
                )
            }} />

            <Tab.Screen name="Home" component={HomeScreen} options={{
                tabBarIcon: ({ color, size }) => (
                    <Icon name="home" color={color} size={size} />
                )
            }} />
            <Tab.Screen name="Inventory" component={InventoryScreen} options={{
                tabBarIcon: ({ color, size }) => (
                    <Icon name="list" color={color} size={size} />
                )
            }} />
            <Tab.Screen name="Grocery" component={GroceryScreen} options={{
                tabBarIcon: ({ color, size }) => (
                    <Icon name="shopping-cart" color={color} size={size} />
                )
            }} />
        </Tab.Navigator>
    );
}


export default function App() {

    const permission = () => {
        if (Platform.OS === 'android') {
            PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, PermissionsAndroid.INTERNET).then(result => { console.log("The permissions are: ", result) });
        } else {
            console.log("iOS Device");
        }
    };

    useEffect(() => { permission() }, [])


    return (
        <NavigationContainer>
            <MyTabs />
        </NavigationContainer>
    );

}

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
import { MenuProvider } from 'react-native-popup-menu';

const Tab = createBottomTabNavigator();


function MyTabs() {
    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarButton: [
                "KITCHENVISION",
            ].includes(route.name)
                ? () => {
                    return null;
                }
                : undefined,
            })}>
            <Tab.Screen name="KITCHENVISION" component={Splash} options={{ headerShown: false}}/>

            <Tab.Screen name="Home" component={HomeScreen} options={{headerShown: false,
                tabBarIcon: ({ color, size }) => (
                    <Icon name="home" color='orange' size={size} />
                )
            }} />
            <Tab.Screen name="Inventory" component={InventoryScreen} options={{headerShown: false,
                tabBarIcon: ({ color, size }) => (
                    <Icon name="list" color='orange' size={size} />
                ),
                tabBarOptions: {
                    style: {
                        borderWidth: 0,
                        backgroundColor: '#000000', //need change this color code as per prop
                        borderTopColor: '#000000',
                      }
                }
            }} />
            <Tab.Screen name="Grocery" component={GroceryScreen} options={{headerShown: false,
                tabBarIcon: ({ color, size }) => (
                    <Icon name="shopping-cart" color='orange' size={size} />
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
        <MenuProvider>
            <NavigationContainer>
                <MyTabs />
            </NavigationContainer>
        </MenuProvider>
    );

}

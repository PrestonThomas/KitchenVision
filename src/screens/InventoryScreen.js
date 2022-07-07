import React from 'react';
import { Text, View, Button } from 'react-native';
import scanner from '../components/Scanner';
import FAB from 'react-native-fab';
import Barcode from '../components/barcode';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

// Still working on getting the text to update/return upon camera close. Looking at async functions and promises. - Preston

const RootStack = createStackNavigator();
class InventoryScreen extends React.Component {
    render() {
        return (
            <NavigationContainer independent={true}>
                <RootStack.Navigator>
                    <RootStack.Group>
                        <RootStack.Screen name="Cat" options={{ headerShown: false }} component={HomeScreen} />
                        <RootStack.Screen name="Details" component={DetailsScreen} />
                    </RootStack.Group>
                    <RootStack.Group screenOptions={{ presentation: 'modal' }}>
                        <RootStack.Screen name="Barcode Scanner" component={BcScreenModal} />
                    </RootStack.Group>
                </RootStack.Navigator>
                <FAB buttonColor="red" iconTextColor="#FFFFFF" onClickAction={() => { scanner.onCameraPress(); }} visible={true} />
            </NavigationContainer>
        );
    }
}

function BcScreenModal({ navigation }) {
    let bc = new Barcode();
    return bc;
}

function HomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 30, color: 'black' }}>
                InventoryScreen
            </Text>
            <Button
                onPress={() => {
                    console.log(scanner.returnScannedText());
                }}
                title="Retrieve Expiry Date"
            />
            <Button
                onPress={() => navigation.navigate('Barcode Scanner')}
                title="Scan Barcode"
            />
        </View>
    );
}

function DetailsScreen() {
    return (
        <View>
            <Text>Details</Text>
        </View>
    );
}

export default InventoryScreen;

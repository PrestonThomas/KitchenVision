import React from 'react';
import { Text, View, Button } from 'react-native';
import scanner from '../components/Scanner';
import FAB from 'react-native-fab';
import Barcode from '../components/barcode';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import barcode from '../components/barcode';

// Still working on getting the text to update/return upon camera close. Looking at async functions and promises. - Preston;

let barcodeOutput;

const RootStack = createStackNavigator();
class InventoryScreen extends React.Component {
    render() {
        return (
            <NavigationContainer independent={true}>
                <RootStack.Navigator>
                    <RootStack.Group>
                        <RootStack.Screen name="Home Screen" options={{ headerShown: false }} component={HomeScreen} />
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
    // let bc = new Barcode.BarcodeScanner();
    return (
        <View style={{ flex: 1}}>
                <Barcode.BarcodeScanner/>
            <View>
                <Button
                    title="Scan Barcode"
                    onPress={() => {
                        try {
                            console.log(Barcode.output[barcode.output.length - 1]);
                            barcodeOutput = Barcode.output[barcode.output.length - 1];
                            navigation.navigate('Home Screen');
                        } catch (e) {
                            console.log(e);
                        }
                    }
                    }
                />
            </View>
        </View>
    );
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
            <Button
                // style align to the bottom of the screen
                onPress={() => console.log(barcodeOutput[0].barcodeText)}
                title="Log barcode output"
            />
        </View>
    );
}

export default InventoryScreen;

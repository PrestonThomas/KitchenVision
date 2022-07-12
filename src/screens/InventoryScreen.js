import React, { useState, useEffect } from "react";
import { Text, View, Button } from 'react-native';
import scanner from '../components/Scanner';
import FAB from 'react-native-fab';
import Barcode from '../api/barcode';
import barcode from '../api/barcode';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import NameForm from '../components/ItemDetail';
import Form from '../components/ItemDetail';

// Still working on getting the text to update/return upon camera close. Looking at async functions and promises. - Preston;

let barcodeOutput;

const RootStack = createStackNavigator();
class InventoryScreen extends React.Component {
    render() {
        return (
            <NavigationContainer independent={true}>
                <RootStack.Navigator>
                    <RootStack.Group>
                        <RootStack.Screen name="Inventory Home Screen" options={{ headerShown: false }} component={InventoryHome} />
                    </RootStack.Group>
                    <RootStack.Group screenOptions={{ presentation: 'modal' }}>
                        <RootStack.Screen name="Barcode Scanner" component={BcScreenModal} />
                    </RootStack.Group>
                    <RootStack.Group screenOptions={{ presentation: 'modal' }}>
                        <RootStack.Screen name="Item Details" component={ItemDetailsScreen} />
                    </RootStack.Group>
                </RootStack.Navigator>
                <FAB buttonColor="red" iconTextColor="#FFFFFF" onClickAction={() => { scanner.onCameraPress(); }} visible={true} />
            </NavigationContainer>
        );
    }
}

function InventoryHome({ navigation }) {
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
                            navigation.navigate('Item Details');
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

function queryItem(barcode) {
    let url = 'https://world.openfoodfacts.org/api/v0/product/' + barcode + '.json';
    return fetch(url);
}

function ItemDetailsScreen({ navigation }) {
    let nf = new NameForm();
    const [isLoading, setLoading] = useState(true);
    const [item, setItem] = useState();
    useEffect(() => {
        queryItem(barcodeOutput[0].barcodeText).then(response => response.json()).then(json => {
            setItem(json.product);
            setLoading(false);
        }
        ).catch(error => {
            console.log(error);
        }
        );
    }
    , []);
    if (isLoading) {
        return <Text style={{ fontSize: 30, color: 'black' }}>Loading...</Text>;
    }
    nf.state.value = barcodeOutput[0].barcodeText;
    nf.state.json = item;
    nf.state.img = item.image_url;
    // nf.queryItem(barcodeOutput[0].barcodeText);
    nf.handleSubmit = () => {
        console.log(item.brands);
        console.log(nf.state.value);
        console.log(nf.state.img);
        navigation.navigate('Inventory Home Screen');
    };
    return (
        nf.render()
    );
}

export default InventoryScreen;

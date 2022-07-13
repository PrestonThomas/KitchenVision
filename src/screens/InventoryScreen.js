import React, { useState, useEffect } from 'react';
import { Text, View, Button, StyleSheet,TouchableOpacity } from 'react-native';
import scanner from '../components/Scanner';
import FAB from 'react-native-fab';
import Icon from 'react-native-vector-icons/Entypo';
import Barcode from '../api/barcode';
import barcode from '../api/barcode';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import NameForm from '../components/ItemDetail';

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
        <>
        <View style={styles.container}>
            <Text style={styles.name}>Product Category</Text>
            <View style={styles.rect}>
                <View style={styles.rect2}>
                    <Text style={styles.itemsName}>Item&#39;s Name</Text>
                </View>
                <View style={styles.rect3}>
                    <View style={styles.rect4}>
                        <Text style={styles.date}>Date</Text>
                    </View>
                    <View style={styles.rect5}>
                    <TouchableOpacity style={styles.plusButton}>
                        <Text style={styles.plusText}>+</Text>
                    </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 30, color: 'black' }}>
            InventoryScreen
        </Text>
        <Button
            onPress={() => {
                console.log(scanner.returnScannedText());
            } }
            title="Retrieve Expiry Date" />
        <Button
            onPress={() => navigation.navigate('Barcode Scanner')}
            title="Scan Barcode" />
        <Button
            // style align to the bottom of the screen
            onPress={() => console.log(barcodeOutput[0].barcodeText)}
            title="Log barcode output" />
    </View></>

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

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#E6E6E6',
      width: 375,
      height: 65,
    },
    name:{
        fontSize:20,
        margin:18,
    },
    rect: {
        width: 360,
        height: 66,
        backgroundColor: 'rgba(255,255,255,1)',
        borderWidth: 1,
        borderColor: '#000000',
        flexDirection: 'row',
    },
    rect2: {
        backgroundColor: 'rgba(255,255,255,1)',
        borderWidth: 1,
        borderColor: '#000000',
        padding: 0,
        margin: 0,
        width: 155,
    },
    rect3: {
        flex: 0.5,
        backgroundColor: 'rgba(248, 248, 248,1)',
        flexDirection: 'row',
    },
    rect4: {
        backgroundColor: 'rgba(255,255,255,1)',
        borderWidth: 1,
        borderColor: '#000000',
        marginLeft: 0,
        width: 75,
    },
    rect5: {
        backgroundColor: 'rgba(255,255,255,1)',
        borderWidth: 1,
        borderColor: '#000000',
        marginLeft: 0,
        width: 128,
    },
    date: {
        top: 15,
        left: 15,
        position: 'absolute',
        fontFamily: 'roboto-regular',
        color: '#121212',
        fontSize: 22,
    },
    itemsName: {
        top: 15,
        left: 15,
        position: 'absolute',
        fontFamily: 'roboto-regular',
        color: '#121212',
        fontSize: 22,
    },
    plusButton: {
        top: 15,
        left: 15,
        width: 30,
        height: 33,
        position: 'absolute',
        backgroundColor: 'rgba(88,138,240,1)',
    },
    plusText: {
        fontFamily: 'roboto-regular',
        color: 'rgba(255,255,255,1)',
        fontSize: 25,
        marginTop: 0,
        marginLeft: 8,
        position: 'absolute',
    },
  });
export default InventoryScreen;

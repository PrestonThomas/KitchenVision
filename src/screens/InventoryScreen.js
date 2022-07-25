import React, { useState, useEffect } from 'react';
import { Text, View, Button, TouchableOpacity, ActivityIndicator, Pressable, SafeAreaView, Switch, ScrollView, Alert, RefreshControl } from 'react-native';
//import for the animation of Collapse and Expand
import * as Animatable from 'react-native-animatable';
//import for the Accordion view
import Accordion from 'react-native-collapsible/Accordion';
import Counter from 'react-native-counters';
import scanner from '../components/Scanner';
import FAB from 'react-native-fab';
import Barcode from '../api/barcode';
import barcode from '../api/barcode';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import NameForm from '../components/ItemDetail';
import dayjs from 'dayjs';
import storage from '../api/storage';
import { styles } from './styles.1';

const wait = (timeout) => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

function useForceUpdate() {
    const [value, setValue] = useState(0);
    return () => setValue(value => value + 1);
}

const onChange = (number, type) => {
    console.log(number, type) // 1, + or -
};

let invItems = storage.storage.load({ key: 'barcode', id: '8881300239206' }).then(val => { invItems = val; });

getInvItem = async () => {
    let item = await storage.storage.load({ key: 'barcode', id: '8881300239206' }).then(val => { return val; });
    return item;
}


// let CONTENT = [
//     {
//         title: 'Inventory',
//         customInnerItem: 'cat',
//     },
//     {   title: 'Expiry',
//         customInnerItem: 'Test',
//     },
// ]

let CONTENT = [
    {
        title: 'Dairy',
        customInnerItem: (
            <><View style={{ backgroundColor: '#E6E6E6', width: '100%', height: 65, }}>
                <View style={{ width: 370, height: 66, backgroundColor: 'rgba(255,255,255,1)', borderWidth: 1, borderColor: '#000000', flexDirection: 'row', }}>
                    <Text style={{ top: 15, left: 15, fontFamily: 'roboto-regular', color: '#121212', fontSize: 22, width: '70%', }}>Item&#39;s Name</Text>
                    <Text style={{ top: 15, left: 15, fontFamily: 'roboto-regular', color: '#121212', fontSize: 22, width: '30%', }}>Date</Text>
                </View>
            </View>
                <View style={{ backgroundColor: '#E6E6E6', width: '100%', height: 65, }}>
                    <View style={{ width: 370, height: 66, backgroundColor: 'rgba(255,255,255,1)', borderWidth: 1, borderColor: '#000000', flexDirection: 'row', }}>
                        <Text style={{ top: 15, left: 15, fontFamily: 'roboto-regular', color: '#121212', fontSize: 22, width: '70%', }}>Item&#39;s Name</Text>
                        <Text style={{ top: 15, left: 15, fontFamily: 'roboto-regular', color: '#121212', fontSize: 22, width: '30%', }}>Date</Text>
                    </View>
                </View></>
        ),
    },
    {
        title: 'Fridge',
        customInnerItem: (
            <View style={{ backgroundColor: '#E6E6E6', width: '100%', height: 65, }}>
                <View style={{ width: 370, height: 66, backgroundColor: 'rgba(255,255,255,1)', borderWidth: 1, borderColor: '#000000', flexDirection: 'row', }}>
                    <Text style={{ top: 15, left: 15, fontFamily: 'roboto-regular', color: '#121212', fontSize: 22, width: '70%', }}>Item&#39;s Name</Text>
                    <Text style={{ top: 15, left: 15, fontFamily: 'roboto-regular', color: '#121212', fontSize: 22, width: '30%', }}>Date</Text>
                </View>
            </View>
        ),
    },
];

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
                    <RootStack.Group presentationStyle="pageSheet" screenOptions={{ presentation: 'fullscreenModal' }}>
                        <RootStack.Screen name="Barcode Scanner" component={BcScreenModal} />
                    </RootStack.Group>
                    <RootStack.Group presentationStyle="pageSheet" screenOptions={{ presentation: 'fullscreenModal' }}>
                        <RootStack.Screen name="Item Details" component={ItemDetailsScreen} />
                    </RootStack.Group>
                </RootStack.Navigator>
            </NavigationContainer>
        );
    }
}

function InventoryHome({ navigation }) {

    const [refreshing, setRefreshing] = React.useState(false);

    const forceUpdate = useForceUpdate();

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        console.log("Refreshing")
        // load inventory items from storage
        getInvItem().then((val) => {
            CONTENT[0].customInnerItem = (<View style={{ backgroundColor: '#E6E6E6', width: '100%', height: 65, }}>
                <View style={{ width: 370, height: 66, backgroundColor: 'rgba(255,255,255,1)', borderWidth: 1, borderColor: '#000000', flexDirection: 'row', }}>
                    <Text style={{ top: 15, left: 15, fontFamily: 'roboto-regular', color: '#121212', fontSize: 22, width: '40%', }}>{val.name}</Text>
                    <Text style={{ top: 15, left: 15, fontFamily: 'roboto-regular', color: '#121212', fontSize: 22, width: '30%', }}>{val.expiry}</Text>
                    <View style={{ width: '40%', paddingVertical: 15, alignItems: 'center', }}>
                    </View>
                </View>
            </View>);
            console.log(val.expiry);
        }
        );
        wait(2000).then(() => setRefreshing(false));
    }, []);


    // Ddefault active selector
    const [activeSections, setActiveSections] = useState([]);
    // Collapsed condition for the single collapsible
    const [collapsed, setCollapsed] = useState(true);
    // MultipleSelect is for the Multiple Expand allowed
    // True: Expand multiple at a time
    // False: One can be expand at a time
    const [multipleSelect, setMultipleSelect] = useState(false);

    const toggleExpanded = () => {
        //Toggling the state of single Collapsible
        setCollapsed(!collapsed);
    };

    const setSections = (sections) => {
        //setting up a active section state
        setActiveSections(sections.includes(undefined) ? [] : sections);
    };


    const renderHeader = (section, _, isActive) => {
        //Accordion Header view
        return (
            <Animatable.View
                duration={400}
                style={[styles.header, isActive ? styles.active : styles.inactive]}
                transition="backgroundColor">
                <Text style={styles.headerText}>{section.title}</Text>
            </Animatable.View>
        );
    };

    let renderContent = (section, _, isActive) => {
        //Accordion Content view
        return (
            <Animatable.View
                duration={400}
                style={[styles.content, isActive ? styles.active : styles.inactive]}
                transition="backgroundColor">
                <Animatable.Text
                    animation={isActive ? 'bounceIn' : undefined}
                    style={{ textAlign: 'center' }}>
                    {section.customInnerItem}
                </Animatable.Text>
            </Animatable.View>
        );
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.containerA}>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh} />
                    }>
                    <View style={styles.multipleToggle}>
                        <Text style={styles.multipleToggle__title}>
                            Multiple Expand Allowed?
                        </Text>
                        <Switch
                            value={multipleSelect}
                            onValueChange={(multipleSelect) => setMultipleSelect(multipleSelect)} />
                    </View>
                    <Text style={styles.selectTitle}>
                        Please select below option to expand
                    </Text>

                    {/*Code for Accordion/Expandable List starts here*/}
                    <Accordion
                        activeSections={activeSections}
                        //for any default active section
                        sections={CONTENT}
                        //title and content of accordion
                        touchableComponent={TouchableOpacity}
                        //which type of touchable component you want
                        //It can be the following Touchables
                        //TouchableHighlight, TouchableNativeFeedback
                        //TouchableOpacity , TouchableWithoutFeedback
                        expandMultiple={multipleSelect}
                        //Do you want to expand mutiple at a time or single at a time
                        renderHeader={renderHeader}
                        //Header Component(View) to render
                        renderContent={renderContent}
                        //Content Component(View) to render
                        duration={400}
                        //Duration for Collapse and expand
                        onChange={setSections} />
                    {/*Code for Accordion/Expandable List ends here*/}
                </ScrollView>
                <Text>Pull down to Refresh</Text>
                <FAB buttonColor="red" iconTextColor="#FFFFFF" onClickAction={() => { navigation.navigate('Barcode Scanner') }} visible={true} />
            </View>
        </SafeAreaView>
    );
}

function BcScreenModal({ navigation }) {
    // let bc = new Barcode.BarcodeScanner();
    return (
        <View style={{ flex: 1 }}>
            <Barcode.BarcodeScanner />
            <View>
                <Pressable style={styles.bcScanButton} onPress={() => {
                    try {
                        if (Barcode.output[barcode.output.length - 1] !== undefined) {
                            barcodeOutput = Barcode.output[barcode.output.length - 1];
                            navigation.navigate('Item Details');
                        } else {
                            alert('No barcode detected, returning to home screen');
                            navigation.navigate('Inventory Home Screen');
                        }
                    } catch (e) {
                        console.log(e);
                        alert('No barcode detected, returning to home screen');
                        navigation.navigate('Inventory Home Screen');
                    }
                }}>
                    <Text style={styles.text}>Scan Barcode</Text>
                </Pressable>
            </View>
        </View>
    );
}

function queryItem(barcode) {
    let url = 'https://world.openfoodfacts.org/api/v0/product/' + barcode + '.json';
    return fetch(url)
}

function extractDate(string) {
    return string.match(/\d{2}\/\d{2}\/\d{2}/)[0];
}

function convertToDate(string) {
    let date = string.split('/');
    let output = dayjs(date[1] + '/' + date[0] + '/' + date[2]);
    return output.toDate();
}

function ItemDetailsScreen({ navigation }) {
    let nf = new NameForm();
    const [isLoading, setLoading] = useState(true);
    const [item, setItem] = useState();
    useEffect(() => {
        queryItem(barcodeOutput[0].barcodeText).then(response => response.json()).then(json => {
            if (json === undefined || json === null || json.status_verbose === 'product not found') {
                Alert.alert('No Entry For Item', 'Would you like to add this item manually?', [
                    {
                        text: 'Yes', onPress: () => {
                            setLoading(false);
                            setItem(json);
                            navigation.navigate('Item Details');
                        }
                    },
                    {
                        text: 'No', onPress: () => {
                            setLoading(false);
                            setItem(json);
                            navigation.navigate('Inventory Home Screen');
                        }
                    }
                ]);
            } else {
                setItem(json.product);
                setLoading(false);
            }
        }
        ).catch(error => {
            console.log(error);
        }
        );
    }
        , [navigation]);
    if (isLoading) {
        return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>;
    }
    nf.state.value = barcodeOutput[0].barcodeText;
    nf.state.json = item;
    if (item === undefined || item.image_url === undefined) {
        nf.state.img = 'https://i.imgur.com/YYIRUdf.jpeg';
    } else {
        nf.state.img = item.image_url;
    }
    nf.handleExpiry = () => {
        scanner.onCameraPress();
    };
    nf.returnExpiry = () => {
        let rawText = scanner.returnScannedText();
        let convertedDate = extractDate(rawText);
        nf.state.expiry = convertedDate;
        return nf.state.expiry;
    };
    nf.handleCancel = () => {
        navigation.navigate('Inventory Home Screen');
    };
    nf.updateName = (input) => {
        nf.state.name = input;
    };
    nf.updateCategory = (input) => {
        nf.state.category = input;
    };
    nf.handleSubmit = () => {
        console.log(item.brands);
        console.log(nf.state.value);
        console.log(nf.state.img);
        storage.storage.save({ key: 'barcode', id: nf.state.value, data: { value: nf.state.value, img: nf.state.img, expiry: nf.state.expiry, quantity: nf.state.quantity, category: nf.state.category, name: nf.state.name } });
        navigation.navigate('Inventory Home Screen');
    };
    return (
        nf.render()
    );
}

export default InventoryScreen;

import React, { useState, useEffect } from 'react';
import { Text, View, Button, TouchableOpacity, ActivityIndicator, Pressable, SafeAreaView, Switch, ScrollView, Alert, RefreshControl, LogBox, Linking } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Accordion from 'react-native-collapsible/Accordion';
import scanner from '../components/Scanner';
import FAB from 'react-native-fab';
import Barcode from '../api/barcode';
import barcode from '../api/barcode';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import NameForm from '../components/ItemDetail';
import storage from '../api/storage';
import { styles } from './screenStyles';
import { Menu, MenuOptions, MenuOption, MenuTrigger, } from 'react-native-popup-menu';
import checkExpiryChange from './GroceryScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';

LogBox.ignoreLogs(['Each child in a list should have a unique "key" prop.']);

function useForceUpdate() {
    const [value, setValue] = useState(0);
    return () => setValue(value => value + 1);
}

// let invItems = storage.storage.load({ key: 'barcode', id: '5449000000996' }).then(val => { invItems = val; });

let initialLoad = false;
export let checkChange = false;
let getInvItem = async () => {
    // let idList = storage.getAllKeys().then(keys => { idList = keys });
    let idList = await storage.getAllKeys();
    let itemArr = [];
    let drinkCount;
    let meatCount;
    let dairyCount;
    let vegCount;
    let otherCount;
    if (!initialLoad || checkChange || checkExpiryChange) {
        initialLoad = true;
        if (checkChange || checkExpiryChange) {
            for (let i = 0; i < CONTENT.length; i++) {
                CONTENT[i].title = CONTENT[i].title.replace(/\s+/g, '');
                drinkCount = 0;
                meatCount = 0;
                dairyCount = 0;
                vegCount = 0;
                otherCount = 0;
                CONTENT[i].customInnerItem = [];
            }
            console.log('Item list updated');
            checkChange = false;
        }
        console.log('Item list loaded');
        for (let i = 0; i < idList.length; i++) {
            itemArr.push(await storage.storage.load({ key: 'barcode', id: idList[i] }));
            switch (itemArr[i].category) {
                case 'Drinks':
                    // count the number of drinks in the list
                    drinkCount++;
                    CONTENT[3].title = 'Drinks 🍹' + ' (' + drinkCount + ')';
                    CONTENT[3].customInnerItem.push((
                        listItem(itemArr[i].name, itemArr[i].expiry, itemArr[i].value)
                    ));
                    break;
                case 'Meat':
                    meatCount++;
                    CONTENT[0].title = 'Meat 🍖' + ' (' + meatCount + ')';
                    CONTENT[0].customInnerItem.push((
                        listItem(itemArr[i].name, itemArr[i].expiry, itemArr[i].value)
                    ));
                    break;
                case 'Vegetables':
                    vegCount++;
                    CONTENT[2].title = 'Vegetables 🥦' + ' (' + vegCount + ')';
                    CONTENT[2].customInnerItem.push((
                        listItem(itemArr[i].name, itemArr[i].expiry, itemArr[i].value)
                    ));
                    break;
                case 'Dairy':
                    dairyCount++;
                    CONTENT[1].title = 'Dairy 🥛' + ' (' + dairyCount + ')';
                    CONTENT[1].customInnerItem.push((
                        listItem(itemArr[i].name, itemArr[i].expiry, itemArr[i].value)
                    ));
                    break;
                default:
                    otherCount++;
                    CONTENT[4].title = 'Other 🍪' + ' (' + otherCount + ')';
                    CONTENT[4].customInnerItem.push((
                        listItem(itemArr[i].name, itemArr[i].expiry, itemArr[i].value)
                    ));
                    break;
            }
        }
    }
    return itemArr;
}

// content in the collapsible list
let CONTENT = [
    {
        title: 'Meat 🍖',
        customInnerItem: [],
    },
    {
        title: 'Dairy 🥛',
        customInnerItem: [],
    },
    {
        title: 'Vegetables 🥦',
        customInnerItem: [],
    },
    {
        title: 'Drinks 🍹',
        customInnerItem: [],
    },
    {
        title: 'Other 🍪',
        customInnerItem: [],
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

//ItemContextMenu

const deletePrompt = (itemKey) => {
    Alert.alert(
        'Delete Item',
        'Are you sure you want to delete this item?',
        [
            { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
            { text: 'OK', onPress: () => storage.deleteItem(itemKey).then(checkChange = true) },
        ],
        { cancelable: false }
    );
};

const infoPrompt = (itemKey) => {
    // retrieve item from storage using itemKey
    let itemInfo = storage.storage.load({ key: 'barcode', id: itemKey }).then(val => { itemInfo = val; });
    storage.wait(100).then(() => {
        Alert.alert(
            'Item Information',
            'Item Name: ' + itemInfo.name + '\n' + 'Expiry: ' + itemInfo.expiry + '\n' + 'Barcode: ' + itemInfo.value + '\n' + 'Category: ' + itemInfo.category + '\n' + 'Quantity: ' + itemInfo.quantity,
            [
                { text: 'OK' },
            ],
            { cancelable: false }
        );
    });
};

const ItemPopup = (itemKey) => {
    return (
        <Menu onSelect={value => alert(`Selected number: ${value}`)}>
            <MenuTrigger text="Select option" customStyles={{
                TriggerTouchableComponent: Button,
                triggerTouchable: { title:'' },
            }} >
                <Icon name="home" color='orange' size={20}/>
            </MenuTrigger>
            <MenuOptions>
                <MenuOption onSelect={() => infoPrompt(itemKey.itemKey.itemKey)} text="More info" />
                <MenuOption value={2} onSelect={() => Linking.openURL('https://world.openfoodfacts.org/product/' + itemKey.itemKey.itemKey)} text="Nutrition Facts"/>
                <MenuOption value={3} onSelect={() => deletePrompt(itemKey.itemKey.itemKey)}>
                    <Text style={{ color: 'red' }}>Delete Item</Text>
                </MenuOption>
            </MenuOptions>
        </Menu>
    );
};

//collapsible list items function
function listItem(itemName, itemExpiry, itemKey) {
    return <><View>
        <View style={styles.contentItemContainer}>
            <View style={styles.contentBtnContainer}>
                {/* <TouchableOpacity onPress={ItemPopup.MenuTrigger}>
                    <Icon name="magnify" style={styles.contentIcon} />
                </TouchableOpacity> */}
                <ItemPopup itemKey={{itemKey}} />
            </View>
            <Text key={itemKey} style={styles.contentItem}>{itemName} --- {itemExpiry}</Text>
            {/* <Text style={{ top: 15, left: 15, fontFamily: 'roboto-regular', color: '#121212', fontSize: 18, width: '40%', }}>{itemExpiry}</Text> */}
        </View>
    </View></>;
}

function InventoryHome({ navigation }) {
    const [refreshing, setRefreshing] = React.useState(false);

    const forceUpdate = useForceUpdate();

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        console.log('Refreshing')
        // load inventory items from storage
        getInvItem().then((val) => {

        }
        );
        storage.wait(1000).then(() => setRefreshing(false));
    }, []);


    // Ddefault active selector
    const [activeSections, setActiveSections] = useState([]);
    // Collapsed condition for the single collapsible
    const [collapsed, setCollapsed] = useState(true);
    // MultipleSelect is for the Multiple Expand allowed
    // Expand multiple at a time (True)
    // One can be expand at a time (False)
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
        //category name of the items in the inventory list
        //such as (Meat, Dairy, Vegetables, Drinks, Other)
        return (
            <Animatable.View
                duration={400}
                style={[styles.categoryTitle, isActive ? styles.active : styles.inactive]}
                transition="backgroundColor">
                <Text style={styles.categoryTitleText}>{section.title}</Text>
            </Animatable.View>
        );
    };

    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        getInvItem().then((val) => {

        }
        );
        storage.wait(100).then(() => setLoading(false));
    }
        , [navigation]);
    if (isLoading) {
        return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>;
    }

    let renderContent = (section, _, isActive) => {
        //Accordion Content view
        //content inside the collapsible list
        //name of the items and date of expiry date
        return (
            <Animatable.View
                duration={400}
                // style={[styles.inventoryListcontent, isActive ? styles.active : styles.inactive]}
                transition="backgroundColor">
                <Animatable.Text
                    animation={isActive ? 'bounceIn' : undefined}
                    style={styles.contentContainer}>
                    {section.customInnerItem}
                </Animatable.Text>
            </Animatable.View>
        );
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.containerA}>
                <View>
                    <Animatable.Text
                        animation="bounceInUp"
                        easing="ease-in"
                        delay={50}
                        direction="alternate"
                        style={styles.inventoryPageTitle}>Inventory List
                    </Animatable.Text>
                    <View style={styles.multipleToggle}>
                        <Text style={styles.multipleToggle__title}>
                            Allow Multiple Expansions
                        </Text>
                        <Switch
                            value={multipleSelect}
                            onValueChange={(multipleSelect) => setMultipleSelect(multipleSelect)} />
                    </View>
                    <Text style={styles.functionGuide}>
                        Tap to Expand Categories
                    </Text>
                    <Text style={styles.functionGuide}>
                        Pull down to Refresh Inventory
                    </Text>
                </View>
                <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh} />} 
                style={{backgroundColor:'rgba(255,150,79, 0.4)'}}>
                    <View style={{paddingBottom:100}}>
                        <View style={styles.inventoryscreenSectionBreakTop}>
                            <Text
                            style={styles.inventoryscreenBreadPos}>🍞🍞🍞🍞🍞🍞🍞🍞🍞</Text>
                        </View>

                        {/*Accordion/Expandable List*/}
                        <Accordion
                            activeSections={activeSections}
                            sections={CONTENT}
                            touchableComponent={TouchableOpacity}
                            expandMultiple={multipleSelect}
                            renderHeader={renderHeader}
                            renderContent={renderContent}
                            //Duration for Collapse and expand
                            duration={400}
                            onChange={setSections} />
                    </View>
                </ScrollView>
                {/* <Button
                    title="Log Storage output"
                    color="rgba(104,102,89,255)"
                    // style align to the bottom of the screen
                    onPress={() => console.log(CONTENT)}/>
                <Button
                    title="Clear Storage" 
                    color="rgba(104,102,89,255)"
                    // style align to the bottom of the screen
                    onPress={() => console.log(storage.storage.clearMap())}/>
                <Button
                    title="Log stored barcodes"
                    color="rgba(104,102,89,255)"
                    onPress={() =>
                        storage.getAllKeys().then(keys => {
                            console.log(keys);
                        }
                        ).catch(err => {
                            console.log(err);
                        }
                        )
                    }/> */}

                {/* float button at the right button 
                add new items button */}
                <FAB buttonColor="red" iconTextColor="#FFFFFF" onClickAction={() => { navigation.navigate('Barcode Scanner') }} visible={true} />
            </View>
        </SafeAreaView>
    );
}

//scan barcode pop-up page code
function BcScreenModal({ navigation }) {
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
                    <Text style={styles.bcScanButtonText}>Scan Barcode</Text>
                </Pressable>
            </View>
        </View>
    );
}

function queryItem(barcode) {
    let url = 'https://world.openfoodfacts.org/api/v0/product/' + barcode + '.json';
    return fetch(url);
}

function extractDate(string) {
    console.log('extractDate: ' + string);
    return string.match(/\d{2}\/\d{2}\/\d{2}/)[0];
}

function formatDate(string) {
    //format date to yy/mm/dd
    console.log('formatDate: ' + string);
    return string.split('/').reverse().join('/');
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
                        },
                    },
                    {
                        text: 'No', onPress: () => {
                            setLoading(false);
                            setItem(json);
                            navigation.navigate('Inventory Home Screen');
                        },
                    },
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
    if (item === undefined || item.image_url === undefined || item.product_name === undefined) {
        nf.state.img = 'https://i.imgur.com/YYIRUdf.jpeg';
    } else {
        nf.state.img = item.image_url;
        nf.state.name = item.product_name;
    }
    nf.handleExpiry = () => {
        let scannedText;
        scanner.onCameraPress(() => {
        }).then(data => {
            scanner.returnScannedText().then(text => {
                console.log(text)
                scannedText = text;
                if (scannedText !== 'No text found') {
                    let rawText = scannedText;
                    let convertedDate = extractDate(rawText);
                    nf.state.expiry = formatDate(convertedDate);
                    Alert.alert('Expiry Date', 'Expiry date set to ' + nf.state.expiry);
                    console.log("Expiry:" + nf.state.expiry);
                    return nf.state.expiry;
                } else {
                    Alert.alert('No Expiry Date Detected', 'Please scan the expiry date of the item or enter it manually');
                }
            }).catch(error => {
                console.log(error);
            }
            );
        }).catch(error => {
            console.log(error);
        }
        );
        // scannedText = scanner.returnScannedText();
        console.log(scanner.returnScannedText());

    };
    nf.returnExpiry = () => {
        Alert.alert('Expiry Date', 'Expiry date set to ' + nf.state.expiry);

    };
    nf.handleCancel = () => {
        navigation.navigate('Inventory Home Screen');
    };
    nf.updateName = (input) => {
        nf.state.name = input;
    };
    nf.pullName = () => {
        console.log(nf.state.json.product_name);
        nf.state.name = nf.state.json.product_name;
    };
    nf.handleSubmit = () => {
        console.log(item.brands);
        console.log(nf.state.value);
        console.log(nf.state.img);
        console.log(nf.state.category);
        console.log(nf.state.quantity);
        checkChange = true;
        if (nf.validateDate(nf.state.expiry)) {
            storage.storage.save({ key: 'barcode', id: nf.state.value, data: { value: nf.state.value, img: nf.state.img, expiry: nf.state.expiry, quantity: nf.state.quantity, category: nf.state.category, name: nf.state.name } });
            navigation.navigate('Inventory Home Screen');
        } else {
            Alert.alert('Invalid Expiry Date', 'Please enter a valid expiry date');
        }
    };
    return (
        nf.render()
    );
}

export default InventoryScreen;

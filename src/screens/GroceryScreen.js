import React, { useState, useEffect } from 'react';
import { Text, View, Button, TouchableOpacity, ActivityIndicator, SafeAreaView, ScrollView, Alert, RefreshControl } from 'react-native';
//import for the animation of Collapse and Expand
import * as Animatable from 'react-native-animatable';
//import for the Accordion view
import Accordion from 'react-native-collapsible/Accordion';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { styles } from './screenStyles';
import storage from '../api/storage';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import Dialog from 'react-native-dialog';
import TextInputMask from 'react-native-text-input-mask';
import NumericInput from 'react-native-numeric-input';
import checkChange from './InventoryScreen';

let dateToday = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    // format as dd-mm-yy
    // today = dd + '/' + mm + '/' + String(yyyy).substring(2);
    today = yyyy + '-' + mm + '-' + dd;
    // console.log(today);
    return Date.parse(String(today));
};

export let checkExpiryChange = false;
let initialLoad = false;
let getInvItem = async () => {
    let itemArr = [];
    dateToday();
    let expiredCount;
    let nearExpiryCount;
    let idList = await storage.getAllKeys();
    if (!initialLoad || checkExpiryChange || checkChange) {
        initialLoad = true;
        if (checkExpiryChange || checkChange) {
            for (let i = 0; i < CONTENT.length; i++) {
                CONTENT[i].title = CONTENT[i].title.replace(/\s+/g, '');
                expiredCount = 0;
                nearExpiryCount = 0;
                CONTENT[i].customInnerItem = [];
            }
            console.log('Grocery list updated');
            checkExpiryChange = false;
        }
        console.log('Grocery list loaded');
        for (let i = 0; i < idList.length; i++) {
            itemArr.push(await storage.storage.load({ key: 'barcode', id: idList[i] }));
            // compare the date of the item to the date of the current day
            if (Date.parse(20 + itemArr[i].expiry) < dateToday()) {
                // itemArr[i].expired = true;
                console.log('This item has expired: ' + itemArr[i].name + ' on ' + itemArr[i].expiry);
                // CONTENT[0].customInnerItem.push(itemArr[i].name + ' on ' + itemArr[i].expiry + '\n');
                expiredCount++;
                CONTENT[0].title = 'Expired ⛔ (' + expiredCount + ')';
                CONTENT[0].customInnerItem.push(listItem(itemArr[i].name, itemArr[i].expiry, idList[i]));
            }
            // Else if the item is 3 days or less from expiry, add a warning to the item
            else if (Date.parse(20 + itemArr[i].expiry) - dateToday() < 2592000000) {
                // itemArr[i].warning = true;
                console.log('This item is about to expire: ' + itemArr[i].name + ' on ' + itemArr[i].expiry);
                // CONTENT[1].customInnerItem.push(itemArr[i].name + ' on ' + itemArr[i].expiry + '\n');
                nearExpiryCount++;
                CONTENT[1].title = 'Near Expiry ⚠️ (' + nearExpiryCount + ')';
                CONTENT[1].customInnerItem.push(listItem(itemArr[i].name, itemArr[i].expiry, idList[i]));
            }
        }
        console.log(dateToday());
        console.log(Date.parse(20 + itemArr[0].expiry));
    }
};

const deletePrompt = (itemKey) => {
    Alert.alert(
        'Delete Item',
        'Are you sure you want to delete this item?',
        [
            { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
            { text: 'OK', onPress: () => storage.deleteItem(itemKey).then(checkExpiryChange = true) },
        ],
        { cancelable: false }
    );
};

const infoPrompt = (itemKey) => {
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
    const [visible, setVisible] = useState(false);
    let updatedInfo = {expiry: '', quantity: ''};
    const showDialog = () => {
        setVisible(true);
    };
    const handleCancel = () => {
        setVisible(false);
    };
    const handleUpdate = () => {
        console.log(updatedInfo);
        let itemInfo = storage.storage.load({ key: 'barcode', id: itemKey.itemKey.itemKey }).then(val => { itemInfo = val; });
        storage.wait(100).then(() => {
            itemInfo.expiry = updatedInfo.expiry;
            itemInfo.quantity = updatedInfo.quantity;
            console.log(itemInfo);
            storage.storage.save({ key: 'barcode', id: itemKey.itemKey.itemKey, data: itemInfo }).then(() => {
                checkExpiryChange = true;
                setVisible(false);
            }).catch(err => {
                console.log(err);
            }
            );
        });
        setVisible(false);
    };
    return (
        <Menu>
            <MenuTrigger text="Select option" customStyles={{
                TriggerTouchableComponent: Button,
                triggerTouchable: { title: '' },
            }} />
            <MenuOptions>
                <MenuOption value={1} onSelect={() => infoPrompt(itemKey.itemKey.itemKey)} text="More info" />
                <MenuOption value={2} onSelect={() => {showDialog()}} text="Modify" />
                <MenuOption value={3} onSelect={() => deletePrompt(itemKey.itemKey.itemKey)}>
                    <Text style={{ color: 'red' }}>Delete Item</Text>
                </MenuOption>
            </MenuOptions>
            <View style={styles.container}>
                <Dialog.Container visible={visible}>
                    <Dialog.Title>Modify Item</Dialog.Title>
                    <Dialog.Description>
                        Please enter the new quantity and expiry date for this item.
                    </Dialog.Description>
                    <View style={[styles.inputContainer]}>
                        <NumericInput
                            onChange={value => { updatedInfo.quantity = value; }}
                            rounded
                            valueType="real"
                            minValue={1}
                            iconStyle={{ color: 'black' }}
                            rightButtonBackgroundColor="#EA3788"
                            leftButtonBackgroundColor="#E56B70" />
                    </View>
                    <View style={[styles.inputContainer]}>
                        <TextInputMask
                            placeholder="(YY/MM/DD)"
                            onChangeText={(text) => { updatedInfo.expiry = text; }}
                            // value={this.state.expiry}
                            mask={'[00]/[00]/[00]'}
                            keyboardType="numeric"
                        />
                    </View>
                    <Dialog.Button label="Cancel" onPress={handleCancel} />
                    <Dialog.Button label="Update" onPress={handleUpdate} />
                </Dialog.Container>
            </View>
        </Menu>
    );
};

function listItem(itemName, itemExpiry, itemKey) {
    return <><View>
        <View style={styles.contentItemContainer}>
            <View style={styles.contentBtnContainer}>
                <ItemPopup itemKey={{itemKey}} />
            </View>
            <Text key={itemKey} style={styles.contentItem}>{itemName} --- {itemExpiry}</Text>
        </View>
    </View></>;
}

const RootStack = createStackNavigator();
class GroceryScreen extends React.Component {
    render() {
        return (
            <NavigationContainer independent={true}>
                <RootStack.Navigator>
                    <RootStack.Group>
                        <RootStack.Screen name="Grocery Home Screen" options={{ headerShown: false }} component={GroceryHome} />
                    </RootStack.Group>
                </RootStack.Navigator>
            </NavigationContainer>
        );
    }
}
let CONTENT = [
    {
        title: 'Expired ⛔',
        customInnerItem: [],
    },
    {   title: 'Near Expiry ⚠️',
        customInnerItem: [],
    },
];

function GroceryHome({ navigation }) {
    const [refreshing, setRefreshing] = React.useState(false);
    const [activeSections, setActiveSections] = useState([]);
    const [collapsed, setCollapsed] = useState(true);
    const [multipleSelect, setMultipleSelect] = useState(false);
    const [isLoading, setLoading] = useState(true);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        console.log('Refreshing')
        // load inventory items from storage
        getInvItem().then((val) => {

        }
        );
        storage.wait(100).then(() => setRefreshing(false));
    }, []);

    useEffect(() => {
        getInvItem().then((val) => {
            // console.log(val[0].category);
        }
        );
        storage.wait(100).then(() => setLoading(false));
    }
        , [navigation]);
    if (isLoading) {
        return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>;
    };

    const toggleExpanded = () => {
        //Toggling the state of single Collapsible
        setCollapsed(!collapsed);
    };

    const setSections = (sections) => {
        //setting up a active section state
        setActiveSections(sections.includes(undefined) ? [] : sections);
    };

    const renderHeader = (section, _, isActive) => {
        //Accordion Header View
        return (
            <Animatable.View
            duration={400}
            style={[styles.categoryTitle, isActive ? styles.active :styles.inactive]}
            transition ="backgroundColor">
                <Text style = {styles.categoryTitleText} > {section.title}</Text>
            </Animatable.View>
        );
    };

    const renderContent = (section, _, isActive) => {
        //Accordion Content View
        return (
            <Animatable.View
                duration={400}
                style={[styles.content, isActive ? styles.active : styles.inactive]}
                transition="backgroundColor">
                <Animatable.Text
                    animation={isActive ? 'bounceIn' : undefined}
                    style={styles.customInnerItem}>
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
                            style={styles.groceryPageTitle}>Grocery List
                        </Animatable.Text>
                        <Text style={styles.functionGuide}>
                        Tap to Expand Categories
                        </Text>
                        <Text style={styles.functionGuide}>
                        Pull down to Refresh Grocery
                        </Text>
                        </View>

                    <ScrollView 
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh} />}
                            style={{backgroundColor:'rgba(255,150,79, 0.4)'}}>  
                    <View>
                    <View style={styles.groceryscreenSectionBreakTop}>
                        <Text
                        style={styles.groceryscreenBreadPos}>🍞🍞🍞🍞🍞🍞🍞🍞🍞</Text>
                    </View>

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
                    </View>
               </ScrollView>
            </View>
        </SafeAreaView>
    )
}


export default GroceryScreen;

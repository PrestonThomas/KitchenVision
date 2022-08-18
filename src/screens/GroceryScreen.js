import { useNavigationBuilder } from '@react-navigation/core';
import React, { useState, useEffect } from 'react';
import { Text, View, Button, StyleSheet, TouchableOpacity, ActivityIndicator, Pressable, SafeAreaView, Switch, ScrollView, Alert, TextInputComponent, RefreshControl } from 'react-native';
//import for the animation of Collapse and Expand
import * as Animatable from 'react-native-animatable';
//import for the Accordion view
import Accordion from 'react-native-collapsible/Accordion';
import Counter from 'react-native-counters';
import FAB from 'react-native-fab';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';
import { styles } from './screenStyles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import storage from '../api/storage';

let dateToday = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    // format as dd-mm-yy
    // today = dd + '/' + mm + '/' + String(yyyy).substring(2);
    today = yyyy + '-' + mm + '-' + dd;
    console.log(today);
    return Date.parse(String(today));
};

let initialLoad = false;
let getInvItem = async () => {
    let itemArr = [];
    dateToday();
    let idList = await storage.getAllKeys();
    if (!initialLoad) {
        for (let i = 0; i < idList.length; i++) {
            itemArr.push(await storage.storage.load({ key: 'barcode', id: idList[i] }));
            // compare the date of the item to the date of the current day
            if (Date.parse(20 + itemArr[i].expiry) < dateToday()) {
                // itemArr[i].expired = true;
                console.log("This item has expired: " + itemArr[i].name + " on " + itemArr[i].expiry);
            }
        }
        console.log(dateToday());
        console.log(Date.parse(20 + itemArr[0].expiry));
    }
};

const wait = (timeout) => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

function useForceUpdate() {
    const [value, setValue] = useState(0);
    return () => setValue(value => value + 1);
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
                    <RootStack.Group presentationStyle="pageSheet" screenOptions={{ presentation: 'fullscreenModal' }}>
                        <RootStack.Screen name="Add New Item" component={AddNewItem} />
                    </RootStack.Group>
                    {/* <RootStack.Group presentationStyle="pageSheet" screenOptions={{ presentation: 'fullscreenModal' }}>
                        <RootStack.Screen name="Item Details" component={ItemDetailsScreen} />
                    </RootStack.Group> */}
                </RootStack.Navigator>
            </NavigationContainer>
        );
    }
}
let CONTENT = [
    {
        title: 'Expired',
        customInnerItem: [],
    },
];

function GroceryHome({ navigation }) {
    const [refreshing, setRefreshing] = React.useState(false);
    const [activeSections, setActiveSections] = useState([]);
    const [collapsed, setCollapsed] = useState(true);
    const [multipleSelect, setMultipleSelect] = useState(false);
    const [isLoading, setLoading] = useState(true);

    const forceUpdate = useForceUpdate();

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        console.log('Refreshing')
        // load inventory items from storage
        // getInvItem().then((val) => {
            
        // }
        // );
        storage.wait(1000).then(() => setRefreshing(false));
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
                        <Animatable.Text
                            animation="bounceInUp"
                            easing="ease-in"
                            delay={50}
                            direction="alternate"
                            style={styles.groceryPageTitle}>Grocery List
                        </Animatable.Text>

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
                </ScrollView>
                <FAB buttonColor="red" iconTextColor="#FFFFFF" onClickAction={() => { navigation.navigate('Add New Item') }} visible={true} />
            </View>
        </SafeAreaView>
    )
}


// Add New Item function 
function AddNewItem({ navigation }) {
    const [items, setItems] = useState([
        { itemName: "item1", quantity: 1, isSelected: false },
    ]);

    const [inputValue, setInputValue] = useState('');
    const [totalItemCount, setTotalItemCount] = useState(0);


    const handleAddButtonClick = () => {
        const newItem = {
            newItem: inputValue,
            quantity: 1,
            isSelected: false,
        };

        const newItems = [...items, newItem];

        setItems(newItems);
        setInputValue(''),
            calculateTotal();
    };

    const handleQuantityIncrease = (index) => {
        const newItems = [...items];
        newItems[index].quantity++;
        setItems(newItems);
        calculateTotal();
    };

    const handleQuantityDecrease = (index) => {
        const newItems = [...items];
        newItems[index].quantity--;
        setItems(newItems);
        calculateTotal();
    };

    const toggleComplete = (index) => {
        const newItems = [...items];
        newItems[index].isSelected = !newItems[index].isSelected;
        setItems(newItems);
    }

    const calculateTotal = () => {
        const totalItemCount = items.reduce((total, item) => {
            return total + item.quantity;
        }, 0);
        setTotalItemCount(totalItemCount);
    };

    return (
        <View style={styles.appBackground}>
            <View style={styles.addItemBox}>
                <TextInput value={inputValue} onChange={(event) => setInputValue(event.target.value)} placeholder='Add an item...' />

                <Icon name='add' onClick={() => handleAddButtonClick()} />
            </View>
        </View>

    )
}


export default GroceryScreen;
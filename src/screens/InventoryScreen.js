import React, { useState, useEffect } from 'react';
import { Text, View, Button, StyleSheet,TouchableOpacity, ActivityIndicator, Pressable,SafeAreaView,Switch, ScrollView } from 'react-native';
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

// Still working on getting the text to update/return upon camera close. Looking at async functions and promises. - Preston;

// counter button onchange function
const onChange = (number,type) => {
    console.log(number, type) // 1, + or -
};

//Dummy content to show
//You can also use dynamic data by calling web service
const CONTENT = [
    {
        title: 'Dairy',
        customInnerItem: (
                <><View style={{ backgroundColor: '#E6E6E6', width: '100%', height: 65, }}>
                    <View style={{ width: 370, height: 66, backgroundColor: 'rgba(255,255,255,1)', borderWidth: 1, borderColor: '#000000', flexDirection: 'row', }}>
                        <Text style={{ top: 15, left: 15, fontFamily: 'roboto-regular', color: '#121212', fontSize: 22, width: '40%', }}>Item&#39;s Name</Text>
                        <Text style={{ top: 15, left: 15, fontFamily: 'roboto-regular', color: '#121212', fontSize: 22, width: '20%', }}>Date</Text>
                        <View style={{ width: '40%', paddingVertical: 15, alignItems: 'center', }}>
                            <Counter start={1} onChange={onChange} />
                        </View>
                    </View>
                </View>
                <View style={{ backgroundColor: '#E6E6E6', width: '100%', height: 65, }}>
                    <View style={{ width: 370, height: 66, backgroundColor: 'rgba(255,255,255,1)', borderWidth: 1, borderColor: '#000000', flexDirection: 'row', }}>
                        <Text style={{ top: 15, left: 15, fontFamily: 'roboto-regular', color: '#121212', fontSize: 22, width: '40%', }}>Item&#39;s Name</Text>
                        <Text style={{ top: 15, left: 15, fontFamily: 'roboto-regular', color: '#121212', fontSize: 22, width: '20%', }}>Date</Text>
                        <View style={{ width: '40%', paddingVertical: 15, alignItems: 'center', }}>
                            <Counter start={1} onChange={onChange} />
                        </View>
                    </View>
                </View></>
          ),
        // content:
        // 'The following terms and conditions, together with any referenced documents (collectively, "Terms of Use") form a legal agreement between you and your employer, employees, agents, contractors and any other entity on whose behalf you accept these terms (collectively, “you” and “your”), and ServiceNow, Inc. (“ServiceNow,” “we,” “us” and “our”).',
    },
    {
        title: 'Fridge',
        customInnerItem: (
            <View style={{backgroundColor: '#E6E6E6', width: '100%',height: 65,}}>
                <View style={{width: 370,height: 66,backgroundColor: 'rgba(255,255,255,1)',borderWidth: 1,borderColor: '#000000',flexDirection: 'row',}}>
                    <Text style={{ top: 15,left: 15,fontFamily: 'roboto-regular',color: '#121212',fontSize: 22,width:'40%',}}>Item&#39;s Name</Text>
                    <Text style={{ top: 15,left: 15,fontFamily: 'roboto-regular',color: '#121212',fontSize: 22,width:'20%',}}>Date</Text>
                    <View style={{ width:'40%',paddingVertical: 15, alignItems: 'center',}}>
                        <Counter start={1} onChange={onChange} />
                    </View>
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

    const renderContent = (section, _, isActive) => {
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
                    <ScrollView>
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
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 30, color: 'black' }}>
                                InventoryScreen
                            </Text>
                            <Button
                                onPress={() => {
                                    console.log(scanner.returnScannedText());
                                } }
                                title="Retrieve Expiry Date" />
                            {/* <Button
                                onPress={() => navigation.navigate('Barcode Scanner')}
                                title="Scan Barcode" /> */}
                            <Button
                                // style align to the bottom of the screen
                                onPress={() => storage.load({key:"9002490100070"}).then(val => {console.log(val)})}
                                title="Log Storage output" />
                        </View>
                    </ScrollView>
                    <FAB buttonColor="red" iconTextColor="#FFFFFF" onClickAction={() => { navigation.navigate('Barcode Scanner') }} visible={true} />
                </View>
            </SafeAreaView>

    );
}

function BcScreenModal({ navigation }) {
    // let bc = new Barcode.BarcodeScanner();
    return (
        <View style={{ flex: 1}}>
                <Barcode.BarcodeScanner/>
            <View>
                <Pressable style={styles.bcScanButton} onPress={() => {
                    try {
                        if(Barcode.output[barcode.output.length - 1] !== undefined) {
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
    return fetch(url);
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
        return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#0000ff" />
            </View>;
    }
    nf.state.value = barcodeOutput[0].barcodeText;
    nf.state.json = item;
    nf.state.img = item.image_url;
    // nf.queryItem(barcodeOutput[0].barcodeText);
    nf.handleExpiry = () => {
        scanner.onCameraPress();
    };
    nf.returnExpiry = () => {
        let rawText = scanner.returnScannedText();
        let convertedDate = extractDate(rawText);
        nf.state.expiry = convertedDate;
        return nf.state.expiry;
    };
    nf.handleSubmit = () => {
        console.log(item.brands);
        console.log(nf.state.value);
        console.log(nf.state.img);
        storage.save({key: nf.state.value, data:{ value: nf.state.value, img: nf.state.img, expiry: nf.state.expiry, brands: item.brands, category: item.categories_hierarchy[0], quantity: nf.state.quantity }});
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
    date: {
        top: 15,
        left: 15,
        fontFamily: 'roboto-regular',
        color: '#121212',
        fontSize: 22,
        width:'20%',
    },
    itemsName: {
        top: 15,
        left: 15,
        fontFamily: 'roboto-regular',
        color: '#121212',
        fontSize: 22,
        width:'40%',
    },
    inputBox: {
        width:'40%',
    },
    plusButton: {
        margin:15,
        width: '25%',
        position: 'absolute',
        backgroundColor: 'rgba(88,138,240,1)',
    },
    minusButton: {
        margin:15,
        width: '25%',
        position:'relative',
        backgroundColor: 'rgba(88,138,240,1)',
        alignSelf:'flex-end',
    },
    bcScanButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        elevation: 3,
        backgroundColor: 'blue',
        height: 50,
      },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
      },

    // collapsible list styling
    containerA: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        paddingTop: '5%',
    },
    header: {
        backgroundColor: '#F5FCFF',
        padding: 10,
    },
    headerText: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '500',
    },
    content: {
        padding: 20,
        backgroundColor: '#fff',
    },
    active: {
        backgroundColor: 'rgba(255,255,255,1)',
    },
    inactive: {
        backgroundColor: 'rgba(245,252,255,1)',
    },
    selectTitle: {
        fontSize: 14,
        fontWeight: '500',
        padding: 10,
        textAlign: 'center',
    },
    multipleToggle: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 30,
        alignItems: 'center',
    },
    multipleToggle__title: {
        fontSize: 16,
        marginRight: 8,
    },
  });
export default InventoryScreen;

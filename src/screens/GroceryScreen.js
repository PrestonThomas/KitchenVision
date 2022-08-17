import { useNavigationBuilder } from '@react-navigation/core';
import React, { useState, useEffect } from 'react';
import { Text, View, Button, StyleSheet,TouchableOpacity, ActivityIndicator, Pressable,SafeAreaView,Switch, ScrollView, Alert, RefreshControl } from 'react-native';
//import for the animation of Collapse and Expand
import * as Animatable from 'react-native-animatable';
//import for the Accordion view
import Accordion from 'react-native-collapsible/Accordion';
import Counter from 'react-native-counters';
// import QuantityFormLabel from '../components/QuantityFormLabel';
import scanner from '../components/Scanner';
import FAB from 'react-native-fab';
import Barcode from '../api/barcode';
import barcode from '../api/barcode';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import NameForm from '../components/ItemDetail';
import dayjs from 'dayjs';
import storage from '../api/storage';
import { TextInput } from 'react-native-gesture-handler';
import { styles } from './screenStyles';
import react from 'react';
import { style } from 'react-native-mock-render/build/propTypes/ViewPropTypes';
import Icon from 'react-native-vector-icons/MaterialIcons';


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
                    {/* <RootStack.Group presentationStyle="pageSheet" screenOptions={{ presentation: 'fullscreenModal' }}>
                        <RootStack.Screen name="Item Details" component={ItemDetailsScreen} />
                    </RootStack.Group> */}
                </RootStack.Navigator>
            </NavigationContainer>
        );
    }
}
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
                <><View style={{ backgroundColor: '#E6E6E6', width: '100%', height: 70, }}>
                    <View style={{ width: 370, height: 66, backgroundColor: 'rgba(255,255,255,1)', borderWidth: 1, borderColor: '#000000', flexDirection: 'row', }}>
                        <Text style={{ top: 15, left: 15, fontFamily: 'roboto-regular', color: '#121212', fontSize: 22, width: '40%', }}>Item&#39;s Name</Text>
                        <Text style={{ top: 15, left: 15, fontFamily: 'roboto-regular', color: '#121212', fontSize: 22, width: '20%', }}>Date</Text>
                        <Text style={{ top: 15, left: 15, fontFamily: 'roboto-regular', color: '#121212', fontSize: 22, width: '40%', }}>Quantity</Text>
                        {/* <View style={{ width:'40%',paddingVertical: 15, alignItems: 'center',}}>
                            <Counter start={1} onChange={onChange} />
                        </View> */}
                    </View>
                </View>
                <View style={{ backgroundColor: '#E6E6E6', width: '100%', height: 70, }}>
                    <View style={{ width: 370, height: 66, backgroundColor: 'rgba(255,255,255,1)', borderWidth: 1, borderColor: '#000000', flexDirection: 'row', }}>
                        <Text style={{ top: 15, left: 15, fontFamily: 'roboto-regular', color: '#121212', fontSize: 22, width: '40%', }}>Item&#39;s Name</Text>
                        <Text style={{ top: 15, left: 15, fontFamily: 'roboto-regular', color: '#121212', fontSize: 22, width: '20%', }}>Date</Text>
                        <Text style={{ top: 15, left: 15, fontFamily: 'roboto-regular', color: '#121212', fontSize: 22, width: '50%', }}>Quantity</Text>
                        {/* <View style={{ width:'40%',paddingVertical: 15, alignItems: 'center',}}> 
                            <Counter start={1} onChange={onChange} />
                        </View> */}
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
                    <Text style={{ top: 15, left: 15, fontFamily: 'roboto-regular', color: '#121212', fontSize: 22, width: '50%', }}>Quantity</Text>
                    {/* <View style={{ width:'40%',paddingVertical: 15, alignItems: 'center',}}>
                        <Counter start={1} onChange={onChange} />
                    </View> */}
                </View>
            </View>
      ),
    },
];



function GroceryHome({ navigation }) {

    const [refreshing, setRefreshing] = React.useState(false);

    const forceUpdate = useForceUpdate();

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        console.log('Refreshing')
        // load Grocery items from storage
        // getInvItem().then((val) => {

        // }
        // );
        wait(1000).then(() => setRefreshing(false));
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

    const renderContent  = (section, _ , isActive) => {
        //Accordion Content View
        return (
            <Animatable.View
            duration = {400}
            style = {[styles.content, isActive ? styles.active : styles.inactive]}
            transition ="backgroundColor">
            <Animatable.Text
                animation = {isActive ? 'bounceIn' : undefined}
                style = {{textAlign: 'center'}}>
                {section.customInnerItem}
            </Animatable.Text>
            </Animatable.View>
        )
    }

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
                        
                        </View>
                </SafeAreaView>
    )
}


export default GroceryScreen;
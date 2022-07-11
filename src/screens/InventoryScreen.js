import React from 'react';
import { Text, View, Button } from 'react-native';
import scanner from '../components/Scanner';
import FAB from 'react-native-fab';
import Barcode from '../components/barcode';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import barcode from '../components/barcode';
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
                        <RootStack.Screen name="Home Screen" options={{ headerShown: false }} component={InventoryHome} />
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
function ItemDetailsScreen({ navigation }) {
        class NameForm extends React.Component {
            constructor(props) {
              super(props);
              this.state = {value: ''};
              this.handleChange = this.handleChange.bind(this);
              this.handleSubmit = this.handleSubmit.bind(this);
            }
          
            handleChange(event) {    this.setState({value: event.target.value});  }
            handleSubmit(event) {
              alert('A name was submitted: ' + this.state.value);
              event.preventDefault();
            }
          
        render() {
            return (
                <form onSubmit={this.handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={this.state.value} onChange={this.handleChange} />        </label>
                <input type="submit" value="Submit" />
                </form> 
            );
        }
    }
}

export default InventoryScreen;

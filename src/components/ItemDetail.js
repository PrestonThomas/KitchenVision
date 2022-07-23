import React, { Component } from 'react';
import { Text, View, TextInput, Button, StyleSheet, Image, ScrollView, Dimensions, TouchableOpacity, Linking } from 'react-native';
import MaterialButtonSuccess from '../components/MaterialButtonSuccess';
import componentStyles from '../components/componentStyles';
import { Icon } from 'react-native-vector-icons/MaterialCommunityIcons';
import ExpiryForm from './ExpiryForm';
import BarcodeForm from './BarcodeForm';
import InputFormLabel from './InputFormLabel';
import QuantityFormLabel from './QuantityFormLabel';
const styles = componentStyles;
const screenHeight = Dimensions.get('window').height;

// Leaving this here so I don't have to search it up each time - https://world.openfoodfacts.org/api/v0/product/9002490100070.json

export default class NameForm extends React.Component {
  state = {};
  constructor(props) {
    super(props);
    this.state = { value: 'Cat', img: 'https://i.imgur.com/YYIRUdf.jpeg', json: {}, expiry: 'Expiry Date', quantity: 1 };
    this.handleChange = this.handleChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleExpiry = this.handleExpiry.bind(this);
    this.returnExpiry = this.returnExpiry.bind(this);
  }
  handleChange(event) { this.setState({ value: event.target.value }); }
  handleCancel(event) { console.log('Cancel'); }
  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }
  handleExpiry(event) { console.log('expiry'); }
  returnExpiry(event) { console.log('expiry'); }
  render() {
    return this.detailsForm();
  }

  detailsForm() {

    return <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={{height: screenHeight}}>
        <View style={styles.container}>
          <View style={styles.imageBox}>
            <Image source={{ uri: this.state.img }} style={{ width: 100, height: 100 }} />
          </View>
          {/* <InputFormLabel formName="Name:" value={this.state.json.brands} /> */}
          <InputFormLabel formName="Name:" value="This will also be changed to manual input maybe?" />
          <InputFormLabel formName="Category:" value="This will change to a selection list" />
          <QuantityFormLabel formName="Quantity:" value={this.state.quantity} />
          <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />
          <BarcodeForm value={this.state.value} />
          <ExpiryForm function={this.handleExpiry} data={this.returnExpiry}/>
          <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />
          <Button
            title="Learn More at openfoodfacts.org"
            onPress={() => Linking.openURL("https://world.openfoodfacts.org/product/"+this.state.value)}
          />
          <MaterialButtonSuccess
            function={this.handleSubmit}
            button="SUBMIT"
            style={styles.materialButtonSuccess}
          />
          <Button
          title="Cancel"
          onPress={this.handleCancel}/>
        </View>
      </View>
    </ScrollView>
  }
}

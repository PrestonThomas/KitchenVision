import React, { Component } from 'react';
import { Text, View, TextInput, Button, StyleSheet, Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import BarCodeButton from '../components/BarcodeButton';
import ScannedTextBox from './ScanTextbox';
import ExpiryButton from './ExpiryButton';
import MaterialButtonSuccess from '../components/MaterialButtonSuccess';
import FormLabelBox from './FormLabelBox';
import FormNolabelBox from './FormNolabelBox';
import componentStyles from '../components/componentStyles';
import { Icon } from 'react-native-vector-icons/MaterialCommunityIcons';
import ExpiryForm from './ExpiryForm';
const styles = componentStyles;
const screenHeight = Dimensions.get('window').height;

export default class NameForm extends React.Component {
  state = {};
  constructor(props) {
    super(props);
    this.state = { value: 'Cat', img: 'https://i.imgur.com/YYIRUdf.jpeg', json: {}, expiry: 'Expiry Date' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleExpiry = this.handleExpiry.bind(this);
    this.returnExpiry = this.returnExpiry.bind(this);
  }
  handleExpiry(event) {console.log('expiry');}
  returnExpiry(event) {console.log('expiry');}
  handleChange(event) { this.setState({ value: event.target.value }); }
  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }
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
          <View style={styles.materialButtonShareRow}>
            <BarCodeButton
              style={styles.BarCodeButton}
            />
            <ScannedTextBox
              inputStyle={this.state.value}
              style={styles.BarCodeTextbox}
            />
          </View>
          <ExpiryForm function={this.handleExpiry} data={this.returnExpiry}/>
          {/* <View style={styles.materialButtonShare1Row}>
            <ExpiryButton
              function={this.handleExpiry}
              style={styles.ExpiryButton}
            />
            <ScannedTextBox
              inputStyle={this.state.expiry}
              onChangeText={this.returnExpiry}
              style={styles.ExpiryDateTextbox}
            />
            <Button title='refresh' onPress={this.returnExpiry} />
          </View> */}
          <MaterialButtonSuccess
            function={this.handleSubmit}
            button="SUBMIT"
            style={styles.materialButtonSuccess}
          />
          <Text style={styles.loremIpsum} />
          <FormLabelBox
            fixedLabel={this.state.json.brands}
            style={styles.ItemNameTextbox}
          />
          <FormLabelBox
            // fixedLabel="Category:"
            fixedLabel={this.state.json.categories_hierarchy}
            style={styles.CategoryTextbox}
          />
          <FormNolabelBox
            // inputStyle="Calories"
            // Nutriscore
            // fixedLabel={this.state.json.nutriments.energy-kcal}
            fixedLabel={this.state.json.nutriscore_data.grade}
            style={styles.CaloriesTextbox}
          />
          <FormNolabelBox
            inputStyle="Item Quantity"
            style={styles.ItemQtyTextbox}
          />
        </View>
      </View>
    </ScrollView>
    //////////////////////////////////ORIGINAL VERSION///////////////////////////////////////////
    // <View style={styles.container}>
    //   <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    //     <Text style={{ fontSize: 30, color: 'black' }}> {this.state.json.brands}</Text>
    //     <TextInput style={styles.valueBox}
    //       style={styles.input}
    //       value={this.state.value} />
    //     <Button
    //       title="Submit"
    //       onPress={this.handleSubmit} />
    //     <Image source={{ uri: this.state.img }} style={{ width: 200, height: 200 }} />
    //   </View>
    // </View>;
  }
}

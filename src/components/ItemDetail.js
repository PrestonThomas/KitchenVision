import React from 'react';
import { Text, View, TextInput, Button, StyleSheet, Image, ScrollView, Dimensions,  Platform, TouchableOpacity, Linking, SafeAreaView, KeyboardAvoidingView, Alert } from 'react-native';
import MaterialButtonSuccess from '../components/MaterialButtonSuccess';
import componentStyles from '../components/componentStyles';
//import {LocalCategories} from '../components/dropdownList';
import BarcodeForm from './BarcodeForm';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import NumericInput from 'react-native-numeric-input';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import TextInputMask from 'react-native-text-input-mask';

const styles = componentStyles;
const screenHeight = Dimensions.get('window').height;

// Leaving this here so I don't have to search it up each time - https://world.openfoodfacts.org/api/v0/product/9002490100070.json

export default class NameForm extends React.Component {
  state = {};
  constructor(props) {
    super(props);
    this.state = { value: 'Cat', img: 'https://i.imgur.com/YYIRUdf.jpeg', json: {}, expiry: 'Expiry Date', quantity: 1, name: 'Name', category: 'Category' };
    this.handleChange = this.handleChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleExpiry = this.handleExpiry.bind(this);
    this.returnExpiry = this.returnExpiry.bind(this);
    this.validateDate = this.validateDate.bind(this);
  }
  handleChange(event) { this.setState({ value: event.target.value }); }
  handleCancel(event) { console.log('Cancel'); }
  handleSubmit(event) {
    // alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }
  handleExpiry(event) { console.log('expiry'); }
  returnExpiry(event) { console.log('expiry'); }
  handleCategory(input) {
    if (input !== null) {
      this.state.category = input.title;
    }
  }

  validateDate(input) {
    // validate date as DD/MM/YY
    let date;
    if (input === '') {
      Alert.alert('Date', 'Please enter a valid date in the format DD/MM/YY');
    } else {
      date = input.split('/');
      if (date.length !== 3) {
        return false;
      }
      const year = parseInt(date[0], 10);
      const month = parseInt(date[1], 10);
      const day = parseInt(date[2], 10);
      if (year < 0 || year > 99) {
        return false;
      }
      if (month > 12) {
        return false;
      }
      if (day < 1 || day > 31) {
        return false;
      }
      return true;
    }
  }

  // convertDate(input) {
  //     const date = input.split('/');
  //     const day = parseInt(date[0], 10);
  //     const month = parseInt(date[1], 10);
  //     const year = parseInt(date[2], 10);
  //     return new Date(year, month - 1, day);
  // }

  render() {
    return this.detailsForm();
  }

  detailsForm() {
    return <SafeAreaView style={({ flex: 1 })}>
    <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        enabled>
    <ScrollView nestedScrollEnabled
    keyboardDismissMode="on-drag"
    keyboardShouldPersistTaps="handled"
    contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ paddingBottom: 200 }}
    style={styles.scrollContainer}>

      <View style={{height: screenHeight}}>
        <View style={styles.container}>
          <View style={styles.imageBox}>
            <Image source={{ uri: this.state.img }} style={{ width: 100, height: 100 }} />
          </View>
          <View style={styles.twoItem}>
            <View style={styles.labelContainer}>
              <Text style={styles.labelStyle}>Name</Text>
            </View>
            <View style={[styles.inputContainer]}>
              <TextInput
                  placeholder="This will be a manual entry"
                  onChangeText={(text) => {this.state.name = text; }}
                  style={styles.inputStyle}
              />
            </View>
          </View>
          {/* <View style={styles.twoItem}> */}
            <View style={styles.labelContainer}>
                <Text style={styles.labelStyle}>Category:</Text>
            </View>
          {/* DROP DOWN LIST  */}
            <View style={{padding: 20}, Platform.select({ ios: { zIndex: 100 } })}>
              {/* <LocalCategories onChange={(selectedItem) => {this.state.category = selectedItem}}/> */}
                <View>
                  <AutocompleteDropdown
                    clearOnFocus={false}
                    closeOnBlur={false}
                    initialValue={{ id: '2' }} // or just '2'
                    // onSelectItem={setSelectedItem}
                    //  dataSet={dataSet}
                    dataSet={[
                      { id: '1', title: 'Meat' },
                      { id: '2', title: 'Dairy' },
                      { id: '3', title: 'Vegetables' },
                      { id: '4', title: 'Drinks' },
                      { id: '5', title: 'Other' },
                    ]}
                    ItemSeparatorComponent={<View style={{ height: 1, width: '100%', backgroundColor: '#d8e1e6' }} />}
                    getItemLayout={(data, index) => ({ length: 50, offset: 50 * index, index })}
                    // onChange={(selectedItem) => { NameForm.state.category = selectedItem }}
                    onSelectItem={(selectedItem) => { this.handleCategory(selectedItem); }}
                    onChange={(selectedItem) => { this.state.category = selectedItem.title; }}
                    onChangeText={(text) => {this.state.category = text; }}
                  />
                  {/* <Text style={{ color: '#668', fontSize: 13 }}>Selected item: {JSON.stringify(selectedItem)}</Text> */}

                </View>
            </View>
          {/* DROP DOWN LIST  */}
        {/* </View> */}
        <View style={styles.twoItem}>
            <View style={styles.labelContainer}>
                <Text style={styles.labelStyle}>Quantity:</Text>
            </View>
            <View style={[styles.inputContainer]}>
                <NumericInput
                    onChange={value => {this.state.quantity = value;}}
                    rounded
                    valueType="real"
                    minValue={1}
                    iconStyle={{ color: 'black' }}
                    rightButtonBackgroundColor="#EA3788"
                    leftButtonBackgroundColor="#E56B70" />
            </View>
        </View>
          <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />
          <BarcodeForm value={this.state.value} />
          <View style={styles.twoItem}>
            <View style={styles.btnContainer}>
                <TouchableOpacity onPress={this.handleExpiry}>
                    <Icon name="food-off" style={styles.icon} />
                </TouchableOpacity>
            </View>
            <View style={[styles.inputContainer]}>
                {/* <TextInput
                    placeholder="Scan or enter expiry date"
                    style={styles.inputStyle}
                    onChangeText={(text) => { this.state.expiry = text }}
                /> */}
                  <TextInputMask
                    style={styles.inputStyle}
                    placeholder="(YY/MM/DD) Scan/enter expiry date"
                    onChangeText={(text) => { this.state.expiry = text; }}
                    value={this.state.expiry}
                    mask={'[00]/[00]/[00]'}
                    keyboardType="numeric"
                    />
            </View>
            <View style={styles.btnContainer}>
                <TouchableOpacity onPress={this.returnExpiry} >
                    <Icon name="refresh" style={styles.icon} />
                </TouchableOpacity>
            </View>
        </View>
          <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />
          <Button
            title="Learn More at openfoodfacts.org"
            onPress={() => Linking.openURL('https://world.openfoodfacts.org/product/'+this.state.value)}
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
    </KeyboardAvoidingView>
    </SafeAreaView>;

  }
}

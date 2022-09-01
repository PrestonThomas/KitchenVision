/* eslint-disable no-trailing-spaces */
import React from 'react';
import { Text, View, TextInput, Button, StyleSheet, Image, ScrollView, Dimensions,  Platform, TouchableOpacity, Linking, SafeAreaView, KeyboardAvoidingView, Alert } from 'react-native';
import MaterialButtonSuccess from '../components/MaterialButtonSuccess';
import componentStyles from '../components/componentStyles';
import BarcodeForm from './BarcodeForm';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import NumericInput from 'react-native-numeric-input';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import TextInputMask from 'react-native-text-input-mask';
import AwesomeButtonCartman from 'react-native-really-awesome-button/src/themes/rick';

const styles = componentStyles;
const screenHeight = Dimensions.get('window').height;

// This is a React Class Component that renders the Item Details form.
// It is used to add new items to storage.
// The class component uses a state object to store the item's information.

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
    this.pullName = this.pullName.bind(this);
  }
  handleChange(event) { this.setState({ value: event.target.value }); }
  handleCancel(event) { console.log('Cancel'); }
  handleSubmit(event) {
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

  pullName(event) { console.log('pullName'); }

  render() {
    return this.detailsForm();
  }

  // This function renders the Item Details form (GUI)

  detailsForm() {
    return <SafeAreaView style={({ flex: 1 }), {height: screenHeight}}>
    <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        enabled>
    <ScrollView nestedScrollEnabled
    keyboardDismissMode="on-drag"
    keyboardShouldPersistTaps="handled"
    contentInsetAdjustmentBehavior="automatic"
    style={styles.scrollContainer}>
      <View style={{height: screenHeight}}>
        <View style={styles.itemDetailcontainer}>
          <View style={styles.imageBox}>
            <Image source={{ uri: this.state.img }} style={{ width: 100, height: 100 }} />
          </View>
          <View style={styles.twoItem}>
            <View style={styles.labelContainer}>
              <Text style={styles.labelStyle}>Name:</Text>
            </View>
            <View style={[styles.inputContainer]}>
              <TextInput
                  placeholder='Input product name'
                  defaultValue={this.state.name}
                  onChangeText={(text) => {this.state.name = text; }}
                  onChange={(text) => {this.state.name = text; }}
                  style={styles.inputStyle}
              />
            </View>
          </View>
          <View style={styles.twoItemDropDown}>
            <View style={styles.labelContainer}>
                <Text style={styles.labelStyle}>Category:</Text>
            </View>
            <View style={{padding: 20}, Platform.select({ ios: { zIndex: 100 } })}>
                <View>
                  <AutocompleteDropdown
                    clearOnFocus={false}
                    closeOnBlur={false}
                    dataSet={[
                      { id: '1', title: 'Meat' },
                      { id: '2', title: 'Dairy' },
                      { id: '3', title: 'Vegetables' },
                      { id: '4', title: 'Drinks' },
                      { id: '5', title: 'Other' },
                    ]}
                    ItemSeparatorComponent={<View style={{ height: 1, width: '100%', backgroundColor: '#d8e1e6' }} />}
                    getItemLayout={(data, index) => ({ length: 50, offset: 50 * index, index })}
                    onSelectItem={(selectedItem) => { this.handleCategory(selectedItem); }}
                    onChange={(selectedItem) => { this.state.category = selectedItem.title; }}
                    onChangeText={(text) => {this.state.category = text; }}
                  />

                </View>
            </View>
          </View>
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
            <MaterialButtonSuccess
              function={this.handleSubmit}
              button="SUBMIT"
              style={styles.materialButtonSuccess}
            />
            <View style={styles.ItemDetailButtonBottoms}>
              <AwesomeButtonCartman
              type="primary"
              backgroundColor='rgba(255,0,0,0)'
              backgroundActive="rgba(225,0,0,0)"
              activeOpacity={0.5}
              textColor="#FFFFFF"
              width={128}
              height={50}
              onPress={this.handleCancel}>CANCEL</AwesomeButtonCartman>
            </View>
          <View style={styles.ItemDetailButtonLast}>
            <Button title='Get More Item Details' onPress={() => Linking.openURL('https://world.openfoodfacts.org/product/' + this.state.value)} />
          </View>
        </View>
      </View>
    </ScrollView>
    </KeyboardAvoidingView>
    </SafeAreaView>;
  
  }
}

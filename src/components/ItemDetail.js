import React, { memo, useState } from 'react';
import { Text, View, TextInput, Button, StyleSheet, Image, ScrollView, Dimensions, TouchableOpacity, Linking, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import MaterialButtonSuccess from '../components/MaterialButtonSuccess';
import componentStyles from '../components/componentStyles';
//import {LocalCategories} from '../components/dropdownList';
import BarcodeForm from './BarcodeForm';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import NumericInput from 'react-native-numeric-input'
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown'

const styles = componentStyles;
const screenHeight = Dimensions.get('window').height;

// Leaving this here so I don't have to search it up each time - https://world.openfoodfacts.org/api/v0/product/9002490100070.json

//DROP DOWN LIST INTERNAL COMPONENT
export const LocalCategories = memo(() => {
  const [selectedItem, setSelectedItem] = useState(null)

  const dataSet = new Array(450)
    .fill({ id: '1', title: 'test' })
    .map((item, i) => ({ ...item, id: i.toString(), title: item.title + i }))

  return (
    <View>
      <AutocompleteDropdown
        clearOnFocus={false}
        closeOnBlur={false}
        initialValue={{ id: '2' }} // or just '2'
        onSelectItem={setSelectedItem}
        //  dataSet={dataSet}
        dataSet={[
          { id: '1', title: 'Meats' },
          { id: '2', title: 'Vegetables' },
          { id: '3', title: 'Drinks' }
        ]}
        ItemSeparatorComponent={<View style={{ height: 1, width: '100%', backgroundColor: '#d8e1e6' }} />}
        getItemLayout={(data, index) => ({ length: 50, offset: 50 * index, index })}
      />
      {/* <Text style={{ color: '#668', fontSize: 13 }}>Selected item: {JSON.stringify(selectedItem)}</Text> */}
      <TextInput onChangeText={(selectedItem) => {this.state.category = selectedItem }}/>
    </View>
  )
})

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
                    placeholder='This will be a manual entry'
                    onChangeText={(text) => {this.state.name = text }}
                    style={styles.inputStyle}
                />
            </View>
          </View>
          {/* <View style={styles.twoItem}> */}
            <View style={styles.labelContainer}>
                <Text style={styles.labelStyle}>Category:</Text>
            </View>
            {/* DROP DOWN LIST  */}
              <View style={{padding: 20}}>
                <LocalCategories/>
            </View>
            {/* DROP DOWN LIST  */}
        {/* </View> */}
        <View style={styles.twoItem}>
            <View style={styles.labelContainer}>
                <Text style={styles.labelStyle}>Quantity:</Text>
            </View>
            <View style={[styles.inputContainer]}>
                <NumericInput
                    onChange={value => {this.state.quantity = value}}
                    rounded
                    valueType='real'
                    minValue={1}
                    iconStyle={{ color: 'black' }}
                    rightButtonBackgroundColor='#EA3788'
                    leftButtonBackgroundColor='#E56B70' />
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
                <TextInput
                    placeholder="Scan or enter expiry date"
                    style={styles.inputStyle}
                    onChangeText={(text) => { this.state.expiry = text }}
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
    </KeyboardAvoidingView>
    </SafeAreaView>

  }
}

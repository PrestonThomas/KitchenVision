import React, { Component } from 'react';
import { Text, View, TextInput, Button, StyleSheet, Image, ScrollView  } from 'react-native';
import BarCodeButton from "../components/BarcodeButton";
import ScannedTextBox from "./ScanTextbox";
import ExpiryButton from "./ExpiryButton";
import MaterialButtonSuccess from "../components/MaterialButtonSuccess";
import FormLabelBox from "./FormLabelBox";
import FormNolabelBox from "./FormNolabelBox";

function queryItem(barcode) {
  let url = 'https://world.openfoodfacts.org/api/v0/product/' + barcode + '.json';
  return fetch(url)
}

export default class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: 'Cat', img: 'https://i.imgur.com/YYIRUdf.jpeg', json: {} };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.queryItem = this.queryItem.bind(this);
  }
  // queryItem(barcode) {
  //   queryItem(barcode).then(response => response.json())
  //     .then(json => {
  //       console.log(json);
  //       this.state.img = json.product.image_front_url;
  //       return json;
  //     }
  //   );
  // }
  handleChange(event) { this.setState({ value: event.target.value }); }
  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }
  render() {
    return this.detailsForm();
  }

  detailsForm() {
    //trying to make it scrollable via scrollview
    return <ScrollView contentContainerStyle={{ flexGrow: 1 }}> 
    <View style={styles.container}>
      <View style={styles.imageBox}>
          <Image source={{ uri: this.state.img }} style={{ width: 100, height: 100}} />
      </View>
      <View style={styles.materialButtonShareRow}>
        <BarCodeButton
          style={styles.BarCodeButton}
        ></BarCodeButton>
        <ScannedTextBox
          inputStyle="CAN ID"
          style={styles.BarCodeTextbox}
        ></ScannedTextBox>
      </View>
      <View style={styles.materialButtonShare1Row}>
        <ExpiryButton
          style={styles.ExpiryButton}
        ></ExpiryButton>
        <ScannedTextBox
          inputStyle="Expiry Date"
          style={styles.ExpiryDateTextbox}
        ></ScannedTextBox>
      </View>
      <MaterialButtonSuccess
        button="SUBMIT"
        style={styles.materialButtonSuccess}
      ></MaterialButtonSuccess>
      <Text style={styles.loremIpsum}></Text>
      <FormLabelBox
        fixedLabel="Item name:"
        style={styles.ItemNameTextbox}
      ></FormLabelBox>
      <FormLabelBox
        fixedLabel="Category:"
        style={styles.CategoryTextbox}
      ></FormLabelBox>
      <FormNolabelBox
        inputStyle="Calories"
        style={styles.CaloriesTextbox}
      ></FormNolabelBox>
      <FormNolabelBox
        inputStyle="Item Quantity"
        style={styles.ItemQtyTextbox}
      ></FormNolabelBox>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(139,175,229,1)",
    opacity: 0.87,
    borderWidth: 1,
    borderColor: "#000000",
  },
  imageBox:{
    justifyContent:'center',
    alignItems:'center',
    marginTop: 25
  },
  BarCodeButton: {
    height: 56,
    width: 50
  },
  BarCodeTextbox: {
    height: 43,
    width: 228,
    backgroundColor: "rgba(230, 230, 230,1)",
    shadowColor: "rgba(72,123,115,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 5,
    shadowOpacity: 1,
    shadowRadius: 0,
    marginLeft: 13,
    marginTop: 6
  },
  materialButtonShareRow: {
    height: 56,
    flexDirection: "row",
    marginTop: 315,
    marginLeft: 15,
    marginRight: 54
  },
  ExpiryButton: {
    height: 56,
    width: 50
  },
  ExpiryDateTextbox: {
    height: 43,
    width: 228,
    backgroundColor: "rgba(230, 230, 230,1)",
    shadowColor: "rgba(72,123,115,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 5,
    shadowOpacity: 1,
    shadowRadius: 0,
    marginLeft: 13,
    marginTop: 7
  },
  materialButtonShare1Row: {
    height: 56,
    flexDirection: "row",
    marginTop: 35,
    marginLeft: 15,
    marginRight: 54
  },
  materialButtonSuccess: {
    height: 47,
    width: 128,
    shadowColor: "rgba(26,78,80,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 5,
    shadowOpacity: 0.51,
    shadowRadius: 0,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 4,
    borderBottomLeftRadius: 4,
    marginTop: 27,
    marginLeft: 114
  },
  loremIpsum: {
    fontFamily: "roboto-regular",
    color: "#121212",
    marginTop: -479,
    marginLeft: 62
  },
  ItemNameTextbox: {
    height: 43,
    width: 321,
    backgroundColor: "rgba(230, 230, 230,1)",
    borderRadius: 13,
    shadowColor: "rgba(71,105,98,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 5,
    shadowOpacity: 1,
    shadowRadius: 0,
    borderWidth: 1,
    borderColor: "rgba(90,149,157,1)",
    marginTop: -43,
    marginLeft: 15
  },
  CategoryTextbox: {
    height: 43,
    width: 321,
    backgroundColor: "rgba(230, 230, 230,1)",
    borderRadius: 13,
    shadowColor: "rgba(71,105,98,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 5,
    shadowOpacity: 1,
    shadowRadius: 0,
    borderWidth: 1,
    borderColor: "rgba(90,149,157,1)",
    marginTop: 28,
    alignSelf: "center"
  },
  CaloriesTextbox: {
    height: 43,
    width: 200,
    backgroundColor: "rgba(230, 230, 230,1)",
    borderRadius: 7,
    shadowColor: "rgba(121,150,150,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 5,
    shadowOpacity: 1,
    shadowRadius: 0,
    marginTop: 109,
    marginLeft: 28
  },
  ItemQtyTextbox: {
    height: 43,
    width: 200,
    backgroundColor: "rgba(230, 230, 230,1)",
    borderRadius: 7,
    shadowColor: "rgba(121,150,150,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 5,
    shadowOpacity: 1,
    shadowRadius: 0,
    marginTop: -119,
    marginLeft: 28
  }
});

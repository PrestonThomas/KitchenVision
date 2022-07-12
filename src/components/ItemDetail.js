import React from 'react';
import { Text, View, TextInput, Button, StyleSheet, Image  } from 'react-native';

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
    return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 30, color: 'black' }}> {this.state.json.brands}</Text>
      <TextInput
        style={styles.input}
        value={this.state.value} />
      <Button
        title="Submit"
        onPress={this.handleSubmit} />
      <Image source={{ uri: this.state.img }} style={{ width: 200, height: 200 }} />
    </View>;
  }
}

const styles = StyleSheet.create({
  input: {
    color: 'black',
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

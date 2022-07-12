import React from 'react';
import { Text, View, TextInput, Button, StyleSheet  } from 'react-native';
export default class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: 'Cat' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) { this.setState({ value: event.target.value }); }
  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 30, color: 'black' }}>NameForm</Text>
        <TextInput
          style={styles.input}
          value={this.state.value} />
        <Button title="Submit"/>
      </View>
    );
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

import React, { Component } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

function ScannedTextBox(props) {
  // add onChange text event listener
  return (
    <View style={[styles.container, props.style]}>
      <Icon name="barcode" style={styles.iconStyle}></Icon>
      <TextInput
        onChangeText={props.handleChange}
        placeholder={props.inputStyle || ""}
        style={styles.inputStyle}
        onPressIn={props.function}
      ></TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center"
  },
  iconStyle: {
    fontSize: 39,
    paddingLeft: 8
  },
  inputStyle: {
    color: "#000",
    marginLeft: 16,
    paddingRight: 5,
    fontSize: 16,
    alignSelf: "stretch",
    flex: 1,
    lineHeight: 16,
    borderBottomWidth: 1,
    borderColor: "#D9D5DC",
    paddingTop: 14,
    paddingBottom: 8
  }
});

export default ScannedTextBox;

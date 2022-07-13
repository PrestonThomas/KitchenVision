import React, { Component } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";

function FormLabelBox(props) {
  return (
    <View style={[styles.container, props.style]}>
      <Text style={styles.fixedLabel}>{props.fixedLabel || "FixedLabel"}</Text>
      <TextInput
        placeholder=""
        placeholderTextColor="rgba(255,255,255,1)"
        style={styles.inputStyle}
      ></TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderColor: "#D9D5DC",
    backgroundColor: "transparent",
    flexDirection: "row",
    paddingLeft: 16
  },
  fixedLabel: {
    fontSize: 16,
    lineHeight: 16,
    paddingTop: 16,
    paddingBottom: 8,
    color: "#000",
    opacity: 0.5,
    alignSelf: "flex-start"
  },
  inputStyle: {
    color: "#000",
    paddingRight: 5,
    fontSize: 16,
    alignSelf: "stretch",
    flex: 1,
    lineHeight: 16,
    paddingTop: 14,
    paddingBottom: 8,
    paddingLeft: 30
  }
});

export default FormLabelBox;

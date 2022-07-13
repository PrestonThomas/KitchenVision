import React, { Component } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

function BarcodeButton(props) {
  return (
    <TouchableOpacity style={[styles.container, props.style]}>
      <Icon name="barcode-scan" style={styles.icon}></Icon>
    </TouchableOpacity>
    
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(74,144,226,1)",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 28,
    shadowColor: "#111",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.2,
    elevation: 2,
    minWidth: 40,
    minHeight: 40,
    opacity: 0.97
  },
  icon: {
    fontSize: 24,
    alignSelf: "center",
    color: "rgba(230, 230, 230,1)"
  }
});

export default BarcodeButton;

import React, { Component } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import scanner from '../components/Scanner';

function ExpiryButton(props) {
  return (
    <TouchableOpacity onPress={props.function} style={[styles.container, props.style]} >
      <Icon name="food-off" style={styles.icon}></Icon>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(225,82,100,1)",
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
    opacity: 0.9
  },
  icon: {
    color: "#fff",
    fontSize: 24,
    alignSelf: "center"
  }
});

export default ExpiryButton;

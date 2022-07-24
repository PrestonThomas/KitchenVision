import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Button, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const InputFormLabel = (props) => {
    const [enteredText, setEnteredText] = useState("");
    return (
        <View style={styles.twoItem}>
            <View style={styles.labelContainer}>
                <Text style={styles.labelStyle}>{props.formName}</Text>
            </View>
            <View style={[styles.inputContainer, props.style]}>
                <TextInput
                    onChangeText={enteredText => setEnteredText(enteredText)}
                    value={(enteredText)}
                    // onContentSizeChange={console.log(enteredText)}
                    onContentSizeChange={()=>props.updateChangedText}
                    placeholder={props.placeholder}
                    style={styles.inputStyle}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    // two item side by side container
    twoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-between',
        marginBottom: 10,
        paddingLeft: 15,
        paddingRight: 110
    },
    labelContainer: {
        width: 100,
        fontSize: 18,
        fontWeight: 'bold',
    },
    labelStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    icon: {
        color: "#fff",
        fontSize: 24,
        alignSelf: "center"
    },
    inputContainer: {
        backgroundColor: "transparent",
        flexDirection: "row",
        alignItems: "center",
        marginRight: 10,
    },
    iconStyle: {
        fontSize: 39,
        paddingLeft: 8
    },
    inputStyle: {
        color: "black",
        marginRight: 10,
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

export default InputFormLabel;
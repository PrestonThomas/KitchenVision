import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Button } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import DatePicker from 'react-native-date-picker'

// Considering a datepicker for this

const ExpiryForm = (props) => {
    // const [expiry, setExpiry] = useState(new Date());
    const [expiry, setExpiry] = useState('');
    return (
        <View style={styles.twoItem}>
            <View style={styles.btnContainer}>
                <TouchableOpacity onPress={() => { setExpiry(props.function) }} style={[styles.container, props.style]} >
                    <Icon name="food-off" style={styles.icon} />
                </TouchableOpacity>
            </View>
            <View style={[styles.inputContainer, props.style]}>
                <TextInput
                    placeholder="Scan or enter expiry date"
                    defaultValue={expiry}
                    style={styles.inputStyle}
                    onChangeText={(text) => { setExpiry(text) }}
                />
                 {/* <DatePicker mode="date" date={expiry} onDateChange={setExpiry} /> */}
            </View>
            <View style={styles.btnContainer}>
                <TouchableOpacity onPress={() => { setExpiry(props.data); }} style={[styles.container, props.style]} >
                    <Icon name="refresh" style={styles.icon} />
                </TouchableOpacity>
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
    btnContainer: {
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
        maxWidth: 60,
        minHeight: 40,
        maxHeight: 60,
        opacity: 0.9
    },
    icon: {
        color: "#fff",
        fontSize: 24,
        alignSelf: "center"
    },
    inputContainer: {
        backgroundColor: "transparent",
        flexDirection: "row",
        alignItems: "center"
    },
    iconStyle: {
        fontSize: 39,
        paddingLeft: 8
    },
    inputStyle: {
        color: "black",
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

export default ExpiryForm;
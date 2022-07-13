import * as React from 'react';
import { Text, View } from 'react-native';

function GroceryScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 30, color: 'black' }}>
                GroceryScreen
            </Text>
        </View>
    );
}

export default GroceryScreen;
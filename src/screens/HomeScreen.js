import * as React from 'react';
import { Button, Text, View } from 'react-native';
import storage from '../api/storage';

function HomeScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 30, color: 'black' }}>
                Home Test Test Test
            </Text>
            <Button
                onPress={() => 
                    storage.getAllKeys().then(keys => {
                        console.log(keys);
                    }
                    ).catch(err => {
                        console.log(err);
                    }
                    )
                }
                title="Log stored barcodes" />
        </View>
    );
}

export default HomeScreen;

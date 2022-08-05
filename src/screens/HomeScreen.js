import * as React from 'react';
import { Button, Text, View } from 'react-native';
import storage from '../api/storage';
import { styles } from './liststyle';

class HomeScreen extends React.Component {
    render() {
        return (
            <View styles={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.name}>
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
}

export default HomeScreen;

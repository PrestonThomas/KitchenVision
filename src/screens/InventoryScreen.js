import React from 'react';
import { Text, View, Button } from 'react-native';
import scanner from '../components/Scanner';
import FAB from 'react-native-fab';

// Still working on getting the text to update/return upon camera close. Looking at async functions and promises. - Preston

function InventoryScreen() {
    const [myText, setMyText] = React.useState('Test Text');
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 30, color: 'black' }}>
                InventoryScreen
            </Text>
            <FAB buttonColor="red" iconTextColor="#FFFFFF" onClickAction={() => { scanner.onCameraPress(); setMyText(scanner.returnScannedText());}} visible={true} />
            <Button
                onPress={() => {
                    console.log(scanner.returnScannedText());
                    setMyText(scanner.returnScannedText());
                }}
                title="Press Me"
            />
            <Text style={{ fontSize: 30, color: 'black' }}
                onPress={() => setMyText('Changed Text')}>
                {myText}
            </Text>
        </View>
    );
}

export default InventoryScreen;

/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import fs from 'react-native-fs';
import { StatusBar, Button, Image, View, SafeAreaView, Text } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import checkForLabels from './helperFunctions';

let capturedImage;
let capturedImageData;

export default function () {
  const [pickerResponse, setPickerResponse] = useState(null);
  const [myText, setMyText] = React.useState('Test Text');

  function resizeImage(uri) {
    return ImageResizer.createResizedImage(uri, 256, 256, 'JPEG', 80)
      .then((response) => {
        console.log(response);
        return response;
      })
      .catch((err) => {
        console.error(err);
      }
      );
  }

  async function readFile() {
    // let file = capturedImage;
    // let file = resizeImage(capturedImage);

    try {
      const file = await resizeImage(capturedImage);
      console.log(file);
      const fileData = await fs.readFile(file.uri, 'base64');
      console.log(fileData);
      const response = await checkForLabels(fileData);
      console.log(response);
      setMyText(response.responses[0].textAnnotations[0].description);
    } catch (err) {
      console.error(err);
    }

    // const data = await fs.readFile(file, 'base64');
    // capturedImageData = data;
    // let result = await checkForLabels(data);
    // console.log('Results:');
    // console.log(result.responses[0].fullTextAnnotation.text);
    // setMyText(result.responses[0].fullTextAnnotation.text);
  }

  const onCameraPress = React.useCallback(() => {
    const options = {
      saveToPhotos: true,
      mediaType: 'photo',
      includeBase64: false,
    };
    ImagePicker.launchCamera(options, response => {
      console.log({ response });
      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let source = { uri: response.uri };
        console.log(response.assets[0].uri);
        capturedImage = response.assets[0].uri;
        setPickerResponse(source.uri);
      }
    }
    );
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <Button onPress={onCameraPress} title="Camera" color="#841584"></Button>
        <Button title="Vision" onPress={readFile}> </Button>
        <Text onPress={() => setMyText('Changed Text')}>
          {myText}
        </Text>
      </View>
    </SafeAreaView>
  );
}
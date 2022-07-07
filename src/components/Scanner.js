import fs from 'react-native-fs';
import * as ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import checkForLabels from '../api/vision';

let capturedImage;
let output;

let CameraOpen;

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

async function readFile(input) {
    try {
        const file = await resizeImage(capturedImage);
        // console.log(file);
        const fileData = await fs.readFile(file.uri, 'base64');
        // console.log(fileData);
        const response = await checkForLabels(fileData);
        console.log(response);
        output = response.responses[0].textAnnotations[0].description;
    } catch (err) {
        console.error(err);
    }
}

function onCameraPress() {
    CameraOpen = true;
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
          resizeImage(capturedImage);
          readFile(capturedImage);
          CameraOpen = false;
        }
      }
      );
}

var dataArray = []

function returnScannedText() {
    // wait for the image to be read
    if (output === undefined) {
        return 'No text found';
    } else {
        JSON.stringify(dataArray.push(output));
        console.log('JSON STRING of Expiry Dates', dataArray);
        return output;
    }
}


export default {onCameraPress, readFile, capturedImage, resizeImage, returnScannedText, CameraOpen};

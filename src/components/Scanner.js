import fs from 'react-native-fs';
import * as ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import checkForLabels from '../api/vision';

export let capturedImage;
let output;

let CameraOpen;

// This function resizes the captured image

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

// This function reads the captured image and returns the scanned text

async function readFile(input) {
    try {
        const file = await resizeImage(capturedImage);
        const fileData = await fs.readFile(file.uri, 'base64');
        const response = await checkForLabels(fileData);
        console.log(response);
        output = response.responses[0].textAnnotations[0].description;
    } catch (err) {
        console.error(err);
    }
}

// This function opens the camera calls the aforementioned functions.

async function onCameraPress() {
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
          checkCameraStatus();
        }
      }
      );
}

async function returnScannedText() {
    if (output === undefined) {
        return 'No text found';
    } else {
        return output;
    }
}

function checkCameraStatus() {
  if (CameraOpen === false) {
    alert('Camera is closed');
  }
  return CameraOpen;
}


export default {onCameraPress, readFile, capturedImage, resizeImage, returnScannedText, CameraOpen, checkCameraStatus};

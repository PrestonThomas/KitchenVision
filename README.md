# KitchenVision - Internal Repository

## About The Project
KitchenVision is an OCR powered tool for managing your groceries and shopping. Built using React Native and Google Cloud Vision.

## Setup and Usage

Follow the React Native Development Environment Setup instructions [here](https://reactnative.dev/docs/environment-setup). Ensure that you are following the correct guide, you need <u> React Native CLI </u>  <i> not </i> Expo CLI. Once your environment is configured and you are able to run their example program, you can run the app by opening the terminal and running the following commands:

```bash
git clone https://git.preyazz.pro/Preston/KitchenVision
```
```bash
npm install
```
```bash
npx react-native run-android
# OR - Please note that iOS is currently untested
cd ios && pod install
cd .. && npx react-native run-ios
```

## Continuous Integration

I have configured this repository to build the app every time we push any code. This currently only supports test builds of Android. The outcome of the build is sent to Discord. The purpose of continuous integration is to ensure that we do not run into any merge conflicts late in the project, instead we will know if we have any compatibility issues and we can promptly fix them.

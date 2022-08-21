/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
// import Barcode from './src/components/barcode';
import {name as appName} from './app.json';
import { LogBox } from "react-native";
if (__DEV__) {
    const ignoreWarns = [
      "ViewPropTypes will be removed from React Native",
      "exported from 'deprecated-react-native-prop-types'.",
      "Require cycle",
    ];
  
    const warn = console.warn;
    console.warn = (...arg) => {
      for (const warning of ignoreWarns) {
        if (arg[0].startsWith(warning)) {
          return;
        }
      }
      warn(...arg);
    };
  
    LogBox.ignoreLogs(ignoreWarns);
  }

AppRegistry.registerComponent(appName, () => App);

// AppRegistry.registerComponent(appName, () => Barcode);

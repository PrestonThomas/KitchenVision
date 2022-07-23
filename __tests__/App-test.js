/**
 * @format
 */

import 'react-native';
import React from 'react';
import axios from 'axios';
// import App from '../App';

jest.useFakeTimers();

jest.mock('dynamsoft-capture-vision-react-native', () => { });
jest.mock('react-native-gesture-handler', () => { });
jest.mock('@react-navigation/native', () => { });
jest.mock('@react-navigation/stack', () => { });
jest.mock('@react-navigation/bottom-tabs', () => { });
jest.mock('@react-native-async-storage/async-storage', () => { });
jest.mock('react-native-storage', () => { });
jest.mock('../src/api/storage.js', () => { });
jest.mock('../src/screens/InventoryScreen.js', () => { });
jest.mock('react-native-vector-icons/MaterialIcons', () => { });

/*
Tests for rendering the app have been removed for the time being.
*/

// Note: test renderer must be required after react-native.
// import renderer from 'react-test-renderer';

// it('renders correctly', () => {
//   renderer.create(<App />);
// });


// Generic tests for the app
describe('Preflight', () => {
  // Check that config file is present and has correct values
  it('config file is present', () => {
    const config = require('../src/api/config');
    expect(typeof config.apiKey).toBe('string');
  });
}
);

// Check that the OpenFoodFacts API is working
describe('OpenFoodFacts API', () => {
  it('returns a response', async () => {
    let barcode = '9002490100070';
    let url = 'https://world.openfoodfacts.org/api/v0/product/' + barcode + '.json';
    return axios.get(url).then(response => {
      expect(response).toBeDefined();
      expect(response.status).toBe(200);
    }
    );
  });
  it('if a barcode is not found, catch it so that we can proceed', async () => {
    let barcode = '9002490100071';
    let url = 'https://world.openfoodfacts.org/api/v0/product/' + barcode + '.json';
    // Using axios here whereas the app uses fetch
    return axios.get(url).then(response => {
      expect(response.data.status).toBe(0);
    } // catch the error and check that it is the correct one
    ).catch(error => {
      expect(error.response.status).toBe(404);
    }
    );
  }
  );
  it('if an item does not have an image, catch it so that we can proceed', async () => {
    let barcode = '8719324347129';
    let url = 'https://world.openfoodfacts.org/api/v0/product/' + barcode + '.json';
    // Using axios here whereas the app uses fetch
    return axios.get(url).then(response => {
      expect(response.data.product.image_url).toBeUndefined();
    } // catch the error and check that it is the correct one
    ).catch(error => {
      console.log(error);
    }
    );
  }
  );
}
);


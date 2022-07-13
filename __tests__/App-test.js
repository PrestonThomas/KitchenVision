/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

jest.useFakeTimers();
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  renderer.create(<App />);
});

// Check that config file is present and has correct values
it('config file is present', () => {
  const config = require('../src/api/config');
  expect(typeof config.apiKey).toBe('string');
}
);


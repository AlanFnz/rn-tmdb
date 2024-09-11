import mockSafeAreaContext from 'react-native-safe-area-context/jest/mock';
import '@testing-library/jest-native/extend-expect';
import 'jest-fetch-mock';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('./__mocks__/react-native-async-storage.js'),
);

jest.mock('react-native-safe-area-context', () => mockSafeAreaContext);


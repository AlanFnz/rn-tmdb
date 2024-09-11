import asyncStorageMock from '@react-native-async-storage/async-storage/jest/async-storage-mock';

const originalSetItemMock = asyncStorageMock.setItem.bind(asyncStorageMock);
asyncStorageMock.setItem = function newSetItemMock() {
  originalSetItemMock(...arguments);
  return Promise.resolve();
};
export default asyncStorageMock;

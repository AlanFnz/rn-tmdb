import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import store, { persistor, useAppDispatch } from './src/store';
import AppNavigator from './src/navigation/AppNavigator';
import { fetchConfig } from './src/store/slices/configurationSlice';

const RootApp = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchConfig());
  }, [dispatch]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppNavigator />
    </GestureHandlerRootView>
  );
};

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RootApp />
    </PersistGate>
  </Provider>
);

export default App;

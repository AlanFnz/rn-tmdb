import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import store, { useAppDispatch } from './src/store';
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
    <RootApp />
  </Provider>
);

export default App;

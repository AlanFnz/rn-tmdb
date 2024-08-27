import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from './src/screens/HomeScreen';
import WishListScreen from './src/screens/WishListScreen';
import FilmDetailScreen from './src/screens/FilmDetailScreen';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="FilmDetail" component={FilmDetailScreen} />
        <Drawer.Screen name="Wishlist" component={WishListScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import WishListScreen from '../screens/WishListScreen';
import FilmDetailScreen from '../screens/FilmDetailScreen';

const Drawer = createDrawerNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="FilmDetail" component={FilmDetailScreen} />
        <Drawer.Screen name="Wishlist" component={WishListScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export type RootStackParamList = {
  Home: undefined;
  MovieDetailsScreen: { movieId: number };
  Wishlist: undefined;
};

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
export const useAppNavigation = () => useNavigation<NavigationProp>();

export default AppNavigator;

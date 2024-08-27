import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import WishListScreen from '../screens/WishListScreen';
import FilmDetailScreen from '../screens/FilmDetailScreen';
import Header from '../components/Header';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            header: () => <Header />,
          }}
        />
        <Stack.Screen
          name="MovieDetailsScreen"
          component={FilmDetailScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
        }}>
        <Tab.Screen name="HomeStack" component={HomeStack} />
        <Tab.Screen name="Wishlist" component={WishListScreen} />
      </Tab.Navigator>
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

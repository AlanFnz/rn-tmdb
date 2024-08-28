import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import WishListScreen from '../screens/WishListScreen';
import FilmDetailScreen from '../screens/FilmDetailScreen';
import Header from '../components/Header';
import colors from '../theme/colors';

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
          options={{
            header: () => <Header />,
          }}
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
          tabBarShowLabel: true,
          tabBarLabelStyle: {
            fontSize: 16,
            fontWeight: 'bold',
            marginBottom: 10,
          },
          tabBarStyle: {
            height: Platform.OS === 'android' ? 40 : 70,
          },
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.secondary,
        }}>
        <Tab.Screen
          name="HomeStack"
          component={HomeStack}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: () => null,
          }}
        />
        <Tab.Screen
          name="Wishlist"
          component={WishListScreen}
          options={{
            tabBarLabel: 'Wishlist',
            tabBarIcon: () => null,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export type RootStackParamList = {
  Home: undefined;
  MovieDetailsScreen: { movieId: number; genreIndex: number };
  Wishlist: undefined;
};

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
export const useAppNavigation = () => useNavigation<NavigationProp>();

export default AppNavigator;

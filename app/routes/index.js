import React from 'react';
import SignInPage from '../pages/SignIn.page';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const AppNavigation = createStackNavigator();

export default function Router() {
  return (
    <NavigationContainer>
      <AppNavigation.Navigator headerMode="none">
        <AppNavigation.Screen name="signin" component={SignInPage}/>
      </AppNavigation.Navigator>
    </NavigationContainer>
  );
}
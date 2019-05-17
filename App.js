import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import LoginScreen from './screens/LoginScreen';
import FetchExample from './screens/FetchExample';
import SplashScreen from './screens/SplashScreen';
import DetailsScreen from './screens/DetailsScreen';

const MainNavigator = createStackNavigator({
  FetchExample: {screen: FetchExample},
  DetailsScreen: {screen: DetailsScreen},
   });
   
  const App = createAppContainer(createSwitchNavigator({
    SplashScreen: {screen: SplashScreen},
    LoginScreen: { screen: LoginScreen },
    Other: { screen: MainNavigator},
    
  }));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;

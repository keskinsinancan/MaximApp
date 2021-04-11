import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TemplateScreen from './src/screens/TemplateScreen'
import CameraScreen from './src/screens/CameraScreen';
import ChooseImageScreen from './src/screens/ChooseImageScreen';
import HomeScreen from './src/screens/HomeScreen';

const Stack = createStackNavigator();

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='Search'
        >
          <Stack.Screen name="Home" component={HomeScreen}
            options={
              {
                title: 'Home',
                headerTitleStyle: { alignSelf: 'center' }
              }
            }
          />
          <Stack.Screen name="ChooseImage" component={ChooseImageScreen} />
          <Stack.Screen name="Camera" component={CameraScreen} />

        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

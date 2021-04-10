import React, {Component} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TemplateScreen from './src/screens/TemplateScreen'
import SearchScreen from './src/screens/SearchScreen'

const Stack = createStackNavigator();

export default class App extends Component{
  render(){
    return(
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='Search'
        >
          <Stack.Screen name="Search" component={SearchScreen}
            options={
              {
                title: 'Search Business',
                headerTitleStyle: { alignSelf: 'center' }
              }
            }
          />
          <Stack.Screen name = "Template" component = {TemplateScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

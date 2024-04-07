import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import Signup from './Signup';
import ProfileScreen from './ProfileScreen';

const Stack = createStackNavigator();

const ScreenNames = {
  LOGIN: 'Login',
  SIGNUP: 'Signup',
  PROFILE: 'Profile',
};

const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerMode: 'screen',
        // headerTintColor: 'white',
        // headerStyle: { backgroundColor: '#FF0000' },
      }}
    >
      <Stack.Screen name={ScreenNames.LOGIN} component={LoginScreen}
        options={{
          title: 'Login',
        }}
      />
      <Stack.Screen
        name={ScreenNames.SIGNUP}
        component={Signup}
        options={{
          title: 'Register',
        }}
      />
      <Stack.Screen
        name={ScreenNames.PROFILE}
        component={ProfileScreen}
        options={{
          title: 'Profile',
        }}
      />
    </Stack.Navigator>
  );
}

const LoginStack = () => {
  return (
    <NavigationContainer independent={true}>
      <StackNavigator />
    </NavigationContainer>
  );
}

export default LoginStack
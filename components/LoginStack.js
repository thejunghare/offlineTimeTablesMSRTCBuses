import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import Signup from './Signup';
import ProfileScreen from './ProfileScreen';
import MyTicketsScreen from './MyTicketsScreen';

const Stack = createStackNavigator();

const ScreenNames = {
    LOGIN: 'Login',
    SIGNUP: 'Signup',
    PROFILE: 'Profile',
    TICKET: 'MyTicketsScreen'
};

const StackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerMode: 'screen',
            }}
        >
            <Stack.Screen
                name={ScreenNames.LOGIN}
                component={LoginScreen}
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
            <Stack.Screen
                            name={ScreenNames.TICKET}
                            component={MyTicketsScreen}
                            options={{
                                title: 'My tickets',
                            }}
                        />
        </Stack.Navigator>
    );
}

const LoginStack = () => {
    return (
        <NavigationContainer independent={true}>
            <StackNavigator/>
        </NavigationContainer>
    );
}

export default LoginStack
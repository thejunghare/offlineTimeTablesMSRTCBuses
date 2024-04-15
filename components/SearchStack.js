import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SearchBus from './SearchBus';
import BusDetailsScreen from './BusDetailsScreen';

const Stack = createStackNavigator();

const ScreenNames = {
    Search: 'SearchBus',
    BusDetails: 'BusDetailsScreen',
};

const StackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerMode: 'screen',
                headerStyle: {
                    backgroundColor: 'white',
                },
            }}
        >

            <Stack.Screen name={ScreenNames.Search} component={SearchBus}
                          options={{
                              title: 'Home',
                          }}
            />
            <Stack.Screen name={ScreenNames.BusDetails} component={BusDetailsScreen}
                          options={{
                              title: 'Bus Details',
                          }}
            />
        </Stack.Navigator>
    );
}

const SearchStack = () => {
    return (
        <NavigationContainer independent={true}>
            <StackNavigator/>
        </NavigationContainer>
    );
}

export default SearchStack
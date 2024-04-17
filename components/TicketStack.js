import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TicketOptionScreen from './TicketOptionScreen';
import UnReservedTicketScreen from './UnReservedTicketScreen';
// import ReservedTicketScreen from './ReservedTicketScreen';
import PassTicketScreen from './PassTicketScreen';

const Stack = createStackNavigator();

const ScreenNames = {
    TicketOption: 'TicketOptionScreen',
    UnReservedTicket: 'UnReservedTicketScreen',
    // ReservedTicket: 'ReservedTicketScreen',
    PassTicket: 'PassTicketScreen',
};

const StackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerMode: 'screen',
                // headerTintColor: 'white',
                headerStyle: {
                    backgroundColor: 'white',
                    // shadowColor: '#000',
                    // shadowOffset: { width: 0, height: 1 },
                    // shadowOpacity: 0.2,
                    // shadowRadius: 2,
                    // elevation: 2,
                },
            }}
        >

            <Stack.Screen name={ScreenNames.TicketOption} component={TicketOptionScreen}
                options={{
                    title: 'Ticket',
                }}
            />
            <Stack.Screen name={ScreenNames.UnReservedTicket} component={UnReservedTicketScreen}
                options={{
                    title: 'Un-Reserved Ticket',
                }}
            />
            {/* <Stack.Screen
                name={ScreenNames.ReservedTicket}
                component={ReservedTicketScreen}
                options={{
                    title: 'Reserved Ticket',
                }}
            /> */}
            <Stack.Screen
                name={ScreenNames.PassTicket}
                component={PassTicketScreen}
                options={{
                    title: 'Monthly Pass',
                }}
            />
        </Stack.Navigator>
    );
}

const TicketStack = () => {
    return (
        <NavigationContainer independent={true}>
            <StackNavigator />
        </NavigationContainer>
    );
}

export default TicketStack
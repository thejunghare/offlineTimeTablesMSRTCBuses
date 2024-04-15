// BusDetailsScreen.js

import React from 'react';
import { View, Text } from 'react-native';

const BusDetailsScreen = ({ route }) => {
    const { bus } = route.params;

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Bus Name: {bus.name}</Text>
            <Text>Source: {bus.source}</Text>
            <Text>Destination: {bus.destination}</Text>
            {/* Add more details here */}
        </View>
    );
};

export default BusDetailsScreen;

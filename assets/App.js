import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './styles';

const BusSearch = () => {
    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');
    const [buses, setBuses] = useState([]);
    const [currentBusIndex, setCurrentBusIndex] = useState(0);
    const [selectedBus, setSelectedBus] = useState(null);

    const handleSearch = () => {
        if (!source || !destination) {
            alert('Please enter source and destination');
            return;
        }

        // Here you would make an API call to retrieve
        // For this example, we will just hard-code some sample data
        const sampleBuses = [
            {
                route: 'Satara - Sajjangad',
                source: 'Satara',
                destination: 'Parli',
                time: '10:00 AM',
                fare: '₹25',
            },
            {
                route: 'Satara - Kari',
                source: 'Satara',
                destination: 'Parli',
                time: '7:00 PM',
                fare: '₹25',
            },
            {
                route: 'Satara - Kari',
                source: 'Satara',
                destination: 'Parli',
                time: '8:30 PM',
                fare: '₹25',
            },

            {
                route: 'Satara - Kari',
                source: 'Satara',
                destination: 'Parli',
                time: '11:30 PM',
                fare: '₹25',
            },
        ];

        const now = new Date();
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();

        // Filter the buses by the ones that depart after the current time
        const availableBuses = sampleBuses
            .filter((bus) => {
                const [hour, minute, period] = bus.time.split(/:| /);
                const adjustedHour = parseInt(hour) + (period === 'PM' ? 12 : 0); // Adjust for PM time
                return (
                    adjustedHour > currentHour ||
                    (adjustedHour === currentHour && parseInt(minute) >= currentMinute)
                );
            })
            .sort((a, b) => {
                // Sort the available buses by their departure time
                const [hourA, minuteA, periodA] = a.time.split(/:| /);
                const [hourB, minuteB, periodB] = b.time.split(/:| /);
                const adjustedHourA = parseInt(hourA) + (periodA === 'PM' ? 12 : 0); // Adjust for PM time
                const adjustedHourB = parseInt(hourB) + (periodB === 'PM' ? 12 : 0); // Adjust for PM time
                if (adjustedHourA < adjustedHourB) {
                    return -1;
                } else if (adjustedHourA > adjustedHourB) {
                    return 1;
                } else {
                    if (parseInt(minuteA) < parseInt(minuteB)) {
                        return -1;
                    } else if (parseInt(minuteA) > parseInt(minuteB)) {
                        return 1;
                    } else {
                        return 0;
                    }
                }
            });
        setBuses(availableBuses);
        setCurrentBusIndex(0);
        setSelectedBus(availableBuses[0] || null);
    };

    const handlePrevious = () => {
        if (currentBusIndex > 0) {
            setCurrentBusIndex(currentBusIndex - 1);
            setSelectedBus(buses[currentBusIndex - 1]);
        }
    };

    const handleNext = () => {
        if (currentBusIndex < buses.length - 1) {
            setCurrentBusIndex(currentBusIndex + 1);
            setSelectedBus(buses[currentBusIndex + 1]);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter source"
                    value={source}
                    onChangeText={(text) => setSource(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Enter destination"
                    value={destination}
                    onChangeText={(text) => setDestination(text)}
                />
                <Button title="Search" onPress={handleSearch} />
            </View>{' '}
            {selectedBus ? (
                <ScrollView style={styles.scrollContainer}>
                    <Text style={styles.routeText}>{selectedBus.route}</Text>
                    <Text style={styles.routeInfo}>
                        {selectedBus.source} to {selectedBus.destination}
                    </Text>
                    <Text style={styles.routeInfo}>{selectedBus.time}</Text>
                    <Text style={styles.routeInfo}>{selectedBus.fare}</Text>
                </ScrollView>
            ) : (
                <View style={styles.noBusesContainer}>
                    <Text style={styles.noBusesText}>No buses found</Text>
                </View>
            )}
            <View style={styles.buttonContainer}>
                <Button title="Previous" onPress={handlePrevious} />
                <Button title="Next" onPress={handleNext} />
            </View>
        </SafeAreaView>
    );
};

export default BusSearch;

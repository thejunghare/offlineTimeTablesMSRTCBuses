import React, { useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, FlatList, } from 'react-native'
import { firebase, auth } from '../firebase'
import { useNavigation } from '@react-navigation/native';



export default function ProfileScreen() {
    const navigation = useNavigation();

    const handleLogout = () => {
        auth.signOut()
            .then(() => {
                navigation.replace("Login")

            })
            .catch(error => alert(error.message))
    }

    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        const fetchTickets = async () => {
            const bookedTicketsRef = firebase.firestore().collection('bookedTickets');
            // Use try-catch for error handling
            try {
                const querySnapshot = await bookedTicketsRef.get();
                const ticketData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setTickets(ticketData);
            } catch (error) {
                console.error('Error fetching tickets: ', error);
            }
        };

        // Call the function to fetch tickets
        fetchTickets();

        // Cleanup function
        return () => {
            // Unsubscribe from Firestore listener if any
        };
    }, []);

    return (
        <View style={styles.container}>
            <Text>Email: {auth.currentUser?.email}</Text>
            <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
                <Text style={styles.loginText}>Logout</Text>
            </TouchableOpacity>



            <View>
                {tickets.map(ticket => (
                    <View key={ticket.id}>
                        <Text>{ticket.BusName}</Text>
                    </View>
                ))}
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        minWidth: '100%',
        padding: 16,
    },
    inputView: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        justifyContent: 'center',
        padding: 20,
    },
    inputText: {
        height: 50,
        color: 'black',
    },
    logoutBtn: {
        width: '50%',
        backgroundColor: '#FF0000',
        borderRadius: 25,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    loginText: {
        color: 'white',
    },
    signupText: {
        color: '#003f5c',
    },
});

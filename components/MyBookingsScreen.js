import React, { useState, useEffect } from "react";
import { View, TouchableOpacity } from "react-native";
import { Text, IconButton, Card, Avatar } from "react-native-paper";
import { firebase, auth } from "../firebase";

const MyBookingsScreen = () => {

    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        const fetchTickets = async () => {
            const bookedTicketsRef = firebase.firestore().collection("bookedTickets");
            // Use try-catch for error handling
            try {
                const querySnapshot = await bookedTicketsRef.get();
                const ticketData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setTickets(ticketData);
            } catch (error) {
                console.error("Error fetching tickets: ", error);
            }
        };

        // Call the function to fetch tickets
        fetchTickets();

        // Cleanup function
        return () => {
            // Unsubscribe from Firestore listener if any
        };
    }, []);

    const handleShowTicketDetails = () => {
        console.log("Hello world");
    };

    return(
        <TouchableOpacity onPress={handleShowTicketDetails} className="w-11/12">
                {tickets.map((ticket) => (
                    <View key={ticket.id} className=" bg-white my-4 rounded-lg">
                        <View className="bg-ezgo-red p-3 rounded-t-lg">
                            <Text className="text-xl text-white font-semibold tracking-wider">
                                {ticket.busName}
                            </Text>
                        </View>
                        <View className="flex flex-row items-center justify-between  p-4">
                            <Text className="text-sm font-medium text-slate-500">
                                {/* {`Ticket ID: ${ticket.id}`} */}
                                10:00 AM . {ticket.source}
                            </Text>

                            <Text >
                                -
                            </Text>

                            <Text className="text-sm font-medium text-slate-500">
                                {/* {`Ticket ID: ${ticket.id}`} */}
                                06:00 PM . {ticket.destination}
                            </Text>
                        </View>
                    </View>
                ))}
            </TouchableOpacity>
    )
}

export default MyBookingsScreen
import React, { useState, useEffect } from "react";
import { View, ScrollView } from "react-native";
import { Text, IconButton, Card, Avatar } from "react-native-paper";
import { firebase, auth } from "../firebase";

const MyTicketsScreen = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [currentUserTicket, setCurrentUserTicket] = useState(null);
    useEffect(() => {
            const fetchUserDetails = async () => {
                // Get the currently authenticated user
                const user = firebase.auth().currentUser;
                if (user) {
                    // Get the user document from Firestore using the user's UID
                    const userRef = firebase.firestore().collection("users").doc(user.uid);

                    try {
                        const docSnapshot = await userRef.get();
                        if (docSnapshot.exists) {
                            // Set the user data to state
                            setCurrentUser(docSnapshot.data());
                        } else {
                            console.error("User document does not exist");
                        }
                    } catch (error) {
                        console.error("Error fetching user: ", error);
                    }
                } else {
                    console.error("No user is currently authenticated");
                }
            };

            const fetchUserMonthlyPass = async () => {
                try {
                    const currentUser = firebase.auth().currentUser;
                    const monthlyPassRef = firebase
                        .firestore()
                        .collection("users")
                        .doc(currentUser.uid)
                        .collection("monthlyPass");

                    const querySnapshot = await monthlyPassRef.get();

                    const userPasses = [];
                    querySnapshot.forEach((doc) => {
                        userPasses.push({
                            id: doc.id,
                            data: doc.data(),
                        });
                    });

                    setCurrentUserMonthlyPass(userPasses);
                } catch (error) {
                    console.error("Error fetching user monthly passes: ", error);
                }
            };

            const fetchUserTickets = async () => {
                try {
                    const currentUser = firebase.auth().currentUser;
                    const unreversedTicketsRef = firebase
                        .firestore()
                        .collection("users")
                        .doc(currentUser.uid)
                        .collection("unreversedTickets");

                    const querySnapshot = await unreversedTicketsRef.get();

                    const userTickets = [];
                    querySnapshot.forEach((doc) => {
                        userTickets.push({
                            id: doc.id,
                            data: doc.data(),
                        });
                    });

                    setCurrentUserTicket(userTickets);
                } catch (error) {
                    console.error("Error fetching user tickets: ", error);
                }
            };

            fetchUserDetails();
            fetchUserTickets();

            return () => {
            };
        }, []);

    return(
<ScrollView>
          {currentUserTicket !== null && currentUserTicket.length > 0 ? (
        currentUserTicket.map((ticket, index) => (
          <View key={index} className={"bg-white rounded-xl m-2 p-2"}>
            <Text>Ticket ID: {ticket.id}</Text>
            <Text>Source: {ticket.data.ticketInfo.source}</Text>
            <Text>Destination: {ticket.data.ticketInfo.destination}</Text>
            <Text>Fare: {ticket.data.ticketInfo.fare}</Text>
          </View>
        ))
      ) : (
        <Text>No tickets found.</Text>
      )}
</ScrollView>
    )
}

export default MyTicketsScreen
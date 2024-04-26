import React, { useState, useEffect } from "react";
import { View, ScrollView } from "react-native";
import { Text, TouchableRipple } from "react-native-paper";
import { firebase, auth } from "../firebase";
import { useNavigation } from "@react-navigation/native";

const MyTicketsScreen = () => {
  const navigation = useNavigation();

  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserTicket, setCurrentUserTicket] = useState(null);

  const options = { weekday: "short", month: "short", day: "numeric" };

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

    return () => {};
  }, []);

  return (
    <ScrollView>
      {currentUserTicket !== null && currentUserTicket.length > 0 ? (
        currentUserTicket.map((ticket, index) => (
          <TouchableRipple
            key={index}
            onPress={() =>
              navigation.navigate("MyTicketDetailsScreen", {
                ticket: ticket.data,
                id: ticket.id
              })
            }
          >
            <View className={"bg-white rounded-xl m-2 p-3 flex"}>
              <View className={"flex flex-row items-center justify-between"}>
                <Text className={"text-zinc-300 text-sm"}>source</Text>
                <Text className={"text-zinc-300 text-sm"}>Destination</Text>
              </View>

              <View
                className={
                  "mb-2 flex flex-row items-center justify-between border-b border-dashed border-zinc-300"
                }
              >
                <Text className={"text-base font-bold"}>
                  {ticket.data.ticketInfo.source}
                </Text>
                <Text className={"text-base font-bold"}>
                  {ticket.data.ticketInfo.destination}
                </Text>
              </View>

              <View
                className={"mt-2 flex flex-row items-center justify-between"}
              >
                <Text className={"text-base font-bold"}>
                  ₹{ticket.data.ticketInfo.fare}
                </Text>
                <Text className={"text-base font-bold"}>
                  {ticket.data.createdAt.toDate().toLocaleDateString("en-US", options).toString()}
                </Text>
              </View>
            </View>
          </TouchableRipple>
        ))
      ) : (
        <Text className={"text-base text-ezgo-red m-5 text-center font-bold"}>
          No tickets found!
        </Text>
      )}
    </ScrollView>
  );
};

export default MyTicketsScreen;

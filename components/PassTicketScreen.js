import React, { useState, useEffect } from "react";
import { View, TouchableOpacity } from "react-native";
import { Text, IconButton, Card, Avatar } from "react-native-paper";
import { firebase, auth } from "../firebase";

const PassTicketScreen = () => {
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

  return (
    <View className="flex-1 items-center w-full bg-gray-50">
      {tickets.map((ticket) => (
        <View className="mt-4 rounded-lg bg-white flex flex-col w-11/12">
          <View className="flex flex-row items center justify-between p-5">
            <Text className="font-bold text-base">{ticket.source}</Text>
            <Text className="font-bold text-base">{ticket.destination}</Text>
          </View>
          <View className="border-t border-slate-300 border-dashed p-5 flex flex-row items-center justify-between">
            <View className="p-2">
              <Text className="font-bold text-base tracking-wide">
                Adults:{" "}
                <Text className="text-slate-500">{ticket.numberOfAdults}</Text>
              </Text>
              <Text className="font-bold text-base tracking-wide">
                Children:{" "}
                <Text className="text-slate-500">
                  {ticket.numberOfChildren}
                </Text>
              </Text>
            </View>
            <View className="p-2">
              <Text className="font-bold text-base tracking-wide">
                Women:{" "}
                <Text className="text-slate-500">{ticket.numberOfWomen}</Text>{" "}
              </Text>
              <Text className="font-bold text-base tracking-wide">
                Fare: <Text className="text-slate-500">₹{ticket.fare}</Text>
              </Text>
            </View>
          </View>
          <View className="border-t border-slate-300 border-dashed p-5">
            <Text className="font-bold text-base mb-2">
              Ticket ID:{" "}
              <Text className="text-slate-500 tracking-wide">{ticket.id}</Text>
            </Text>
            <Text className="font-bold text-base mb-2">
              Date:{" "}
              <Text className="text-slate-500 tracking-wide text-sm">
                Wed 17-Apr
              </Text>
            </Text>
            <Text className="font-bold text-base mb-2">
              Time:{" "}
              <Text className="text-slate-500 tracking-wide text-sm">
                11h : 48m : 58s
              </Text>
            </Text>
            <Text className="font-bold text-base tracking-wide">
              Note:{" "}
              <Text className="text-slate-500 text-sm tracking-wide">
                Journey Should Commence within 1 hour
              </Text>
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default PassTicketScreen;

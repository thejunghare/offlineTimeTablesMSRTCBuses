import React from "react";
import { View, Text } from "react-native";

const MyTicketDetailsScreen = ({ route }) => {
  const { ticket, id } = route.params;

  const ticketDateAndTime = ticket.createdAt;
  const date = ticketDateAndTime.toDate();

  const options = { weekday: "short", month: "short", day: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedTime = `${hours % 12 || 12}:${
    minutes < 10 ? "0" : ""
  }${minutes} ${ampm}`;

  const formattedDateTime = `${formattedDate} . ${formattedTime}`;

  return (
    <View className="flex-1 items-center w-full bg-gray-50">
      <View className="mt-4 rounded-lg bg-white flex flex-col w-11/12">
        <View className="flex flex-row items center justify-between p-5">
          <Text className="font-bold text-base">
            {ticket.ticketInfo.source}
          </Text>
          <Text className="font-bold text-base">
            {ticket.ticketInfo.destination}
          </Text>
        </View>
        <View className="border-t border-slate-300 border-dashed p-5 flex flex-row items-center justify-between">
          <View className="p-2">
            <Text className="font-bold text-base tracking-wide">
              Adults:{" "}
              <Text className="text-slate-500">{ticket.ticketInfo.adults} </Text>
            </Text>
            <Text className="font-bold text-base tracking-wide">
              Children:{" "}
              <Text className="text-slate-500">
                {ticket.ticketInfo.children}
              </Text>
            </Text>
          </View>
          <View className="p-2">
            <Text className="font-bold text-base tracking-wide">
              Women:{" "}
              <Text className="text-slate-500">{ticket.ticketInfo.women}</Text>{" "}
            </Text>
            <Text className="font-bold text-base tracking-wide">
              Fare:{" "}
              <Text className="text-slate-500">₹{ticket.ticketInfo.fare}</Text>
            </Text>
          </View>
        </View>
        <View className="border-t border-slate-300 border-dashed p-5">
          <Text className="font-bold text-base mb-2">Ticket ID: <Text className="text-slate-500 tracking-wide">{id}</Text></Text>

          <Text className="font-bold text-base mb-2">Date: <Text className="text-slate-500 tracking-wide text-sm">{formattedDateTime}</Text></Text>

          <Text className="font-bold text-base mb-2">
            Jounrey time:{" "}
            <Text className="text-slate-500 tracking-wide text-sm"></Text>
          </Text>

          <Text className="font-bold text-base tracking-wide">
            Note:{" "}
            <Text className="text-slate-500 text-sm tracking-wide">
              Journey Should Commence within 1 hour
            </Text>
          </Text>

        </View>
      </View>
    </View>
  );
};

export default MyTicketDetailsScreen;

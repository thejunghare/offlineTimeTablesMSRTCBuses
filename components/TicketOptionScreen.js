import * as React from "react";
import { View, Text } from "react-native";
import { List, TouchableRipple } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const TicketOptionScreen = () => {
  const navigation = useNavigation();

  /*   const handleReservedTicket = () => {
            navigation.navigate('ReservedTicketScreen')
        } */

  const handleUnReservedTicket = () => {
    navigation.navigate("UnReservedTicketScreen");
  };

  const handlePassTicket = () => {
    navigation.navigate("PassTicketScreen");
  };

  return (
    <View className="flex-1 w-full bg-gray-50">
      <Text className="text-xs font-bold px-5 mt-5 ">Ticket</Text>
      <View className="bg-white border border-slate-200 m-5 rounded-xl">
        <TouchableRipple
          onPress={handleUnReservedTicket}
          rippleColor="rgba(0, 0, 0, .32)"
          className=""
        >
          <List.Item
            title="Unreserved ticket"
            description="Quick book, paper less travel"
            left={(props) => <List.Icon {...props} icon="ticket-outline" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
          />
        </TouchableRipple>
      </View>

      <Text className="text-xs font-bold px-5 mt-5 ">Pass</Text>
      <View className="bg-white border border-slate-200 m-5 rounded-xl">
        <TouchableRipple
          onPress={handlePassTicket}
          rippleColor="rgba(0, 0, 0, .32)"
        >
          <List.Item
            title="Monthly pass"
            description="Get new monthly pass"
            left={(props) => <List.Icon {...props} icon="ticket-account" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
          />
        </TouchableRipple>
      </View>
    </View>
  );
};

export default TicketOptionScreen;

import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { List, TouchableRipple, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { firebase, auth } from "../firebase";

const TicketOptionScreen = () => {
  const navigation = useNavigation();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });

    return subscriber;
  }, []);

  /*const handleReservedTicket = () => {
    navigation.navigate('ReservedTicketScreen')
  }*/

  const handleUnReservedTicket = () => {
    navigation.navigate("UnReservedTicketScreen");
  };

  const handlePassTicket = () => {
    navigation.navigate("PassTicketScreen");
  };

  return (
    <View className="flex-1 w-full bg-gray-50 justify-between">
      <View>
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

      <View>
        {user ? (
          <Text className="text-gray-50">Welcome, {user.email}</Text>
        ) : (
          <Button
            className="bg-ezgo-red m-5 rounded-3xl p-1.5"
            mode="elevated"
            color="white"
            dark={true}
            onPress={() => navigation.navigate("LoginScreen")}
            uppercase="false"
          >
            Login to book tickets
          </Button>
        )}
      </View>
    </View>
  );
};

export default TicketOptionScreen;

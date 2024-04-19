import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { firebase, auth } from "../firebase";
import { useNavigation } from "@react-navigation/native";
import {
  Avatar,
  Divider,
  List,
  TouchableRipple,
  RadioButton,
} from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ProfileScreen = () => {
  const navigation = useNavigation();

  const [checked, setChecked] = React.useState("first");

  const handleAccountPress = () => {
    navigation.navigate("AccountScreen");
  };

  const handleHelpPress = () => {
    navigation.navigate("HelpScreen");
  };

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };

  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      const bookedTicketsRef = firebase.firestore().collection("bookedTickets");
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

    fetchTickets();

    return () => {};
  }, []);

  return (
    <View className="flex-1 w-full bg-gray-50">
      <Text className="text-xs font-bold px-5 mt-5 ">Account</Text>
      <View className="bg-white border border-slate-200 m-5 rounded-xl">
        <TouchableRipple
          rippleColor="rgba(0, 0, 0, .32)"
          className="border-b border-slate-200"
          onPress={handleLogout}
        >
          <List.Item
            title={auth.currentUser?.email}
            description="Logout"
            left={(props) => <List.Icon {...props} icon="account-outline" />}
            right={(props) => <List.Icon {...props} icon="logout-variant" />}
          />
        </TouchableRipple>

        <TouchableRipple rippleColor="rgba(0, 0, 0, .32)" className="0 ">
          <List.Item
            title="Settings"
            description="Update profile, update password"
            left={(props) => (
              <List.Icon {...props} icon="account-settings-outline" />
            )}
            right={(props) => <List.Icon {...props} icon="arrow-right" />}
          />
        </TouchableRipple>
      </View>

      <Text className="text-xs font-bold px-5">My bookings</Text>
      <View className="bg-white border border-slate-200 m-5 rounded-xl">
        <TouchableRipple
          rippleColor="rgba(0, 0, 0, .32)"
          className="border-b border-slate-200"
        >
          <List.Item
            title="Tickets"
            description="Unversed tickets"
            left={(props) => (
              <List.Icon {...props} icon="ticket-confirmation-outline" />
            )}
            right={(props) => <List.Icon {...props} icon="arrow-right" />}
          />
        </TouchableRipple>

        <TouchableRipple rippleColor="rgba(0, 0, 0, .32)">
          <List.Item
            title="Monthly Pass"
            description="Monthly pass"
            left={(props) => <List.Icon {...props} icon="ticket-account" />}
            right={(props) => <List.Icon {...props} icon="arrow-right" />}
          />
        </TouchableRipple>
      </View>

      <Text className="text-xs font-bold px-5">Support</Text>
      <View className="bg-white border border-slate-200 m-5 rounded-xl">
        <TouchableRipple
          rippleColor="rgba(0, 0, 0, .32)"
          className="border-b border-slate-200"
        >
          <List.Item
            title="Help"
            description="Payments, tickets, privacy policy"
            left={(props) => (
              <List.Icon {...props} icon="help-circle-outline" />
            )}
            right={(props) => <List.Icon {...props} icon="arrow-right" />}
          />
        </TouchableRipple>

        <TouchableRipple
          rippleColor="rgba(0, 0, 0, .32)"
          className="border-b border-slate-200"
        >
          <List.Item
            title="Support"
            description="Contact us, write us"
            left={(props) => <List.Icon {...props} icon="call-made" />}
            right={(props) => <List.Icon {...props} icon="arrow-right" />}
          />
        </TouchableRipple>

        <TouchableRipple rippleColor="rgba(0, 0, 0, .32)">
          <List.Item
            title="Feedback"
            description="Bus feedback, tickets feedback"
            left={(props) => <List.Icon {...props} icon="bug-outline" />}
            right={(props) => <List.Icon {...props} icon="arrow-right" />}
          />
        </TouchableRipple>
      </View>
    </View>
  );
};

export default ProfileScreen;

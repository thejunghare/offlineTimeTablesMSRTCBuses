import React, { useEffect, useState } from "react";
import { ScrollView,Text, View } from "react-native";
import { firebase, auth } from "../firebase";
import { useNavigation } from "@react-navigation/native";
import { List, TouchableRipple } from "react-native-paper";

const ProfileScreen = () => {
  const navigation = useNavigation();

  const handleAccountPress = () => {
    navigation.navigate("AccountScreen");
  };

  const handleHelpPress = () => {
    navigation.navigate("HelpScreen");
  };

  const handleSupportPress = () => {
    navigation.navigate("CallSupportScreen");
  };

  const handleFeedbackPress = () => {
    navigation.navigate("FeedbackScreen");
  };

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };

  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserTicket, setCurrentUserTicket] = useState(null);
  const [currentUserMonthlyPass, setCurrentUserMonthlyPass] = useState(null);

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
    fetchUserMonthlyPass();

    return () => {};
  }, []);

  return (
    <ScrollView className="flex-1 w-full bg-gray-50">
      <Text className="text-xs font-bold px-5 mt-5 ">Account</Text>

      {/* {currentUser && <Text>{currentUser.userPhoneNumber}</Text>} */}

      {/* access unreversed tickets */}
      {/*    {currentUserTicket !== null && currentUserTicket.length > 0 ? (
        currentUserTicket.map((ticket, index) => (
          <View key={index} style={{ marginBottom: 10 }}>
            <Text>Ticket ID: {ticket.id}</Text>
            <Text>Source: {ticket.data.ticketInfo.source}</Text>
            <Text>Destination: {ticket.data.ticketInfo.destination}</Text>
            <Text>Fare: ₹{ticket.data.ticketInfo.fare}</Text>
          </View>
        ))
      ) : (
        <Text>No tickets found.</Text>
      )} */}

      {/* access monthly passes */}
      {/* {currentUserMonthlyPass !== null && currentUserMonthlyPass.length > 0 ? (
        currentUserMonthlyPass.map((pass, index) => (
          <View key={index} style={{ marginBottom: 10 }}>
            <Text>Ticket ID: {pass.id}</Text>
            <Text>Source: {pass.data.monthlyPassInfo.source}</Text>
            <Text>Destination: {pass.data.monthlyPassInfo.destination}</Text>
            <Text>Fare: ₹{pass.data.monthlyPassInfo.fare}</Text>
          </View>
        ))
      ) : (
        <Text>No pass found.</Text>
      )} */}

      <View className="bg-white border border-slate-200 m-5 rounded-xl">
        <TouchableRipple
          rippleColor="rgba(0, 0, 0, .32)"
          className="border-b border-slate-200"
          onPress={handleLogout}
        >
          <List.Item
            title={currentUser && currentUser.displayName}
            description={auth.currentUser?.email}
            left={(props) => <List.Icon {...props} icon="account-outline" />}
            right={(props) => <List.Icon {...props} icon="logout-variant" />}
          />
        </TouchableRipple>

        {/* update account details */}
        <TouchableRipple
          rippleColor="rgba(0, 0, 0, .32)"
          className=""
          onPress={handleAccountPress}
        >
          <List.Item
            title="Settings"
            description="Update profile, update password"
            left={(props) => (
              <List.Icon {...props} icon="account-settings-outline" />
            )}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
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
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
          />
        </TouchableRipple>

        <TouchableRipple rippleColor="rgba(0, 0, 0, .32)">
          <List.Item
            title="Monthly Pass"
            description="Monthly pass"
            left={(props) => <List.Icon {...props} icon="ticket-account" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
          />
        </TouchableRipple>
      </View>

      <Text className="text-xs font-bold px-5">Support</Text>
      <View className="bg-white border border-slate-200 m-5 rounded-xl">
        <TouchableRipple
          rippleColor="rgba(0, 0, 0, .32)"
          className="border-b border-slate-200"
          onPress={handleHelpPress}
        >
          <List.Item
            title="Help"
            description="Payments, tickets, privacy policy"
            left={(props) => (
              <List.Icon {...props} icon="help-circle-outline" />
            )}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
          />
        </TouchableRipple>

        <TouchableRipple
          rippleColor="rgba(0, 0, 0, .32)"
          className="border-b border-slate-200"
          onPress={handleSupportPress}
        >
          <List.Item
            title="Support"
            description="Contact us, write us"
            left={(props) => <List.Icon {...props} icon="call-made" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
          />
        </TouchableRipple>

        <TouchableRipple
          rippleColor="rgba(0, 0, 0, .32)"
          onPress={handleFeedbackPress}
        >
          <List.Item
            title="Feedback"
            description="Bus feedback, tickets feedback"
            left={(props) => <List.Icon {...props} icon="bug-outline" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
          />
        </TouchableRipple>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;

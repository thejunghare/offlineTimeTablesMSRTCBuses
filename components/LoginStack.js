import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./LoginScreen";
import Signup from "./Signup";
import ProfileScreen from "./ProfileScreen";
import MyTicketsScreen from "./MyTicketsScreen";
import AccountScreen from "./AccountScreen";
import MyMonthlyPasses from "./MyMonthlyPasses";
import FeedbackScreen from "./FeedbackScreen";
import HelpScreen from "./HelpScreen";
import SupportScreen from "./SupportScreen";
import MyTicketDetailsScreen from "./MyTicketDetailsScreen";

const Stack = createStackNavigator();

const ScreenNames = {
  LOGIN: "Login",
  SIGNUP: "Signup",
  PROFILE: "Profile",
  TICKET: "MyTicketsScreen",
  ACCOUNT: "AccountScreen",
  MONTHLYPASS: "MyMonthlyPasses",
  FEEDBACK: "FeedbackScreen",
  SUPPORT: "SupportScreen",
  HELP: "HelpScreen",
  TICKETDETAIL: "MyTicketDetailsScreen",
};

const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerMode: "screen",
      }}
    >
      <Stack.Screen
        name={ScreenNames.LOGIN}
        component={LoginScreen}
        options={{
          title: "Login",
        }}
      />
      <Stack.Screen
        name={ScreenNames.SIGNUP}
        component={Signup}
        options={{
          title: "Register",
        }}
      />
      <Stack.Screen
        name={ScreenNames.PROFILE}
        component={ProfileScreen}
        options={{
          title: "Profile",
        }}
      />
      <Stack.Screen
        name={ScreenNames.TICKET}
        component={MyTicketsScreen}
        options={{
          title: "My tickets",
        }}
      />
      <Stack.Screen
        name={ScreenNames.ACCOUNT}
        component={AccountScreen}
        options={{
          title: "My account",
        }}
      />
      <Stack.Screen
        name={ScreenNames.MONTHLYPASS}
        component={MyMonthlyPasses}
        options={{
          title: "My pass",
        }}
      />
      <Stack.Screen
        name={ScreenNames.FEEDBACK}
        component={FeedbackScreen}
        options={{
          title: "Feedback",
        }}
      />
      <Stack.Screen
        name={ScreenNames.SUPPORT}
        component={SupportScreen}
        options={{
          title: "Support",
        }}
      />
      <Stack.Screen
        name={ScreenNames.HELP}
        component={HelpScreen}
        options={{
          title: "Help",
        }}
      />
      <Stack.Screen
        name={ScreenNames.TICKETDETAIL}
        component={MyTicketDetailsScreen}
        options={{
          title: "Ticket details",
        }}
      />
    </Stack.Navigator>
  );
};

const LoginStack = () => {
  return (
    <NavigationContainer independent={true}>
      <StackNavigator />
    </NavigationContainer>
  );
};

export default LoginStack;

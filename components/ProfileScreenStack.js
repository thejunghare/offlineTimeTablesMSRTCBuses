import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import AccountScreen from "./AccountScreen";
import HelpScreen from "./HelpScreen";
import CallSupportScreen from "./CallSupportScreen";
import FeedbackScreen from "./FeedbackScreen";

const Stack = createStackNavigator();

const ScreenNames = {
  ACCOUNT: "AccountScreen",
  HELP: "HelpScreen",
  CALLSUPPORT: "CallSupportScreen",
  FEEDBACK: "FeedbackScreen",
};

const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerMode: "screen",
        headerStyle: {
          backgroundColor: "white",
        },
      }}
    >
      <Stack.Screen
        name={ScreenNames.ACCOUNT}
        component={AccountScreen}
        options={{
          title: "Account",
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
        name={ScreenNames.CALLSUPPORT}
        component={CallSupportScreen}
        options={{
          title: "Call support",
        }}
      />
      <Stack.Screen
        name={ScreenNames.FEEDBACK}
        component={FeedbackScreen}
        options={{
          title: "Feedback",
        }}
      />
    </Stack.Navigator>
  );
};

const ProfileScreenStack = () => {
  return (
    <NavigationContainer independent={true}>
      <StackNavigator />
    </NavigationContainer>
  );
};

export default ProfileScreenStack;

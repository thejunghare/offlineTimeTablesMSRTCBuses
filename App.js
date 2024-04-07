import 'react-native-gesture-handler';
import React, { useState } from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// icons imports
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

// screen imports
import SearchBus from "./components/SearchBus";
import LoginStack from "./components/LoginStack";
import TicketStack from "./components/TicketStack";
import SettingScreen from "./components/Settings";

const Feed = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <SearchBus />
    </View>
  );
}

const Profile = () => {
  return (
    <View style={{ flex: 1 }}>
      <LoginStack />
    </View>
  );
}

const Ticket = () => {
  return (
    <View style={{ flex: 1 }}>
      <TicketStack />
    </View>
  );
}

const Settings = () => {
  return (
    <View style={{ flex: 1 }}>
      <Settings />
    </View>
  );
}

const Tab = createBottomTabNavigator();

const MyTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={{
        tabBarActiveTintColor: "#FF0000",
      }}
    >
      <Tab.Screen
        name="Home"
        component={Feed}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Ticket"
        component={Ticket}
        options={{
          headerShown: false,
          tabBarLabel: () => null,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ticket-outline" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarLabel: () => null,
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="user" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingScreen}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="setting" size={24} color="black" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}

export default App
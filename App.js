import "react-native-gesture-handler";
import React, { useState } from "react";
import { View, Animated } from "react-native";
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as Location from "expo-location";

// icons imports
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

// screen imports
import SearchBus from "./components/SearchBus";
import SearchStack from "./components/SearchStack";
import LoginStack from "./components/LoginStack";
import TicketStack from "./components/TicketStack";
import SettingsStack from "./components/SettingsStack";

const Feed = () => {
  return (
    <View style={{ flex: 1 }}>
      <SearchStack />
    </View>
  );
};

const Profile = () => {
  return (
    <View style={{ flex: 1 }}>
      <LoginStack />
    </View>
  );
};

const Ticket = () => {
  return (
    <View style={{ flex: 1 }}>
      <TicketStack />
    </View>
  );
};

const Settings = () => {
  return (
    <View style={{ flex: 1 }}>
      <SettingsStack />
    </View>
  );
};

const Tab = createBottomTabNavigator();

const MyTabs = ({ route }) => {
  const focusedRoute = route ? getFocusedRouteNameFromRoute(route) : "Feed";

  return (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: focusedRoute === "Feed" ? "#C51E3A" : undefined,
        tabBarLabelStyle: {
          fontWeight: 900,
          fontSize: 11,
          padding: 10,
          letterSpacing: 0.5,
        },
        tabBarStyle: {
          height: 80,
          padding: 15,
        },
        tabBarIconStyle: {
          backgroundColor: "green",
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={Feed}
        options={{
          headerShown: false,
         headerStyle: {
            backgroundColor: "white",
            shadowColor: "#000",
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          },
          tabBarLabel: "EZGO",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" size={26} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Ticket"
        component={Ticket}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: "white",
            shadowColor: "#000",
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          },
          tabBarLabel: "Tickets",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ticket-outline" size={26} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,

          tabBarLabel: "Account",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="user" size={26} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: "white",
            shadowColor: "#000",
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          },
          tabBarLabel: "Settings",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="setting" size={26} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
};

export default App;

import "react-native-gesture-handler";
import React, { useState } from "react";
import { View,Animated } from "react-native";
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// icons imports
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

// screen imports
import SearchBus from "./components/SearchBus";
import SearchStack from "./components/SearchStack";
import LoginStack from "./components/LoginStack";
import TicketStack from "./components/TicketStack";
import SettingScreen from "./components/Settings";

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
      <Settings />
    </View>
  );
};

const Tab = createBottomTabNavigator();

const MyTabs = ({ route }) => {
  const focusedRoute = route ? getFocusedRouteNameFromRoute(route) : 'Feed';

  return (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: focusedRoute === 'Feed' ? '#C51E3A' : undefined,
        tabBarInactiveTintColor: focusedRoute === 'Feed' ? '#000000' : undefined,
        // tabBarShowLabel: focusedRoute === 'Feed' ? true : false,
      })}
    >
      <Tab.Screen
        name="Home"
        component={Feed}
        options={{
        headerShown: false,
          headerStyle: {
            backgroundColor: 'white',
            shadowColor: '#000',
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          },
          tabBarLabel: () => null,
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Ticket"
        component={Ticket}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: 'white',
            shadowColor: '#000',
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          },
          tabBarLabel: () => null,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ticket-outline" size={24} color={color} />
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
            <AntDesign name="user" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingScreen}
        options={{
          headerStyle: {
            backgroundColor: 'white',
            shadowColor: '#000',
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          },
          tabBarLabel: () => null,
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="setting" size={24} color={color} />
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

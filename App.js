import * as React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
// importing screens
import SearchBus from "./components/SearchBus";
import TicketBookingScreen from "./components/TicketBookingScreen";
import LoginStack from "./components/LoginStack";
import SettingScreen from "./components/Settings";

function Feed() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <SearchBus />
    </View>
  );
}

function Profile() {
  return (
    <View style={{ flex: 1 }}>
      <LoginStack />
    </View>
  );
}

function Notifications() {
  return (
    <View style={{ flex: 1 }}>
      <TicketBookingScreen />
    </View>
  );
}

function Settings() {
  return (
    <View style={{ flex: 1 }}>
      <Settings />
    </View>
  );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
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
          // headerShown: false,
          tabBarLabel: () => null,
          tabBarIcon: ({ color, size }) => (
            // <MaterialCommunityIcons name="home" color={color} size={size} />
            <AntDesign name="home" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Tickets"
        component={Notifications}
        options={{
          // headerShown: false,
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
          // headerShown: false,
          tabBarLabel: () => null,
          tabBarIcon: ({ color, size }) => (
            // <MaterialCommunityIcons name="settings" color={color} size={size} />
            <AntDesign name="setting" size={24} color="black" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}

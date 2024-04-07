import 'react-native-gesture-handler';
import React, { useState } from "react";
import { View, Text, Appearance } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { BottomNavigation, Text } from 'react-native-paper';
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
  const [theme, setTheme] = useState(Appearance.getColorScheme)

  Appearance.addChangeListener((scheme) => {
    console.log(scheme)
  })

  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}


/*
const SearchRoute = () => {
 return (
   <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
     <SearchBus />
   </View>
 );

};

const TicketRoute = () => {
 return (
   <View style={{ flex: 1 }}>
     <TicketBookingScreen />
   </View>
 )
}

const ProfileRoute = () => {
 return (
   <View style={{ flex: 1 }}>
     <LoginStack />
   </View>
 )
}

const SettingRoute = () => {
 return (
   <View style={{ flex: 1 }}>
     <Settings />
   </View>
 )
}

const App = () => {
 const [index, setIndex] = React.useState(0);
 const [routes] = React.useState([
   { key: 'home', title: 'Home', focusedIcon: 'home', unfocusedIcon: 'home-outline' },
   { key: 'ticket', title: 'Ticket', focusedIcon: 'album' },
   { key: 'profile', title: 'Profile', focusedIcon: 'history' },
   { key: 'setting', title: 'Setting', focusedIcon: 'bell', unfocusedIcon: 'bell-outline' },
 ]);

 const renderScene = BottomNavigation.SceneMap({
   home: SearchRoute,
   ticket: TicketRoute,
   profile: ProfileRoute,
   setting: SettingRoute,
 });

 return (
   <BottomNavigation
     navigationState={{ index, routes }}
     onIndexChange={setIndex}
     renderScene={renderScene}
     labeled="false"
     activeColor="red"
     barStyle={{ backgroundColor: 'white' }}
   />
 );
};

export default App */
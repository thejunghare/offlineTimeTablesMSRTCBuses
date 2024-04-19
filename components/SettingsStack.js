import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SettingOptionsScreen from "./SettingOptionsScreen";
import DevicePermissionScreen from "./DevicePermissionsScreen";
import AboutAppScreen from "./AboutAppScreen";
import MeetTheTeamScreen from "./MeetTheTeamScreen";

const Stack = createStackNavigator();

const ScreenNames = {
  SETTINGSOPTION: "SettingOptionsScreen",
  DEVICEPERMISSION: "DevicePermissionsScreen",
  ABOUTAPP: "AboutAppScreen",
  MEETTEAM: "MeetTheTeamScreen",
};

const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerMode: "screen",
        // headerTintColor: 'white',
        // headerStyle: { backgroundColor: '#FF0000' },
      }}
    >
      <Stack.Screen
        name={ScreenNames.SETTINGSOPTION}
        component={SettingOptionsScreen}
        options={{
          title: "Setting",
        }}
      />
      <Stack.Screen
        name={ScreenNames.DEVICEPERMISSION}
        component={DevicePermissionScreen}
        options={{
          title: "Permission",
        }}
      />
      <Stack.Screen
        name={ScreenNames.ABOUTAPP}
        component={AboutAppScreen}
        options={{
          title: "About",
        }}
      />
      <Stack.Screen
        name={ScreenNames.MEETTEAM}
        component={MeetTheTeamScreen}
        options={{
          title: "Team",
        }}
      />
    </Stack.Navigator>
  );
};

const SettingsStack = () => {
  return (
    <NavigationContainer independent={true}>
      <StackNavigator />
    </NavigationContainer>
  );
};

export default SettingsStack;

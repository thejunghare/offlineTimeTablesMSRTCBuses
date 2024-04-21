import * as React from "react";
import { View } from "react-native";
import { Text, List, TouchableRipple, RadioButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Switch } from "react-native-switch";

const SettingOptionsScreen = () => {
  const [isDarkThemeSwitchOn, setIsDarkThemeSwitchOn] = React.useState(false);
  const [isLightThemeSwitchOn, setIsLightThemeSwitchOn] = React.useState(false);
  const [isSystemThemeSwitchOn, setIsSystemThemeSwitchOn] =
    React.useState(true);

  const onToggleDarkThemeSwitch = () => {
    setIsDarkThemeSwitchOn(true);
    setIsLightThemeSwitchOn(false);
    setIsSystemThemeSwitchOn(false);
  };

  const onToggleLightThemeSwitch = () => {
    setIsDarkThemeSwitchOn(false);
    setIsLightThemeSwitchOn(true);
    setIsSystemThemeSwitchOn(false);
  };

  const onToggleSystemThemeSwitch = () => {
    setIsDarkThemeSwitchOn(false);
    setIsLightThemeSwitchOn(false);
    setIsSystemThemeSwitchOn(true);
  };

  const navigation = useNavigation();

  const handleDevicePermissionPress = () => {
    navigation.navigate("DevicePermissionsScreen");
  };

  const handleAboutAppPress = () => {
    navigation.navigate("AboutAppScreen");
  };

  const handleMeetTheTeamPress = () => {
    navigation.navigate("MeetTheTeamScreen");
  };

  return (
    <View className="flex-1 w-full bg-gray-50">
      <Text className="text-xs font-bold px-5 mt-5 ">App settings</Text>
      <View className="bg-white border border-slate-200 m-5 rounded-xl">
        <TouchableRipple
          rippleColor="rgba(0, 0, 0, .32)"
          className="border-slate-400 "
          onPress={handleDevicePermissionPress}
        >
          <List.Item
            title="Device Permission"
            description="Notifications, location"
            left={(props) => <List.Icon {...props} icon="cellphone-lock" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
          />
        </TouchableRipple>
      </View>

      <Text className="text-xs font-bold px-5">Theme</Text>
      <View className="bg-white border border-slate-200 m-5 rounded-xl">
        <TouchableRipple
          rippleColor="rgba(0, 0, 0, .32)"
          className="border-b border-slate-200"
        >
          <List.Item
            title="System"
            description="Follow system theme"
            left={(props) => <List.Icon {...props} icon="theme-light-dark" />}
            right={(props) => (
              <Switch
                className="border pt-5"
                value={isSystemThemeSwitchOn}
                onValueChange={onToggleSystemThemeSwitch}
                backgroundActive={"#C51E3A"}
                circleSize={25}
                disabled={false}
                activeText={""}
                inActiveText={""}
              />
            )}
          />
        </TouchableRipple>

        <TouchableRipple
          rippleColor="rgba(0, 0, 0, .32)"
          className="border-b border-slate-200"
        >
          <List.Item
            title="Dark"
            description="Iconic dark theme"
            left={(props) => <List.Icon {...props} icon="moon-new" />}
            right={(props) => (
              <Switch
                className="border pt-5"
                value={isDarkThemeSwitchOn}
                onValueChange={onToggleDarkThemeSwitch}
                backgroundActive={"#C51E3A"}
                circleSize={25}
                disabled={false}
                activeText={""}
                inActiveText={""}
              />
            )}
          />
        </TouchableRipple>

        <TouchableRipple rippleColor="rgba(0, 0, 0, .32)">
          <List.Item
            title="Light"
            description="Sunny light theme"
            left={(props) => <List.Icon {...props} icon="weather-sunny" />}
            right={(props) => (
              <Switch
                className="border pt-5"
                value={isLightThemeSwitchOn}
                onValueChange={onToggleLightThemeSwitch}
                backgroundActive={"#C51E3A"}
                circleSize={25}
                disabled={false}
                activeText={""}
                inActiveText={""}
              />
            )}
          />
        </TouchableRipple>
      </View>

      <Text className="text-xs font-bold px-5">About</Text>
      <View className="bg-white border border-slate-200 m-5 rounded-xl">
        <TouchableRipple
          rippleColor="rgba(0, 0, 0, .32)"
          className="border-b border-slate-200"
          onPress={handleAboutAppPress}
        >
          <List.Item
            title="About app"
            description="App version, name, version name"
            left={(props) => (
              <List.Icon {...props} icon="application-braces-outline" />
            )}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
          />
        </TouchableRipple>

        <TouchableRipple
          rippleColor="rgba(0, 0, 0, .32)"
          onPress={handleMeetTheTeamPress}
        >
          <List.Item
            title="Meet the team"
            description="Founder, developer, marketing team"
            left={(props) => (
              <List.Icon {...props} icon="account-group-outline" />
            )}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
          />
        </TouchableRipple>
      </View>

      <Text className="text-xs font-bold px-5 mt-5 ">Account</Text>
      <View className="bg-white border border-slate-200 m-5 rounded-xl">
        <TouchableRipple rippleColor="rgba(0, 0, 0, .32)" className="0 ">
          <List.Item
            title="Delete account"
            description="Delete account"
            left={(props) => <List.Icon {...props} icon="delete-outline" />}
          />
        </TouchableRipple>
      </View>
    </View>
  );
};

export default SettingOptionsScreen;

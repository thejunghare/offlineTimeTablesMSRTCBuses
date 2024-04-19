import * as React from "react";
import { View } from "react-native";
import { Text, List, TouchableRipple, RadioButton } from "react-native-paper";

const Settings = () => {
  const [checked, setChecked] = React.useState("first");
  return (
    <View className="flex-1 w-full bg-gray-50">
      <Text className="text-xs font-bold px-5 mt-5 ">App settings</Text>
      <View className="bg-white border border-slate-200 m-5 rounded-xl">
        <TouchableRipple
          rippleColor="rgba(0, 0, 0, .32)"
          className="border-slate-400 "
        >
          <List.Item
            title="Device Permission"
            description="Notifications, location"
            left={(props) => <List.Icon {...props} icon="cellphone-lock" />}
            right={(props) => <List.Icon {...props} icon="arrow-right" />}
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
              <RadioButton
                value="first"
                status={checked === "first" ? "checked" : "unchecked"}
                onPress={() => setChecked("first")}
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
              <RadioButton
                value="first"
                status={checked === "first" ? "checked" : "unchecked"}
                onPress={() => setChecked("first")}
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
              <RadioButton
                value="first"
                status={checked === "first" ? "checked" : "unchecked"}
                onPress={() => setChecked("first")}
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
        >
          <List.Item
            title="About app"
            description="App version, name, version name"
            left={(props) => (
              <List.Icon {...props} icon="application-braces-outline" />
            )}
            right={(props) => <List.Icon {...props} icon="arrow-right" />}
          />
        </TouchableRipple>

        <TouchableRipple rippleColor="rgba(0, 0, 0, .32)">
          <List.Item
            title="Meet the team"
            description="Founder, developer, marketing team"
            left={(props) => (
              <List.Icon {...props} icon="account-group-outline" />
            )}
            right={(props) => <List.Icon {...props} icon="arrow-right" />}
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
export default Settings;

import * as React from "react";
import { View } from "react-native";
import { Text, List, TouchableRipple, RadioButton } from "react-native-paper";

const Settings = () => {
  const [checked, setChecked] = React.useState("first");
  return (
    <View className="flex-1 w-full bg-white">
      <Text className="text-xs font-bold px-5 mt-5 ">App settings</Text>
      <View className="border border-slate-400 m-5 rounded-lg">
        <TouchableRipple
          rippleColor="rgba(0, 0, 0, .32)"
          className="border-slate-400 "
        >
          <List.Item
            title="Device Permission"
            description="Quick book, paper less travel"
            left={(props) => <List.Icon {...props} icon="cellphone-lock" />}
            right={(props) => <List.Icon {...props} icon="arrow-right" />}
          />
        </TouchableRipple>


      </View>

      <Text className="text-xs font-bold px-5">Theme</Text>
      <View className="border border-slate-400 m-5 rounded-lg">
        <TouchableRipple
          rippleColor="rgba(0, 0, 0, .32)"
          className="border-slate-400 border-b"
        >
          <List.Item
            title="System"
            description="Quick book, paper less travel"
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
          className="border-slate-400 border-b"
        >
          <List.Item
            title="Dark"
            description="Quick book, paper less travel"
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
            description="Get new monthly pass"
            left={(props) => (
              <List.Icon {...props} icon="weather-sunny" />
            )}
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
      <View className="border border-slate-400 m-5 rounded-lg">
        <TouchableRipple
          rippleColor="rgba(0, 0, 0, .32)"
          className="border-slate-400 border-b"
        >
          <List.Item
            title="App version"
            description="Quick book, paper less travel"
            left={(props) => <List.Icon {...props} icon="application-braces-outline" />}
            right={(props) => <List.Icon {...props} icon="arrow-right" />}
          />
        </TouchableRipple>

        <TouchableRipple rippleColor="rgba(0, 0, 0, .32)">
          <List.Item
            title="Meet the team"
            description="Get new monthly pass"
            left={(props) => (
              <List.Icon {...props} icon="account-group-outline" />
            )}
            right={(props) => <List.Icon {...props} icon="arrow-right" />}
          />
        </TouchableRipple>
      </View>

      <Text className="text-xs font-bold px-5 mt-5 ">Account</Text>
      <View className="border border-slate-400 m-5 rounded-lg">
        <TouchableRipple
          rippleColor="rgba(0, 0, 0, .32)"
          className="border-slate-400 "
        >
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

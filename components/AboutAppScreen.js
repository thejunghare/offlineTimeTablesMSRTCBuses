import React from "react";
import { View } from "react-native";
import { Text, List, TouchableRipple, RadioButton } from "react-native-paper";

const AboutAppScreen = () => {
  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);

  return (
    <View className="flex-1 w-full bg-gray-50">
      <Text className="text-xs font-bold px-5 mt-5 ">App information</Text>

      <View className="bg-white border border-slate-200 m-5 rounded-xl">
        <List.Item
          title="Version type"
          className="border-b border-slate-200"
          left={(props) => (
            <List.Icon {...props} icon="application-edit-outline" />
          )}
          right={(props) => (
            <Text className="py-2 font-bold font-base pr-2 text-ezgo-red">
              Beta
            </Text>
          )}
        />

        <List.Item
          title="App version"
          className="border-b border-slate-200"
          left={(props) => (
            <List.Icon {...props} icon="application-brackets-outline" />
          )}
          right={(props) => (
            <Text className="py-2 font-bold font-base pr-2 text-ezgo-red">
              v0.0.9.0
            </Text>
          )}
        />

        <List.Item
          title="Version name"
          left={(props) => (
            <List.Icon {...props} icon="application-edit-outline" />
          )}
          right={(props) => (
            <Text className="py-2 font-bold font-base pr-2 text-ezgo-red">
              Early bird
            </Text>
          )}
        />
      </View>
    </View>
  );
};

export default AboutAppScreen;

import React, { useState, useEffect } from "react";
import { View, Button } from "react-native";
import { Text, List, TouchableRipple } from "react-native-paper";
import { Switch } from "react-native-switch";
import * as Location from "expo-location";
import * as Notifications from "expo-notifications";

const DevicePermissionsScreen = () => {
  const [isLocationSwitchOn, setIsLocationSwitchOn] = useState(false);

  const [isNotificationSwitchOn, setIsNotificationSwitchOn] = useState(false);

  useEffect(() => {
    (async () => {
      const checkLocationPermission = async () => {
        try {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status === "granted") {
            setIsLocationSwitchOn(true);
          }
        } catch (error) {
          console.error("Error checking location permission: ", error);
        }
      };

      checkLocationPermission();

      let location = await Location.getCurrentPositionAsync({});
    })();
  }, []);

  const requestNotificationPermission = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status === "granted") {
      setIsNotificationSwitchOn(true);
      console.log("Notification permission granted");
    } else {
      console.log("Notification permission denied");
    }

    /* const { data: token } = await Notifications.getExpoPushTokenAsync();
    await Notifications.sendPushNotificationAsync({
      to: userPushNotificationToken,
      title: "New message",
      body: "You have a new message",
    }); */
  };

  const requestLocationPermission = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        setIsLocationSwitchOn(true);
        console.log("Location permission granted");
      } else {
        console.log("Location permission denied");
      }
    } catch (error) {
      console.error("Error requesting location permission: ", error);
    }
  };

  const removeLocationPermission = async () => {
    try {
      await Location.requestForegroundPermissionsAsync();
      setIsLocationSwitchOn(false);
      console.log("Location permission revoked");
    } catch (error) {
      console.error("Error removing location permission: ", error);
    }
  };

  const removeNotificationPermission = async () => {
    try {
      await Location.requestForegroundPermissionsAsync();
      setIsLocationSwitchOn(false);
      console.log("Location permission revoked");
    } catch (error) {
      console.error("Error removing location permission: ", error);
    }
  };

  const onToggleLocationSwitch = async () => {
    if (!isLocationSwitchOn) {
      // If switch is turned off, remove location permission
      await removeLocationPermission();
    } else {
      // If switch is turned on, request location permission
      await requestLocationPermission();
    }
  };

  const onToggleNotificationSwitch = async () => {
    if (!isNotificationSwitchOn) {
      await removeNotificationPermission();
    } else {
      await requestNotificationPermission();
    }
  };

  return (
    <View className="flex-1 w-full bg-gray-50">
      <Text className="text-xs font-bold px-5 mt-5 ">App Permission</Text>

      <View className="bg-white border border-slate-200 m-5 rounded-xl">
        <TouchableRipple
          rippleColor="rgba(0, 0, 0, .32)"
          className="border-b border-slate-200"
          onPress={onToggleLocationSwitch}
        >
          <List.Item
            title="Device Location"
            left={(props) => <List.Icon {...props} icon="map-marker-outline" />}
            right={(props) => (
              <Switch
                className="border pt-5"
                backgroundActive={"#C51E3A"}
                circleSize={25}
                disabled={false}
                activeText={""}
                inActiveText={""}
                value={isLocationSwitchOn}
                onValueChange={onToggleLocationSwitch}
                activeTrackColor="#C51E3A"
              />
            )}
          />
        </TouchableRipple>

        <TouchableRipple
          rippleColor="rgba(0, 0, 0, .32)"
          onPress={onToggleNotificationSwitch}
        >
          <List.Item
            title="Device Notification"
            left={(props) => <List.Icon {...props} icon="bell" />}
            right={(props) => (
              <Switch
                style={{ margin: 5 }}
                value={isNotificationSwitchOn}
                onValueChange={onToggleNotificationSwitch}
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
    </View>
  );
};

export default DevicePermissionsScreen;

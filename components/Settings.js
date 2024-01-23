import React, { useState } from "react";
import {FlatList, StyleSheet, Text, View} from 'react-native';
import { useNavigation } from "@react-navigation/native";

export default function SettingScreen() {
  <view>
    <FlatList
      data={[{ Key: "Lead Devloper" }]}
      renderItem={({ item }) => <Text style={styles.item}>{item.key}</Text>}
    />
  </view>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { List, Text, Switch, Divider, IconButton } from 'react-native-paper'
import { MaterialIcons } from '@expo/vector-icons'

const Settings = () => {
  const [isSwitchOn, setIsSwitchOn] = React.useState(false)
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn)

  return (
    <View style={styles.container}>
      <List.Section >
        <List.Subheader style={styles.subHeader}>App setting</List.Subheader>

        <View style={styles.mySwitch}>
          <View style={styles.mySwitch}>
            <IconButton icon="white-balance-sunny" size={20} />
            <Text style={styles.mySwitchText}>Enable dark theme</Text>
          </View>

          <Switch value={isSwitchOn} onValueChange={onToggleSwitch} color='black' />
        </View>

        <View style={styles.mySwitch}>
          <View style={styles.mySwitch}>
            <IconButton icon="cellphone" size={20} />
            <Text style={styles.mySwitchText}>Device Permission</Text>
          </View>

          <MaterialIcons name="arrow-forward-ios" size={24} color="black" />
        </View>
      </List.Section>

      <Divider />
      <Divider />
      <Divider />
      <Divider />
      <Divider />
      <Divider />
      <Divider />
      <Divider />
      <Divider />
      <Divider />

      <List.Section >
        <List.Subheader style={styles.subHeader}>App setting</List.Subheader>

        <View style={styles.mySwitch}>
          <View style={styles.mySwitch}>
            <IconButton icon="information-outline" size={20} />
            <Text style={styles.mySwitchText}>App version</Text>
          </View>

          <Text>v0.0.3.1</Text>
        </View>

        <View style={styles.mySwitch}>
          <View style={styles.mySwitch}>
            <IconButton icon="account-group-outline" size={20} />
            <Text style={styles.mySwitchText}>Meet the team @EZGO</Text>
          </View>

          <MaterialIcons name="arrow-forward-ios" size={24} color="black" />
        </View>
      </List.Section>

      <Divider />
      <Divider />
      <Divider />
      <Divider />
      <Divider />
      <Divider />
      <Divider />
      <Divider />
      <Divider />
      <Divider />

      <Text style={styles.text}>
        Made with ❤ by junghare.tech
      </Text>
    </View>
  )

}
export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minWidth: '100%',
    // padding: 50,
    backgroundColor: 'white',
  },
  subHeader: {
    textAlign: 'left'
  },
  text: {
    marginTop: 45,
    textAlign: 'center',
    fontWeight: '600',
  },
  mySwitch: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 8

    /* borderWidth: 4,
    borderColor: '#20232a', */
  },
  mySwitchText: {
    fontSize: 15,
    fontWeight: '400'
  }
})
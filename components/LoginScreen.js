import React, { useState, useEffect, createRef } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../firebase";
import {
  Button,
  Dialog,
  Portal,
  Provider,
  ActivityIndicator,
} from "react-native-paper";

const LoginScreen = () => {
  const navigation = useNavigation();

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const passwordInputRef = createRef();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("Profile");
      }
    });

    return unsubscribe;
  }, []);

  const handleLogin = () => {
    setLoading(true);
    if (userEmail === "") {
      setVisible(true);
      return; // Add return statement to stop execution if email is empty
    }

    if (!userPassword) {
      alert("Please fill password");
      return; // Add return statement to stop execution if password is empty
    }

    auth
      .signInWithEmailAndPassword(userEmail, userPassword)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log(`logged in with: `, user.email);
        setLoading(false); // Move setLoading(false) here
      })
      .catch((error) => {
        alert(error.message);
        setLoading(false); // And here
      });
  };

  const handleSignup = () => {
    navigation.navigate("Signup");
  };

  const [visible, setVisible] = React.useState(false);
  const [input, setInput] = React.useState("");

  const hideDialog = () => setVisible(false);

  return (
    <Provider>
      <View className="flex-1 items-center justify-center p-4 min-w-full bg-white">
        <View className={"mb-4"}>
          <Text className={"text-3xl text-start font-bold mb-2"}>
            Login to EZGO
          </Text>
          <Text className={"font-bold text-base text-slate-300"}>
            Enter your email and password to continue
          </Text>
        </View>

        {/* email */}
        <View className="border border-slate-300 rounded-t outline-none p-4 w-11/12 bg-white">
          <TextInput
            className="font-bold font-base subpixel-antialiased"
            placeholder="Email"
            onChangeText={(text) => setUserEmail(text)}
            autoCapitalize="none"
            keyboardType="email-address"
            returnKeyType="next"
            value={userEmail}
          />
        </View>
        {/* password */}
        <View className="border border-slate-300 rounded-b outline-none p-4 w-11/12  bg-white mb-5">
          <TextInput
            className="font-bold font-base subpixel-antialiased"
            placeholder="Password"
            keyboardType="default"
            ref={passwordInputRef}
            onSubmitEditing={Keyboard.dismiss}
            blurOnSubmit={false}
            secureTextEntry={true}
            returnKeyType="next"
            onChangeText={(text) => setUserPassword(text)}
          />
        </View>

        <TouchableOpacity onPress={handleSignup}>
          <Text className="mb-3 text-end font-bold text-base text-slate-300">
            Create Account?
          </Text>
        </TouchableOpacity>

        <Button
          mode="elevated"
          onPress={handleLogin}
          className=" rounded w-11/12 p-2 text-base lowercase bg-ezgo-red"
          dark="true"
          color="white"
          uppercase="false"
        >
          {loading ? (
            <ActivityIndicator animating={true} color={"white"} />
          ) : (
            "Login"
          )}
        </Button>

        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Content>
              <Text variant="bodyMedium">Please Fill Email</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => console.log("Cancel")}>Cancel</Button>
              <Button onPress={() => console.log("Ok")}>Ok</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </Provider>
  );
};

export default LoginScreen;

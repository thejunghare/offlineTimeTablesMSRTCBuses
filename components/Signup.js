import React, { useState } from "react";
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth } from '../firebase'
import { Button, Avatar } from "react-native-paper";

const SignupScreen = () => {
    const navigation = useNavigation();

    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");

    const handleSignup = () => {
        auth
            .createUserWithEmailAndPassword(userEmail, userPassword)
            .then(userCredentials => {
                const user = userCredentials.user
                console.log(user.email);
            })
            .catch(error => alert(error.message))
    };

    const handleLogin = () => {
        navigation.navigate("Login")
    };

    return (
        <View className="flex-1 items-center justify-center p-4 min-w-full bg-white">
            <View className={"mb-4"}>
                <Text className={"text-3xl text-start font-bold mb-2"}>Welcome to EZGO</Text>
                <Text className={"font-bold text-base text-slate-300"}>Choose your email and password to
                    continue</Text>
            </View>

            <View className="border border-slate-300 outline-none p-4 w-11/12 rounded-t bg-white">
                <TextInput
                    className="font-bold font-base subpixel-antialiased"
                    placeholder="Email"
                    onChangeText={(text) => setUserEmail(text)}
                />
            </View>
            <View className="border border-slate-300 outline-none p-4 w-11/12 rounded-b bg-white">
                <TextInput
                    secureTextEntry
                    className="font-bold font-base subpixel-antialiased"
                    placeholder="Password"
                    onChangeText={(text) => setUserPassword(text)}
                />
            </View>

            <TouchableOpacity onPress={handleLogin}>
                <Text className="text-end m-3 text-base font-bold text-slate-300">Login?</Text>
            </TouchableOpacity>

            <Button
                mode="elevated"
                onPress={handleSignup}
                className=" rounded w-11/12 p-2 text-base lowercase bg-ezgo-red mb-5"
                dark="true"
                textColor="white"
                uppercase="false"
            >
                Register
            </Button>
        </View>
    );
}

export default SignupScreen
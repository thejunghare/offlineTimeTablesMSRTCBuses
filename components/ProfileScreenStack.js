import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import AccountScreen from "./AccountScreen";
import HelpScreen from "./HelpScreen";
import CallSupportScreen from "./CallSupportScreen";
import FeedbackScreen from "./FeedbackScreen";
import MyTicketsScreen from "./MyTicketsScreen";
import Signup from "./Signup";

const Stack = createStackNavigator();

const ScreenNames = {
    AccountScreen: "AccountScreen",
    MyTicketsScreen: "MyTicketsScreen"
    Help: "HelpScreen",
    CallSupportScreen: "CallSupportScreen",
    Feedback: "FeedbackScreen",
    Signup: "Signup",
};

const isLoggedIn = true;

const StackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerMode: "screen",
                headerStyle: {
                    backgroundColor: "white",
                },
            }}
        >
            {isLoggedIn ? (
                <>
                    <Stack.Screen
                        name={ScreenNames.AccountScreen}
                        component={AccountScreen}
                        options={{
                            title: "Account details",
                        }}
                    />
                <Stack.Screen
                                        name={ScreenNames.MyTicketsScreen}
                                        component={MyTicketsScreen}
                                        options={{
                                            title: "My tickets",
                                        }}
                                    />
                    <Stack.Screen
                        name={ScreenNames.Feedback}
                        component={FeedbackScreen}
                        options={{
                            title: "Feedback",
                        }}
                    />
                </>
            ) : (
                <Stack.Screen
                    name={ScreenNames.Signup}
                    component={Signup}
                    options={{
                        title: "Signup",
                    }}
                />
            )}
            <Stack.Screen
                name={ScreenNames.Help}
                component={HelpScreen}
                options={{
                    title: "Help",
                }}
            />
            <Stack.Screen
                name={ScreenNames.CallSupportScreen}
                component={CallSupportScreen}
                options={{
                    title: "Call support",
                }}
            />
        </Stack.Navigator>
    );
};

const ProfileScreenStack = () => {
    return (
        <NavigationContainer>
            <StackNavigator/>
        </NavigationContainer>
    );
};

export default ProfileScreenStack;

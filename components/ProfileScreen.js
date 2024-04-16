import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { firebase, auth } from '../firebase'
import { useNavigation } from '@react-navigation/native';
import { Avatar, Divider, List } from "react-native-paper";
import { MaterialCommunityIcons } from '@expo/vector-icons'

const ProfileScreen = () => {
    const navigation = useNavigation();

    const handleLogout = () => {
        auth.signOut()
            .then(() => {
                navigation.replace("Login")

            })
            .catch(error => alert(error.message))
    }

    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        const fetchTickets = async () => {
            const bookedTicketsRef = firebase.firestore().collection('bookedTickets');
            try {
                const querySnapshot = await bookedTicketsRef.get();
                const ticketData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setTickets(ticketData);
            } catch (error) {
                console.error('Error fetching tickets: ', error);
            }
        };

        fetchTickets();

        return () => {
        };

    }, []);

    return (
        <View className="flex-1 w-full bg-white">
            <View className="flex flex-row items-center justify-between p-5">
                <View className={"w-1/5"}>
                    <Avatar.Text size={64} label="PJ" />
                </View>

                <View className="w-4/5 flex flex-row items-center justify-between">
                    <View>
                        <Text className="text-base">{auth.currentUser?.email}</Text>
                    </View>
                    <View>
                        <MaterialCommunityIcons name="logout" size={24} color="black" />
                    </View>
                </View>

            </View>


            <Divider />

            <View className={"p-5 text-base"}>
                <List.Item
                    title="Account"
                    //                    titleStyle={{fontWeight:700}}
                    description="Update profile, update password"
                    left={props => <List.Icon {...props} icon="account-outline" />}
                />

                <List.Item
                    title="Tickets"
                    description="Reversed tickets, unreversed tickets"
                    left={props => <List.Icon {...props} icon="ticket-outline" />}
                />

                <List.Item
                    title="Pass"
                    description="Monthly pass, renew, generate"
                    left={props => <List.Icon {...props} icon="ticket-outline" />}
                />

                <List.Item
                    title="Help"
                    description="Help center, contact Us, privacy policy"
                    left={props => <List.Icon {...props} icon="help-circle-outline" />}
                />
                <List.Item
                    title="Call Support"
                    description="Help center, contact Us, privacy policy"
                    left={props => <List.Icon {...props} icon="call-made" />}
                />
                <List.Item
                    title="Feedback"
                    description="Help center, contact Us, privacy policy"
                    left={props => <List.Icon {...props} icon="bug-outline" />}
                />
            </View>
        </View>
    )
}

export default ProfileScreen

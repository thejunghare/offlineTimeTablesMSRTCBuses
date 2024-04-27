import React, { useEffect, useState,useRef } from "react";
import { ScrollView, View, RefreshControl,Modal, StyleSheet , Text, Pressable} from "react-native";
import {
  Button,
  TextInput ,
  List,
} from "react-native-paper";
import { firebase, auth } from "../firebase";
import ActionSheet from 'react-native-actions-sheet'

const AccountScreen = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [visible, setVisible] = useState(false);
const actionSheetRef = useRef(null)

  const fetchUserDetails = async () => {
    const user = firebase.auth().currentUser;
    if (user) {
      const userRef = firebase.firestore().collection("users").doc(user.uid);

      try {
        const docSnapshot = await userRef.get();
        if (docSnapshot.exists) {
          setCurrentUser(docSnapshot.data());
        } else {
          console.error("User document does not exist");
        }
      } catch (error) {
        console.error("Error fetching user: ", error);
      }
    } else {
      console.error("No user is currently authenticated");
    }
  };

  useEffect(() => {
    fetchUserDetails();
    return () => { };
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchUserDetails().then(() => {
      setRefreshing(false);
    });
  };

  const handleSave = () => {
    console.info('content save');
    hideModal();
  }

  const showModal = () =>   actionSheetRef.current?.show();;
  const hideModal = () => actionSheetRef.current?.hide();

  return (
    <ScrollView
    className="flex-1 w-full"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >

      {currentUser && currentUser.userName && (
         <Pressable  onPress={showModal}>
        <List.Item
          title={currentUser.userName}
          right={(props) => <List.Icon {...props} icon="pencil" />}
        />
        </Pressable>
      )}

      {currentUser && currentUser.phoneNumber && (
        <Pressable  onPress={showModal}>
        <List.Item

          title={currentUser.phoneNumber}
          right={(props) => <List.Icon {...props} icon="pencil" />}
        />
      </Pressable>
      )}

      {currentUser && currentUser.email && (
         <Pressable  onPress={showModal}>
        <List.Item title={currentUser.email} />
        </Pressable>
      )}

      <ActionSheet ref={actionSheetRef}>
        <TextInput/>
        <Button icon='update' mode='elevated' onPress={handleSave}>Save</Button>
      </ActionSheet>
    </ScrollView>
  );
};

export default AccountScreen;

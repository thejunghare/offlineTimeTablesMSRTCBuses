import React from "react";
import { View, Text, Linking } from "react-native";
import { List, TouchableRipple } from "react-native-paper";

const MeetTheTeamScreen = () => {
  const handlePrasadAccountPress = () =>
    Linking.openURL("https://github.com/thejunghare");
  const handleYashAccountPress = () =>
    Linking.openURL("https://instagram.com/yashkadamfitness");
  const handleShreyaAccountPress = () =>
    Linking.openURL("https://instagram.com/shreyyaa__K");
  const handleSarasAccountPress = () =>
    Linking.openURL("https://instagram.com/____saras");

  const handleCollegeAccountPress = () =>
    Linking.openURL("https://instagram.com/dnyanshree_institute");
  return (
    <View className="flex-1 w-full bg-gray-50">
      <Text className="text-xs font-bold px-5 mt-5 ">
        Team at junghare.tech [v.0.0.4.0] - [v.0.0.6.8]
      </Text>

      <View className="bg-white border border-slate-200 m-5 rounded-xl">
        <List.AccordionGroup>
          <List.Accordion
            title="Project manager / Team lead / Developer"
            id="1"
            className="border-b border-slate-200"
          >
            <List.Item
              title="Mr. Prasad Junghare"
              description="Computer science engineer"
              right={() => <List.Icon icon="github" />}
            />
          </List.Accordion>

          <List.Accordion title="Marketing team" id="2">
            <List.Item title="Mr. Karan Rathod" description="Director" right={() => <List.Icon icon="linkedin" />} />
            <List.Item
              title="Mr. Saras Shinde"
              description="Computer science engineer"
              right={() => <List.Icon icon="linkedin" />}
            />
          </List.Accordion>
        </List.AccordionGroup>
      </View>

      <Text className="text-xs font-bold px-5 mt-5 ">
        Team at college level [v.0.0.0.0] - [v.0.0.3.0]
      </Text>

      <View className="bg-white border border-slate-200 m-5 rounded-xl">
        <List.AccordionGroup>
          <TouchableRipple
            onPress={handleCollegeAccountPress}
            rippleColor="rgba(0, 0, 0, .32)"
          >
            <List.Accordion
              title="College"
              id="1"
              className="border-b border-slate-200"
            >
              <List.Item
                title="Dnyanshree Institute of Engg & Technology"
                description="Sajjangad, Satara"
                right={() => <List.Icon icon="instagram" />}
              />
            </List.Accordion>
          </TouchableRipple>

          <TouchableRipple
            onPress={handleCollegeAccountPress}
            rippleColor="rgba(0, 0, 0, .32)"
          >
            <List.Accordion
              title="Project guide"
              id="2"
              className="border-b border-slate-200"
            >
              <List.Item
                title="Dr. V. K. Bhosale"
                description="Phd CSE"
                right={() => <List.Icon icon="linkedin" />}
              />
            </List.Accordion>
          </TouchableRipple>

          <List.Accordion title="Group" id="3">
            <TouchableRipple
              onPress={handlePrasadAccountPress}
              rippleColor="rgba(0, 0, 0, .32)"
            >
              <List.Item
                title="Mr. Prasad Junghare"
                description=""
                right={() => <List.Icon icon="github" />}
              />
            </TouchableRipple>

            <TouchableRipple
              onPress={handleYashAccountPress}
              rippleColor="rgba(0, 0, 0, .32)"
            >
              <List.Item
                title="Mr. Yash Kadam"
                right={() => <List.Icon icon="instagram" />}
              />
            </TouchableRipple>
            <TouchableRipple
              onPress={handleShreyaAccountPress}
              rippleColor="rgba(0, 0, 0, .32)"
            >
              <List.Item
                title="Miss. Shreya katte"
                right={() => <List.Icon icon="instagram" />}
              />
            </TouchableRipple>
            <TouchableRipple
              onPress={handleSarasAccountPress}
              rippleColor="rgba(0, 0, 0, .32)"
            >
              <List.Item
                title="Mr. Saras shinde"
                right={() => <List.Icon icon="instagram" />}
              />
            </TouchableRipple>
          </List.Accordion>
        </List.AccordionGroup>
      </View>
    </View>
  );
};

export default MeetTheTeamScreen;

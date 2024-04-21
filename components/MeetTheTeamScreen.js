import React from "react";
import { View, Text } from "react-native";
import { List } from "react-native-paper";

const MeetTheTeamScreen = () => {
  return (
    <View className="flex-1 w-full bg-gray-50">
      <Text className="text-xs font-bold px-5 mt-5 ">App team</Text>

      <View className="bg-white border border-slate-200 m-5 rounded-xl">
        <List.AccordionGroup>
          <List.Accordion title="Project guide" id="1"   className="border-b border-slate-200">
            <List.Item title="Dr. V. K. Bhosale" description="Phd CSE" />
          </List.Accordion>

          <List.Accordion title="Project manager/Team lead" id="2"   className="border-b border-slate-200">
          <List.Item
              title="Mr. Prasad Junghare"
              description="Computer science engineer"
            />
          </List.Accordion>

          <List.Accordion title="Developer team" id="3"   className="border-b border-slate-200">
          <List.Item
              title="Mr. Prasad Junghare"
              description="Lead developer, full stack react native developer"
            />
            {/* <List.Item
              title="Mr. Saras shinde"
              description="React native developer"
            />
             <List.Item
              title="Mr. Yash Kadam"
              description="React native developer"
            />
             <List.Item
              title="Miss. Shreya katte"
              description="React native developer"
            /> */}
          </List.Accordion>

          <List.Accordion title="Marketing team" id="4"   className="border-b border-slate-200">
            <List.Item title="Mr. Karan Rathoo" description="Director" />
            <List.Item
              title="Mr. Saras Shinde"
              description="Computer science engineer"
            />
          </List.Accordion>

          <List.Accordion title="Documentation team" id="5"   className="border-b border-slate-200">
            <List.Item
              title="Mr. Saras Shinde"
              description="Computer science engineer"
            />
            <List.Item
              title="Miss. Shreya Katte"
              description="Computer science engineer"
            />
          </List.Accordion>

        </List.AccordionGroup>
      </View>
    </View>
  );
};

export default MeetTheTeamScreen;

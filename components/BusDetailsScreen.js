import React, { useState } from "react";
import { View, Text, SafeAreaView } from "react-native";
import { Divider } from "react-native-paper";
import Timeline from "react-native-timeline-flatlist";


const BusDetailsScreen = ({ route }) => {

    const { bus, source, destination } = route.params;

    const timelineData = bus.stops.map((stop) => ({
        time: stop.time,
        title: stop.name,
        description: `Stop at ${stop.name}`,
    }));

    // Find the index of the selected destination
    const destinationIndex = bus.stops.findIndex(
        (stop) => stop.name === destination
    );

    // Calculate total time
    let totalHours = 0;
    let totalMinutes = 0;

    for (let i = 0; i < destinationIndex; i++) {
        const currentTime = bus.stops[i].time.split(":");
        const nextTime = bus.stops[i + 1].time.split(":");

        const currentHour = parseInt(currentTime[0]);
        const currentMinute = parseInt(currentTime[1]);
        const nextHour = parseInt(nextTime[0]);
        const nextMinute = parseInt(nextTime[1]);

        totalHours += nextHour - currentHour;
        totalMinutes += nextMinute - currentMinute;

        // Adjust total hours and minutes if minutes become negative
        if (totalMinutes < 0) {
            totalHours--;
            totalMinutes += 60;
        }
    }

    // Format total time
    const totalTime = `${totalHours}h ${totalMinutes}m`;

    return (
        <SafeAreaView className={"flex-1 bg-white "}>

            <View
                className={"bg-ezgo-red p-5 flex flex-row items-center justify-between"}
            >
                <Text className={"text-white font-bold text-base"}>
                    {source} - {destination}
                </Text>
                <Text className={"text-white font-bold text-base"}>{totalTime}</Text>
            </View>

            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    margin: 20,
                }}
            >
                <View>
                    <Text className={"font-bold text-base"}>{bus.name}</Text>
                    <Text>Source: {source}</Text>
                    <Text>Destination: {destination}</Text>
                </View>
                <View>
                    <Text className={"bg-green-500 text-white text-bold px-2 rounded"}>
                        4.5
                    </Text>
                </View>
            </View>

            <Divider />

            <Timeline
                className={"m-5 w-11/12"}
                data={timelineData}
                circleSize={12}
                circleColor="#000000"
                lineColor="#C0C0C0"
                timeStyle={{
                    textAlign: "center",
                    backgroundColor: "#FFA500",
                    color: "white",
                    padding: 4,
                    borderRadius: 8,
                }}
                descriptionStyle={{ color: "gray" }}
                isUsingFlatlist={true}
                innerCircle={"dot"}
            />
        </SafeAreaView>
    );
};

export default BusDetailsScreen;

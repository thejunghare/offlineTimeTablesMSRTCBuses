import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Button, ActivityIndicator } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";

const SearchBus = () => {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);

  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");

  const [buses, setBuses] = useState([]);
  const [noBusesFound, setNoBusesFound] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);

  const [routes, setRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [showRoutes, setShowRoutes] = useState(false);

  const [data, setData] = useState([]);
  //   const [items, setItems] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch("https://thejunghare.github.io/offlineTimeTablesMSRTCBuses/data.json")
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setRoutes(Array.from(new Set(data.map((item) => item.name))));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });

    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://thejunghare.github.io/offlineTimeTablesMSRTCBuses/bus-stops.json"
        );
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = () => {
    setLoading(true);
    fetch("https://thejunghare.github.io/offlineTimeTablesMSRTCBuses/data.json")
      .then((response) => response.json())
      .then((data) => {
        const directBuses = data.filter(
          (item) =>
            item.source.toLowerCase() === source.toLowerCase() &&
            item.destination.toLowerCase() === destination.toLowerCase()
        );

        if (directBuses.length === 0) {
          // If no direct buses found, check for buses with stops matching the route
          const busesWithMatchingStops = data.filter((bus) => {
            const sourceIndex = bus.stops.findIndex(
              (stop) => stop.name.toLowerCase() === source.toLowerCase()
            );
            const destinationIndex = bus.stops.findIndex(
              (stop) => stop.name.toLowerCase() === destination.toLowerCase()
            );
            return (
              sourceIndex !== -1 &&
              destinationIndex !== -1 &&
              sourceIndex < destinationIndex
            );
          });

          if (busesWithMatchingStops.length === 0) {
            // If no buses with matching stops found, display no buses found message
            setNoBusesFound(true);
            setBuses([]);
          } else {
            // Display buses with matching stops and show the fare of the destination
            const updatedBuses = busesWithMatchingStops.map((bus) => {
              const destinationIndex = bus.stops.findIndex(
                (stop) => stop.name.toLowerCase() === destination.toLowerCase()
              );
              const fare = bus.stops[destinationIndex].fare;
              const arrivalTimeAtSource = bus.stops[0].time; // Assuming arrival time at source is the time at the first stop
              return { ...bus, fare, arrivalTimeAtSource };
            });

            setBuses(updatedBuses);
            setSelectedRoute(updatedBuses[0].name);
            setShowRoutes(false);
            setNoBusesFound(false);
            setCurrentIndex(0);
            setLoading(false);
          }
        } else {
          // Display direct buses and show the fare of the destination
          const updatedDirectBuses = directBuses.map((bus) => {
            const destinationIndex = bus.stops.findIndex(
              (stop) => stop.name.toLowerCase() === destination.toLowerCase()
            );
            const fare = bus.stops[destinationIndex].fare;
            const arrivalTimeAtSource = bus.stops[0].time; // Assuming arrival time at source is the time at the first stop
            return { ...bus, fare, arrivalTimeAtSource };
          });

          setBuses(updatedDirectBuses);
          setSelectedRoute(updatedDirectBuses[0].name);
          setShowRoutes(false);
          setNoBusesFound(false);
          setCurrentIndex(0);
        }

        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  const handleRouteSelect = (route) => {
    const filteredData = data.filter((item) => item.name === route);
    if (filteredData.length === 0) {
      setNoBusesFound(true);
      setBuses([]);
    } else {
      setBuses(filteredData);
      setSelectedRoute(route);
      setShowRoutes(false);
      setNoBusesFound(false);
      setCurrentIndex(0);
    }
  };

  const handleBusPress = (bus) => {
    navigation.navigate("BusDetailsScreen", { bus, source, destination });
  };

  const renderBuses = () => {
    if (noBusesFound) {
      return (
        <Text
          style={styles.errorText}
          className="mt-5 text-base text-center font-bold"
        >
          No buses available..!
        </Text>
      );
    }
    if (buses.length > 0) {
      return (
        <ScrollView>
          <View>
            {buses.map((bus, index) => {
              const destinationIndex = bus.stops.findIndex(
                (stop) => stop.name.toLowerCase() === destination.toLowerCase()
              );
              const destinationTime =
                destinationIndex !== -1 ? bus.stops[destinationIndex].time : "";

              // Parse source time
              const sourceTimeParts = bus.arrivalTimeAtSource.split(":");
              let sourceHour = parseInt(sourceTimeParts[0]);
              const sourceMinute = parseInt(sourceTimeParts[1]);

              // Adjust source hour if it's PM and not 12
              if (sourceHour !== 12 && sourceTimeParts[1]?.includes("PM")) {
                sourceHour += 12;
              }

              // Parse destination time
              const destinationTimeParts =
                destinationIndex !== -1
                  ? bus.stops[destinationIndex].time.split(":")
                  : [];
              let destinationHour = parseInt(destinationTimeParts[0]);
              const destinationMinute = parseInt(destinationTimeParts[1]);

              // Adjust destination hour if it's PM and not 12
              if (
                destinationHour !== 12 &&
                destinationTimeParts[1]?.includes("PM")
              ) {
                destinationHour += 12;
              }

              // Calculate total journey time
              let totalHours = destinationHour - sourceHour;
              let totalMinutes = destinationMinute - sourceMinute;

              // Adjust for negative minutes
              if (totalMinutes < 0) {
                totalHours--;
                totalMinutes += 60;
              }

              const totalJourneyTime = `${totalHours}h ${totalMinutes}m`;

              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleBusPress(bus)}
                >
                  <View
                    key={index}
                    className="bg-white border border-slate-200 rounded-xl flex flex-col items-center m-3"
                  >
                    <View className="w-full flex flex-row items-center justify-between px-3 pt-3">
                      <Text className="font-extrabold text-base text-center">
                        {bus.arrivalTimeAtSource} - {destinationTime}
                      </Text>
                      <Text className="font-medium text-base text-center">
                        <Text className="font-thin text-sm text-slate-400">
                          From
                        </Text>{" "}
                        ₹{bus.fare}
                      </Text>
                    </View>

                    <View className="w-full flex flex-row items-start justify-start px-3">
                      <Text className="font-thin text-sm text-slate-400">
                        {totalJourneyTime} | 24 Seats
                      </Text>
                    </View>

                    <View className="w-full flex flex-row items-center justify-between p-3">
                      <Text className="text-base font-medium">
                        MSTRC{" "}
                        <Text className="font-thin text-sm text-slate-400">
                          .
                        </Text>{" "}
                        {selectedRoute}
                      </Text>
                      <Text className="text-white bg-green-500 px-2 rounded-lg font-medium">
                        4.5
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      );
    }
  };

  const [pickerStyle, setPickerStyle] = useState({
    color: "gray",
  });

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const formattedDate = moment(date).format("ddd D-MMM");

  return (
    <View className="flex-1 w-full bg-gray-50">
      <Text className="text-xs font-bold px-5 mt-5 ">Search buses</Text>

      <View className="m-5 bg-white border border-slate-200 rounded-xl grid grid-cols-1 divide-y divide-slate-200 divide-solid">
        {/* first picker */}
        <View className="w-full px-2 flex flex-row items-center justify-between">
          <View className="w-1/12">
            <MaterialCommunityIcons name="bus-stop" size={24} color="black" />
          </View>

          <View className="w-11/12">
            <Dropdown
              onChange={(item) => {
                setSource(item.name);
              }}

              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              data={data}
              search
              maxHeight={250}
              labelField="name"
              valueField="id"
              searchPlaceholder="Search..."
              placeholder={"From"}
              value={source}
            />
          </View>
        </View>

        {/* second picker */}
        <View className="w-full px-2 flex flex-row items-center justify-between">
          <View className=" w-1/12">
            <MaterialCommunityIcons name="bus-stop" size={24} color="black" />
          </View>

          <View className="w-11/12">
            <Dropdown
              style={styles.dropdown}
              data={data}
              search
              maxHeight={250}
              labelField="name"
              valueField="id"
              placeholder={"To"}
              searchPlaceholder="Search..."
              value={destination}
              
              onChange={(item) => {
                setDestination(item.name);
              }}
            />
          </View>
        </View>

        <View className="w-full px-2 flex flex-row items-center justify-between">
          <View className=" w-1/12">
            <MaterialCommunityIcons
              name="calendar-clock"
              size={24}
              color="black"
            />
          </View>

          <View className="w-11/12">
            <TouchableOpacity onPress={showDatepicker}>
              <Text className="p-5 text-black-50 font-bold text-base">
                {" "}
                {formattedDate}
              </Text>
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={mode}
                  is24Hour={false}
                  onChange={onChange}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <Button
        mode="elevated"
        onPress={handleSearch}
        className="rounded-3xl p-1.5 text-base lowercase bg-ezgo-red m-4 mt-1"
        dark="true"
        // icon="magnify"
        color="white"
      >
        {loading ? (
          <ActivityIndicator animating={true} color={"white"} />
        ) : (
          "Search Buses"
        )}
      </Button>

      {showRoutes && (
        <ScrollView style={styles.routesContainer}>
          {routes.map((route) => (
            <TouchableOpacity
              key={route}
              style={styles.routeButton}
              onPress={() => handleRouteSelect(route)}
            >
              <Text style={styles.routeButtonText}>{route}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
      {renderBuses()}
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    marginLeft: 20,
  },
});

export default SearchBus;

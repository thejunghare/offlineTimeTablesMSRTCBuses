import { StatusBar } from "expo-status-bar";
import React, {
  useState,
  useEffect
} from "react";
import {
  View,
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Card, Icon } from "react-native-elements";
import { Button, ActivityIndicator } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";

const SearchBus = () => {
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
    // fetch data for select options
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

  const handleNext = () => {
    if (currentIndex < buses.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const renderBuses = () => {
    /* if (loading) {
      return <Text style={styles.errorText}>Loading..!</Text>;
    } */

    if (noBusesFound) {
      return (
        <Text
          style={styles.errorText}
          className="mt-5 text-base text-center font-bold "
        >
          No buses available..!
        </Text>
      );
    }
    if (buses.length > 0) {
      return (
        <View style={styles.busContainer}>
          <Card containerStyle={styles.cardContainer}>
            <Card.Title style={styles.cardTitle}>{selectedRoute}</Card.Title>
            <Card.Divider />
            <View style={styles.busDetailsContainer}>
              <View style={styles.busDetails}>
                <Text style={styles.busValue}>Source:</Text>
                <Text style={styles.busValue}>
                  {buses[currentIndex].source}
                </Text>
              </View>
              <View style={styles.busDetails}>
                <Text style={styles.busValue}>Destination:</Text>
                <Text style={styles.busValue}>
                  {buses[currentIndex].destination}
                </Text>
              </View>
              <View style={styles.busDetails}>
                <Text style={styles.busValue}>Time:</Text>
                <Text style={styles.busValue}>
                  {buses[currentIndex].arrivalTimeAtSource}
                </Text>
              </View>
              <View style={styles.busDetails}>
                <Text style={styles.busValue}>Fare:</Text>
                <Text style={styles.busValue}>{buses[currentIndex].fare}</Text>
              </View>
            </View>
            <View style={styles.busNavigationContainer}>
              <TouchableOpacity
                style={styles.busNavigationButton}
                onPress={handlePrevious}
                disabled={currentIndex <= 0}
              >
                <Icon
                  name="chevron-left"
                  type="font-awesome"
                  color="#ffffff"
                  size={20}
                />
              </TouchableOpacity>
              <Text style={styles.busNavigationText}>
                {`${currentIndex + 1}/${buses.length}`}
              </Text>
              <TouchableOpacity
                style={styles.busNavigationButton}
                onPress={handleNext}
                disabled={currentIndex >= buses.length - 1}
              >
                <Icon
                  name="chevron-right"
                  type="font-awesome"
                  color="#ffffff"
                  size={20}
                />
              </TouchableOpacity>
            </View>
          </Card>
        </View>
      );
    }
  };

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
    <View className="flex-1 p-4 min-w-full bg-neutral-50">
      <Text className="text-xl subpixel-antialiased	not-italic font-extrabold	tracking-tight leading-relaxed mb-5">
        Search Bus
      </Text>
      <View className="border border-gray-400 rounded-2xl mb-5 grid grid-cols-1 divide-y divide-gray-400 divide-solid">
        {/* first picker */}
        <View className="w-full px-2 flex flex-row items-center justify-between">
          <View className="w-1/12">
            <MaterialCommunityIcons name="bus-stop" size={24} color="black" />
          </View>

          <View className="w-11/12">
            <Picker
              style={pickerStyle}
              selectedValue={source}
              dropdownIconColor="black"
              mode="dropdown"
              onValueChange={(itemValue, itemIndex) => {
                setSource(itemValue);
                setPickerStyle({
                  ...pickerStyle,
                  color: "black",
                  fontWeight: 900,
                });
              }}
            >
              <Picker.Item label="From" value="" />
              {data.map((item) => (
                <Picker.Item
                  key={item.id}
                  label={item.name}
                  value={item.name}
                  className="text-red-700"
                />
              ))}
            </Picker>
          </View>
        </View>

        {/* second picker */}
        <View className="w-full px-2 flex flex-row items-center justify-between">
          <View className=" w-1/12">
            <MaterialCommunityIcons name="bus-stop" size={24} color="black" />
          </View>

          <View className="w-11/12">
            <Picker
              style={pickerStyle}
              dropdownIconColor="black"
              mode="dropdown"
              selectedValue={destination}
              onValueChange={(itemValue, itemIndex) => {
                setDestination(itemValue);

                setPickerStyle({
                  ...pickerStyle,
                  color: "black",
                  fontWeight: 900,
                });
              }}
            >
              <Picker.Item label="To" value="" />
              {data.map((item) => (
                <Picker.Item
                  key={item.id}
                  label={item.name}
                  value={item.name}
                />
              ))}
            </Picker>
          </View>
        </View>

        <View className="w-full px-2 flex flex-row items-center justify-between">
          <View className=" w-1/12">
            <TouchableOpacity onPress={showDatepicker}>
              <MaterialCommunityIcons
                name="calendar-clock"
                size={24}
                color="black"
              />
            </TouchableOpacity>
          </View>

          <View className="w-11/12">
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
          </View>
        </View>
      </View>

      <Button
        mode="elevated"
        onPress={handleSearch}
        style={styles.searchBtn}
        className="shadow-xl rounded-3xl p-2 text-base lowercase"
        dark="true"
        icon="magnify"
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
  searchBtn: {
    backgroundColor: "#C51E3A",
  },

  routeButton: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    backgroundColor: "#ddd",
  },

  busContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  cardContainer: {
    backgroundColor: "#F0F0F0",
    borderRadius: 20,
    borderColor: "#ffffff",
    borderWidth: 1,
    padding: 10,
    shadowColor: "#000000",
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 10,
  },
  busDetailsContainer: {
    marginBottom: 10,
  },
  busDetails: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  busValue: {
    fontSize: 16,
    color: "#000000",
    marginLeft: 5,
  },
  busNavigationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#C51E3A",
    padding: 10,
    borderRadius: 10,
  },
  busNavigationButton: {
    backgroundColor: "#C51E3A",
    borderRadius: 20,
    padding: 10,
  },
  busNavigationText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
  },
});

export default SearchBus;

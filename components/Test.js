import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Appearance,
  useColorScheme
} from "react-native";
import { Card, Icon } from "react-native-elements";
import { Picker } from "@react-native-picker/picker";
import { Button, ActivityIndicator, Dialog, Portal, Provider } from 'react-native-paper'
import darkMode from "./darkMode";


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
    if (loading) {
      return <Text style={styles.errorText}>Loading..!</Text>;
    }

    if (noBusesFound) {
      return <Text style={styles.errorText}>No buses available..!</Text>;
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




  return (
    <View
      style={[
        styles.container,

      ]}
    >

      <View style={styles.inputContainer}>
        <View style={styles.pickerContainer}>
          <Picker
            style={{ flex: 1 }}
            selectedValue={source}
            onValueChange={(itemValue, itemIndex) => {
              if (itemValue === '') {
                Alert.alert('Error', 'Please select a source.');
              } else {
                setSource(itemValue);
              }
            }}
          >
            <Picker.Item label="Source" value="" />
            {data.map((item) => (
              <Picker.Item key={item.id} label={item.name} value={item.name} />
            ))}
          </Picker>

          <Picker
            style={{ flex: 1 }}
            selectedValue={destination}
            onValueChange={(itemValue, itemIndex) => {
              if (itemValue === '') {
                Alert.alert('Error', 'Please select a source.');
              } else {
                setDestination(itemValue);
              }
            }}
          >
            <Picker.Item label="Destination" value="" />
            {data.map((item) => (
              <Picker.Item key={item.id} label={item.name} value={item.name} />
            ))}
          </Picker>
        </View>

      </View>

      <Button
        // icon="search-web"
        mode="elevated"
        uppercase="false"
        buttonColor="#FF0000"
        color="white"
        onPress={handleSearch}
        style={styles.searchBtn}
        dark="true"
      >
        {loading ? <ActivityIndicator animating={true} color={'white'} /> : 'Search Bus'}
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
  container: {
    flex: 1,
    width: "100%",
    padding: 16,
    backgroundColor: 'white'
  },
  searchBtn: {
    width: "50%",
    backgroundColor: "#FF0000",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    marginLeft: "auto",
    marginRight: "auto",
    fontWeight: 500,

  },
  searchText: {
    color: "white",
  },
  pickerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
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
    backgroundColor: "#FF0000",
    padding: 10,
    borderRadius: 10,
  },
  busNavigationButton: {
    backgroundColor: "#FF0000",
    borderRadius: 20,
    padding: 10,
  },
  busNavigationText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
  },
  errorText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 12,
  }
});

export default SearchBus;

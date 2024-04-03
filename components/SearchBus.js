import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';

const SearchBus = () => {
  const [loading, setLoading] = useState(false);
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [buses, setBuses] = useState([]);
  const [noBusesFound, setNoBusesFound] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [routes, setRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [showRoutes, setShowRoutes] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('https://thejunghare.github.io/offlineTimeTablesMSRTCBuses/data.json')
      .then(response => response.json())
      .then(data => {
        setLoading(false);
        setRoutes(Array.from(new Set(data.map(item => item.name))));
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const handleSearch = () => {
    setLoading(true);
    fetch('https://thejunghare.github.io/offlineTimeTablesMSRTCBuses/data.json')
      .then(response => response.json())
      .then(data => {
        const directBuses = data.filter(
          item =>
            item.source.toLowerCase() === source.toLowerCase() &&
            item.destination.toLowerCase() === destination.toLowerCase()
        );

        if (directBuses.length === 0) {
          // If no direct buses found, check for buses with stops matching the route
          const busesWithMatchingStops = data.filter(bus => {
            const sourceIndex = bus.stops.findIndex(stop => stop.name.toLowerCase() === source.toLowerCase());
            const destinationIndex = bus.stops.findIndex(stop => stop.name.toLowerCase() === destination.toLowerCase());
            return sourceIndex !== -1 && destinationIndex !== -1 && sourceIndex < destinationIndex;
          });

          if (busesWithMatchingStops.length === 0) {
            // If no buses with matching stops found, display no buses found message
            setNoBusesFound(true);
            setBuses([]);
          } else {
            // Display buses with matching stops
            setBuses(busesWithMatchingStops);
            setSelectedRoute(busesWithMatchingStops[0].name);
            setShowRoutes(false);
            setNoBusesFound(false);
            setCurrentIndex(0);
          }
        } else {
          // Display direct buses
          setBuses(directBuses);
          setSelectedRoute(directBuses[0].name);
          setShowRoutes(false);
          setNoBusesFound(false);
          setCurrentIndex(0);
        }

        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
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
      return <Text>Loading...</Text>;
    }

    if (noBusesFound) {
      return <Text>No buses available.</Text>;
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
                <Text style={styles.busValue}>{buses[currentIndex].time}</Text>
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
                disabled={currentIndex <= 0}>
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
                disabled={currentIndex >= buses.length - 1}>
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

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <View style={styles.pickerContainer}>
          <Picker
            style={{ flex: 1 }}
            selectedValue={source}
            onValueChange={setSource}>
            <Picker.Item label="Source" value="" />
            <Picker.Item label="Aredare" value="Aredare" />
            <Picker.Item label="Angapur" value="Angapur" />
            <Picker.Item label="Aundh" value="Aundh" />
            <Picker.Item label="Assangav" value="Assangav" />
            <Picker.Item label="Alavdi" value="Alavdi" />
            <Picker.Item label="Alawadi" value="Alawadi" />
            <Picker.Item label="Asangaon" value="Asangaon" />
            <Picker.Item label="BusStation" value="BusStation" />
            <Picker.Item label="Bhaktavadi" value="Bhaktavadi" />
            <Picker.Item label="Bo Krandi" value="Bo Krandi" />
            <Picker.Item label="Bhadale" value="Bhadale" />
            <Picker.Item label="Borkhal" value="Borkhal" />
            <Picker.Item label="Bambavade" value="Bambavade" />
            <Picker.Item label="Chinchani" value="Chinchani" />
            <Picker.Item label="Chinchner-Nimb" value="Chinchner-Nimb" />
            <Picker.Item label="Dahigaon" value="Dahigaon" />
            <Picker.Item label="Degaon" value="Degaon" />
            <Picker.Item label="Durgalwadi" value="Durgalwadi" />
            <Picker.Item label="Dhavadshi" value="Dhavadshi" />
            <Picker.Item label="Dhawadshi" value="Dhawadshi" />
            <Picker.Item label="Dusaale" value="Dusaale" />
            <Picker.Item label="Dolegaon" value="Dolegaon" />
            <Picker.Item label="Dhanawadewadi" value="Dhanawadewadi" />
            <Picker.Item label="Dmarrt" value="Dmarrt" />
            <Picker.Item label="Dahigaon" value="Dahigaon" />
            <Picker.Item label="DivyaNagar" value="DivyaNagar" />
            <Picker.Item label="Gavadi" value="Gavadi" />
            <Picker.Item label="Gatewadi" value="Gatewadi" />
            <Picker.Item label="Gogave" value="Gogave" />
            <Picker.Item label="Jambhe" value="Jambhe" />
            <Picker.Item label="Kholwadi" value="Kholwadi" />
            <Picker.Item label="Kinhai" value="Kinhai" />
            <Picker.Item label="Kusawade" value="Kusawade" />
            <Picker.Item label="Kelewadi" value="Kelewadi" />
            <Picker.Item label="Kelavli" value="Kelavli" />
            <Picker.Item label="Kadve" value="Kadve" />
            <Picker.Item label="kusvade" value="kusvade" />
            <Picker.Item label="Kaameri" value="Kaameri" />
            <Picker.Item label="Kondani" value="Kondani" />
            <Picker.Item label="Kiroli" value="Kiroli" />
            <Picker.Item label="kuswadi" value="kuswadi" />
            <Picker.Item label="Limb" value="Limb" />
            <Picker.Item label="Laughar" value="Laughar" />
            <Picker.Item label="Lavanghar" value="Lavanghar" />
            <Picker.Item label="Malganv" value="Malganv" />
            <Picker.Item label="Mahagaon" value="Mahagaon" />
            <Picker.Item label="Mandave" value="Mandave" />
            <Picker.Item label="Murud" value="Murud" />
            <Picker.Item label="Marloshi" value="Marloshi" />
            <Picker.Item label="Mahabaleshwar" value="Mahabaleshwar" />
            <Picker.Item label="Nigadi" value="Nigadi" />
            <Picker.Item label="Nagthane" value="Nagthane" />
            <Picker.Item label="Nagzari" value="Nagzari" />
            <Picker.Item label="Nigadi Vandan" value="Nigadi Vandan" />
            <Picker.Item label="Nimsod" value="Nimsod" />
            <Picker.Item label="PMP" value="PMP" />
            <Picker.Item label="Puseavali" value="Puseavali" />
            <Picker.Item label="Pateghar" value="Pateghar" />
            <Picker.Item label="Pawarwadi" value="Pawarwadi" />
            <Picker.Item label="Padali" value="Padali" />
            <Picker.Item label="Pharmacy" value="Pharmacy" />
            <Picker.Item label="Rajwada" value="Rajwada" />
            <Picker.Item label="Rahimatpur" value="Rahimatpur" />
            <Picker.Item label="Raighar" value="Raighar" />
            <Picker.Item label="Rautwadi" value="Rautwadi" />
            <Picker.Item label="RailwayStation" value="RailwayStation" />
            <Picker.Item label="Satara Road" value="Satara Road" />
            <Picker.Item label="Samartha mandir" value="Samartha mandir" />
            <Picker.Item label="Satara" value="Satara" />
            <Picker.Item label="Swargate" value="Swargate" />
            <Picker.Item label="Swaminathnagar" value="Swaminathnagar" />
            <Picker.Item label="Sajjangad" value="Sajjangad" />
            <Picker.Item label="Tarale" value="Tarale" />
            <Picker.Item label="Tetli" value="Tetli" />
            <Picker.Item label="Tondoshi-Bambavade" value="Tondoshi-Bambavade" />
            <Picker.Item label="Tukaiwadi" value="Tukaiwadi" />
            <Picker.Item label="Umbraj" value="Umbraj" />
            <Picker.Item label="Umbraj" value="Umbraj" />
            <Picker.Item label="Vanjoli" value="Vanjoli" />
            <Picker.Item label="Vangal" value="Vangal" />
            <Picker.Item label="Vanmal" value="Vanmal" />
            <Picker.Item label="Venekhol" value="Venekhol" />
            <Picker.Item label="Venekhol" value="Venekhol" />
            <Picker.Item label="Vame-Abapuri" value="Venekhol" />
            <Picker.Item label="Wavadare-Revande" value="Wavadare-Revande" />
            <Picker.Item label="Walekamati" value="Walekamati" />
            <Picker.Item label="Walekamati Mu." value="Walekamati Mu." />
            <Picker.Item label="YerunkarWadi" value="YerunkarWadi" />
            <Picker.Item label="Yeliv" value="Yeliv" />
          </Picker>

          <Picker
            style={{ flex: 1 }}
            selectedValue={destination}
            onValueChange={setDestination}>
            <Picker.Item label="Destination" value="" />
            <Picker.Item label="Aredare" value="Aredare" />
            <Picker.Item label="Angapur" value="Angapur" />
            <Picker.Item label="Aundh" value="Aundh" />
            <Picker.Item label="Assangav" value="Assangav" />
            <Picker.Item label="Alavdi" value="Alavdi" />
            <Picker.Item label="Alawadi" value="Alawadi" />
            <Picker.Item label="Asangaon" value="Asangaon" />
            <Picker.Item label="BusStation" value="BusStation" />
            <Picker.Item label="Bhaktavadi" value="Bhaktavadi" />
            <Picker.Item label="Bo Krandi" value="Bo Krandi" />
            <Picker.Item label="Bhadale" value="Bhadale" />
            <Picker.Item label="Borkhal" value="Borkhal" />
            <Picker.Item label="Bambavade" value="Bambavade" />
            <Picker.Item label="Chinchani" value="Chinchani" />
            <Picker.Item label="Chinchner-Nimb" value="Chinchner-Nimb" />
            <Picker.Item label="Dahigaon" value="Dahigaon" />
            <Picker.Item label="Degaon" value="Degaon" />
            <Picker.Item label="Durgalwadi" value="Durgalwadi" />
            <Picker.Item label="Dhavadshi" value="Dhavadshi" />
            <Picker.Item label="Dhawadshi" value="Dhawadshi" />
            <Picker.Item label="Dusaale" value="Dusaale" />
            <Picker.Item label="Dolegaon" value="Dolegaon" />
            <Picker.Item label="Dhanawadewadi" value="Dhanawadewadi" />
            <Picker.Item label="Dmarrt" value="Dmarrt" />
            <Picker.Item label="Dahigaon" value="Dahigaon" />
            <Picker.Item label="DivyaNagar" value="DivyaNagar" />
            <Picker.Item label="Gavadi" value="Gavadi" />
            <Picker.Item label="Gatewadi" value="Gatewadi" />
            <Picker.Item label="Gogave" value="Gogave" />
            <Picker.Item label="Jambhe" value="Jambhe" />
            <Picker.Item label="Kholwadi" value="Kholwadi" />
            <Picker.Item label="Kinhai" value="Kinhai" />
            <Picker.Item label="Kusawade" value="Kusawade" />
            <Picker.Item label="Kelewadi" value="Kelewadi" />
            <Picker.Item label="Kelavli" value="Kelavli" />
            <Picker.Item label="Kadve" value="Kadve" />
            <Picker.Item label="kusvade" value="kusvade" />
            <Picker.Item label="Kaameri" value="Kaameri" />
            <Picker.Item label="Kondani" value="Kondani" />
            <Picker.Item label="Kiroli" value="Kiroli" />
            <Picker.Item label="kuswadi" value="kuswadi" />
            <Picker.Item label="Limb" value="Limb" />
            <Picker.Item label="Laughar" value="Laughar" />
            <Picker.Item label="Lavanghar" value="Lavanghar" />
            <Picker.Item label="Malganv" value="Malganv" />
            <Picker.Item label="Mahagaon" value="Mahagaon" />
            <Picker.Item label="Mandave" value="Mandave" />
            <Picker.Item label="Murud" value="Murud" />
            <Picker.Item label="Marloshi" value="Marloshi" />
            <Picker.Item label="Mahabaleshwar" value="Mahabaleshwar" />
            <Picker.Item label="Nigadi" value="Nigadi" />
            <Picker.Item label="Nagthane" value="Nagthane" />
            <Picker.Item label="Nagzari" value="Nagzari" />
            <Picker.Item label="Nigadi Vandan" value="Nigadi Vandan" />
            <Picker.Item label="Nimsod" value="Nimsod" />
            <Picker.Item label="PMP" value="PMP" />
            <Picker.Item label="Puseavali" value="Puseavali" />
            <Picker.Item label="Pateghar" value="Pateghar" />
            <Picker.Item label="Pawarwadi" value="Pawarwadi" />
            <Picker.Item label="Padali" value="Padali" />
            <Picker.Item label="Pharmacy" value="Pharmacy" />
            <Picker.Item label="Rajwada" value="Rajwada" />
            <Picker.Item label="Rahimatpur" value="Rahimatpur" />
            <Picker.Item label="Raighar" value="Raighar" />
            <Picker.Item label="Rautwadi" value="Rautwadi" />
            <Picker.Item label="RailwayStation" value="RailwayStation" />
            <Picker.Item label="Satara Road" value="Satara Road" />
            <Picker.Item label="Samartha mandir" value="Samartha mandir" />
            <Picker.Item label="Satara" value="Satara" />
            <Picker.Item label="Swargate" value="Swargate" />
            <Picker.Item label="Swaminathnagar" value="Swaminathnagar" />
            <Picker.Item label="Sajjangad" value="Sajjangad" />
            <Picker.Item label="Tarale" value="Tarale" />
            <Picker.Item label="Tetli" value="Tetli" />
            <Picker.Item label="Tondoshi-Bambavade" value="Tondoshi-Bambavade" />
            <Picker.Item label="Tukaiwadi" value="Tukaiwadi" />
            <Picker.Item label="Umbraj" value="Umbraj" />
            <Picker.Item label="Umbraj" value="Umbraj" />
            <Picker.Item label="Vanjoli" value="Vanjoli" />
            <Picker.Item label="Vangal" value="Vangal" />
            <Picker.Item label="Vanmal" value="Vanmal" />
            <Picker.Item label="Venekhol" value="Venekhol" />
            <Picker.Item label="Venekhol" value="Venekhol" />
            <Picker.Item label="Vame-Abapuri" value="Venekhol" />
            <Picker.Item label="Wavadare-Revande" value="Wavadare-Revande" />
            <Picker.Item label="Walekamati" value="Walekamati" />
            <Picker.Item label="Walekamati Mu." value="Walekamati Mu." />
            <Picker.Item label="YerunkarWadi" value="YerunkarWadi" />
            <Picker.Item label="Yeliv" value="Yeliv" />
          </Picker>
        </View>
        {/* <TextInput
          style={styles.input}
          placeholder="Source"
          value={source}
          onChangeText={setSource}
        />

        <TextInput
          style={styles.input}
          placeholder="Destination"
          value={destination}
          onChangeText={setDestination}
        />*/}
        {/* <Button title="Search" style={styles.searchBtn} onPress={handleSearch} />*/}
      </View>
      <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
        <Text style={styles.searchText}>Search</Text>
      </TouchableOpacity>
      {showRoutes && (
        <ScrollView style={styles.routesContainer}>
          {routes.map((route) => (
            <TouchableOpacity
              key={route}
              style={styles.routeButton}
              onPress={() => handleRouteSelect(route)}>
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
    width: '100%',
    padding: 16,
  },
  searchBtn: {
    width: '50%',
    backgroundColor: '#FF0000',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  searchText: {
    color: 'white',
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  routeButton: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    backgroundColor: '#ddd',
  },
  busContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  cardContainer: {
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    borderColor: '#ffffff',
    borderWidth: 1,
    padding: 10,
    shadowColor: '#000000',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 10,
  },
  busDetailsContainer: {
    marginBottom: 10,
  },
  busDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  busValue: {
    fontSize: 16,
    color: '#000000',
    marginLeft: 5,
  },
  busNavigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FF0000',
    padding: 10,
    borderRadius: 10,
  },
  busNavigationButton: {
    backgroundColor: '#FF0000',
    borderRadius: 20,
    padding: 10,
  },
  busNavigationText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

export default SearchBus;

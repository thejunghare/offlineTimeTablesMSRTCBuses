import React, { useState } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Linking,
  TouchableWithoutFeedback, // import TouchableWithoutFeedback
  Keyboard, // import Keyboard
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Input, Button, Text } from 'react-native-elements';
// import stripe from 'tipsi-stripe';

const UnReservedTicketScreen = () => {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [adults, setAdults] = useState('');
  const [teenagers, setTeenagers] = useState('');
  const [totalPrice, setTotalPrice] = useState('');
  const [women, setWomen] = useState('');

  const fares = {
    Satara: {
      'Samartha mandir': { adults: 10, women: 9, teenagers: 8 },
      'Dnyanshree college': { adults: 11, women: 10, teenagers: 9 },
      Sajjangad: { adults: 25, women: 10, teenagers: 6 },
    },
    'San Francisco': {
      'New York': { adults: 10, women: 9, teenagers: 8 },
      'Los Angeles': { adults: 11, women: 10, teenagers: 9 },
      Chicago: { adults: 8, women: 7, teenagers: 6 },
    },
  };

  const handleSourceChange = (value) => {
    setSource(value);
  };

  const handleDestinationChange = (value) => {
    setDestination(value);
  };

  const handleAdultsChange = (value) => {
    setAdults(value);
  };

  const handleTeenagersChange = (value) => {
    setTeenagers(value);
  };

  const handleCalculatePrice = () => {
    const fare = fares[source][destination];
    const total =
      fare.adults * Number(adults) +
      fare.women * Number(women) +
      fare.teenagers * Number(teenagers);
    setTotalPrice(total);
  };

  const handleWomenChange = (value) => {
    setWomen(value);
  };

  const handlePayNow = async () => {
    try {
      const token = await stripe.paymentRequestWithCardForm();
      console.log(token);
      // TODO: use the token to process the payment with your backend
    } catch (error) {
      console.log(error);
    }
  };

  const handleReset = () => {
    setSource('');
    setDestination('');
    setAdults('');
    setTeenagers('');
    setTotalPrice('');
  };

  const handlePrivacyPolicy = () => {
    Linking.openURL('https://www.example.com/privacy-policy');
  };

  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <View style={styles.pickerContainer}>
            <Picker
              style={{ flex: 1 }}
              selectedValue={source}
              onValueChange={handleSourceChange}>
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
              onValueChange={handleDestinationChange}>
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
          <View style={styles.inputContainer}>
            <Input
              label="Number of Adults"
              value={adults}
              keyboardType="numeric"
              onChangeText={handleAdultsChange}
            />
            <Input
              label="Number of Teenagers"
              value={teenagers}
              keyboardType="numeric"
              onChangeText={handleTeenagersChange}
            />
            <Input
              label="Number of Women"
              value={women}
              keyboardType="numeric"
              onChangeText={handleWomenChange}
            />
          </View>
          <View style={styles.buttonContainer}>
            <View>
              {/*<Button title="Calculate Price" onPress={handleCalculatePrice} />*/}
              <TouchableOpacity
                style={styles.button}
                onPress={handleCalculatePrice}>
                <Text style={styles.buttonText}>Calculate Price</Text>
              </TouchableOpacity>
              <Text style={styles.totalPrice}>
                Total Payable: ₹{totalPrice}
              </Text>
            </View>
            <View>
              {/* <Button
                title="Pay Now"
                onPress={handlePayNow}
                disabled={!totalPrice}
              /> */}
              <TouchableOpacity style={styles.button} onPress={handlePayNow}>
                <Text style={styles.buttonText}>Pay Now</Text>
              </TouchableOpacity>
            </View>
            <View>
              {/* <Button
                title="Reset"
                onPress={handleReset}
                buttonStyle={{ backgroundColor: 'gray' }}
              /> */}
              <TouchableOpacity
                style={styles.button}
                onPress={handleReset}>
                <Text style={styles.buttonText} buttonStyle={{ backgroundColor: 'gray' }}>RESET</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity onPress={handlePrivacyPolicy}>
            <Text style={styles.privacyPolicy}>
              By booking, you agree to our Terms and Condition.
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f2f2f2',
    minWidth: '100%',
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'Column',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  privacyPolicy: {
    marginTop: 20,
    textAlign: 'center',
    color: 'black',
  },
  button: {
    marginBottom: 10,
    backgroundColor: '#FF0000',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  totalPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: 'black',
  },
});

export default UnReservedTicketScreen;


import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Linking, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Text, Button } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
// import stripe from 'tipsi-stripe';

const UnReservedTicketScreen = () => {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [adults, setAdults] = useState("");
  const [teenagers, setTeenagers] = useState("");
  const [women, setWomen] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [routes, setRoutes] = useState([]);
  const [items, setItems] = useState([]);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

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

  const handlePrivacyPolicy = () => {
    Linking.openURL("https://www.example.com/privacy-policy");
  };

  const [pickerStyle, setPickerStyle] = useState({
    color: "gray",
  });

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

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

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

  return (
    <View className="w-full flex-1 bg-gray-50">
      <Text className="text-xs font-bold px-5 mt-5 ">
        Purchase unreserved ticket
      </Text>

      <View className="m-5 bg-white border border-slate-200 rounded-xl grid grid-cols-1 divide-y divide-slate-200 divide-solid">
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

        <View className="px-2 flex flex-row items-center justify-between">
          <TextInput
            className="p-4 w-2/6	"
            placeholder="Adults: 1"
            keyboardType="numeric"
            value={adults}
            onChangeText={handleAdultsChange}
          />
          <TextInput
            className="p-4 border-l border-slate-200 w-2/6	"
            placeholder="Children: 2"
            keyboardType="numeric"
            value={teenagers}
            onChangeText={handleTeenagersChange}
          />
          <TextInput
            className="p-4 border-l border-slate-200 w-2/6	"
            placeholder="Women: 1"
            keyboardType="numeric"
            value={women}
            onChangeText={handleWomenChange}
          />
        </View>
      </View>

      <Button
        mode="elevated"
        onPress={() => console.log("Pressed")}
        className="rounded-3xl p-1.5 text-base lowercase bg-ezgo-red m-4 mt-1"
        dark="true"
        color="white"
      >
        Book ticket
      </Button>
    </View>
  );
};

export default UnReservedTicketScreen;

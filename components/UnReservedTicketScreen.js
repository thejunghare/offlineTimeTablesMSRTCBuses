import React, {useState, useEffect, useRef} from "react";
import {
    View,
    TouchableOpacity,
    Linking,
    TextInput,
    Alert,
    StyleSheet,
} from "react-native";
import {Picker} from "@react-native-picker/picker";
import {Text, Button, Divider} from "react-native-paper";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import {useNavigation} from "@react-navigation/native";
// import stripe from 'tipsi-stripe';
import {firebase, auth} from "../firebase";
import {FontAwesome6} from "@expo/vector-icons";
import {FontAwesome} from "@expo/vector-icons";
import {
    ALERT_TYPE,
    Dialog,
    AlertNotificationRoot,
    Toast,
} from "react-native-alert-notification";
import ActionSheet from "react-native-actions-sheet";

const UnReservedTicketScreen = () => {
    const navigation = useNavigation();

    const [source, setSource] = useState("");
    const [destination, setDestination] = useState("");
    const actionSheetRef = useRef(null);

    const [fare, setFare] = useState("");

    const [adults, setAdults] = useState("");
    const [children, setChildren] = useState("");
    const [women, setWomen] = useState("");

    const [data, setData] = useState([]);

    const [loading, setLoading] = useState(false);
    const [routes, setRoutes] = useState([]);
    const [items, setItems] = useState([]);

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState("date");
    const [show, setShow] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        setLoading(true);
        fetch("https://thejunghare.github.io/offlineTimeTablesMSRTCBuses/data.json")
            .then((response) => response.json())
            .then((data) => {
                // Find the bus that includes the destination stop
                const bus = data.find((item) =>
                    item.stops.some(
                        (stop) => stop.name.toLowerCase() === destination.toLowerCase()
                    )
                );

                if (bus) {
                    // If bus found, find the fare of the destination stop
                    const destinationStop = bus.stops.find(
                        (stop) => stop.name.toLowerCase() === destination.toLowerCase()
                    );
                    if (destinationStop) {
                        // Calculate total fare based on number of passengers
                        const adultFare = parseInt(destinationStop.fare.replace("₹", ""));
                        const womenFare =
                            parseInt(destinationStop.fare.replace("₹", "")) * 0.5; // Assuming 50% of adult fare for women
                        const childFare =
                            parseInt(destinationStop.fare.replace("₹", "")) * 0.5; // Assuming 50% of adult fare for children
                        const totalFare =
                            adults * adultFare + women * womenFare + children * childFare;
                        setFare("₹" + totalFare);
                    } else {
                        setFare("Fare Not Available for Destination");
                    }
                } else {
                    // If no bus found, set fare as "Not Available"
                    setFare("Not Available");
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setLoading(false);
            });
    }, [source, destination, adults, children, women]);

    const handleSourceChange = (value) => {
        setSource(value);
    };

    const handleDestinationChange = (value) => {
        setDestination(value);
    };

    const handleAdultsChange = (value) => {
        setAdults(value);
    };

    const handleChildrenChange = (value) => {
        setChildren(value);
    };

    const handleWomenChange = (value) => {
        setWomen(value);
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

        const subscriber = firebase.auth().onAuthStateChanged((user) => {
            setUser(user);
        });

        fetchData();
    }, []);

    const handleAddTicket = () => {
        console.log("Selected source:", source);
        console.log("Selected destination:", destination);
        console.log("no of adults:", adults);
        console.log("no of children:", children);
        console.log("no of women:", women);
        console.log("total:", fare);
        console.log("date:", date);

        const ticketInfo = {
            createdAt: date,
            ticketInfo: {
                source: source,
                destination: destination,

                adults: adults,
                children: children,
                women: women,

                fare: fare,
            },
        };
        addTicketToFirestore(ticketInfo);
    };

    const addTicketToFirestore = async (ticketInfo) => {
        try {
            const currentUser = firebase.auth().currentUser;
            if (currentUser) {
                const unreversedTicketsRef = firebase
                    .firestore()
                    .collection("users")
                    .doc(currentUser.uid)
                    .collection("unreversedTickets");

                // Add a new document with auto-generated ID
                await unreversedTicketsRef.add(ticketInfo);

                console.log("Ticket added successfully!");
                // alert("Ticket added successfully!")
                actionSheetRef.current?.show();
//reset all option to zero
                resetOptions()
//move to ticketOption screen
               // navigation.navigate("TicketOptionScreen");
            } else {
                console.error("No user is currently authenticated");
            }
        } catch (error) {
            console.error("Error adding ticket to Firestore: ", error);
        }
    };

    const resetOptions = () => {
        setWomen(0)
        setChildren(0)
        setAdults(0)
        setSource('')
        setDestination('')
    };

    return (
        <View className="w-full flex-1 bg-gray-50">
            <Text className="text-xs font-bold px-5 mt-5 ">
                Purchase unreserved ticket
            </Text>

            <View
                className="m-5 bg-white border border-slate-200 rounded-xl grid grid-cols-1 divide-y divide-slate-200 divide-solid">
                {/* first picker */}
                <View className="w-full px-2 flex flex-row items-center justify-between">
                    <View className="w-1/12">
                        <MaterialCommunityIcons name="bus-stop" size={24} color="black"/>
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
                            <Picker.Item label="From" value=""/>
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
                        <MaterialCommunityIcons name="bus-stop" size={24} color="black"/>
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
                            <Picker.Item label="To" value=""/>
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

                <View className="w-full px-2 flex flex-row items-center justify-between">
                    <View className=" w-1/12">
                        <FontAwesome name="male" size={24} color="black"/>
                    </View>

                    <View className="w-11/12">
                        <Picker
                            selectedValue={adults}
                            onValueChange={(itemValue, itemIndex) => setAdults(itemValue)}
                        >
                            <Picker.Item label="Number of adults" value=""/>
                            <Picker.Item label="0" value="0"/>
                            <Picker.Item label="1" value="1"/>
                            <Picker.Item label="2" value="2"/>
                            <Picker.Item label="3" value="3"/>
                        </Picker>
                    </View>
                </View>

                <View className="w-full px-2 flex flex-row items-center justify-between">
                    <View className=" w-1/12">
                        <FontAwesome name="female" size={24} color="black"/>
                    </View>

                    <View className="w-11/12">
                        <Picker
                            selectedValue={women}
                            onValueChange={(itemValue, itemIndex) => setWomen(itemValue)}
                        >
                            <Picker.Item label="Number of women" value=""/>
                            <Picker.Item label="0" value="0"/>
                            <Picker.Item label="1" value="1"/>
                            <Picker.Item label="2" value="2"/>
                            <Picker.Item label="3" value="3"/>
                        </Picker>
                    </View>
                </View>

                <View className="w-full px-2 flex flex-row items-center justify-between">
                    <View className=" w-1/12">
                        <FontAwesome6 name="children" size={24} color="black"/>
                    </View>

                    <View className="w-11/12">
                        <Picker
                            selectedValue={children}
                            onValueChange={(itemValue, itemIndex) => setChildren(itemValue)}
                        >
                            <Picker.Item label="Number of children" value=""/>
                            <Picker.Item label="0" value="0"/>
                            <Picker.Item label="1" value="1"/>
                            <Picker.Item label="2" value="2"/>
                            <Picker.Item label="3" value="3"/>
                        </Picker>
                    </View>
                </View>

                <TextInput
                    className="p-4 border-0 border-slate-200"
                    placeholder="Total fare ₹:"
                    keyboardType="numeric"
                    editable={false}
                    value={fare.toString()}
                />
            </View>

            {/* check if login and show button */}
            {user ? (
                <Button
                    mode="elevated"
                    onPress={handleAddTicket}
                    className="rounded-3xl p-1.5 text-base lowercase bg-ezgo-red m-4 mt-1"
                    dark="true"
                    color="white"
                >
                    Book ticket
                </Button>
            ) : (
                <Button
                    mode="elevated"
                    onPress={() => console.log("Pressed")}
                    className="rounded-3xl p-1.5 text-base lowercase bg-ezgo-red m-4 mt-1"
                    dark="true"
                    color="white"
                >
                    Login & book ticket
                </Button>
            )}

            <ActionSheet ref={actionSheetRef}>
                <View style={styles.notificationContainer}>
                    <FontAwesome
                        name="check-circle"
                        size={40}
                        color="#28a745"
                        style={{marginBottom: 10}}
                    />
                    <Text style={styles.notificationTitle}>
                        Ticket Booked Successfully!
                    </Text>
                    <Text style={styles.notificationMessage}>
                        Your ticket has been successfully booked. You can view all your
                        booked tickets in the My Tickets section.
                    </Text>
                    <Text style={styles.noteMessage}>
                        Journey Should Commence within 1 hour
                    </Text>
                </View>
            </ActionSheet>
        </View>
    );
};

export default UnReservedTicketScreen;

const styles = StyleSheet.create({
    notificationContainer: {
        padding: 20,
        backgroundColor: "white",
        borderRadius: 10,
        alignItems: "center",
    },
    notificationTitle: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 10,
    },
    notificationMessage: {
        textAlign: "center",
        marginBottom: 20,
    },
    noteMessage: {
        textAlign: "center",
        marginBottom: 20,
        color: '#C51E3A',
    },
});

import * as React from 'react'
import { View, StyleSheet, TouchableOpacity, } from 'react-native'
import { Menu, Divider } from 'react-native-paper'
import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const TicketOptionScreen = () => {
    const navigation = useNavigation()

    const handleReservedTicket = () => {
        navigation.navigate('ReservedTicketScreen')
    }

    const handleUnReservedTicket = () => {
        navigation.navigate('UnReservedTicketScreen')
    }

    const handlePassTicket = () => {
        navigation.navigate('PassTicketScreen')
    }

    return (
        <View style={styles.container}>
            <View style={styles.myMenu}>
                <Menu.Item icon="ticket-confirmation-outline" onPress={handleUnReservedTicket} title="Un-Reversed Ticket" />

                <TouchableOpacity onPress={handleUnReservedTicket}>
                    <MaterialIcons name="arrow-forward-ios" size={24} color="black" />
                </TouchableOpacity>
            </View>

            <Divider />
            <Divider />
            <Divider />

            <View style={styles.myMenu}>
                <Menu.Item icon="ticket-outline" onPress={handleReservedTicket} title="Reversed Ticket" />

                <TouchableOpacity onPress={handleReservedTicket}>
                    <MaterialIcons name="arrow-forward-ios" size={24} color="black" />
                </TouchableOpacity>
            </View>

            <Divider />
            <Divider />
            <Divider />

            <View style={styles.myMenu}>
                <Menu.Item icon="passport" onPress={handlePassTicket} title="Monthly Pass" />

                <TouchableOpacity onPress={handlePassTicket}>
                    <MaterialIcons name="arrow-forward-ios" size={24} color="black" />
                </TouchableOpacity>
            </View>

            <Divider />
            <Divider />
            <Divider />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        minWidth: '100%',
        backgroundColor: 'white',

    },
    subHeader: {
        textAlign: 'left'
    },
    myMenu: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginRight: 25,
        // marginLeft: 25,

    },

})

export default TicketOptionScreen
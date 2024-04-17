import * as React from 'react'
import { View, } from 'react-native'
import { List, TouchableRipple } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

const TicketOptionScreen = () => {
    const navigation = useNavigation()

    /*   const handleReservedTicket = () => {
          navigation.navigate('ReservedTicketScreen')
      } */

    const handleUnReservedTicket = () => {
        navigation.navigate('UnReservedTicketScreen')
    }

    const handlePassTicket = () => {
        navigation.navigate('PassTicketScreen')
    }

    return (
        <View className="flex-1 w-full bg-white">
            <View className="border border-slate-400 m-5 rounded-lg">
                <TouchableRipple
                    onPress={handleUnReservedTicket}
                    rippleColor="rgba(0, 0, 0, .32)"
                    className="border-slate-400 border-b"
                >
                    <List.Item
                        title="Unreserved ticket"
                        description="Quick book, paper less travel"
                        left={props => <List.Icon {...props} icon="ticket-outline" />}
                        right={(props) => <List.Icon {...props} icon="arrow-right" />}
                    />
                </TouchableRipple>

                <TouchableRipple
                    onPress={handlePassTicket}
                    rippleColor="rgba(0, 0, 0, .32)"
                >
                    <List.Item
                        title="Monthly pass"
                        description="Get new monthly pass"
                        left={props => <List.Icon {...props} icon="ticket-account" />}
                        right={(props) => <List.Icon {...props} icon="arrow-right" />}

                    />
                </TouchableRipple>
            </View>
        </View >
    )
}

export default TicketOptionScreen
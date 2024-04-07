import * as React from 'react'
import { View, StyleSheet, Text } from 'react-native'

const PassTicketScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.errorText}>Coming soon ..!</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        minWidth: '100%',
    },
    errorText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 14,
        fontWeight: 'bold',
    }
})

export default PassTicketScreen
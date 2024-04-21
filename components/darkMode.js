import React from 'react'
import { StyleSheet } from 'react-native'

const darkMode = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        padding: 16,
        backgroundColor: 'black'
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
})

export default darkMode
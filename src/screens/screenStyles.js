import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({

    name: {
        fontSize: 20,
        margin: 18,
    },
    bcScanButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        elevation: 3,
        backgroundColor: 'blue',
        height: 50,
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },

    // collapsible list styling
    containerA: {
        flex: 1,
        backgroundColor: '#F8F0E3',
        paddingTop: '5%',
    },
    header: {
        backgroundColor: '#F5FCFF',
        padding: 10,
    },
    headerText: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '500',
    },
    content: {
        padding: 20,
        backgroundColor: '#fff',
    },
    active: {
        backgroundColor: 'rgba(255,255,255,1)',
    },
    inactive: {
        backgroundColor: 'rgba(245,252,255,1)',
    },
    selectTitle: {
        fontSize: 14,
        fontWeight: '500',
        padding: 10,
        textAlign: 'center',
    },
    multipleToggle: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 30,
        alignItems: 'center',
    },
    multipleToggle__title: {
        fontSize: 16,
        marginRight: 8,
    },
    // Styling for Content Array
    contentContainer: { 
        backgroundColor: '#E6E6E6', 
        width: '100%', 
        height: 65, 
    },
    contentItem: {
        width: 370,
        height: 66,
        backgroundColor: 'rgba(255,255,255,1)',
        borderWidth: 1, 
        borderColor: '#000000', 
        flexDirection: 'row', 
    },
    contentItemName: {
        top: 15, left: 15, fontFamily: 'roboto-regular', color: '#121212', fontSize: 22, width: '40%',
    },
    contentItemExpiry: {
        top: 15, left: 15, fontFamily: 'roboto-regular', color: '#121212', fontSize: 22, width: '30%',
    },

    //Styling for Add Item function
    appBackground: {
        backgroundColor: '#F8F0E3',
        justifyContent: "center",
        alignItems: "center",
    },

    addItemBox: {
        backgroundColor: 'rgba(255,255,255,1)',
        color:"#ec645b",
        alignItems: 'center',
        marginTop: 1,
        marginBottom: 1,
        borderRadius: 10,
        padding: 5,

    }

});

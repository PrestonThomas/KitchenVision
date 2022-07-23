import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        backgroundColor: '#E6E6E6',
        width: 375,
        height: 65,
    },
    name: {
        fontSize: 20,
        margin: 18,
    },
    rect: {
        width: 360,
        height: 66,
        backgroundColor: 'rgba(255,255,255,1)',
        borderWidth: 1,
        borderColor: '#000000',
        flexDirection: 'row',
    },
    date: {
        top: 15,
        left: 15,
        fontFamily: 'roboto-regular',
        color: '#121212',
        fontSize: 22,
        width: '20%',
    },
    itemsName: {
        top: 15,
        left: 15,
        fontFamily: 'roboto-regular',
        color: '#121212',
        fontSize: 22,
        width: '40%',
    },
    inputBox: {
        width: '40%',
    },
    plusButton: {
        margin: 15,
        width: '25%',
        position: 'absolute',
        backgroundColor: 'rgba(88,138,240,1)',
    },
    minusButton: {
        margin: 15,
        width: '25%',
        position: 'relative',
        backgroundColor: 'rgba(88,138,240,1)',
        alignSelf: 'flex-end',
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
        backgroundColor: '#F5FCFF',
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
});

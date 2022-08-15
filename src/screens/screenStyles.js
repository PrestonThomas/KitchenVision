import { Platform, StyleSheet } from 'react-native';
// import { noCentroid } from 'react-native-mock-render/build/api/TouchHistoryMath';
import { HEADER_MAX_HEIGHT } from './HomeScreen';

export const styles = StyleSheet.create({
    // container: {
    //     backgroundColor: '#E6E6E6',
    //     width: 375,
    //     height: 65,
    // },
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
        top: 15, left: 15, fontFamily: 'roboto-regular', color: '#121212', fontSize: 22, width: '65%',
    },
    contentItemExpiry: {
        top: 15, left: 15, fontFamily: 'roboto-regular', color: '#121212', fontSize: 22, width: '35%',
    },

    //Styling for Add Item function
    appBackground: {
        backgroundColor: '#F8F0E3',
        justifyContent: 'center',
        alignItems: 'center',
    },

    addItemBox: {
        backgroundColor: 'rgba(255,255,255,1)',
        color: '#ec645b',
        alignItems: 'center',
        marginTop: 1,
        marginBottom: 1,
        borderRadius: 10,
        padding: 5,

    },

    addItemInput: {
        backgroundColor: 'transparent',
        color: '#ec645b',
        width: '50%',
        height: 50,
    },

    itemList: {
        flex: 1,
        flexDirection: 'column',
    },
    // itemContainer: {
    //     flex: 1,
    //     alignItems: 'center',
    //     justifyContent: 'space-between',
    //     padding: 20,
    //     borderBottomColor: '#fbc1bb',
    // },

    /*
    HomeScreen styles
    */
    homescreenFill: {
        flex: 1,
    },
    homescreenContent: {
        flex: 1,
    },
    homescreenHeader: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(255,150,79, 1)',
        overflow: 'hidden',
        height: HEADER_MAX_HEIGHT,
    },
    homescreenBackgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        width: null,
        height: HEADER_MAX_HEIGHT,
        resizeMode: 'cover',
    },
    homescreenBar: {
        backgroundColor: 'transparent',
        opacity: 20,
        marginTop: Platform.OS === 'ios' ? 28 : 38,
        height: 150,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 25,
        left: 0,
        right: 0,
    },
    homescreenTitle: {
        color: 'white',
        fontSize: 70,
        fontFamily: 'Sweet-Hipster',
    },
    homescreenScrollViewContent: {
        // iOS uses content inset, which acts like padding.
        paddingTop: Platform.OS !== 'ios' ? HEADER_MAX_HEIGHT : 0,
    },
    homescreenRow: {
        height: 250,
        margin: 5,
        marginTop: 80,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    },
    homescreenRowFirst: {
        height: 250,
        margin: 5,
        marginTop: 10,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    },
    homescreenSectionBreak: {
        height: 50,
        marginTop: 100,
        marginBottom: 20,
        backgroundColor: 'rgba(255,150,79, 0.4)',
    },
    homescreenSectionBreakTop: {
        height: 50,
        margin: 0,
        backgroundColor: 'rgba(255,150,79, 0.4)',
    },
    homescreenRowShort: {
        height: 200,
        margin: 5,
        marginTop: 30,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    },
    homescreenBreadPos: {
        textAlign: 'center',
        fontSize: 25,
        margin: 5,
    },
    homescreenSubHeaderText: {
        textAlign: 'left',
        fontSize: 25,
        fontFamily: 'Amsterdam',
        color: 'rgba(255,150,79, 1)',
        marginBottom: 10,
    },
    homescreenContentTextLong: {
        textAlign: 'left',
        fontSize: 40,
        fontFamily: 'HelloKetta',
        color: 'black',
        marginBottom: 10,
    },
    homescreenContentText: {
        textAlign: 'left',
        fontSize: 45,
        fontFamily: 'HelloKetta',
        color: 'black',
        marginBottom: 20,
    },
    homescreenHeadText: {
        textAlign: 'left',
        fontSize: 25,
        fontFamily: 'Amsterdam',
        color: 'white',
    },
});

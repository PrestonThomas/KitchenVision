//Stylesheet for Screens

import { Platform, StyleSheet, Dimensions ,PixelRatio} from 'react-native';
import { HEADER_MAX_HEIGHT } from './HomeScreen';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const collapsibleContainerWidth = (windowWidth - ((10 * windowWidth)/100));

const scale = windowWidth/320;

const normalize = (size) => {
    const newSize = size * scale;
    if (Platform.OS === 'ios') {
      return Math.round(PixelRatio.roundToNearestPixel(newSize));
    } else {
      return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
    }
  };

export const styles = StyleSheet.create({

    /*InventoryScreen styles*/
    inventoryPageTitle:{
        textAlign: 'center',
        fontSize: 25,
        fontFamily: 'Amsterdam',
        color: 'rgba(255,150,79, 1)',
        marginTop: 30,
    },
    //Barcode scanner button
    bcScanButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        elevation: 3,
        backgroundColor: 'blue',
        height: 50,
    },
    //barcode scanner button text
    bcScanButtonText: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },

    //inventory page section break top
    //bread emoji header
    inventoryscreenSectionBreakTop: {
        backgroundColor: 'rgba(255,150,79, 0)',
        borderWidth: 1.5,
        borderColor: 'rgba(179, 118, 90,1)',
    },
    //bread emoji css
    inventoryscreenBreadPos: {
        textAlign: 'center',
        fontSize: 25,
        margin: 5,
    },

    //inventory & grocery page container css (whole screen)
    // collapsible list styling
    containerA: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    //function explanation text
    functionGuide: {
        fontSize: 14,
        fontWeight: '500',
        paddingBottom: 10,
        textAlign: 'center',
        color:'rgba(150, 179, 90,1)',
    },
    //multiple toggle button
    multipleToggle: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 15,
        alignItems: 'center',
    },
    multipleToggle__title: {
        color: 'rgba(179, 139, 90,1)',
        fontSize: 16,
        marginRight: 8,
    },

    //category title of the collapsible list(inventory & grocery page css)
    //(Meat, Dairy, Vegetables, Drinks, Others)
    categoryTitle: {
        padding: 10,
    },
    categoryTitleText: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '500',
        color:'rgba(110, 73, 56,1)',
    },
    //content inside the collapsible list css
    contentContainer: {
        padding:'5%',
        backgroundColor: 'rgba(222, 199, 155,1)',
        // textAlign:'center',
        alignItems:'center',
    },
    contentItemContainer:{
        width:collapsibleContainerWidth,
        padding:10,
        //marginBottom:5,
        borderWidth: 1.5,
        borderColor: '#000000',
        flexDirection: 'row',
    },
    //content item inside the collapsible list (name & date)
    contentItem: {
        paddingLeft: 10,
        fontSize: normalize(20),
        color: 'black',
    },

    //pop-up button inside the collapsible list items
    listPopupButton:{
        backgroundColor:'rgba(255,150,79, 0.4)',
        marginTop:'10%',
         borderRadius:5,
    },

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

    /* GroceryScreen Styles */
    groceryPageTitle : {
        textAlign: 'center',
        fontSize: 25,
        fontFamily: 'Amsterdam',
        color: 'rgba(255,150,79, 1)',
        marginBottom: 40,
        marginTop: 20,
    },
    groceryscreenSectionBreakTop: {
        height: 50,
        margin: 0,
        backgroundColor: 'rgba(255,150,79, 0)',
        borderWidth: 1.5,
        borderColor: 'rgba(179, 118, 90,1)',
    },
    groceryscreenBreadPos: {
        textAlign: 'center',
        fontSize: 25,
        margin: 5,
    },

    customInnerItem : {
        padding:'5%',
        backgroundColor: 'rgba(222, 199, 155,1)',
        alignItems:'center',

    },

    //Styling for Add Item function
    appBackground: {
        backgroundColor: '#F8F0E3',
        justifyContent: 'center',
        alignItems: 'center',
    },

    inputContainer: {
        alignItems: 'center',
    },
});

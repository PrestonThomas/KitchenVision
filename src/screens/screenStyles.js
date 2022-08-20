import { Platform, StyleSheet } from 'react-native';
// import { noCentroid } from 'react-native-mock-render/build/api/TouchHistoryMath';
import { HEADER_MAX_HEIGHT } from './HomeScreen';

export const styles = StyleSheet.create({
    
    /*InventoryScreen styles*/
    inventoryPageTitle:{
        textAlign: 'center',
        fontSize: 25,
        fontFamily: 'Amsterdam',
        color: 'rgba(255,150,79, 1)',
        // marginBottom: 50,
        marginTop: 50,
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

    // collapsible list styling
    //inventory page container (whole screen)
    containerA: {
        flex: 1,
        backgroundColor: 'transparent',
        paddingTop: '5%',
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
        marginVertical: 20,
        alignItems: 'center',
    },
    multipleToggle__title: {
        color: 'rgba(179, 139, 90,1)',
        fontSize: 16,
        marginRight: 8,
    },
    //section break top 
    //bread emoji header
    inventoryscreenSectionBreakTop: {
        backgroundColor: 'rgba(255,150,79, 0)',
        borderWidth: 1,
        borderColor: 'rgba(179, 118, 90,1)',
    },
    //bread emoji css
    inventoryscreenBreadPos: {
        textAlign: 'center',
        fontSize: 25,
        margin: 5,
    },
    //category title of the collapsible list
    //(Meat, Dairy, Vegetables, Drinks, Others)
    categoryTitle: {
        padding: 10,
    },
    categoryTitleText: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '500',
        color:'rgba(110, 73, 56,1)'
    },
    //content inside the collapsible list
    inventoryListcontent: {
        width:'100%',
        padding: 10,
    },
    active: {
        // backgroundColor: 'rgba(242,242,242,255)',
    },
    inactive: {
        backgroundColor: 'rgba(255,150,79, 0)',
    },
    refreshText:{
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'left',
        paddingLeft:5,
        color:'rgba(150, 179, 90,1)',
    },
    //content inside the collapsible list css
    contentContainer: {
        padding:13,
        backgroundColor: 'rgba(222, 199, 155,1)',
        textAlign:"center"
    },
    //content item inside the collapsible list (name & date)
    contentItem: {
        paddingLeft:15,
        fontFamily: 'HelloKetta',
        fontSize: 35, 
        color: '#121212', 
    },
    //magnifying glass icon
    contentIcon: {
        color: "#fff",
        fontSize: 24,
        alignSelf:"flex-start"
    },
    //search button(magnifying glass) container
    contentBtnContainer: {
        backgroundColor: "rgba(225,82,100,1)",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 28,
        shadowColor: "#111",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.2,
        elevation: 2,
        minWidth: 30,
        maxWidth: 30,
        minHeight: 30,
        maxHeight: 30,
        opacity: 0.9
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
        borderWidth: 1,
        borderColor: 'rgba(179, 118, 90,1)',
    },
    groceryscreenBreadPos: {
        textAlign: 'center',
        fontSize: 25,
        margin: 5,
    },

    customInnerItem : {
        // paddingTop:13,
        textAlign: 'center', 
        fontFamily: 'HelloKetta', 
        fontSize: 35,
        color: '#121212', 
        width: '100%',
        height:'100%',
        backgroundColor: 'rgba(222, 199, 155,1)',
        
    },

    //Styling for Add Item function
    appBackground: {
        backgroundColor: '#F8F0E3',
        justifyContent: 'center',
        alignItems: 'center',
    },


});

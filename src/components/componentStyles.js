//Stylesheet for Components

import { StyleSheet } from 'react-native';

// Item Detail Component
const componentStyles = StyleSheet.create({
    //1 item per row container
    itemDetailcontainer: {
      flex: 1,
      backgroundColor: 'rgba(255,150,79, 1)',
      opacity: 0.87,
      borderWidth: 1,
      borderColor: '#000000',
    },
    imageBox: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 25,
    },
    BarCodeButton: {
      height: 56,
      width: 50,
    },
    BarCodeTextbox: {
      height: 43,
      width: 228,
      backgroundColor: 'rgba(230, 230, 230,1)',
      shadowColor: 'rgba(72,123,115,1)',
      shadowOffset: {
        width: 3,
        height: 3,
      },
      elevation: 5,
      shadowOpacity: 1,
      shadowRadius: 0,
      marginLeft: 13,
      marginTop: 6,
    },
    materialButtonShareRow: {
      height: 56,
      flexDirection: 'row',
      marginTop: 315,
      marginLeft: 15,
      marginRight: 54,
    },
    ExpiryButton: {
      height: 56,
      width: 50,
    },
    ExpiryDateTextbox: {
      height: 43,
      width: 228,
      backgroundColor: 'rgba(230, 230, 230,1)',
      shadowColor: 'rgba(72,123,115,1)',
      shadowOffset: {
        width: 3,
        height: 3,
      },
      elevation: 5,
      shadowOpacity: 1,
      shadowRadius: 0,
      marginLeft: 13,
      marginTop: 7,
    },
    materialButtonShare1Row: {
      height: 56,
      flexDirection: 'row',
      marginTop: 35,
      marginLeft: 15,
      marginRight: 54,
    },
    materialButtonSuccess: {
      height: 47,
      width: 128,
      shadowColor: 'rgba(26,78,80,1)',
      shadowOffset: {
        width: 3,
        height: 3,
      },
      elevation: 5,
      shadowOpacity: 0.51,
      shadowRadius: 0,
      borderBottomRightRadius: 0,
      borderTopRightRadius: 4,
      borderBottomLeftRadius: 4,
      marginTop: 27,
      marginLeft: 114,
    },
    ItemDetailButtonBottoms: {
      marginTop: 27,
      marginLeft: 114,
    },
    ItemDetailButtonLast: {
      marginTop: 20,
    },
    loremIpsum: {
      fontFamily: 'roboto-regular',
      color: '#121212',
      marginTop: -479,
      marginLeft: 62,
    },
    ItemNameTextbox: {
      height: 43,
      width: 321,
      backgroundColor: 'rgba(230, 230, 230,1)',
      borderRadius: 13,
      shadowColor: 'rgba(71,105,98,1)',
      shadowOffset: {
        width: 3,
        height: 3,
      },
      elevation: 5,
      shadowOpacity: 1,
      shadowRadius: 0,
      borderWidth: 1,
      borderColor: 'rgba(90,149,157,1)',
      marginTop: -43,
      marginLeft: 15,
    },
    CategoryTextbox: {
      height: 43,
      width: 321,
      backgroundColor: 'rgba(230, 230, 230,1)',
      borderRadius: 13,
      shadowColor: 'rgba(71,105,98,1)',
      shadowOffset: {
        width: 3,
        height: 3,
      },
      elevation: 5,
      shadowOpacity: 1,
      shadowRadius: 0,
      borderWidth: 1,
      borderColor: 'rgba(90,149,157,1)',
      marginTop: 28,
      alignSelf: 'center',
    },
    CaloriesTextbox: {
      height: 43,
      width: 200,
      backgroundColor: 'rgba(230, 230, 230,1)',
      borderRadius: 7,
      shadowColor: 'rgba(121,150,150,1)',
      shadowOffset: {
        width: 3,
        height: 3,
      },
      elevation: 5,
      shadowOpacity: 1,
      shadowRadius: 0,
      marginTop: 109,
      marginLeft: 28,
    },
    ItemQtyTextbox: {
      height: 43,
      width: 200,
      backgroundColor: 'rgba(230, 230, 230,1)',
      borderRadius: 7,
      shadowColor: 'rgba(121,150,150,1)',
      shadowOffset: {
        width: 3,
        height: 3,
      },
      elevation: 5,
      shadowOpacity: 1,
      shadowRadius: 0,
      marginTop: -119,
      marginLeft: 28,
    },
    SubmitContainer: {
        backgroundColor: '#009688',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 2,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.35,
        shadowRadius: 5,
        elevation: 2,
        minWidth: 88,
        paddingLeft: 16,
        paddingRight: 16,
      },
      SubmitButton: {
        color: '#fff',
        fontSize: 14,
        fontFamily: 'acme-regular',
      },
      icon: {
        color: '#fff',
        fontSize: 24,
        alignSelf: 'center',
      },
      twoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        paddingLeft: 15,
        paddingRight: 110,
    },
    twoItemDropDown: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
      paddingLeft: 15,
      paddingRight: 90,
  },
    labelContainer: {
        width: 90,
        fontSize: 18,
        fontWeight: 'bold',
    },
    labelStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    inputContainer: {
        backgroundColor: 'transparent',
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
    },
    iconStyle: {
        fontSize: 39,
        paddingLeft: 8,
    },
    inputStyle: {
        color: 'black',
        marginRight: 10,
        fontSize: 16,
        alignSelf: 'stretch',
        flex: 1,
        lineHeight: 16,
        borderBottomWidth: 1,
        borderColor: '#D9D5DC',
        paddingTop: 14,
        paddingBottom: 8,
    },
    btnContainer: {
      backgroundColor: 'rgba(225,82,100,1)',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 28,
      shadowColor: '#111',
      shadowOffset: {
          width: 0,
          height: 2,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.2,
      elevation: 2,
      minWidth: 40,
      maxWidth: 60,
      minHeight: 40,
      maxHeight: 60,
      opacity: 0.9,
  },
    scrollContainer: {
      flex: 1,
    },
    splashText: {
      textAlign: 'center',
      fontSize:65,
      fontFamily:'Sweet-Hipster',
      color:'black',
      marginBottom:30,
    },
    splashView: {
      flex: 1,
      backgroundColor: '#FAC898',
    },
    splashViewInner: {
      flex: 0.5,
      backgroundColor: '#FAC898',
    },
    splashBreadIcon: {
      textAlign: 'center',
      fontSize:32,
    },
  });

  export default componentStyles;

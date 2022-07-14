import { StyleSheet } from 'react-native';

// Item Detail Component
const ItemDetailStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'rgba(139,175,229,1)',
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
        backgroundColor: "#009688",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        borderRadius: 2,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1
        },
        shadowOpacity: 0.35,
        shadowRadius: 5,
        elevation: 2,
        minWidth: 88,
        paddingLeft: 16,
        paddingRight: 16
      },
      SubmitButton: {
        color: "#fff",
        fontSize: 14,
        fontFamily: "acme-regular"
      }
  });

  export default ItemDetailStyles;
import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    itemContainer: {
        flexDirection: 'row',
        marginBottom: 16,
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 1 },
        elevation: 3,
    },
    itemImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
    },
    itemContent: {
        flex: 1,
        marginLeft: 12,
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    itemPrice: {
        fontSize: 14,
        color: 'gray',
        marginVertical: 4,
    },
    itemDescription: {
        fontSize: 12,
        color: 'gray',
    },
    addItemContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1976D2', // Blue background color
        borderRadius: 50, // Rounded corners
        padding: 10,
        width: 120,

    },
    quantityContainer:{
        flexDirection: 'row',
        //: 'absolute',  // Make it absolutely positioned
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'green',//'#1976D2', // Blue background color
        borderRadius: 30, // Rounded corners
        padding: 2,
        width: 100,
        height: 30//
    },
    button: {
        backgroundColor: 'green',//'#1976D2', // Match background color
        padding: 2,
        borderRadius: 30,
    },
    buttonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
    quantityText: {
        fontSize: 16,
        color: '#fff',
        marginHorizontal: 10,
    },


});

export default styles
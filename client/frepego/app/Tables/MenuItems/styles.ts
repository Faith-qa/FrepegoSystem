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
    cartSummaryContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewCartButton: {
        backgroundColor: '#28a745',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 30,
    },
    viewCartText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    },
    cartButton: {
        position: 'absolute',
        bottom: 20,
        left: 16,
        right: 16,
        backgroundColor: 'green',
        padding: 16,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5, // For Android shadow
    },
    cartText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },




});

export default styles
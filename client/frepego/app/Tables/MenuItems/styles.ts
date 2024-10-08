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

});

export default styles
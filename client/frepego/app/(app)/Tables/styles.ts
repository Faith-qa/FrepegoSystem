import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        //alignItems: "center",
        alignSelf: "center"

        //backgroundColor: '#f5f5f5',
    },
    row: {
        justifyContent: 'space-between',
    },

    tableContainer: {
        width: '30%',
        height: 100,
        backgroundColor: '#fff',
        shadowColor: '#000',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        shadowOffset: { width: 0, height: 1 },
        elevation: 3,


        //borderColor: '#007ACC',
       // borderWidth: 2,
    },
    tableNumber: {
        fontSize: 20,
        fontWeight: 'bold',
        //color: '#007ACC',
    },
    tableCapacity: {
        fontSize: 14,
        color: 'gray',
        marginBottom: 8,
    },
});
export default styles;
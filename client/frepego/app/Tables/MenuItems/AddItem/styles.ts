import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        //: 'absolute',  // Make it absolutely positioned
        alignItems: 'center',
        justifyContent: 'center',
         backgroundColor: '#1976D2', // Blue background color
        borderRadius: 50, // Rounded corners
        padding: 2,
        width: 100, // Adjust as needed
    },
    button: {
        backgroundColor: '#1976D2', // Match background color
        padding: 2,
        borderRadius: 50,
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

export default styles;
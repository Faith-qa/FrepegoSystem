import {StyleSheet} from "react-native";
const styles = StyleSheet.create({ container: {
        flex: 1,
    },
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.4)', // Semi-transparent overlay
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    logo: {
        width: 120,
        height: 120,
        marginBottom: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 40,
        textAlign: 'center',
    },
    servicesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        width: '100%',
    },
    serviceCard: {
        width: 150,
        height: 150,
        backgroundColor: '#fff',
        borderRadius: 15,
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 10,
    },
    serviceImage: {
        width: "100%",
        height: 80,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        //borderTopRightRadius:15,
        marginBottom: 10,
       //elevation: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 5,

    },
    serviceText: {
        fontSize: 16,
        color: '#333',
        fontWeight: '600',
        padding:10
    }
});
export default styles;
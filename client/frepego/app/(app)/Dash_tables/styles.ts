import {StyleSheet, Dimensions} from "react-native";
import {width} from "@/app/(app)/Dashboard/styles";

const CARD_WIDTH = width  - 20;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f4f4f4',
        margin: 10,

    },
    card: {
        //borderRadius: 10,
        /*/height: CARD_HEIGHT,
        justifyContent: 'center',
        padding: 20,*/
        marginBottom: 15,
        marginHorizontal: 5,
        width: CARD_WIDTH,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 2,
    },
    header: {
        padding: 10,
        height: 60,
        flexDirection: "row",
        width: "90%",
        borderRadius: 15,
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: "center",
        zIndex: 20,
        //marginBottom: 16,
    },
    headerText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    authorCell: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    authorDetails: {
        marginLeft: 8,
    },
    online: {
        backgroundColor: 'green',
    },
    offline: {
        backgroundColor: 'gray',
    },
});

export default styles
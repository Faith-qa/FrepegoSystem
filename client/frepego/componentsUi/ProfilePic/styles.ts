import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container:{
        width: 70,
        height: 70,
        marginTop: 20,
    },
    profileUp:{
        position: 'absolute',
        right: 0,
        top: '50%',
        transform: [{ translateY: -5 }],
        padding: 10,
        zIndex: 2,
        marginTop: -25,
        marginRight: -15
    },
    image:{
        width: 70,
        height: 70,
        flexShrink: 0,
        borderRadius: 70,
        padding: 20,

    }

})

export default styles;
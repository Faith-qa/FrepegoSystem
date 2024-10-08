import {StyleSheet} from "react-native";
const styles = StyleSheet.create({
    drawerStyle: {
        backgroundColor: '#fff', // Drawer background
        width: 250,
    },
    drawerContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    profileContainer: {
        padding: 20,
        alignItems: 'center',
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 10,
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    drawerItemsContainer: {
        marginTop: 20,
    },
    drawerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
    },
    drawerItemText: {
        marginLeft: 20,
        fontSize: 16,
    },
});

export default styles;
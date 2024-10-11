import {StyleSheet, Dimensions} from "react-native";

export const { width } = Dimensions.get('window');
const CARD_WIDTH = width / 2 - 20;
const CARD_HEIGHT = 120;
const numColumns = width > 1200 ? 4 : width > 500 ? 2 : 1;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        paddingBottom: 20,
    },
    card: {
        borderRadius: 10,
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        justifyContent: 'center',
        padding: 20,
        marginBottom: 15,
        marginHorizontal: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 2,
    },
    value: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
    },
    title: {
        fontSize: 14,
        color: '#fff',
    },
    icon: {
        fontSize: 30,
        color: '#fff',
    },
    sumcontainer: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F7F7F7',
    },
    section: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        color: '#888',
        marginBottom: 20,
    },
    summaryContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    progressContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    progressText: {
        position: 'absolute',
        fontWeight: 'bold',
        fontSize: 18,
    },
    orderStatus: {
        alignItems: 'center',
    },
    statusText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FF6384',
    },
    statusLabel: {
        color: '#888',
    },
    revenueContainer: {
        marginTop: 20,
    },
    revenueTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    revenueSubtitle: {
        color: '#888',
    },
    moreDetailsButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#FF6384',
        borderRadius: 10,
        alignSelf: 'flex-start',
    },
    moreDetailsText: {
        color: '#fff',
    },
    chart: {
        marginTop: 20,
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
    tabButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        borderColor: '#FF6384',
        borderWidth: 1,
    },
    tabText: {
        color: '#FF6384',
    },
    activeTabButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        backgroundColor: '#FF6384',
    },
    activeTabText: {
        color: '#fff',
    },

});
export default styles;
import DashboardScreen from "@/app/(app)/Dashboard/DashboardScreen";
import {FlatList, ScrollView, View, ImageBackground} from "react-native";
import SummaryCharts from "@/app/(app)/Dashboard/SummaryCharts";
import t from './styles';
import s from "@/app/(app)/Tables/styles";


const DashboardContainer: React.FC = () =>{
    const data = [
        { id: 1, title: 'Total Menus', value: '459', icon: '🍔' },
        { id: 2, title: 'Total Revenue', value: '$87,561', icon: '💲' },
        { id: 3, title: 'Total Orders', value: '247', icon: '📋' },
        { id: 4, title: 'Total Customers', value: '872', icon: '👥' },
    ];
    return(
        <ImageBackground
            source={{uri: "https://images.unsplash.com/photo-1524947820859-81b71fe05edc?q=80&w=2833&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}} // Replace with the background image link
            style={s.background}>
        <FlatList
            // Passing empty data since we are not rendering list items from this FlatList directly
            data={[]}
            renderItem={null}
            // Provide the DashboardScreen as the header
            ListHeaderComponent={
                <View>
                    <DashboardScreen data={data} />{/* The main dashboard content */}
                    <SummaryCharts />{/*Your summary charts below */}
                </View>
            }
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={t.container}
        /></ImageBackground>
    )
}

export default DashboardContainer;
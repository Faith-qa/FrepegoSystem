import DashboardScreen from "@/app/(app)/Dashboard/DashboardScreen";
import {FlatList, ScrollView, View} from "react-native";
import SummaryCharts from "@/app/(app)/Dashboard/SummaryCharts";
import s from './styles'

const DashboardContainer: React.FC = () =>{
    const data = [
        { id: 1, title: 'Total Menus', value: '459', icon: '🍔' },
        { id: 2, title: 'Total Revenue', value: '$87,561', icon: '💲' },
        { id: 3, title: 'Total Orders', value: '247', icon: '📋' },
        { id: 4, title: 'Total Customers', value: '872', icon: '👥' },
    ];
    return(
        <FlatList
            // Passing empty data since we are not rendering list items from this FlatList directly
            data={[]}
            renderItem={null}
            // Provide the DashboardScreen as the header
            ListHeaderComponent={
                <>
                    <DashboardScreen data={data} />{/* The main dashboard content */}
                    <SummaryCharts />{/* Your summary charts below */}
                </>
            }
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={s.container}
        />
    )
}

export default DashboardContainer;
import {FlatList, View, Text} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import s, {width} from './styles';
import SummaryCharts from "@/app/(app)/Dashboard/SummaryCharts";
interface NewProps{
    data:any;
}
const numColumns = width > 1200 ? 4 : width > 500 ? 3 : 2;

const DashboardScreen:React.FC<NewProps> = ({data})=>{
    const renderItem = ({ item }:{item: any}) => (
        <LinearGradient
            colors={['rgb(73, 163, 241)', 'rgb(26, 115, 232)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={s.card}
        >
            <Text style={s.value}>{item.value}</Text>
            <Text style={s.title}>{item.title}</Text>
            <Text style={s.icon}>{item.icon}</Text>
        </LinearGradient>
    );
    return(

        <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            numColumns={numColumns}
            contentContainerStyle={s.container}
            renderItem={renderItem}
            key={numColumns}
            nestedScrollEnabled
        />

    )
}

export default DashboardScreen;
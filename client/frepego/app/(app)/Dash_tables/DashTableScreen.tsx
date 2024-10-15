import {useEffect, useState} from "react";
import {Card, Icon} from "react-native-elements";
import {DataTable} from "react-native-paper";
import {View, Text, ScrollView, TouchableOpacity} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import s from './styles';


interface NewProps {
    items: any,
    tableName: string,
}
const DashTableScreen: React.FC<NewProps> = ({
    items,
                                                 tableName
                                             }) =>{
    const [page, setPage] = useState<number>(0);
    const [numberOfItemsPerPageList] = useState([2, 3, 4]);
    const [itemsPerPage, onItemsPerPageChange] = useState(
        numberOfItemsPerPageList[0]
    );
    useEffect(() => {
        setPage(0);
    }, [itemsPerPage]);


    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, items.length);

    return(
        <View style={s.container}>
            <LinearGradient
                colors={['#1976D2', '#42A5F5']} // gradient colors (blue shades)
                style={s.header}
            >
                <Text style={s.headerText}>{tableName}</Text>
                <TouchableOpacity onPress={()=> alert("feature coming soon")}>
                <Icon name={"add"} size={24} color={"white"}/>
                </TouchableOpacity>
            </LinearGradient>
            <ScrollView horizontal>
        <DataTable style={s.card}>
            <DataTable.Header>
                <DataTable.Title>Dessert</DataTable.Title>
                <DataTable.Title numeric>Calories</DataTable.Title>
                <DataTable.Title numeric>Fat</DataTable.Title>
            </DataTable.Header>

            {items.slice(from, to).map((item:any) => (
                <DataTable.Row key={item.key}>
                    <DataTable.Cell>{item.name}</DataTable.Cell>
                    <DataTable.Cell numeric>{item.calories}</DataTable.Cell>
                    <DataTable.Cell numeric>{item.fat}</DataTable.Cell>
                </DataTable.Row>
            ))}

            <DataTable.Pagination
                page={page}
                numberOfPages={Math.ceil(items.length / itemsPerPage)}
                onPageChange={(page) => setPage(page)}
                label={`${from + 1}-${to} of ${items.length}`}
                numberOfItemsPerPageList={numberOfItemsPerPageList}
                numberOfItemsPerPage={itemsPerPage}
                onItemsPerPageChange={onItemsPerPageChange}
                showFastPaginationControls
                selectPageDropdownLabel={'Rows per page'}
            />
        </DataTable>
            </ScrollView>
</View>
    )
}
export default DashTableScreen;

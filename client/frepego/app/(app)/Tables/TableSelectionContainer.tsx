import TableSelectionScreen from "@/app/(app)/Tables/TableSelectionScreen";
import {gql, useQuery} from "@apollo/client";
import {TABLE_ITEMS_QUERY} from "@/app/graph_queries";
import {ActivityIndicator} from "react-native";

const TableSelectionContainer:React.FC=()=>{


    const tablesData = [
        { id: '1', number: 1, capacity: 4 },
        { id: '2', number: 2, capacity: 4 },
        { id: '3', number: 3, capacity: 4 },
        { id: '4', number: 4, capacity: 4 },
        { id: '5', number: 5, capacity: 4},
        { id: '6', number: 6, capacity: 4 },
        { id: '7', number: 7, capacity: 4 },
        { id: '8', number: 8, capacity: 4 },
        { id: '9', number: 9, capacity: 4},
        { id: '9', number: 10, capacity: 4},
    ];
    return(
        <TableSelectionScreen data={tablesData}/>
    )

}

export default TableSelectionContainer;
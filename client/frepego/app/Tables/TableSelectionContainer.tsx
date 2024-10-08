import TableSelectionScreen from "@/app/Tables/TableSelectionScreen";
const TableSelectionContainer:React.FC=()=>{
    const tablesData = [
        { id: '1', number: '01', capacity: '4 Person' },
        { id: '2', number: '02', capacity: '2 Person' },
        { id: '3', number: '03', capacity: '5 Person' },
        { id: '4', number: '04', capacity: '2 Person' },
        { id: '5', number: '05', capacity: '2 Person' },
        { id: '6', number: '06', capacity: '8 Person' },
        { id: '7', number: '07', capacity: '2 Person' },
        { id: '8', number: '08', capacity: '4 Person' },
        { id: '9', number: '09', capacity: '6 Person' },
    ];
    return(
        <TableSelectionScreen data={tablesData}/>
    )

}

export default TableSelectionContainer;
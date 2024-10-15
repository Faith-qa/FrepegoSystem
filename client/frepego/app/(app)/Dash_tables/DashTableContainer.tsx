import {useState} from "react";
import DashTableScreen from "@/app/(app)/Dash_tables/DashTableScreen";

const DashTableContainer:React.FC = () => {
    const [items] = useState([
        {
            key: 1,
            name: 'Cupcake',
            calories: 356,
            fat: 16,
        },
        {
            key: 2,
            name: 'Eclair',
            calories: 262,
            fat: 16,
        },
        {
            key: 3,
            name: 'Frozen yogurt',
            calories: 159,
            fat: 6,
        },
        {
            key: 4,
            name: 'Gingerbread',
            calories: 305,
            fat: 3.7,
        },
    ]);

    const tableName = ["orders", "users", "rooms_booked"]
    return(
<>
    <DashTableScreen items={items} tableName={tableName[0]}/>
    <DashTableScreen items={items} tableName={tableName[1]}/>
    <DashTableScreen items={items} tableName={tableName[2]}/>
</>
    )
}

export default DashTableContainer;
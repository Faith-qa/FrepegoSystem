import {useState} from "react";
import DashTableScreen from "@/app/(app)/Dash_tables/DashTableScreen";
import {ImageBackground} from "react-native";
import s from "@/app/(app)/Tables/styles";

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
        <ImageBackground
            source={{uri: "https://images.unsplash.com/photo-1524947820859-81b71fe05edc?q=80&w=2833&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}} // Replace with the background image link
            style={s.background}>
    <DashTableScreen items={items} tableName={tableName[0]}/>
    <DashTableScreen items={items} tableName={tableName[1]}/>
    <DashTableScreen items={items} tableName={tableName[2]}/>
        </ImageBackground>
    )
}

export default DashTableContainer;
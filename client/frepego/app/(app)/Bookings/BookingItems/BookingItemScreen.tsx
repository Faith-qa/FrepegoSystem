import s from "@/app/(app)/Tables/MenuItems/styles";
import { FlatList, ImageBackground } from "react-native";
import ProductItem from "@/app/(app)/Tables/MenuItems/Item";
import BookingItem from "@/app/(app)/Bookings/BookingItems/BookingItem";

interface NewProps {
    data: any[];
}

const BookingItemScreen: React.FC<NewProps> = ({ data }) => {
    return (
        <ImageBackground
            source={{ uri: "https://images.unsplash.com/photo-1524947820859-81b71fe05edc?q=80&w=2833&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }}
            style={s.container}
        >
            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <BookingItem item={item} />
                )}
                keyExtractor={(item) => item.id}
            />
        </ImageBackground>
    );
}

export default BookingItemScreen;

import MenuItemScreen from "@/app/Tables/MenuItems/MenuItemScreen";
import {useScrollViewOffset} from "react-native-reanimated";
import {useState} from "react";

const MenuItemContainer: React.FC =() =>{
    
    const [openAddItemModal, setOpenAddItemModal] = useState(false)
    const [selectedItem, setSelectedItem] = useState(null)
    const openAdd = (id: any) =>{
        setSelectedItem(id)
        setOpenAddItemModal(true)
    }
    const closeAdd = () => {
        setSelectedItem(null)
        setOpenAddItemModal(false)
    }

    const data = [
        {
            id: '1',
            title: 'Full American Breakfast',
            price: 'KSh650.00',
            description: 'Freshly squeezed juice, fruits cuts, toast served with butter and jam, breakfast cereals...',
            image: 'https://images.pexels.com/photos/103124/pexels-photo-103124.jpeg?auto=compress&cs=tinysrgb&w=1200', // Replace with actual image path or URL
        },
        {
            id: '2',
            title: 'Light Breakfast',
            price: 'KSh520.00',
            description: 'Freshly squeezed juice or fruit cuts, toast served with butter and jam and two eggs...',
            image: 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', // Replace with actual image path or URL
        },
        {
            id: '3',
            title: 'Continental Breakfast',
            price: 'KSh455.00',
            description: 'Freshly squeezed juice, fruit cuts, toast served with butter and jam or breakfast cereals...',
            image: 'https://images.pexels.com/photos/414555/pexels-photo-414555.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', // Replace with actual image path or URL
        },
        {
            id: '4',
            title: 'Two eggs, 2 sausages',
            price: 'KSh325.00',
            description: 'Served with toast...',
            image: 'https://images.pexels.com/photos/101533/pexels-photo-101533.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', // Replace with actual image path or URL
        },
    ];
    
    

    /*TODO: PULL MENU ITEM DATA FROM DATABASE*/
    /*TODO: functionality for add menu item*/
    return(
        <MenuItemScreen selectedItem={selectedItem} data={data} openAddItem={openAddItemModal} setOpenAddItem={openAdd} closeAddItem={closeAdd}/>
    )
}

export default MenuItemContainer;
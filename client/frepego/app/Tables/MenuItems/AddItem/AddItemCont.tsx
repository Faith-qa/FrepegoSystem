import {useState} from "react";
import {Modal} from "react-native";
import AddItemScreen from "@/app/Tables/MenuItems/AddItem/AddItemScreen";


interface NewProps{
    open:boolean,
    closeI: ()=>void
}
const AddItemCont:React.FC<NewProps> = ({
    open,
    closeI,
                                        }) => {
    const [quantity, setQuantity] = useState(1);

    const increment = () => {
        setQuantity(quantity + 1)
    }

    const decrement = () => {
        if(quantity > 1) {
            setQuantity(quantity - 1)
        } else{
            closeI()
        }

    }


    return (<Modal
        visible={open}
        transparent={true}
        animationType="none"
    >
        <AddItemScreen quantity={quantity} increment={increment} decrement={decrement}/>
    </Modal>)

}

export default AddItemCont;
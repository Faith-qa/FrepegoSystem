import {Image, TouchableOpacity, View} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import React from "react";
import s from './styles'

/*interface NewProps{
    uploadedProfile: string | undefined,
    uploadToCloudinary: ()=> Promise<void>
}*/

const ProfilePicScreen:React.FC= () => {

    return(
        <View style={s.container}>
            <TouchableOpacity onPress={()=>alert('feature coming')} style={s.profileUp}>
                <AntDesign name="edit" size={24} color="black" />
            </TouchableOpacity>
            <Image source={{uri:"https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=2912&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}}
                   style={s.image} />
        </View>
    )
}

export default ProfilePicScreen;
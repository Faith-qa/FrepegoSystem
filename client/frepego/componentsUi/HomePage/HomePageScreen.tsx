import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Image, StyleSheet } from 'react-native';
import s from './styles'
import {Link} from "expo-router";


interface NewProps{
    services:any[];
}
const HomePageScreen:React.FC<NewProps> = ({services}) =>{
    return( <View style={s.container}>
        <ImageBackground
            source={{uri: "https://images.unsplash.com/photo-1524947820859-81b71fe05edc?q=80&w=2833&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}} // Replace with the background image link
            style={s.background}
        >
            <View style={s.overlay}>
                <Image
                    source={require('@/assets/HomeAssets/logo.webp')} // Replace with your logo link
                    style={s.logo}
                />
                <Text style={s.title}>Select a service to create an order</Text>

                <View style={s.servicesContainer}>
                    {services.map(service => (
                        <Link href={service.path} key={service.id} asChild>
                            <TouchableOpacity style={s.serviceCard}>
                            <Image source={{uri: service.image}} style={s.serviceImage}/>
                            <Text style={s.serviceText}>{service.name}</Text></TouchableOpacity>
                        </Link>
                    ))}
                </View>
            </View>
        </ImageBackground>
    </View>)
}
export default  HomePageScreen;
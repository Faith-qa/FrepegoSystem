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
            source={require('@/assets/HomeAssets/background.png')} // Replace with the background image link
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
                            <Image source={service.image} style={s.serviceImage}/>
                            <Text style={s.serviceText}>{service.name}</Text></TouchableOpacity>
                        </Link>
                    ))}
                </View>
            </View>
        </ImageBackground>
    </View>)
}
export default  HomePageScreen;
import {Redirect, Slot} from "expo-router";
import {SessionProvider, useSession} from "@/app/authContext";
import { Provider as PaperProvider } from 'react-native-paper';
import {View, StyleSheet, Text} from "react-native";
import React from "react";
import {AppRegistry} from "react-native";
import {ApolloClient, InMemoryCache, ApolloProvider} from "@apollo/client";
import cache from "@/app/cache";

export default function Root(){

    const client = new ApolloClient({
        uri: 'http://10.0.2.2:8000/graphql/',
        cache: cache
    })
    return(
        <SessionProvider>
            <ApolloProvider client={client}>
                    <Slot />
            </ApolloProvider>
        </SessionProvider>
    )
}


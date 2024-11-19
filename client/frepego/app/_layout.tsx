import {Redirect, Slot} from "expo-router";
import {SessionProvider, useSession} from "@/app/authContext";
import React from "react";
import {ApolloClient, InMemoryCache, ApolloProvider} from "@apollo/client";
import cache from "@/app/cache";
import {CartProvider} from "@/app/CartContext";

const myVariable = process.env.EXPO_PUBLIC_API_URL;
console.log(`Proof that this loads: ${myVariable}`);

export default function Root(){


    const client = new ApolloClient({
        uri: myVariable,
        cache: cache
    })
    return(
        <SessionProvider>
            <ApolloProvider client={client}>
                <CartProvider>
                    <Slot />
                </CartProvider>
            </ApolloProvider>
        </SessionProvider>
    );
};


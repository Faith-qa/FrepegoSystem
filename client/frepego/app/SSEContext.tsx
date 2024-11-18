import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import RNEventSource from 'react-native-event-source';

interface EventSourceContextProps {
    orders: any[];
}

const EventSourceContext = createContext<EventSourceContextProps | undefined>(undefined);

export const EventSourceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [orders, setOrders] = useState<any[]>([]);

    useEffect(() => {
        const eventSource = new RNEventSource('http://10.0.2.2:8000/order-update/');
        eventSource.addEventListener('message', (data: any) => {
            //setOrders(data.data)
            console.log('started the watch orders, orders', data);     })
        /*console.log("mamamama")
        const listener = (event: any)=>{
            console.log("hello mamamama")
            if(event.type === 'open'){
                console.log("mamamama")
                console.log("Open SSE connection")
            } else if(event.type === "message"){
                if(event.data){
                    const parsedData = JSON.parse(event.data)
                    setOrders(parsedData)
                    console.log("hello love")
                }
            }else if(event.type === "error"){
                console.error("Connection error:", event.message)
            }else if (event.type === "exception"){
                console.error("Error:", event.message, event.error)
            }
        };
        eventSource.addEventListener("open", listener)
        eventSource.addEventListener("message", listener)
        eventSource.addEventListener("error", listener)*/



        return () => {
            eventSource.removeAllListeners();
            eventSource.close();
        };
    }, []);

    return (
        <EventSourceContext.Provider value={{ orders }}>
            {children}
        </EventSourceContext.Provider>
    );
};

export const useEventSource = (): EventSourceContextProps => {
    const context = useContext(EventSourceContext);
    if (!context) {
        throw new Error('useEventSource must be used within an EventSourceProvider');
    }
    return context;
};

import EventSource from "react-native-sse";

const myurl = process.env.EXPO_PUBLIC_ORDERS_URL;




function addListeners() {
    if (myurl === undefined)
        return
    const es = new EventSource(myurl)

    es.addEventListener("open", (event)=>{
        console.log("open SSE connection");
    });
    es.addEventListener("message", (event)=>{
        console.log("new messageEvent:", event.data)
        return
    });
    es.addEventListener("error", (event)=>{
        if(event.type === "error"){
            console.error("connection error:", event.message);
        }else if(event.type === "exception"){
            console.error("Error:", event.message, event.error)
        }
    });
    es.addEventListener("close", (event)=>{
        console.log("close SSE connection")
    })

}




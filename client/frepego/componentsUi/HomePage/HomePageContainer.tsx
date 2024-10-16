import HomePageScreen from "@/componentsUi/HomePage/HomePageScreen";

const HomePageContainer:React.FC =()=>{
    const services = [
        { id: 1, name: 'Restaurant', image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", path:'/Tables'},
        { id: 2, name: 'Bar', image: "https://images.unsplash.com/photo-1470338745628-171cf53de3a8?q=80&w=3088&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", path:'/Tables'},
        { id: 3, name: 'Accommodation', image: "https://images.unsplash.com/photo-1725962479542-1be0a6b0d444?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", path:'/Bookings' },
        { id: 4, name: 'Conference Hall', image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2912&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", path:'/Bookings' },
    ];


    return(<HomePageScreen services={services}/>)
}

export default HomePageContainer;
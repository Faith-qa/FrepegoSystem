import HomePageScreen from "@/componentsUi/HomePage/HomePageScreen";

const HomePageContainer:React.FC =()=>{
    const services = [
        { id: 1, name: 'Restaurant', image: require('@/assets/HomeAssets/restaurant.png'), path:'/Tables'},
        { id: 2, name: 'Bar', image: require('@/assets/HomeAssets/bar.png'), path:'/Tables'},
        { id: 3, name: 'Accommodation', image: require('@/assets/HomeAssets/accomodation.png'), path:'/Tables' },
        { id: 4, name: 'Conference Hall', image: require('@/assets/HomeAssets/conference.png'), path:'/Tables' },
    ];


    return(<HomePageScreen services={services}/>)
}

export default HomePageContainer;
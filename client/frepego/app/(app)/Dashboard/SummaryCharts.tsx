import React from "react";
import {View, Dimensions, TouchableOpacity, ScrollView, Text} from "react-native";
import {LineChart} from "react-native-chart-kit";
import * as Progress from 'react-native-progress';
import s from './styles'

const screenWidth = Dimensions.get('window').width;

const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
        {
            data: [50, 60, 40, 30, 70, 50, 80, 60, 50, 90, 60, 80],
        },
    ],
};

const SummaryCharts: React.FC = () =>{
    return(
        <View>
            <View style={s.section}>
                <Text style={s.sectionTitle}>
                    Orders Summary
                </Text>
                <Text style={s.description}>Lorem ipsum dolor sit amet, consectetur</Text>
                <View>
                    {/* Progress Circle*/}
                    <Progress.Circle
                        size={120}
                        progress={0.55}
                        color={'rgb(73, 163, 241)\', \'rgb(26, 115, 232)'}
                        unfilledColor={'#e0e0e0'}
                        borderWidth={0}
                        thickness={8}
                        showsText={false}/>
                    <Text style={s.progressText}>55%</Text>
                </View>
                <View style={s.revenueContainer}>
                    <Text style={s.revenueTitle}>$856,005.56</Text>
                    <Text style={s.revenueSubtitle}>from $800,000.00</Text>
                    <TouchableOpacity>
                        <Text style={s.moreDetailsText}>More details</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/*RevenueSection*/}
            <View style={s.section}>
                <Text style={s.sectionTitle}>Revenue</Text>
                <Text style={s.description}>Lorem ipsum dolor sit amet, consectetur</Text>
                <LineChart
                    data={data}
                    width={screenWidth - 40}
                    height={220}
                    chartConfig={{
                        backgroundColor: '#ffffff',
                        backgroundGradientFrom: '#ffffff',
                        backgroundGradientTo: '#ffffff',
                        decimalPlaces: 0,
                        color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        style: {
                            borderRadius: 16,
                        },
                        propsForDots: {
                            r: '6',
                            strokeWidth: '2',
                            stroke: '#FF6384',
                        },
                    }}
                    style={s.chart}
                />
                <View style={s.tabContainer}>
                    <TouchableOpacity style={s.tabButton}>
                        <Text style={s.tabText}>All Food</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={s.activeTabButton}>
                        <Text style={s.activeTabText}>Food</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={s.tabButton}>
                        <Text style={s.tabText}>Beverages</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default SummaryCharts;
import React, { useEffect, useState } from 'react'
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    TextInput,
    Dimensions
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/FontAwesome';

import { useHttp } from '../hooks/http.hook'

const WEATHER_API_KEY = '95e01fabdd174fc4972bcd4fb76fe05e'

export const Search = ({ route, navigation }) => {
    const { error, request } = useHttp()
    const { data } = route.params;
    const [city, setCity] = useState('')
    const [weatherData, setWeatherData] = useState([])

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const getWeatherFull = async () => {
        // const weatherUrl = `http://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt=7&appid=${WEATHER_API_KEY}`
        // const weatherUrl = `http://api.openweathermap.org/data/2.5/forecast/daily?q=${city.city}&cnt=7&appid=${WEATHER_API_KEY}`
        
        const weatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${city.lat}&lon=${city.lon}&units=metric&exclude=hourly,minutely,current,alerts&appid=${WEATHER_API_KEY}`
        // const weatherUrl = `http://api.openweathermap.org/data/2.5/forecast/daily?q=london&units=metric&APPID=value&cnt=7&appid=${WEATHER_API_KEY}`
        
        // const weatherUrl = `http://api.openweathermap.org/data/2.5/forecast/daily?q=London&units=metric&cnt=7&appid=${WEATHER_API_KEY}`
        // const weatherUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&units=metric&exclude=hourly,minutely,current,alerts&cnt=42&appid=${WEATHER_API_KEY}`
        
        console.log(weatherUrl)
        try {
            const req = await request(weatherUrl)
            setWeatherData(req.daily)
            // console.log(weatherData[0].temp.day)

            // console.log(new Date(req.list[0].dt * 1000).getDay())
            // console.log(req.list[0].dt)
            // console.log(new Date(req.list[30].dt * 1000).getDay())
            // console.log(req.list[30].dt)
            // const newData = []
            // console.log(newData)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        data ? setCity(data) : null
    }, [])

    useEffect(() => {
        getWeatherFull()
    }, [city])

    return (
        <SafeAreaView>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack()
                    }}
                >
                    <Icon name="chevron-left" size={25} color={'white'} />
                </TouchableOpacity>
                <Text style={styles.title}>City Search</Text>
                <Icon name="chevron-left" size={25} color={'purple'} />
            </View>
            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                />
                <TouchableOpacity
                    onPress={() => {

                    }}
                    style={styles.searchBtn}
                >
                    <Icon name="search" size={25} color={'white'} />
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.dataWrapper}>
                {weatherData ? weatherData.map(e => {
                    const numberOfTheDay = (new Date(e.dt * 1000).getDay())

                    return (
                        <View style={styles.oneDayBlock} key={e.dt}>
                            <Text style={styles.oneDayBlockText}>{
                                days[numberOfTheDay]}
                            </Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Icon name="thermometer-half" size={25} color={'white'} />
                                <Text style={styles.oneDayBlockText}>{e.temp.day}</Text>
                            </View>
                        </View>)
                    // }
                })
                    : null}

            </ScrollView>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    header: {
        width: Dimensions.get('window').width,
        backgroundColor: 'purple',
        height: 60,
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    title: {
        fontSize: 25,
        color: 'white'
    },
    input: {
        borderWidth: 1,
        width: Dimensions.get('window').width - Dimensions.get('window').width / 5,
        marginRight: 10,
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 15,
    },
    searchBtn: {
        backgroundColor: 'purple',
        borderRadius: 55,
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    form: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    dataWrapper: {
        paddingHorizontal: 20,
    },
    oneDayBlock: {
        backgroundColor: 'purple',
        flexDirection: 'row',
        borderRadius: 5,
        paddingHorizontal: 20,
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    oneDayBlockText: {
        color: '#fff',
        fontSize: 20,
        marginLeft: 5,
    },
})

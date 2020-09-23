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
    
    const getWeatherFull = async () => {    
        // const weatherUrl = `http://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt=7&appid=${WEATHER_API_KEY}`
        const weatherUrl = `http://api.openweathermap.org/data/2.5/forecast/daily?q=${city.city}&cnt=7&appid=${WEATHER_API_KEY}`
        console.log(weatherUrl)
        try {
            const req = await request(weatherUrl)
            console.log(req)
            // setCurrentCity(req.name)
            // setCurrentTemp(req.main.temp)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        data ? setCity(data) : null
        console.log(city)
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
            <View style={styles.dataWrapper}>
                <View style={styles.oneDayBlock}>
                    <Text style={styles.oneDayBlockText}>Monday</Text>
                    <Icon name="thermometer-half" size={25} color={'white'} />
                </View>
            </View>
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
    },
    oneDayBlockText: {
        color: '#fff',
        fontSize: 20,
    },
})

import React, { useEffect } from 'react'
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

    // api.openweathermap.org/data/2.5/forecast/daily?q={city name}&cnt=7&appid={API key}

export const Search = ({route, navigation}) => {
    const { data } = route.params;

    useEffect(() => {
        data ? console.log(data) : null
    })

    return (
        <SafeAreaView>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack()
                    }}
                >
                    <Icon name="chevron-left" size={25} color={'white'}/>
                </TouchableOpacity>
                <Text style={styles.title}>City Search</Text>
                <Icon name="chevron-left" size={25} color={'purple'}/>
            </View>
            {/* <Icon name="thermometer-half" size={25} color={'purple'}/> */}
        <View>
            <TextInput />
            <TouchableOpacity
                onPress={() => {

                }}
            >
                <Icon name="search" size={25}/>
            </TouchableOpacity>
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
})

import React from 'react'
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

export const Search = ({navigation}) => {
    return (
        <SafeAreaView>
        <View>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack()
                    }}
                >
                    <Icon name="chevron-left" size={25} color={'white'}/>
                </TouchableOpacity>
                <Text style={styles.title}>City Search</Text>
                <Icon name="chevron-left" size={25} color={'violet'}/>
            </View>
            <Text>Search</Text>
            <TextInput/>
            <Icon name="temperature" size={25}/>
        </View>
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

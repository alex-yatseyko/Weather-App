import React, { useEffect, useState } from 'react'
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    Dimensions,
    Button
} from 'react-native';
import MapView, { UrlTile, PROVIDER_GOOGLE, Marker, Callout, } from 'react-native-maps';

import { useHttp } from '../hooks/http.hook'

export const Home = ({ navigation }) => {
    const [markerCoords, setMarkerCoords] = useState({ "latitude": 360, "longitude": 360 })
    const [unitsSystem, setUnitsSystem] = useState('metric')
    const [showTip, setShowTip] = useState(true)
    const [currentCity, setCurrentCity] = useState(null)
    const [currentTemp, setCurrentTemp] = useState(null)
    const [region, setRegion] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    })

    const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?'
    const WEATHER_API_KEY = '95e01fabdd174fc4972bcd4fb76fe05e'

    const { error, request } = useHttp()

    const { latitude, longitude } = markerCoords
    const weatherUrl = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=${unitsSystem}&appid=${WEATHER_API_KEY}`

    useEffect(() => {
        getWeather()
    }, [markerCoords])

    const getWeather = async () => {
        try {
            const req = await request(weatherUrl)
            setCurrentCity(req.name)
            setCurrentTemp(req.main.temp)
        } catch (e) {
            console.log(e)
        }
    }

    const onMapLongPress = (e) => {
        setShowTip(false)
        setMarkerCoords(e.nativeEvent.coordinate)
    }

    return (
        <View>
            <MapView
                // onRegionChange={onRegionChange}
                style={styles.mapStyle}
                showsUserLocation={false}
                showsMyLocationButton={false}
                // zoomEnabled={true}
                followUserLocation={false}
                // provider={PROVIDER_GOOGLE}

                onPress={() => {setShowTip(true)}}
                onLongPress={(e) => { onMapLongPress(e) }}

                onRegionChange={region => {
                    setRegion(region)
                }}
            >
                {markerCoords ?
                    <Marker
                        draggable 
                        coordinate={
                            markerCoords
                        }
                        image={require('../assets/pin2.png')}
                    onDragEnd={(e) => {
                      console.log(e.nativeEvent)
                      onMapLongPress(e)
                    }}
                    >

                        <Callout
                            tooltip={true}
                            onPress={() => {
                                navigation.navigate('Search', {
                                    data: currentCity
                                })
                            }}
                            style={{
                                backgroundColor: 'white',
                                height: 45,
                                paddingHorizontal: 20,
                                paddingVertical: 4,
                                borderRadius: 5,
                                borderColor: 'violet',
                                flexDirection: 'column',
                                alignItems: 'center',
                                borderWidth: 1,
                                position: 'absolute'
                                // left: 10,
                            }}
                        >

                            <Text>{currentCity}</Text>
                            <Text>{currentTemp}°C</Text>

                        </Callout>
                       
                    </Marker> : null}
            </MapView>
            {showTip ? <View style={styles.toolTip}>
                <Text style={styles.toolTipText}>Press to a place for a few seconds where you want to know the weather. Then press on marker.</Text>
            </View> : null }
        </View>
    )
}

const styles = StyleSheet.create({
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        marginBottom: 40,
    },
    toolTip: {
        position: 'absolute',
        bottom: 135,
        backgroundColor: 'purple',
        marginHorizontal: 30,
        paddingHorizontal: 30,
        paddingVertical: 20,
        borderRadius: 15,
        left: 0, right: 0,
        justifyContent: 'center',
    },
    toolTipText: {
        color: '#fff',
        textAlign: 'center'
    },
})
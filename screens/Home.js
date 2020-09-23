import React, { useState } from 'react'
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    Dimensions
  } from 'react-native';
  import MapView, { UrlTile, PROVIDER_GOOGLE, Marker, Callout,  } from 'react-native-maps';
  
  import { useHttp } from '../hooks/http.hook'

export const Home = ({navigation}) => {
    const [markerCoords, setMarkerCoords] = useState({ "latitude": 360, "longitude": 360 })
    const [unitsSystem, setUnitsSystem] = useState('metric')
    const [showCallout, setShowCallout] = useState(false)
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

    const onMapLongPress = (e) => {
        setShowCallout(false)
        setMarkerCoords(e.nativeEvent.coordinate)
        const { latitude, longitude } = markerCoords
        const weatherUrl = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=${unitsSystem}&appid=${WEATHER_API_KEY}`
    
        const getWeather = async () => {
          try {
            const req = await request(weatherUrl)
            setCurrentCity(req.name)
            setCurrentTemp(req.main.temp)
            // console.log(weatherUrl)
          } catch (e) {
            console.log(e)
          }
        }
        getWeather()
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


            onLongPress={(e) => { onMapLongPress(e) }}

            onRegionChange={region => {
              setRegion(region)
            }}
          >
  {/* <UrlTile
    onLongPress={() => {
      console.log('test')
    }}
    style={{zIndex: -1}}
    urlTemplate={`https://1.base.maps.ls.hereapi.com/maptile/2.1/maptile/newest/normal.day/{z}/{x}/{y}/256/png8?apiKey='aJYTveJijLx5bMV5Qt4-pXKHvbH9CblzqBiq3dRZRDA'&app_id='T94boxXXrApFtc58WmGz'`}
    maximumZ={19}
    flipY={false}
    zIndex={-1}
  > */}
            {markerCoords ?
              <Marker
                draggable
                coordinate={
                  markerCoords
                }
                onPress={() => {
                  setShowCallout(true)
                }}
                image={require('../assets/pin2.png')}
                onDragEnd={(e) => {
                  // onMapLongPress(e)
                  console.log(e.nativeEvent)
                }}
              >
                {showCallout ?
    
                  // <Callout>
                  <TouchableOpacity
                    onPress={() => {
                      console.log('test opacity')
                    }}
                    style={{
                      width: 150,
                      height: 50, 
                      backgroundColor: 'white', 
                      // position: 'absolute', 
                      top: -60, 
                      marginBottom: 100,
                      left: -50,
                      flexDirection: 'column',
                      alignItems: 'center',
                      borderRadius: 5,
                      borderColor: 'black',
                      borderWidth: 1,
                      zIndex: 999,
                    }}
                  >
                      <Text>{currentCity}</Text>
                      <Text>{currentTemp}</Text>
                  </TouchableOpacity>
                  : null}
              </Marker> : null}
              {/* </UrlTile> */}
          </MapView>
            <View style={styles.toolTip}>
                <Text style={styles.toolTipText}>Press to a place for a few seconds where you want to know the weather. Then press on marker.</Text>
            </View>
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
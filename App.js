import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity
} from 'react-native';
import MapView, { Polygon, PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { useHttp } from './hooks/http.hook'

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';


const App: () => React$Node = () => {
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
      } catch (e) {
        console.log(e)
      }
    }
    getWeather()
  }



  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <MapView
            // onRegionChange={onRegionChange}
            style={styles.mapStyle}
            showsUserLocation={false}
            showsMyLocationButton={false}
            zoomEnabled={true}
            followUserLocation={false}
            // provider={PROVIDER_GOOGLE}


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
                onPress={() => {
                  setShowCallout(true)
                }}
                image={require('./assets/pin2.png')}
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
                    {/* <View
                      // style={{
                      //   width: 150,
                      //   height: 50, 
                      //   backgroundColor: 'white', 
                      //   position: 'absolute', 
                      //   top: -60, 
                      //   marginBottom: 100,
                      //   left: -50,
                      //   flexDirection: 'column',
                      //   alignItems: 'center',
                      //   borderRadius: 5,
                      //   borderColor: 'black',
                      //   borderWidth: 1,
                      // }}
                      > */}
                      {/* <Text>Kyiv, Ukraine</Text> */}
                      <Text>{currentCity}</Text>
                      {/* <Text>+1 C</Text> */}
                      <Text>{currentTemp}</Text>
                    {/* </View> */}
                  </TouchableOpacity>
                  // </Callout>
                  : null}
              </Marker> : null}
          </MapView>
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Step One</Text>
              <Text style={styles.sectionDescription}>
                Edit <Text style={styles.highlight}>App.js</Text> to change this
                screen and then come back to see your edits.
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>See Your Changes</Text>
              <Text style={styles.sectionDescription}>
                <ReloadInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Debug</Text>
              <Text style={styles.sectionDescription}>
                <DebugInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Learn More</Text>
              <Text style={styles.sectionDescription}>
                Read the docs to discover what to do next:
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  mapStyle: {
    // width: Dimensions.get('window').width,
    width: '100%',
    // height: '50%',
    height: 400,
    marginBottom: 40,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;

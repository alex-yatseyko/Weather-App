import React, { useState } from 'react'
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

export const Home = () => {
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

    return (
        <View>
            <Text>Home</Text>
        </View>
    )
}

import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Button
} from 'react-native';
import { Navigation } from './navigation/Navigation'

import { NavigationContainer } from '@react-navigation/native';



const App: () => React$Node = () => {
  return (
    <>
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
        <View style={{flex: 1}}>
        <Navigation />
          {/* <Routes /> */}
        </View>
      </NavigationContainer>
    </>
  );
};


export default App;

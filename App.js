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
import MapView, { UrlTile, PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { useHttp } from './hooks/http.hook'
import { Navigation } from './navigation/'

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';




const App: () => React$Node = () => {



  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Navigation />
      </SafeAreaView>
    </>
  );
};


export default App;

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

// import Icon from 'react-native-vector-icons/Ionicons';

// import { Ionicons } from '@expo/vector-icons';

import { Home } from '../screens/Home'
import { City } from '../screens/City'
import { Search } from '../screens/Search'

const BottomTab = createBottomTabNavigator();
const Stack = createStackNavigator();

const StackWrapper = () => {
    return(
        <>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="City" component={City} />
    </Stack.Navigator>
        </>
    )
}

export const Navigation = ({navigation}) => {
    return (
      <>

      <BottomTab.Navigator
        initialRouteName="Home"
      >
        <BottomTab.Screen name="Map" component={StackWrapper} />
        <BottomTab.Screen name="Search" component={City} />
      </BottomTab.Navigator> 

      </>
    );
  }

  // function TabBarIcon(props: { name: string; color: string }) {
  //   return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
  // }
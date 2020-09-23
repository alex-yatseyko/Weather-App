import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Home } from '../screens/Home'
import { City } from '../screens/City'
import { Search } from '../screens/Search'

Icon.loadFont();

const BottomTab = createBottomTabNavigator();
const Stack = createStackNavigator();

const StackWrapper = () => {
  return (
    <>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="City" component={City} />
      </Stack.Navigator>
    </>
  )
}


export const Navigation = ({ navigation }) => {
  return (
    <>
      <BottomTab.Navigator
        initialRouteName="Home"
        tabBarOptions={{ activeTintColor: 'violet' }}>
      {/* > */}
        <BottomTab.Screen
          name="Map"
          component={StackWrapper}
          options={{
            tabBarIcon: ({ color }) => <TabBarIcon name="map" color={color} />,
          }}
        />
        <BottomTab.Screen 
          name="Search" 
          component={Search} 
          options={{
            tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color}/>,
          }}
          />
      </BottomTab.Navigator>

    </>
  );
}

function TabBarIcon(props) {
  // return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
  return <Icon  size={25} {...props} />;
}
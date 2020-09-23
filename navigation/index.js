import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import { Home } from '../screens/Home'
import { City } from '../screens/City'
import { Search } from '../screens/Search'

const BottomTab = createBottomTabNavigator();
const Stack = createStackNavigator();

const StackWrapper = () => {
    return(
        <>
        {/* <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Root" component={BottomTabNavigator} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator> */}
        </>
    )
}

export const Navigation = ({navigation}) => {


    return (
      <>
      <NavigationContainer>

      {/* <BottomTab.Navigator
        initialRouteName="Home"
      >
        <BottomTab.Screen name="Home" component={Home} />
        <BottomTab.Screen name="Settings" component={City} />
      </BottomTab.Navigator> */}

      {/* <BottomTab.Navigator
      initialRouteName="TabOne"
    //   tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
      >
        <BottomTab.Screen
        name="TabOne"
        component={City}
        // options={{
        //   tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
        // }}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={Search}
        // options={{
        //   tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
        // }}
      />
      </BottomTab.Navigator> */}

        <Home/>
        {/* <City /> */}
        {/* <Search /> */}
      </NavigationContainer>
      </>
    );
  }
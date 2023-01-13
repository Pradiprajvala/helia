import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from './screens/homeScreen/HomeScreen'
import BottomNavigationTab from './components/homeScreen/BottomNavigationTab'
import SearchScreen from './screens/searchScreen/SearchScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import DataLayer from './DataLayer'
import { initialState, reducer } from './reducer'
import RecentlyBookedScreen from './screens/RecentlyBookedScreen.js/RecentlyBookedScreen'
import MyBookmarksScreen from './screens/myBookmarksScreen.js/MyBookmarksScreen'

const Stack = createStackNavigator()

const Tab = createBottomTabNavigator()

const NavigationHelper = ({ navigation }) => {
    const [currentScreen, setCurrentScreen] = React.useState('home')

//   return (
//     <>
//         <Stack.Navigator
//             screenOptions={{  headerShown: false }}
//             backBehavior='initialRoute'
//             initialRouteName='HomeScreen'
//             >
//             <Stack.Screen name="HomeScreen" component={HomeScreen} />
//             <Stack.Screen name="SearchScreen" component={SearchScreen} />
//         </Stack.Navigator>
//         <BottomNavigationTab navigation={navigation} currentScreen={currentScreen} setCurrentScreen={(tab) => setCurrentScreen(tab)} />
//     </>
//   )

    return (
        <DataLayer reducer={(state,action) => reducer(state,action)} initialState={initialState}>
            <Tab.Navigator screenOptions={{headerShown: false}} tabBar={props => <BottomNavigationTab {...props}/>}>
                <Tab.Screen name="HomeScreen" component={HomeScreen} />
                <Tab.Screen name="SearchScreen" component={SearchScreen} />
                <Stack.Screen name='RecentlyBookedScreen' component={RecentlyBookedScreen} />
                <Stack.Screen name='MyBookmarksScreen' component={MyBookmarksScreen} />
            </Tab.Navigator>
        </DataLayer>

    )
}

export default NavigationHelper
import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import CreateAccountScreen from './screens/CreateAccount/CreateAccountScreen'
import LoginScreen from './screens/loginScreen/LoginScreen'
import LetsYouInScreen from './screens/letsYouIn/LetsYouInScreen'
import HomeScreen from './screens/homeScreen/HomeScreen'
import BottomNavigationTab from './components/homeScreen/BottomNavigationTab'
import SearchScreen from './screens/searchScreen/SearchScreen'
import NavigationHelper from './NavigationHelper'

const Stack = createStackNavigator()

export const SignedOutStack = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
            defaultScreen="LetsYouInScreen"
        >
            <Stack.Screen name="LetsYouInScreen" component={LetsYouInScreen} />
            <Stack.Screen name="CreateAccountScreen" component={CreateAccountScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export const SignedInStack = () => {
  const [selectedTab, setSelectedTab] = React.useState('home')
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
            screenOptions={{  headerShown: false }} 
          >
            <Stack.Screen name="NavigationHelper" component={NavigationHelper} />
            {/* <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="SearchScreen" component={SearchScreen} /> */}
        </Stack.Navigator>
        
      </NavigationContainer>
      
    </>
    
  )
}

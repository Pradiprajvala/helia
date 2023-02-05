import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { Feather, Ionicons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'
import { bg, fontLight, light, primary } from '../../assets/styles'
import { ScreenContext, useScreen } from '../../reducer'
import { DataLayerValue } from '../../DataLayer'


const BottomNavigationTab = ({ navigation }) => {

  const [state, dispatch] = DataLayerValue()
    
    const selectedTab = state.screen

    const handleClick = (tab) => {
        switch (tab) {
            case 'home':
                navigation.navigate('HomeScreen')
                break;
            case 'search':
                navigation.navigate('SearchScreen')
                break;
            default:
                break;
        }
    }
  return (
    <View style={styles.wrapper}>
    <View style={styles.container}>
      <Pressable onPress={() => handleClick('home') } style={styles.BottomNavigationTabItem}>
        <Ionicons name={selectedTab==='home' ? 'home' : 'home-outline'}  size={24} color={ selectedTab==='home' ? primary : fontLight } />
        <Text style={styles.bottomNavigationTabItemTitle(selectedTab==='home')}>Home</Text>
      </Pressable>
      <Pressable onPress={() => handleClick('search') } style={styles.BottomNavigationTabItem}>
        {
            selectedTab==='search' ? <FontAwesome name="search" size={24} color={primary} /> : <Feather name="search" size={24} color={fontLight} />
        }
        <Text style={styles.bottomNavigationTabItemTitle(selectedTab==='search')}>Search</Text>
      </Pressable>
      <Pressable onPress={() => handleClick('booking') } style={styles.BottomNavigationTabItem}>
        <MaterialCommunityIcons name={selectedTab==='booking' ? 'book-open' : 'book-open-outline'} size={24} color={selectedTab==='booking' ? primary : fontLight} />
        <Text style={styles.bottomNavigationTabItemTitle(selectedTab==='booking')}>Booking</Text>
      </Pressable>
      <Pressable onPress={() => handleClick('profile') } style={styles.BottomNavigationTabItem}>
        <MaterialCommunityIcons name={selectedTab==='profile' ? 'account' : 'account-outline'} size={24} color={selectedTab==='profile' ? primary : fontLight} />
        <Text style={styles.bottomNavigationTabItemTitle(selectedTab==='profile')}>Profile</Text>
      </Pressable>
    </View>
    </View>
  )
}

export default BottomNavigationTab

const styles = StyleSheet.create({
    wrapper: {
      backgroundColor: light
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingVertical: 16,
        borderRadius: 32,
        backgroundColor: bg
    },
    BottomNavigationTabItem: {
        alignItems: 'center',
    },
    bottomNavigationTabItemTitle: (isSelected) => ({
        color: isSelected ? primary : fontLight,
        fontFamily: 'UrbanistBold',
    }),

})
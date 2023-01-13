import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect } from 'react'
import BottomNavigationTab from '../../components/homeScreen/BottomNavigationTab'
import { useFocusEffect } from '@react-navigation/native'
import { DataLayerValue } from '../../DataLayer'


const SearchScreen = ({ navigation }) => {

  const [{}, dispatch] = DataLayerValue()
  useFocusEffect(
    useCallback(() => {
      console.log('HomeScreen focused')
      dispatch({ type: 'SET_SCREEN', payload: 'search'})
    }, [])
  )
  return (
    <View style={{ flex: 1 }}>
      <Text>SearchScreen</Text>
        <View style={{ marginTop: 'auto'}}>
      </View>
    </View>
  )
}

export default SearchScreen

const styles = StyleSheet.create({})
import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'


import MyBookmarksHeader from '../../components/myBookMarksScreen/MyBookmarksHeader';
import { RBHotels } from '../../data';
import MyBookmarks from '../../components/myBookMarksScreen/MyBookmarks';
import { light } from '../../assets/styles';

const MyBookmarksScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <MyBookmarksHeader navigation={navigation} />
      <MyBookmarks hotels={RBHotels} />
    </View>
  )
}







export default MyBookmarksScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: light,
  },
  
})
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Ionicons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { fontLight, light, primary } from '../../assets/styles';

const MyBookmarksHeader = ({ navigation }) => {
    return (
      <View style={styles.myBookmarksHeaderContainer}>
        <View style={styles.myBookmarksHeaderLeftContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back-outline" size={24} color="black" />
          </TouchableOpacity>
               <Text style={styles.myBookmarksHeaderTitle}>My Bookmarks</Text>
        </View>
        <View style={styles.myBookmarksHeaderRightContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('RecentlyBookedScreen')} style={styles.myBookmarksHeaderRightIcon}>
            <MaterialCommunityIcons name={'book-open'} size={30} color={fontLight} />
         </TouchableOpacity>
        <View style={styles.myBookmarksHeaderRightIcon}>
          <AntDesign name="appstore1" size={24} color={primary} />
        </View>
       </View>
     </View>
    )
  }

export default MyBookmarksHeader

const styles = StyleSheet.create({
    myBookmarksHeaderContainer: {
        marginVertical: 20,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      },
      myBookmarksHeaderLeftContainer: {
        flexDirection: 'row',
        alignItems: 'center'
      },
      myBookmarksHeaderTitle: {
        fontSize: 20,
        fontFamily: 'UrbanistBold',
        marginLeft: 10
      },
      myBookmarksHeaderRightContainer: {
        flexDirection: 'row',
        alignItems: 'center'
      },
      myBookmarksHeaderRightIcon: {
        marginHorizontal: 6,
      },
})
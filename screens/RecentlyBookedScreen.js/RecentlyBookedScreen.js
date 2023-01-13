import { Platform, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { dark, fontLight, light, primary } from  '../../assets/styles'
import RecentlyBooked, { RecentlyBookedHeader } from '../../components/homeScreen/RecentlyBooked'
import { ScrollView } from 'react-native-gesture-handler'
import { Ionicons, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';

const RecentlyBookedScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View>
        <RecentlyBookedScreenHeader navigation={navigation} />
      </View>
      <ScrollView style={styles.recentlyBookedContainer}>
        <RecentlyBooked navigation={navigation} limit={-1} dontShowHeader={true} />
      </ScrollView>
    </View>
  )
}

const RecentlyBookedScreenHeader = ({ navigation }) => {
    return (
        <View style={styles.recentlyBookedHeaderContainer}>
            <View style={styles.recenltyBookedHeaderLeftContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back-outline" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.recenltyBookedHeaderTitle}>Recently Booked</Text>
            </View>
            <View style={styles.recenltyBookedHeaderRightContainer}>
                <View style={styles.recenltyBookedHeaderRightIcon}>
                <MaterialCommunityIcons name={'book-open'} size={30} color={primary} />
                </View>
                <TouchableOpacity onPress={() => { navigation.navigate('MyBookmarksScreen')}} style={styles.recenltyBookedHeaderRightIcon}>
                <AntDesign name="appstore-o" size={24} color={fontLight} />
                </TouchableOpacity>
            </View>
    
        </View>
    )
}

export default RecentlyBookedScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: light,
    },
    recentlyBookedContainer: {
        flex: 1
    },
    recentlyBookedHeaderContainer: {
        paddingHorizontal: 20,
        marginVertical: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    recenltyBookedHeaderTitle: {
        fontSize: 20,
        fontFamily: 'UrbanistBold',
        color: dark,
        marginLeft: 10
    },
    recenltyBookedHeaderLeftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    recenltyBookedHeaderRightContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    recenltyBookedHeaderRightIcon: {
        marginHorizontal: 6,
    }
})
import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { dark, fontLight, primary } from '../../assets/styles';
import { ScrollView } from 'react-native-gesture-handler';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

const MyBookmarks = ({ hotels }) => {
    let arr = []
  
    for(var i=0; i<hotels.length && i+1<hotels.length; i+=2) {
      arr.push([hotels[i], hotels[i+1]])
    }

    if(hotels.length%2 == 1) {
      arr.push([hotels[hotels.length-1]])
    }
    
      return (
        <ScrollView>
        {
          arr.map((hotel, index) => (
            <View key={index} style={styles.myBookmarksFlexContainer}>
              <MyBookmarkCard hotel={hotel[0]} />
              <MyBookmarkCard hotel={hotel[1]} />
            </View>
          ))
        }
        </ScrollView>
      )
}

const MyBookmarkCard = ({ hotel }) => {

    const [isSaved, setIsSaved] = React.useState(hotel?.isSaved)
  
    return hotel ? (
      <TouchableOpacity style={styles.myBookmarkCardContainer}>
        <Image style={styles.MyBookmarkCardImage} source={{ uri: hotel.image}} />
        <View style={styles.myBookmarkCardHotelTitleContainer}>
          <Text style={styles.myBookmarkCardHotelTitle}>{hotel.title}</Text>
        </View>
        <View style={styles.myBookmarkCardRatingAndLocationContainer}>
          <View style={styles.myBookmarkCardRatingContainer}>
            <AntDesign name="star" size={12} color='orange' />
            <Text style={styles.myBookmarkCardRatingTitle}>{hotel.rating}</Text>
          </View>
          <Text style={styles.myBookmarkCardLocationTitle}>{hotel.location}</Text>
        </View>
        <View style={styles.myBookmarkCardFooterContainer}>
          <View style={styles.myBookmarkCardPriceContainer}>
            <Text style={styles.myBookmarkCardPriceTitle}>${hotel.price}</Text>
            <Text style={styles.myBookmarkCardPricePerNightTitle}>/night</Text>
          </View>
          <TouchableOpacity onPress={() => setIsSaved(!isSaved) }>
          {
            isSaved ? <MaterialCommunityIcons name="bookmark-minus" size={28} color={primary} />  : <MaterialCommunityIcons name="bookmark-minus-outline" size={28} color={fontLight} />
          }
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    ) : null;
  }

export default MyBookmarks

const styles = StyleSheet.create({
    myBookmarkCardContainer: {
        flex: 0.5,
        marginHorizontal: 10,
        marginVertical: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        maxWidth: '45%'
      },
      MyBookmarkCardImage: {
        width: '100%',
        height: 100,
        borderRadius: 16,
      },
      myBookmarkCardHotelTitleContainer: {
        marginVertical: 8,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-start',
      },
      myBookmarkCardHotelTitle: {
        fontSize: 18,
        fontFamily: 'UrbanistBold',
        color: dark
      },
      myBookmarkCardRatingAndLocationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        overflow: 'hidden',
      },
      myBookmarkCardRatingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    
      },
      myBookmarkCardFooterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
        justifyContent: 'space-between',
        width: '100%',
      },
      myBookmarkCardPriceContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
      },
      myBookmarksFlexContainer: {
        flexDirection: 'row',
        width: '100%',
        paddingHorizontal: 10,
      },
      myBookmarkCardRatingTitle: {
        fontSize: 14,
        fontFamily: 'UrbanistBold',
        color: primary
      },
      myBookmarkCardLocationTitle: {
        fontSize: 14,
        fontFamily: 'UrbanistSemiBold',
        color: fontLight,
        marginLeft: 8
      },
      myBookmarkCardPriceTitle: {
        fontSize: 18,
        fontFamily: 'UrbanistExtraBold',
        color: primary
      },
      myBookmarkCardPricePerNightTitle: {
        fontSize: 12,
        fontFamily: 'UrbanistSemiBold',
        color: fontLight,
      },
    
})
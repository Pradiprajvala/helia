import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { bg, dark, fontLight, fontLight2, light, primary } from '../../assets/styles'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';


export const data = [
    {
        id: 1,
        title: 'President Hotel',
        location: 'Paris, France',
        image: 'https://images.pexels.com/photos/237371/pexels-photo-237371.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        price: 35,
        rating: 4.5,
        isSaved: true,
        reviewCount: 5283
    },
    {
        id: 2,
        title: 'Palms Casino',
        location: 'Amsterdam, Netherlands',
        image: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        price: 29,
        rating: 4.5,
        isSaved: false,
        reviewCount: 2521
    },
    {
        id: 3,
        title: 'The Venetian',
        location: 'Las Vegas, USA.',
        image: 'https://images.pexels.com/photos/262048/pexels-photo-262048.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        price: 36,
        rating: 4.6,
        isSaved: true,
        reviewCount: 5513
    },
    {
        id: 4,
        title: 'Palazzo Versace',
        location: 'Rome, Italy',
        image: 'https://images.pexels.com/photos/97083/pexels-photo-97083.jpeg?auto=compress&cs=tinysrgb&w=600',
        price: 27,
        rating: 4.7,
        isSaved: false,
        reviewCount: 3211
    },
    {
        id: 5,
        title: 'The Cosmopolitan',
        location: 'Las Vegas, USA',
        image: 'https://images.pexels.com/photos/279746/pexels-photo-279746.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        price: 32,
        rating: 4.5,
        isSaved: false,
        reviewCount: 1325
    },
    {
        id: 6,
        title: 'Bulgari Resort',
        location: 'Dubai, UAE',
        image: 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=600',
        price: 45,
        rating: 4.8,
        isSaved: false,
        reviewCount: 3344
    },
    {
        id: 7,
        title: 'Martinez Cannes',
        location: 'London, UK',
        image: 'https://images.pexels.com/photos/1743231/pexels-photo-1743231.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        price: 27,
        rating: 4.5,
        isSaved: true,
        reviewCount: 1432
    }
]


const RecentlyBooked = ({ limit, navigation, dontShowHeader }) => {
  return (
    <View style={styles.contianer}>
        {
            !dontShowHeader && <RecentlyBookedHeader navigation={navigation} />
        }
      
      <RecentlyBookedHotels hotels={data} isSaved={true} limit={limit} />
    </View>
  )
}

export const RecentlyBookedHeader = ({ navigation }) => {
    return (
        <View style={styles.recentlyBookedHeaderContainer}>
            <Text style={styles.recenltyBookedHeaderTitle}>Recently Booked</Text>
            <TouchableOpacity onPress={() => navigation.navigate('RecentlyBookedScreen')} >
                <Text style={styles.recenltyBookedHeaderSeeAllTitle}>See All</Text>
            </TouchableOpacity>
        </View>
    )
}

const RecentlyBookedHotels = ({ hotels, limit }) => {

    const getLastLimit = limit => limit != -1 ? limit : hotels.length-1

    return (
        <View style={styles.recentlyBookedHotelsContainer}>
            {hotels.slice(0,getLastLimit(limit)).map((hotel) => {
                return (
                    <RecentlyBookedCard key={hotel.id} hotel={hotel} />
                )
            })}
        </View>
    )
}

const RecentlyBookedCard = ({ hotel }) => {
    const { title, location, image, price, rating, isSaved, reviewCount } = hotel
    const [saved, setSaved] = React.useState(isSaved)
    return (
        <Pressable style={styles.recentlyBookedCardContainer}>
            <View style={styles.recentlyBookedCardImageContainer}>
                <Image source={{ uri: image }} style={styles.RecentlyBookedCardImage} />
            </View>
            <View style={styles.recentlyBookedCardMiddleContainer}>
                <Text style={styles.RecentlyBookedCardHotelTitle}>{title}</Text>
                <Text style={styles.RecentlyBookedCardHotelLocation}>{location}</Text>
                <View style={styles.recentlyBookedCardMiddleFooter}>
                    <AntDesign name="star" size={12} color='orange' />
                    <Text style={styles.recentlyBookedCardMiddleFooterRating}>{rating}</Text>
                    <Text style={styles.recentlyBookedCardMiddleFooterReviewsTitle}>({reviewCount} reviews)</Text>
                </View>
            </View>
            <View style={styles.recentlyBookedCardRightContainer}>
                <View>
                    <Text style={styles.recentlyBookedCardRightContainerPrice}>${price}</Text>
                    <Text style={styles.recentlyBookedCardRightContainerRate}>/night</Text>
                </View>
                <TouchableOpacity onPress={() => setSaved(!saved)}>
                {
                    saved ? <MaterialCommunityIcons name="bookmark-minus" size={28} color={primary} />  : <MaterialCommunityIcons name="bookmark-minus-outline" size={28} color={fontLight} /> 
                }
                </TouchableOpacity>
            </View>
        </Pressable>
    )
}

export default RecentlyBooked

const styles = StyleSheet.create({
    contianer: {
        backgroundColor: light,
        paddingHorizontal: 20,
        flex: 1,
        marginBottom: 20
    },
    recentlyBookedHeaderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16
    },
    recenltyBookedHeaderTitle: {
        fontSize: 18,
        fontFamily: 'UrbanistBold',
        color: dark
    },
    recenltyBookedHeaderSeeAllTitle: {
        fontSize: 16,
        fontFamily: 'UrbanistBold',
        color: primary
    },
    recentlyBookedCardContainer: {
        backgroundColor: bg,
        flexDirection: 'row',
        padding: 16,
        borderRadius: 16,
        marginBottom: 16
    },
    RecentlyBookedCardImage: {
        height: 100,
        width: 100,
        borderRadius: 16,
    },
    recentlyBookedCardMiddleContainer: {
        flex: 1,
        justifyContent: 'space-evenly',
        marginHorizontal: 16,
    },
    recentlyBookedCardRightContainer: {
        justifyContent: 'space-evenly',
        alignItems: 'flex-end',
    },
    RecentlyBookedCardHotelTitle: {
        fontSize: 20,
        fontFamily: 'UrbanistBold',
    },
    RecentlyBookedCardHotelLocation: {
        fontSize: 16,
        fontFamily: 'UrbanistSemiBold',
        color: fontLight
    },
    recentlyBookedCardMiddleFooter: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    recentlyBookedCardMiddleFooterRating: {
        fontSize: 16,
        fontFamily: 'UrbanistBold',
        color: primary,
        marginHorizontal: 4
    },
    recentlyBookedCardMiddleFooterReviewsTitle: {
        fontSize: 14,
        fontFamily: 'UrbanistSemiBold',
        color: fontLight,
        marginLeft: 4
    },
    recentlyBookedCardRightContainerPrice: {
        fontSize: 20,
        fontFamily: 'UrbanistExtraBold',
        color: primary
    },
    recentlyBookedCardRightContainerRate: {
        fontSize: 12,
        fontFamily: 'UrbanistSemiBold',
        color: fontLight
    }

})
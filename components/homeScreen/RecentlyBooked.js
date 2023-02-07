import { Image, Pressable, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { bg, dark, fontLight, fontLight2, light, primary } from '../../assets/styles'
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { DataLayerValue } from '../../DataLayer';
import { RBHotels } from '../../data';

const RecentlyBooked = ({ limit, navigation, dontShowHeader }) => {
    
  return (
    <View style={styles.contianer}>
        {
            !dontShowHeader && <RecentlyBookedHeader navigation={navigation} />
        }
      
      <RecentlyBookedHotels navigation={navigation} hotels={RBHotels} isSaved={true} limit={limit} />
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

const RecentlyBookedHotels = ({ hotels, limit, navigation }) => {

    const getLastLimit = limit => limit != -1 ? limit : hotels.length-1

    return (
        <View style={styles.recentlyBookedHotelsContainer}>
            {hotels.slice(0,getLastLimit(limit)).map((hotel) => {
                return (
                    <RecentlyBookedCard navigation={navigation} key={hotel.id} hotel={hotel} />
                )
            })}
        </View>
    )
}

export const RecentlyBookedCard = ({ hotel, modal, navigation }) => {
    const [{}, dispatch] = DataLayerValue();
    const { title, location, image, price, rating, isSaved, reviewCount } = hotel
    const [saved, setSaved] = React.useState(isSaved)

    const handleRemoveBookmark = () => {
        dispatch({
            type: 'SET_REMOVE_BOOKMARK_MODAL',
            payload: {
                isVisible: true,
                hotel: hotel
            }
        })
    }
    return (
        <Pressable style={styles.recentlyBookedCardContainer} onPress={() => navigation.navigate('HotelScreen')}>
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
                {
                !modal && <TouchableOpacity onPress={() => {
                    if(!saved) setSaved(true);
                    else
                    handleRemoveBookmark();
                }}>
                {
                    saved ? <MaterialCommunityIcons name="bookmark-minus" size={28} color={primary} />  : <MaterialCommunityIcons name="bookmark-minus-outline" size={28} color={fontLight} /> 
                }
                </TouchableOpacity>
                }
                {
                    modal && <MaterialCommunityIcons name="bookmark-minus" size={28} color={primary} />
                }
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
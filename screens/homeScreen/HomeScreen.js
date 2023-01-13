import { StatusBar, StyleSheet, Text, View, Image, ImageBackground, Pressable } from 'react-native'
import React, { useCallback, useEffect } from 'react'
import { bg, boxBg, dark, fontLight, fontLight2, light, primary } from '../../assets/styles'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase'
import logo from '../../assets/icons/logo.png'
import { MaterialCommunityIcons, Ionicons, Feather, AntDesign } from '@expo/vector-icons'
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import * as Location from 'expo-location'
import RecentlyBooked from '../../components/homeScreen/RecentlyBooked'
import { useFocusEffect } from '@react-navigation/native'
import { DataLayerValue } from '../../DataLayer'

import { CatagoriesArray, RecommendedHotels, PopularHotels, TrendingHotels, NewHotels } from '../../data'

const HomeScreen = ({ navigation }) => {

  const [{}, dispatch] = DataLayerValue()

  const [location, setLocation] = React.useState(null)
  const [locationDenied, setLocationDenied] = React.useState(false)
  const [hotels, setHotels] = React.useState({}) 
  const [ selectedCatagory, setSelectedCatagory ] = React.useState('Recommended')

  console.log(selectedCatagory)

  useFocusEffect(
    useCallback(() => {
      console.log('HomeScreen focused')
      dispatch({ type: 'SET_SCREEN', payload: 'home'})
    }, [])
  )

  useEffect(() => {
    async function getGPSLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        setLocationDenied(true)
        return
      }
      let locationTracked = await Location.getCurrentPositionAsync({})
      setLocation({ latitude: locationTracked.coords.latitude, longitude: locationTracked.coords.longitude })
    }
    getGPSLocation()
  }, [locationDenied])

    const handleSignout = async () => {
        console.log('signing out')
        await signOut(auth).then(() => {
            console.log('signed out')
        }).catch((error) => {   
            console.log('error signing out')
        })
    }

    const getHotelsForCatagory = (catagory) => {
      switch (catagory) {
        case 'Recommended':
          return RecommendedHotels
          break
        case 'Popular':
          return PopularHotels
          break
        case 'Trending':
          return TrendingHotels
          break
        case 'New':
          return NewHotels
          break

        default:
          return RecommendedHotels
          break
      }
    }
  return (
    <>
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <Header navigation={navigation} />
      <Greetings name='Daniel' />
      <View style={{ marginHorizontal: 20 }}>
        <Search />
      </View>
      <View style={{ }}>
        <Catagories CatagoriesArray={CatagoriesArray} handleCatagoryChange={(catagory) => setSelectedCatagory(catagory)} />
      </View>
      <View>
        <CatagoryHotels hotels={getHotelsForCatagory(selectedCatagory)} />
      </View>
      <RecentlyBooked navigation={navigation} limit={5} />
    </ScrollView>
    </>
  )
}

const Header = ({ navigation }) => {
    return (
        <View style={styles.headerContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'center'}}>
            <Image source={logo} style={styles.headerLogo} />
            <Text style={styles.headerTitle}>Helia</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity style={styles.headerIconContainer}>
              <Ionicons name="md-notifications-outline" size={28} color={dark} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('MyBookmarksScreen')}>
              <MaterialCommunityIcons name="bookmark-minus-outline" size={28} color={dark} />
            </TouchableOpacity>
          </View>
        </View>
    )
}

const Greetings = ({ name }) => {
    return (
        <View style={styles.greetingsContainer}>
            <Text style={styles.greetingsTitle}>Hello, {name} 👋
            </Text>
        </View>
    )
}

const Search = () => {
  return (
    <View style={styles.searchContainer}>
      <View style={{ flexDirection: 'row', alignItems: 'center'}}>
        <Feather name="search" size={24} color={fontLight} />
        <TextInput placeholder='Search' style={styles.searchText} placeholderTextColor={fontLight} />
      </View>
      <TouchableOpacity>
        <MaterialCommunityIcons name="tune-variant" size={24} color={primary} />
      </TouchableOpacity>
    </View>
  )
}

const Catagories = ({ CatagoriesArray, handleCatagoryChange }) => {

  const [selectedCatagory, setSelectedCatagory] = React.useState(CatagoriesArray[0])

  const handleCatagoryPress = (catagory) => {
    setSelectedCatagory(catagory)
    handleCatagoryChange(catagory)
  }

  return (
    <ScrollView
      horizontal
      style={styles.catagoriesContainer}
      showsHorizontalScrollIndicator={false}
    >
      {
        CatagoriesArray.map((item, index) => {
          return (
            <TouchableOpacity key={index} style={styles.catagoryContainer(selectedCatagory === item)} onPress={() => handleCatagoryPress(item)}>
              <Text style={styles.catagoryTitle(selectedCatagory === item)}>{item}</Text>
            </TouchableOpacity>
          )
        })
      }
    </ScrollView>
  )
}

const CatagoryHotels = ({ hotels }) => {
  const arr = ['https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/262048/pexels-photo-262048.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/237371/pexels-photo-237371.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
]

  return (
    <ScrollView
      horizontal
      style={styles.catagoryHotelsContainer}
      showsHorizontalScrollIndicator={false}
    >
      {
        hotels.map((hotel, index) => {
          return (
            <CatagoryHotelCard key={index} hotel={hotel} />
          )
        })
      }
     
    </ScrollView>
  )
}

const CatagoryHotelCard = ({ hotel }) => {

  const { title, location, image, price, rating, isSaved, reviewCount } = hotel
  const [saved, setSaved] = React.useState(isSaved)
  
  return (
          <Pressable style={styles.catagoryHotelContainer} onPress={() => console.log('me pressed')} >
            <ImageBackground imageStyle={{ borderRadius: 35,  }} source={{ uri: image}} style={styles.catagoryHotelContainer }>
              <View style={styles.hotelCardContainer}>
                  <View style={styles.hotelCardHeaderContaniner}>
                    <View style={styles.hotelRatingContainer}>
                      <AntDesign name="star" size={12} color={light} />
                      <Text style={styles.hotelRatingTitle}>{rating}</Text>
                    </View>
                  </View>
                  <View style={styles.hotelCardFooterContainer}>
                    
                    <Text style={styles.hotelCardFooterTitle}>{title}</Text>
                    <Text style={styles.hotelCardFooterLocationTitle}>{location}</Text>
                    <View style={styles.hotelCardFooterRateContainer}>
                      <Text style={styles.hotelCardFooterRateTitle}><Text style={styles.hotelCardFooterPriceTitle}>${price}</Text> / per night</Text>
                      <Pressable onPress={() => setSaved(!saved) }>
                        {
                          saved ? <MaterialCommunityIcons name="bookmark-minus" size={28} color={light} /> : <MaterialCommunityIcons name="bookmark-minus-outline" size={28} color={light} />
                        }
                      </Pressable>
                    </View>
                  </View>
              </View>
            </ImageBackground>
          </Pressable>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: bg,
    },
    headerContainer: {
        flexDirection: 'row',
        width: 'auto',
        paddingHorizontal: 20,
        backgroundColor: bg,
        marginVertical: 16,
        justifyContent: 'space-between',
    },
    headerIconContainer: {
        marginHorizontal: 16,
    },
    greetingsContainer: {
      marginHorizontal: 20,
      width: 'auto',
      marginBottom: 20,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      width: 'auto',
      backgroundColor: boxBg,
      padding: 16,
      borderRadius: 10,
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    catagoriesContainer: {
      paddingLeft: 14,
    },
    catagoryContainer: (isSelected) => ({
      backgroundColor: isSelected ? primary : null,
      marginHorizontal: 6,
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 20,
      borderColor: primary,
      borderWidth: 2,
    }),
    catagoryHotelsContainer: {
      marginVertical: 16,
      paddingHorizontal: 20,
    },
    catagoryHotelContainer: {
      height: 320,
      width: 240,
      marginRight: 20,
      backgroundColor: 'rgb(255,255,255)',
      backgroundColor: 'linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(250,250,250,1) 100%);'
    },
    hotelCardContainer: {
      backgroundColor: 'rgb(0,0,0)',
      backgroundColor: 'linear-gradient(90deg, rgba(0,0,0,0.45) 0%, rgba(255,255,255,0) 10%, rgba(255,255,255,0) 50%, rgba(255,255,255,0) 90%, rgba(0,0,0,0.45) 100%',
      width: '100%', 
      height: '100%', 
      borderRadius: 35,
      justifyContent: 'space-between',
    },
    hotelCardHeaderContaniner: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginHorizontal: 20,
      marginVertical: 20,
    },
    hotelRatingContainer: {
      backgroundColor: primary,
      paddingHorizontal: 12,
      paddingVertical: 5,
      flexDirection: 'row',
      borderRadius: 16,
      alignItems: 'center',
    },
    hotelCardFooterContainer: {
      paddingLeft: 20,
      width: '100%',
      marginVertical: 10
    },
    hotelCardFooterRateContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginRight: 20,
      marginBottom: 4
    },
    headerLogo: {
        width: 32,
        height: 32,
    },
    headerTitle: {
      fontSize: 24,
      fontFamily: 'UrbanistBold',
      marginLeft: 12,
      color: dark
    },
    greetingsTitle: {
      fontSize: 32,
      fontFamily: 'UrbanistExtraBold',
    },
    searchText: {
      color: dark,
      fontFamily: 'UrbanistBold',
      fontSize: 16,
      marginLeft: 16,
      width: '80%',
      letterSpacing: 0.5
    },
    catagoryTitle: isSelected => ({
      color: isSelected ? light : primary,
      fontFamily: 'UrbanistBold',
      letterSpacing: 0.5
    }),
    hotelRatingTitle: {
      color: light,
      fontFamily: 'UrbanistBold',
      marginLeft: 4
    },
    hotelCardFooterTitle: {
      color: light,
      fontSize: 20,
      fontFamily: 'UrbanistBold',
      marginBottom: 6
    },
    hotelCardFooterLocationTitle: {
      color: fontLight2,
      fontSize: 16,
      fontFamily: 'Urbanist',
      marginBottom: 6,
    },
    hotelCardFooterRateTitle: {
      color: fontLight2,
      fontSize: 16,
      fontFamily: 'UrbanistSemiBold',
      marginBottom: 6,
    },
    hotelCardFooterPriceTitle: {
      color: light,
      fontSize: 20,
      fontFamily: 'UrbanistBold',
      marginBottom: 6,
    }
})
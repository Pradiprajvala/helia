import { Dimensions, FlatList, Image, Platform, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { bg, dark, fontLight, fontLight2, light, primary, primaryLight, primaryLight2 } from '../../assets/styles'
import {Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { Divider } from 'react-native-elements';
import Animated, { useAnimatedStyle, useSharedValue, Easing } from 'react-native-reanimated';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
let indicatorWidth = new Animated.Value(32);

const hotel = {
  id: 3,
  title: 'Martinez Cannes',
  location: 'London, UK',
  images: [
    'https://images.pexels.com/photos/1743231/pexels-photo-1743231.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/2351290/pexels-photo-2351290.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/2029719/pexels-photo-2029719.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  ],
  price: 27,
  rating: 4.5,
  isSaved: false,
  reviewCount: 1432
}


const HotelScreen = ({ navigation }) => {
  
  const [currentIndex, setCurrentIndex] = useState(0)


  useEffect(() => {
    indicatorWidth.setValue(8);
    Animated.timing(indicatorWidth, {
      toValue: 28,
      duration: 220,
      easing: Easing.linear,
      useNativeDriver: true
    }).start();
  }, [currentIndex])
  
  return (
    <>
    <ScrollView style={styles.container}>
      <View>
      <FlatList
        data={hotel.images}
        horizontal 
        renderItem={({ item }) => <HotelHeaderImage imageUri={item} />}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item}
        onScroll={event => {
          
          setCurrentIndex(((event.nativeEvent.contentOffset.x) / windowWidth).toFixed(0));
        }}
        />
        <View style={styles.hotelHeader}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-outline" size={28} color={light} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => hotel.isSaved = true} style={styles.recenltyBookedHeaderRightIcon}>
          {
            hotel.isSaved ? <MaterialCommunityIcons name="bookmark-minus" size={28} color={bg} />  : <MaterialCommunityIcons name="bookmark-minus-outline" size={28} color={bg} /> 
          }
          </TouchableOpacity>
      </View>
      <View style={hotelImageSlider.indicator}>
        {
          hotel.images.map((image, index) => {
            console.log('index', index);
            return (
            <Animated.View style={[hotelImageSlider.indicatorDot( index == currentIndex) ]}>
            </Animated.View>
            )
          })
        }
      </View>
      </View>
      {/* <HotelHeaderImage /> */}
      <HotelHeader />
      <Divider width={1} orientation='horizontal' style={{ marginHorizontal: 32, backgroundColor: fontLight2 }}/>
    </ScrollView>
    </>
  )
}

const HotelHeaderImage = ({ imageUri }) => {
   return (<View style={{ width: windowWidth }}>
      <Image source={{ uri: imageUri }} style={{width: '100%', height: 300}} />
    </View>)
}

const HotelHeader = () => {
  return(
    <View style={headerStyles.hotelHeaderContainer}>
      <Text style={headerStyles.hotelHeaderTitle}>{hotel.title}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Ionicons name="ios-location-sharp" size={18} color={primary} />
      <Text style={headerStyles.hotelHeaderLocation}>{hotel.location}</Text>
      </View>
    </View>
  )
}

export default HotelScreen

const hotelImageSlider = StyleSheet.create({
  indicator: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicatorDot:(active) => ({
    width: active ? indicatorWidth : 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: active ? primary : primaryLight2,
    marginHorizontal: 4,
  }),
})

const headerStyles = StyleSheet.create({
  hotelHeaderContainer: {
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  hotelHeaderTitle: {
    fontSize: 32,
    fontFamily: 'UrbanistExtraBold',
    color: dark,
    lineHeight: 32,
    marginBottom: 8,
  },
  hotelHeaderLocation: {
    fontSize: 16,
    fontFamily: 'UrbanistBold',
    color: fontLight,
    lineHeight: 18,
    marginBottom: 0,
    marginLeft: 8,
  },
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: bg,
  },
  hotelHeader: {
    flexDirection: 'row',
    position: 'absolute',
    left: 20,
    right: 20,
    justifyContent: 'space-between',
    top: Platform.OS === 'android' ? StatusBar.currentHeight + 20 : 40,
  },
})

const getNearestCityOptions = (lat,long) => ({
    method: 'GET',
    url: 'https://geocodeapi.p.rapidapi.com/GetNearestCities',
    params: {latitude: lat, longitude: long, range: '0'},
    headers: {
      'X-RapidAPI-Key': 'e1b563e42amsh78a77f9c9ffa2bfp164cb9jsn0f7258acac23',
      'X-RapidAPI-Host': 'geocodeapi.p.rapidapi.com'
    }
  })
  
  const getDestIdOptions =  (city) => ({
    method: 'GET',
    url: 'https://apidojo-booking-v1.p.rapidapi.com/locations/auto-complete',
    params: {text: city, languagecode: 'en-us'},
    headers: {
      'X-RapidAPI-Key': 'e1b563e42amsh78a77f9c9ffa2bfp164cb9jsn0f7258acac23',
      'X-RapidAPI-Host': 'apidojo-booking-v1.p.rapidapi.com'
    }
  })
  
  const getHotelListOptions = (destId, checkInDate, checkOutDate, order) => ({
    method: 'GET',
    url: 'https://apidojo-booking-v1.p.rapidapi.com/properties/list',
    params: {
      offset: '0',
      arrival_date: checkInDate,
      departure_date: checkOutDate,
      guest_qty: '1',
      dest_ids: destId,
      room_qty: '1',
      search_type: 'city',
      order_by: order,
    },
    headers: {
      'X-RapidAPI-Key': 'e1b563e42amsh78a77f9c9ffa2bfp164cb9jsn0f7258acac23',
      'X-RapidAPI-Host': 'apidojo-booking-v1.p.rapidapi.com'
    }
  });
  
  const getHotelPicsOption = (hotelId) => ({
    method: 'GET',
    url: 'https://apidojo-booking-v1.p.rapidapi.com/properties/get-hotel-photos',
    params: {hotel_ids: hotelId, languagecode: 'en-us'},
    headers: {
      'X-RapidAPI-Key': 'e1b563e42amsh78a77f9c9ffa2bfp164cb9jsn0f7258acac23',
      'X-RapidAPI-Host': 'apidojo-booking-v1.p.rapidapi.com'
    }
  })
  
  const getNearestCity = async (lat,long) => {
    try {
      const response = await axios.request(getNearestCityOptions(lat,long))
      if(response.data ? response.data.length > 0 : false) {
        return response.data[0].City
      }
    } catch(error) {
      console.log(error)
    }
  } 
  
  const getDestId = async (city) => {
    try {
      const response = await axios.request(getDestIdOptions(city))
      if(response.data ? response.data.length > 0 : false) {
        return response.data[0].dest_id
      }
      return
    } catch(error) {
      console.log(error)
    }
  }
  
  const getHotels = async (destId) => {
    var currentDate = new Date()
    var checkInDate = currentDate.getFullYear() + '-' + (currentDate.getMonth()+1) + '-' + currentDate.getDate()
    var checkOutDate = currentDate.getFullYear() + '-' + (currentDate.getMonth()+1) + '-' + (currentDate.getDate()+1)
    console.log(checkOutDate);
    
    try {
  
      const recommended = await axios.request(getHotelListOptions(destId, checkInDate, checkOutDate, null ))
      const popular = await axios.request(getHotelListOptions(destId, checkInDate, checkOutDate, 'popularity'))
      const trending = await axios.request(getHotelListOptions(destId, checkInDate, checkOutDate, 'review_score'))
      
     
      return [ recommended?.data?.result, popular?.data?.result , trending?.data?.result]
    } catch(error) {
      console.log(error)
    }
  }
  
  const getHotelPics = async (hotelId) => {
    try {
      
      const response = await axios.request(getHotelPicsOption(hotelId))
      
      
     // console.log(response.data.data[hotelId]);
      if(response.data && response.data.data ? response.data.data[hotelId] : false) {
        
        return response.data.data[hotelId]
      }
    } catch(error) {
      console.log(error)
    }
  }




  useEffect(() => {
    let nearestCity = ''
      async function getNearestCityName() { 
        try {
          const nearestCity = await getNearestCity(location.latitude, location.longitude)
          let destId = ''
          async function findDestId() {
            try {
              destId = await getDestId(nearestCity)

              async function callGetHotels(){
                const res = await getHotels(destId)
                setRecommended(res[0])
                setPopular(res[1])
                setTrending(res[2])
                console.log('done');
                console.log(recommended.length, popular.length, trending.length); 

                if(res[0]){
                  let x = {}
                  res[0].map(async (hotel) => {
                    x[hotel.hotel_id] = hotel
                    try {
                      const hotelPics = await getHotelPics(hotel.hotel_id)
                      x[hotel.hotel_id].hotelPics = hotelPics
                    } catch(error) {
                      console.log(error)
                    }
                  }) 
                  setHotels(x)
                  console.log('done setting hotels');
                }
                
              }

              destId && callGetHotels()
            } catch(error) {
              console.log(error)
            }      
          }
          nearestCity && findDestId()
        }catch(error){
              console.log(error)
        }
      } 
      location && getNearestCityName()
  })
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Modal } from 'react-native'
import { Divider } from 'react-native-elements'
import { RecentlyBookedCard } from '../homeScreen/RecentlyBooked'
import { TouchableOpacity } from 'react-native'
import { dark, light, primary, primaryLight2 } from '../../assets/styles'
import { DataLayerValue } from '../../DataLayer'

const RemoveBookmarkModal = ({  setIsModal }) => {
  const [{removeBookmarkModal}, dispatch] = DataLayerValue();
  const { hotel, isVisible  } = removeBookmarkModal;

  const handleCancel = () => {
    dispatch({
      type: 'SET_REMOVE_BOOKMARK_MODAL',
      payload: {}
    })
  }

  const handleRemove = () => {
    dispatch({
      type: 'REMOVE_BOOKMARK',
      payload: hotel.id
    })
    dispatch({
      type: 'SET_REMOVE_BOOKMARK_MODAL',
      payload: {}
    })
  }
      return (
          
              hotel && <Modal
                animationType="fade"
                transparent={true}
                visible={isVisible}
                style={{ flex: 1 }}
              >
                <View style={styles.modalWrapper}>
                  <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Remove from Bookmark?</Text>
                    <Divider style={styles.divider} orientation='horizontal' width={1}/>
                    <RecentlyBookedCard hotel={hotel} modal={true} />
                    <View style={styles.modalButtonsContainer}>
                      <View style={{ flex: 1 }}>
                      <TouchableOpacity style={styles.modalButton(false)} onPress={handleCancel}>
                        <Text style={styles.modalButtonText(false)}>Cancle</Text>
                      </TouchableOpacity>
                      </View>
                      <View style={{ flex: 1 }}>
                      <TouchableOpacity style={styles.modalButton(true)} onPress={handleRemove}>
                        <Text style={styles.modalButtonText(true)}>Yes, Remove</Text>
                      </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              </Modal>
      )
}

export default RemoveBookmarkModal

const styles = StyleSheet.create({
    modalWrapper: { flex: 1, height: '100%', justifyContent: 'flex-end', backgroundColor: 'rgba(0, 0, 0, 0.5)'},
    modalContainer: { alignItems: 'center', backgroundColor: light, padding: 20, borderRadius: 32},
    modalTitle: { fontSize: 14, fontSize: 24, fontFamily: 'UrbanistBold', color: dark}, 
    divider: { width: '100%', margin: 20 },
    modalButtonsContainer: { flexDirection: 'row', width: '100%', marginVertical: 10 },
    modalButton: (isPrimary) => ({ backgroundColor: isPrimary ? primary : primaryLight2, padding: 16, marginHorizontal: 10, borderRadius: 28}),
    modalButtonText: (isPrimary) => ({ color: isPrimary ? 'white' : primary, textAlign: 'center', fontSize: 16, fontFamily: 'UrbanistBold' })  
})
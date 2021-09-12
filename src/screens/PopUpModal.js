import React,{useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Modal, Center, NativeBaseProvider } from "native-base"
const PopUpModal = () => {
    return (<>
       <Modal  overlayVisible={true} isOpen={showModal} onClose={() => setShowModal(false)}>
                                        <Modal.Content  style={{width:300, height:300}}>
                                        <Image style={{
                                            width:250 , height:250,
                                            resizeMode:'cover'
                                            
                                        }}
                                            source={{ uri: `https://yoffers.in/${item.IMAGE_PATH}/${item.IMAGE}` }} />
                                    
                                    
                                        
                                        </Modal.Content>
                                    </Modal>
      </>
    )
}

export default PopUpModal

const styles = StyleSheet.create({})

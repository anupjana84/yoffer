import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, StatusBar, Image, TouchableOpacity, ScrollView} from 'react-native'
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import {  Heading, Box,useToast,AlertDialog,
    Button,
    Center } from "native-base"

import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProgressDialog } from 'react-native-simple-dialogs';

import { useIsFocused } from '@react-navigation/native';
import { API } from '../components/Api';



const MyAdd = ({ navigation }) => {
    const isFocused = useIsFocused();
    const [allVendor, setAllVerdor] = useState([])
    const [lodding, setLodding] = useState(false)
    const [isOpen, setIsOpen] = React.useState(false);
    const onClose = () => setIsOpen(false);
    const cancelRef = React.useRef();

    const toast = useToast()
    const alertTossata = (msg, color) => {
        return (
            toast.show({
                duration: 3000,
                render: () => {
                    return (
                        <Box style={{
                            height: 50, padding: 10, height: 50,
                            justifyContent: 'center',
                            alignItems: "center",
                            borderRadius: 10,
                            backgroundColor: color
                        }}>
                            <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
                                {msg}
                            </Text>
                        </Box>
                    )
                },
            })
        )
    }


    const allMyAdd = async () => {
        setLodding(true)
        const user = JSON.parse(await AsyncStorage.getItem("@user"))
        const address = JSON.parse(await AsyncStorage.getItem("@address"))

        fetch(`${API}/myadds/${user.id}`, {
            method: "GET",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user._token}`
            }
        })
            .then((res) => {
                return res.json()
            })
            .then((result) => {
                console.log(result, 'ffff')
                if (result.data) {
                    setLodding(false)
                    setAllVerdor(result.data)
                   // console.log(allVendor, 'ffff')
                } else {
                    setLodding(false)
                }
            })
            .catch(err => console.log(err))
    }
    
    const deleteAdd= async(id)=>{
        setLodding(true)
        const user = JSON.parse(await AsyncStorage.getItem("@user"))

        fetch(`${API}/vendor/trash/${id}`, {
            method: "DELETE",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user._token}`
            }
        })
            .then((res) => {
                return res.json()
            })
            .then((result) => {
               // console.log(result.success, 'ffff')
                if (result.success==true) {
                    setLodding(false)
                   // allMyAdd()
                   onClose()
                    alertTossata('Remove SucceddFully','#4DD637')
                    allMyAdd()
                   
                   
                } else {
                    alertTossata('No Romove','red')
                    setLodding(false)
                }
            })
            .catch(err => console.log(err))
        

    }
    useEffect(() => {
        
        allMyAdd()
    }, [isFocused])
    return (
        <>

            <View style={styles.mainWrapper}>
                <StatusBar hidden={true} />
                {/* ====header== */}
                <TouchableOpacity onPress={()=>navigation.goBack()} style={styles.header}>
                    <AntDesign name="left" size={28} color="black" />
                    <Text style={{ marginLeft: 3, fontSize: 18, fontWeight: "bold" }}>
                        My <Text style={{ color: "red" }}>Ads
                        </Text></Text>
                </TouchableOpacity>
                {/* ====header== */}
                {/* ====viewAll== */}
                <View style={styles.viewAll}>
                    <Heading size="md">View All</Heading>
                    <View style={{ width: "100%", height: 1, backgroundColor: "black" }}></View>
                </View>

                {/* ====viewAll== */}
                {/* ====profile== */}
                <ScrollView showsVerticalScrollIndicator={false}>
                 {allVendor && allVendor.map((item, i) => {
                    return (
                        <View key={i} style={{ ...styles.profile }}>
                            <View style={styles.left}>
                                <Image style={{
                                    width: "100%", height: 150,
                                    resizeMode: 'cover',
                                    borderRadius: 5
                                }}
                                    source={{ uri: `https://yoffers.in/${item.IMAGE_PATH}/${item.IMAGE}` }} />
                            </View>
                            <View style={styles.right}>
                                <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                                    <Heading size="sm">{item.NAME}</Heading>
                                    <Heading size="sm">
                                        {(new Date(item.CREATED_AT)).getDate()}{'/'}{(new Date(item.CREATED_AT)).getMonth() + 1}
                                        {'/'}{(new Date(item.CREATED_AT)).getFullYear()}
                                    </Heading>
                                </View>
                                <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                                <Heading style={{ fontSize: 15, marginRight: 5 }} >{
                                            
                                            item.RATING==0 ? ("No Ratting"):( item.RATING)}</Heading>
                                         {item.RATE_COUNT && item.RATE_COUNT.map((item, i)=>{
                                                return(
                                                    <Ionicons key={i} name="star-sharp" size={22} color="#FF7E1B" style={{marginRight:2}} />
                                                )
                                            })}
                                </View>
                                <View>
                                    <Heading size="sm" style={{ fontSize: 13 }} >{item.DESCRIPTION}</Heading>
                                    <Heading size="sm" style={{ fontSize: 11 }} >{item.NAME}</Heading>
                                </View>
                                <View style={{width:'100%', height:50, flexDirection:'row',justifyContent:"space-between"}}>
                                    <TouchableOpacity onPress={() => navigation.navigate('SingleVendor', { 'id': item.ID })} style={{
                                        width: 100, height: 40,
                                        justifyContent: 'center', alignItems: "center", marginVertical: 10,
                                        backgroundColor: "red", borderRadius: 15
                                    }}>
                                        <Heading size="md" style={{ color: "white" }}>View</Heading>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                    
                                   onPress={() =>setIsOpen(!isOpen)}
                                    style={{
                                        width: 100, height: 40,
                                        justifyContent: 'center', alignItems: "center", marginVertical: 10,
                                        backgroundColor: "red", borderRadius: 15
                                    }}>
                                        <Heading size="md" style={{ color: "white" }}>Remove</Heading>
                                    </TouchableOpacity>

                                </View>
                               
                                
                            </View>
                            <Center>
                                <AlertDialog
                                    leastDestructiveRef={cancelRef}
                                    isOpen={isOpen}
                                  
                                    motionPreset={"fade"}
                                >
                                    <AlertDialog.Content>
                                    <AlertDialog.Header fontSize="lg" fontWeight="bold">
                                        Delete Vendor
                                    </AlertDialog.Header>
                                    <AlertDialog.Body>
                                        Are you sure? You can't undo this action afterwards.
                                    </AlertDialog.Body>
                                    <AlertDialog.Footer>
                                        <Button ref={cancelRef} onPress={onClose}>
                                        Cancel
                                        </Button>
                                        <Button colorScheme="red" onPress={() =>deleteAdd(item.ID)} ml={3}>
                                        Delete
                                        </Button>
                                    </AlertDialog.Footer>
                                    </AlertDialog.Content>
                                </AlertDialog>
                               
                                </Center>
                        </View>
                        
                    )
                })} 
                <View style={{height:50}}></View>
                </ScrollView>
                {/* ====profile== */}
            </View>
            <ProgressDialog
                visible={lodding}
                message="Please, wait..."
                titleStyle={{ color: "red", textAlign: 'center' }}
                messageStyle={{ color: "green", textAlign: "center" }}
                contentStyle={{ alignItems: "center", justifyContent: "center", flexDirection: "row" }}
                dialogStyle={{ borderRadius: 10, width: 220, height: 70, justifyContent: 'center' }}
                activityIndicatorColor="blue"
                activityIndicatorSize="large"
                overlayStyle={{ alignItems: "center", justifyContent: "center", flexDirection: "row" }}
            />
        </>
    )
}

export default MyAdd

const styles = StyleSheet.create({
    header: {
        width: "100%",
        height: 50,
        backgroundColor: "white",
        alignItems: "center",
        paddingLeft: 10,
        flexDirection: "row",
        marginVertical: 20
    },
    mainWrapper: {
        width: "100%",
        height: "100%",
        backgroundColor: "white"
    },
    viewAll: {
        paddingHorizontal: 20
    },
    profile: {
        width: "100%",
        height: 180,

        padding: 10,
        flexDirection: "row",
        justifyContent: 'space-between'

    },
    left: {
        width: "34%",
        height: "100%",

    },
    right: {
        width: "64%",
        height: "100%",


    }
})

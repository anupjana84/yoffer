import React, {useState, useEffect, useRef } from 'react'
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import {
  StyleSheet, TouchableOpacity,Text,
} from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API } from '../components/Api';
import { useToast,Box } from 'native-base';
import { ProgressDialog } from 'react-native-simple-dialogs';

const SearchLocationForVendor = ({ navigation }) => {
  const ref = useRef();
  const toast = useToast()
  const[lodding, setLodding]=useState(false)

  const alertTossata =(msg)=>{
      return (
          toast.show({
              render: () => {
                return (
                  <Box style={{width:280, height:50,
                      justifyContent:'center',
                      alignItems:"center",
                      borderRadius:10,
                   backgroundColor:'red'}}>
                   <Text style={{color:"white",fontSize:20,fontWeight:"bold"}}>
                      {msg}
                       </Text>
                  </Box>
                )
              },
            })
      )
  }


//   const addRessSave = async (address, latt, longg) => {
//     setLodding(!lodding)
//     const user = JSON.parse(await AsyncStorage.getItem("@user"))
//         const dataone = {
//             address: address,
//             latitude: latt,
//             longitude: longg
//         }
//     fetch(`${API}/users/${user.id}`, {
//         method: "PATCH",
//         headers: {
//             Accept: "application/json",
//             'Content-Type': "application/json",
//             'Authorization': `Bearer ${user._token}`
//         },
//         body: JSON.stringify(dataone)
//     })
//     .then((res) => {
//         return res.json()
//     })
//     .then(async (result) => {
//         // console.log(result,'TRD')
//         if (result.success == true) {
//             setLodding(!lodding)
//             await AsyncStorage.setItem('@address', JSON.stringify(result.data))
//             //navigation.navigate('AllBottom')
//         } else {
//           alertTossata("Address does notUpdated")
//         }
//     })
//     .catch(err => {
//         console.log(err)
//      })
//   }
  useEffect(() => {
    ref.current?.setAddressText('Some Other Location');

  }, [])
  return (
    <>
      <TouchableOpacity style={styles.header} onPress={() => navigation.goBack()}>

        <AntDesign name="arrowleft" size={24} color="black" />
        <Text>Search Location</Text>
      </TouchableOpacity>
      <GooglePlacesAutocomplete
        fetchDetails={true}
        placeholder='Search'
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          const address = data.description.split(",")
          console.log(address)
          navigation.navigate('AddVendeor',{'address':address[1],
          'lat': details.geometry.location.lat, 'lon':details.geometry.location.lng});

          //console.log()
        }}
        query={{
          key: 'AIzaSyDGt77-gotuNZ4hFz6DkWBv4N0XFW3WJ6Q',
          language: 'en',
        }}
      />
       <ProgressDialog
                visible={lodding}
                message="Please, wait..."
                titleStyle={{color:"red", textAlign:'center'}}
                messageStyle={{color:"green", textAlign:"center"}}
                contentStyle={{alignItems:"center", justifyContent:"center", flexDirection:"row"}}
                dialogStyle={{borderRadius:10,width:220, height:70, justifyContent:'center'}}
                activityIndicatorColor="blue"
                activityIndicatorSize="large"
                overlayStyle={{alignItems:"center", justifyContent:"center", flexDirection:"row"}}
        />
    </>
  );
};
const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 50,
    backgroundColor: "grey",
    alignItems: "center",
    paddingLeft: 10,
    opacity: 0.5,
    flexDirection: "row"
  },
})
export default SearchLocationForVendor;
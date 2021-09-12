import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Entypo from 'react-native-vector-icons/dist/Entypo';

import GetLocation from 'react-native-get-location'
import Geocoder from 'react-native-geocoding';
import { useIsFocused } from '@react-navigation/native';

const LocationTextSingleVendeor = () => {
    const isFocused = useIsFocused();
    const[locationName,setLocationName]=useState('')
    const[lati,setLati]=useState('')
    const[long,setLogn]=useState('')


    const getLocation=(latt,longg)=>{
        Geocoder.init("AIzaSyDGt77-gotuNZ4hFz6DkWBv4N0XFW3WJ6Q"); // use a valid API key

        Geocoder.from(latt,longg)
		.then(json => {
			
            var getloc=json.results[0].formatted_address
            var loacation=getloc.split(",")
            
            setLocationName(loacation[1])
           // alert(loacation[1])
		})
		.catch(error => console.warn(error));
    }

    
    useEffect(() => {
      
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 60000,
        })
        .then(location => {
            //console.log(location,'latitude"');
             setLati(location.latitude)
             setLogn(location.longitude)
             getLocation(location.latitude,location.longitude)
        })
        .catch(error => {
            const { code, message } = error;
            console.warn(code, message);
        })
    }, [isFocused])
    return (
        <View style={styles.locationView}>
        <View style={{width:"100%", flexDirection:"row",alignItems:'center'}}>
        <Entypo name="location-pin" size={32} color="white" />
            <Text style={{color:"white",fontWeight:"bold",fontSize:20}}>{locationName}</Text>
        </View>
    </View>
    )
}

export default LocationTextSingleVendeor

const styles = StyleSheet.create({
    locationView:{
        width:"100%",
        height:"50%",
        flexDirection:'row',
        justifyContent:"flex-start",
        alignItems:"flex-end",
        paddingLeft:10,
        paddingBottom:10
    },
})

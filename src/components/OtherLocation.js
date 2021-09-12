import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
const OtherLocation = () => {
    return (
        <>
            <GooglePlacesAutocomplete
                        fetchDetails={true}
                        style={{backgroundColor:"red"}}
                        placeholder='Search Other Location'
                        onPress={(data, details = null) => {
                       
                        const address = data.description.split(",")
                        console.log(address)
                        
                    }}
                     query={{
                     key: 'AIzaSyDGt77-gotuNZ4hFz6DkWBv4N0XFW3WJ6Q',
                    language: 'en',
                    }}
                    
                     />
                 
        </>
    )
}

export default OtherLocation

const styles = StyleSheet.create({})

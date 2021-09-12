import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Heading,useToast,Box } from 'native-base';

    

const Message = () => {
    const toast = useToast()

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

export default Message

const styles = StyleSheet.create({})

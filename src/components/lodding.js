 import { ProgressDialog } from 'react-native-simple-dialogs';


// export const loddin=(lod)=>{
//     return(
//         <ProgressDialog
//                 visible={true}
//                 message="Please, wait..."
//                 titleStyle={{color:"red", textAlign:'center'}}
//                 messageStyle={{color:"green", textAlign:"center"}}
//                 contentStyle={{alignItems:"center", justifyContent:"center", flexDirection:"row"}}
//                 dialogStyle={{borderRadius:10,width:220, height:70, justifyContent:'center'}}
//                 activityIndicatorColor="blue"
//                 activityIndicatorSize="large"
//                 overlayStyle={{alignItems:"center", justifyContent:"center", flexDirection:"row"}}
//         />
//     )
// }
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Lodding = ({props}) => {
    console.log(props.lod)
    return (
        <>
            <ProgressDialog
                visible={true}
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
    )
       
    
}

export default Lodding

const styles = StyleSheet.create({})

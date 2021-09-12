import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View,StatusBar, Image ,TouchableOpacity, ScrollView } from 'react-native'
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import { Heading } from 'native-base';
import { useIsFocused } from '@react-navigation/native';
import { API } from '../components/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ProgressDialog } from 'react-native-simple-dialogs';
import { justifyContent } from 'styled-system';
const AllServicces = ({navigation}) => {
    const isFocused = useIsFocused();
    const[item,setItem]=useState([])
    const[loding,setLoding]=useState(true)

    const allservices= async()=>{
        const user=  JSON.parse(await AsyncStorage.getItem("@user"))
        fetch(`${API}/services`,{
            method:"GET",
            headers:{
                Accept: 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user._token}` 
            }
        })
        .then((res)=>{
             return res.json()
        })
        .then((result)=>{
            if(result.data){
                setLoding(false)
                setItem(result.data)
            }else{
                setLoding(true)
            }
        })
        .catch(err=>console.log(err))
    }
    
    useEffect(() => {
        allservices()
    }, [])
    return (
        <>
       
        <View style={styles.mainWrapper}>
            <StatusBar hidden={true} />
            {/* ====header== */}
            <TouchableOpacity onPress={()=>navigation.goBack()} style={styles.header}>
                <AntDesign name="left" size={28} color="black" />
                <Text style={{marginLeft:3,fontSize:18, fontWeight:"bold"}}>
                What are you <Text style={{color:"red"}}>Offering
                </Text></Text>
            </TouchableOpacity>
            {/* ====header== */}
            {/* ====viewAll== */}
            <ScrollView showsVerticalScrollIndicator={false}> 
            <View style={styles.serviceWrapper}>
                {item && item.map((item,i)=>{
                    return(

                        <TouchableOpacity key={i} style={{width:90, height:120,marginVertical:7}}
                        onPress={()=>navigation.navigate('SingleService',{'id':item.ID})}>
                            <View style={{width:"100%", height:"70%",borderRadius:5,borderWidth:1,
                                justifyContent:'center', alignItems:'center'}}>
                                <Image  source={{uri:`https://yoffers.in/${item.PATH}/${item.IMAGE}`}}
                                    style={{width:"60%",height:'60%',resizeMode:'cover'}}
                                /> 

                            </View>
                            <View style={{width:"100%", height:"30%",justifyContent:'center',flexDirection:'row',
                            flexWrap:'wrap',
                                alignItems:'center'}}>
                                    <Heading size="sm">{item.NAME}</Heading>
                            </View>

                        </TouchableOpacity>
                        
                    )
                })}
               
                
               
               <ProgressDialog
                            visible={loding}
                            title="Loding Data"
                            message="Please, wait..."
                            titleStyle={{ color: "red", textAlign: 'center' }}
                            messageStyle={{ color: "green", textAlign: "center" }}
                            contentStyle={{ alignItems: "center" }}
                            dialogStyle={{ borderRadius: 10 }}
                            activityIndicatorColor="blue"
                            activityIndicatorSize="large"
                        />
              
               
              
            </View>
            {/* ====viewAll== */}
            </ScrollView>
        </View>
        </>
    )
}

export default AllServicces

const styles = StyleSheet.create({
    header:{
        width:"100%",
        height:50,
        backgroundColor:"white",
        alignItems:"center",
        paddingLeft:10,
        flexDirection:"row",
        marginVertical:20
    },
    mainWrapper:{
        width:"100%", 
        height:"100%",
        backgroundColor:"white"
    },
    serviesIMage:{
        width:'70%',
        height:'70%',
        resizeMode:"cover"
        },
    imageView:{
        width:100,
        height:130,
      
       
    },
    imageViewInner:{
        width:120,
        height:100,
        borderWidth:1,
        borderRadius:5,
        padding:5,
        justifyContent:"center",
        alignItems:"center"

    },
    textView:{
        height:50,
        width:'100%',
        backgroundColor:'red',
        justifyContent:'center',
        alignItems:"center"
    },
    serviceWrapper:{
        width:"100%", 
        flexDirection:'row',
        flexWrap:"wrap",
        justifyContent:"space-between",
        paddingHorizontal:5,
          
    }
})

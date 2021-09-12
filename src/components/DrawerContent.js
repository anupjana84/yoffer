import React,{useEffect, useState} from 'react'
import {
    View,
    TouchableOpacity,
    Image,
    ScrollView,
    StyleSheet,
  } from 'react-native';
  import LinearGradient from 'react-native-linear-gradient'
  import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
  import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
 
  import Entypo from 'react-native-vector-icons/Entypo';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  //<MaterialCommunityIcons name="truck-delivery-outline" size={24} color="black" />
  import {Text} from 'native-base';
import { AuthContext } from './AuthContext';
  
const DrawerContent = ({navigation}) => {
    const { signOut } = React.useContext(AuthContext);
   const[admin, setAdmin]=useState('');
   const[userName, setUserName]=useState('');
 
   const setuser= async()=>{
    const user=  await AsyncStorage.getItem('@user')
    const getuser =JSON.parse(user)
    setAdmin(getuser.role)
    setUserName(getuser.name)
 
   }
 
   useEffect( async () => {
    await  setuser()
    }, [])
    return (
        <LinearGradient style={styles.container}
        start={{ x: 0.3, y: 0 }} end={{ x: 1, y: 0 }}
        colors={['#FFFFFF', '#FFFFFF']}
        >
            <View style={styles.imageView}>
                <Image source={require('../images/logo3.jpg')} 
                style={styles.topImage} />
            </View>
            <Text style={styles.text}>{userName}</Text>
            <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
                
               
                
                
                {/* <TouchableOpacity onPress={()=>{navigation.navigate('Curve')}}  style={styles.navButtoN}>
                <Feather size={27} color="white" name="truck" />
                    <Text style={styles.navButtoNText}> Curve</Text>
                </TouchableOpacity> */}

               
                {
                    admin=='A'?(
                        <>
                        {/* <TouchableOpacity onPress={()=>{navigation.navigate('Booking')}}  style={styles.navButtoN}>
                        <MaterialIcons size={27} color="black" name="logout" />
                            <Text style={styles.navButtoNText}> admin</Text>
                        </TouchableOpacity> */}
                        <TouchableOpacity onPress={()=>{navigation.navigate('AllBooking')}}  style={styles.navButtoN}>
                        <MaterialCommunityIcons size={27} color="#23C4ED" name="camcorder" />
                            <Text style={styles.navButtoNText}> All Booking</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{navigation.navigate('Alldelivery')}}  style={styles.navButtoN}>
                        <MaterialCommunityIcons size={27} color="#23C4ED" name="truck-delivery-outline" />
                            <Text style={styles.navButtoNText}> Pending Delivery</Text>
                        </TouchableOpacity>
                        
                        </>
                        )
                    :(
                        <>
                     <TouchableOpacity  onPress={()=>{navigation.navigate('Booking')}}  style={styles.navButtoN}>
                    <MaterialCommunityIcons size={27} color="#23C4ED" name="gas-cylinder" />
                        <Text style={styles.navButtoNText}> Booked Your Gas</Text>
                    </TouchableOpacity>
                     <TouchableOpacity  onPress={()=>{navigation.navigate('UserBooking')}}  style={styles.navButtoN}>
                    <MaterialCommunityIcons size={27} color="#23C4ED" name="gas-cylinder" />
                        <Text style={styles.navButtoNText}> All Pending Delivery </Text>
                    </TouchableOpacity>
                     <TouchableOpacity  onPress={()=>{navigation.navigate('AllUserBooking')}}  style={styles.navButtoN}>
                    <MaterialCommunityIcons size={27} color="#23C4ED" name="gas-cylinder" />
                        <Text style={styles.navButtoNText}>All Booking </Text>
                    </TouchableOpacity>
                   
                   
                    </>
                    )
                        
                    
                }
                <TouchableOpacity  onPress={() => {signOut()}}  style={styles.navButtoN}>
                <MaterialIcons size={27} color="#23C4ED" name="logout" />
                    <Text style={styles.navButtoNText}> Logout</Text>
                </TouchableOpacity>
               
          </ScrollView>
      </LinearGradient>
    )
}

export default DrawerContent

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        opacity:0.7
       // marginRight: 5
    },
    scroll:{
        flex:1,
        paddingHorizontal:10
    },
    text: {
        color: 'black',
        marginTop: 10,
        textAlign:"center",
        fontSize:20
    },
    imageView:{
        width:"100%",
        height:150,
        justifyContent:"center",
        alignItems:"center"
    },
    topImage: {
        width: "100%",
        height: "100%",
        
    },
    button: {
        marginTop: 20,
       
    },
    navButtoN:{
        width:"100%",
        height:50, 
        marginTop:10,     
        
        flexDirection:"row",
        justifyContent:"flex-start",
        alignItems:'center',
        borderTopWidth:1, 
        //backgroundColor:"yellow",
        marginRight: 10
    },
    navButtoNText:{
        marginLeft:20, 
        fontSize:20, 
        color:'black'

    }
})

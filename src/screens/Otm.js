import React,{useEffect,useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity,StatusBar } from 'react-native'
import { Heading,useToast,Box } from 'native-base';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import NextTextInput from 'react-native-next-input'

import { AuthContext } from '../components/AuthContext';
import { API } from '../components/Api';
import { ProgressDialog } from 'react-native-simple-dialogs';

const Otm = ({navigation,route}) => {
    
    const [phone, setPhone]=useState('')
    const [invalid ,setInvalid]=useState(false)
    const [otp ,setOtp]=useState('')
    const[lodding, setLodding]=useState(false)
    const { signIn } = React.useContext(AuthContext);
    const toast = useToast()
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
    const successTossata =(msg)=>{
        return (
            toast.show({
                render: () => {
                  return (
                    <Box style={{width:180, height:50,
                        justifyContent:'center',
                        alignItems:"center",
                        borderRadius:10,
                     backgroundColor:'#E07C24'}}>
                     <Text style={{color:"white",fontSize:20,fontWeight:"bold"}}>
                        {msg}
                         </Text>
                    </Box>
                  )
                },
              })
        )
    }
  
  const  inputFromChildComponent = (combinedValueArray, currentValue, refForTheCurrentValue) => {
      //  console.log(combinedValueArray,'combinedValueArray')
       // console.log(currentValue, "currentValue",)
        //console.log(refForTheCurrentValue,  "refForTheCurrentValue")
        const array =combinedValueArray;
        var myVar4 = array.join(''); 
        setOtp(myVar4)
     
}


const login= ()=>{
    if(otp==''){
        successTossata('Enter OTP')
    }else{
        setLodding(true)
    const dataone ={
        otp:otp,
        phone:phone}
    fetch(`${API}/login`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            'Content-Type':"application/json"
        },
        body:JSON.stringify(dataone)
    })
    .then((res)=>{
        return res.json()
    })
    .then( async (result)=>{
   // console.log(result,'TRD')
        if(result.success == true){
            setLodding(false)
            //console.log(result.data)
            signIn(result.data)
        //   await AsyncStorage.setItem('@user',JSON.stringify(result.data)) 
        //   navigation.navigate('Location')
        }else{
            alertTossata("Otp Invalid")
        }
        
    })
    .catch(err=>{
    console.log(err)
    })
//
}
}
useEffect( async() => {
   setPhone(route.params.phone)
   
}, [])

    return (
        <>
        <StatusBar hidden={true}/>
        <TouchableOpacity style={styles.header} onPress={()=>navigation.goBack()}>
            <AntDesign name="left" size={24} color="black" />
            <Text style={{marginLeft:3,fontSize:16, fontWeight:"bold"}}>Login/Singup</Text>
        </TouchableOpacity>
        <View style={styles.wrapper}>
            <Heading size="lg" style={styles.hedingOne}>Enter Verification Code</Heading>
            <Text style={styles.hedingTwo}>We Have sent you a 4 Digit Verification code on</Text>
            <View style={styles.inputView}>
                <NextTextInput 
                    noOfTextInput={4}
                    clear={invalid}
                    textInputStyle={styles.textBox}
                    onChangeValue={inputFromChildComponent}
                    parentViewStyle={styles.textBoxes}
               
                    />
            </View>
            <Text style={{color:"#9AF399",fontWeight:"bold"}}>0 : 28</Text>
            <View style={styles.buttonView}>
                <TouchableOpacity style={styles.login} 
                 onPress={login}>
                    <Text style={{fontSize:18, fontWeight:"bold", color:'white'}}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
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
    )
}

export default Otm

const styles = StyleSheet.create({
    header:{
        width:"100%",
        height:50,
       
        alignItems:"center",
        paddingLeft:10,
        flexDirection:"row"
    },
    wrapper:{
        width:"100%",
        height:"100%",
    
        flexDirection:'column',
        justifyContent:'center',
        alignItems:"center"
    },
    inputView:{
        width:"100%",
        height:70, 
        justifyContent:"space-around",
        alignItems:"center",
        flexDirection:"row"
    },
    inputField:{
        width:50,
        height:50,
         borderWidth:1
    },
    hedingTwo:{
        marginVertical:15
    },
    hedingOne:{
        marginVertical:15
    },
    textBox:{
        width:50,
        height:50,
        borderWidth:1,
        margin:10,
        borderRadius:5,
        justifyContent:"center",
        alignItems:"center",
        textAlign:"center"
    },
    textBoxes:{
    },
    buttonView:{
        width:"100%",
        height:60,
      
        justifyContent:"center",
        alignItems:'center',
        marginTop:8
    },
    login:{
        width:"60%",
        height:"80%",
        backgroundColor:'red',
        justifyContent:'center',
        alignItems:'center',
        padding:5,
        borderRadius:10


    }
})

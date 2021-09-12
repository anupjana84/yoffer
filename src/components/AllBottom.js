import * as React from 'react';
import { View,Text,Image,StyleSheet,TouchableOpacity } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SerVicesscreens from '../screens/SerVicesscreens'
import AddVendeor from '../screens/AddVendeor';
import Profile from '../screens/Profile';
import ShareScreen from '../screens/ShareScreen';
import MyAdd from '../screens/MyAdd';

import { Heading } from 'native-base';

const Tab = createBottomTabNavigator();

 const AllBottom=()=> {
  

 const Addtab=({children, onPress,focused})=>(
    
     <TouchableOpacity
     onPress={onPress}
        style={{
            justifyContent:'center',
            alignItems:'center',
            top:-30
        }}
        >
         <View style={{
         width:60,
         height:60,
         top:5,
         borderRadius:30,
         backgroundColor:'white'
       
     }}>
             {children}
            
         </View>
     </TouchableOpacity>

 )

  return (
  <>
    <Tab.Navigator 
        tabBarOptions={{
            showLabel:false,
            style:{
                position:"absolute",
                left:0,
                right:0, 
                bottom:0,
                backgroundColor:'white',
                height:60
            }
        }}
    >
    <Tab.Screen name="SerVicesscreens" component={SerVicesscreens}
        options={{
            tabBarIcon:({focused})=>(
                <View style={{justifyContent:'center',alignItems:'center',}}>
                    <Image source={ require('../images/dog-house.png')}
                    resizeMode="cover"
                    style={{
                        width:20,
                        height:20,
                        tintColor:focused ?'red':"black" 
                    }}
                    />
                    <Heading size="sm" style={{color:focused ? "red":'black',marginTop:5}}>HOME</Heading>
                </View>
            )
        }}
    />
     <Tab.Screen name="ShareScreen" component={ShareScreen} 
        options={{
            tabBarIcon:({focused})=>(
                <View style={{justifyContent:'center',alignItems:'center',}}>
                    <Image source={ require('../images/share.png')}
                    resizeMode="cover"
                    style={{
                        width:20,
                        height:20,
                        tintColor:focused ?'red':"black" 
                    }}
                    />
                   <Heading size="sm" style={{color:focused ? "red":'black',marginTop:5}}>SHARE</Heading>
                </View>
            )
        }}

     />
     <Tab.Screen name="AddVendeor" component={AddVendeor} 
       options={{
           tabBarIcon:({focused})=>(
            <Image source={ require('../images/add.png')}
            resizeMode="cover"
            style={{
                width:60,
                height:60,
                tintColor:focused ?'red':"black" 
            }}
            />
           ),
           tabBarButton:(props,focused)=>(
            
               <View style={{justifyContent:"center",alignItems:"center" }}>
               <Addtab {...props} focused={focused}/>
             
               </View>
           )

           
       }}
     />      
     <Tab.Screen name="MyAdd" component={MyAdd} 
        options={{
            tabBarIcon:({focused})=>(
                <View style={{justifyContent:'center',alignItems:'center'}}>
                    <Image source={ require('../images/heart.png')}
                        resizeMode="cover"
                        style={{
                            width:20,
                            height:20,
                            tintColor:focused ?'red':"black" 
                        }}
                        />
                  <Heading size="sm" style={{color:focused ? "red":'black',marginTop:5}}>MY ADD</Heading>
                </View>
            )
        }}
     />
       <Tab.Screen name="Profile" component={Profile} 
            options={{
                tabBarIcon:({focused})=>(
                    <View style={{justifyContent:'center',alignItems:'center'}}>
                        <Image source={ require('../images/follower.png')}
                            resizeMode="cover"
                            style={{
                                width:20,
                                height:20,
                                tintColor:focused ?'red':"black" 
                            }}
                            />
                        <Heading size="sm" style={{color:focused ? "red":'black',marginTop:5}}>PROFILE</Heading>
                    </View>
                )
            }}
       />
</Tab.Navigator>
</>

  );
}
export default  AllBottom
const styles = StyleSheet.create({

})
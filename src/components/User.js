import AsyncStorage from "@react-native-async-storage/async-storage"



export const userId= async()=>{
    const user= await AsyncStorage.getItem('@user')
    const userData=JSON.parse(user)
    //console.log(userData.id)
    return userData.id
}

import AsyncStorage from '@react-native-async-storage/async-storage';


export const isAutheticated = async () => {
    if (typeof window == "undefined") {
      return false;
    }
    if ( await AsyncStorage.getItem("@user")) {
      return JSON.parse(await AsyncStorage.getItem("@user"));
    } else {
      return false;
    }
  };
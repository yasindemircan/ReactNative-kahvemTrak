import AsyncStorage from '@react-native-async-storage/async-storage';
let Key ="Storage_key_forLogin";

export const getDataFromLocalStorage = async () =>{
    try  {
        const jsonValue = await AsyncStorage.getItem(Key)
        if(jsonValue !== null) {
         const Data = await JSON.parse(jsonValue)
          const  STORE = await Data
            return(STORE)
        }
    
    }catch(e){
        return(
            console.log("HATA: ",e," LocalStorage Bos Yada Okunamadi.")
        )
        
    }

}
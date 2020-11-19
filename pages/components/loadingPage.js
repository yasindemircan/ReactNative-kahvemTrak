import {Text, View, ActivityIndicator, Image,ImageBackground ,StyleSheet, StatusBar,TextInput,TouchableOpacity,Alert,ScrollView } from 'react-native'
import React, {useEffect} from 'react'



function loadingPage({navigation}){

    useEffect(()=>{
      setTimeout(() => {
        navigation.navigate('Home')}, 1000);
      
  
    })


const randomBilgi = () =>{
  let bilgiler = [
  "Kahve M.S. 800'lü yıllarda Etiyopyalı bir çoban tarafından bulunmuştur.",
  "Kahve dondurularak saklanan ilk gıdadır.",
  "Akşam saatlerinde tükettiğiniz kafein uykunuzu yaklaşık 40 dakika kadar geciktirir.",
  "1600'lerde kahveye süt eklemeyi Fransız lar bulmuştur.",
  "Japonya'da kahveli spa yapabileceğiniz yerler mevcut.",
  "Kahve makinesini sürekli gözlemleyebilecekleri icat, webcam."
]
 var randomItem = bilgiler[Math.floor(Math.random()*bilgiler.length)];
  return(<Text style={{textAlign:'center',fontSize:18,color:'white',margin:10}}>{randomItem}</Text>)
}
  return(
        <ImageBackground source={require('../../image/bc_dark.png')} style={styles.container} >
        <View style={styles.MainView}>
          <StatusBar hidden={true} />
         <Image source={require('../../image/logo.png')} style={styles.logo}/>
          {randomBilgi()}
          <ActivityIndicator size="large" color="#F0E3DB" style={{paddingTop:50,paddingBottom:50,}} />
          <Text style={{fontSize:25,color:'gray',fontFamily: 'AdventPro-bold' }}>KahvemTrak</Text>
        </View>
      </ImageBackground>    
  ); 
}
  

const styles = StyleSheet.create({
    
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
    },
    MainView:{
      alignItems: 'center'
    }, 
    logo:{
        width:250,
        height:250,
        borderWidth:2,
      },
})

exports.loadingPage=loadingPage;
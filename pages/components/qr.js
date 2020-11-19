import {
    Text, 
    View, 
    StyleSheet, 
    StatusBar,
    TouchableOpacity,
} from 'react-native'
import React from 'react'

 global.Buffer = global.Buffer || require('buffer').Buffer
 import QRCode from 'react-native-qrcode-svg';
 

function Giftqr ({navigation,route}) {
const  qrdata = route.params.qrdata

    return (
        <View style={styles.container}>
        <StatusBar hidden={true} /> 
        <View style={{paddingBottom:50}}>
         <QRCode
                value={qrdata}
                size={200}
                bgColor='#FFFFFF'
                fgColor='#000000'/>
        </View>
        
          
          <View style={styles.inputContainer}>
            <Text style={styles.infotitle}>
              Hediyenizi almak için QR Kodunuzu görevliye okutunuz..
              
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <Text style={{color:'red', textAlign:'center',fontSize:16}}>
            QR Kod okutulmadığı takdirde hediye hakkınızdan düşmez.
              
            </Text>
          </View>
      
      
  
          <View style={styles.button}>
          <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={()=>{
             navigation.push('Home')
          }}>
          
            <Text style={styles.loginText}>Tamam</Text>
          </TouchableOpacity>
        </View>
        </View>
        
        );
      
}

  const styles = StyleSheet.create({
    
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(255,255,255,0.6)',
      width: '100%',
      height: '100%',
    },
    infotitle:{
      textAlign: 'center',
      fontSize: 16
    },
    button:{
      width: '100%',
      alignItems: 'center',
      marginTop:30,
      justifyContent:'flex-end'
    },
    inputContainer: {
       // borderBottomColor: '#F5FCFF',
        backgroundColor: 'rgba(255,255,255,0.6)',
        borderRadius:30,
        width:'75%',
        height:50,
        marginBottom:20,
        flexDirection: 'row',
        alignItems:'center'
    },
   
    buttonContainer: {
      height:52,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom:15,
      width:'75%',
      borderRadius:30,
     // borderWidth:2,
    },
    loginButton: {
      backgroundColor:'#fff',
      borderWidth:0.8,
      //backgroundColor: "#00b5ec",
    },
    loginText: {
      color: 'black',
      fontSize:16,
    },
  });

exports.Giftqr = Giftqr;
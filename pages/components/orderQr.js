import {
    Text,
    View,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
    Linking,
    ScrollView
} from 'react-native'
import React from 'react'
import QRCode from 'react-native-qrcode-svg';



global.Buffer = global.Buffer || require('buffer').Buffer


const qrViewer = (order) => {

    if (order.status === 3) {
        return (
            <View>
                <View style={{paddingBottom: 10, alignItems: 'center'}}>
                    <QRCode
                        value={order.id}
                        size={180}
                        bgColor='#FFFFFF'
                        fgColor='#000000'/>
                </View>
                <Text style={styles.qrdata}>
                    {order.id}
                </Text>
                <View style={styles.inputContainer}>
                    <Text style={styles.infotitle}>
                        Siparişinizi almak için QR Kodunuzu görevliye okutunuz.

                    </Text>
                </View>

            </View>
        )
    } else {
        return (
            <View>

                <View style={{paddingBottom: 20}}>
                    <Text style={{textAlign: 'center', fontSize: 22, color: 'red', margin: 15}}>
                        Siparişiniz henüz hazır değil. Hazır olunca gelen kodu görevliye okutunuz.
                    </Text>
                </View>
            </View>
        )
    }

}

const orderDetail = (data) => {

    let content = data.content;
    let counts = data.counts;
    let infoCon = [];
    for (let i of content) {
        let id = i.publicId;

        infoCon.push(counts[id] + "x " + i.name);
    }
    return infoCon.join("\n");


};


//const Orderqr = ({navigator, order}) => 
function Orderqr({navigation,route}){
    const order = route.params.order
    return (
      
<ScrollView style={{width:'100%',alignContent:'center', backgroundColor:'rgba(255,255,255,0.6)'}}>
        <View style={styles.container}>

            <StatusBar hidden={true}/>

            {qrViewer(order)}
            

           
    
            <View style={styles.inputContainer}>
                <Text style={{textAlign: 'center', fontSize: 19, marginBottom: 10}}>
    
                    Sipariş İçeriği
    
                </Text>
                <Text style={{textAlign: 'center', fontSize: 16}}>
    
                    {orderDetail(order)}
    
                </Text>
                <Text style={{textAlign: 'center', fontSize: 18, fontWeight: 'bold', marginTop: 10}}>
    
                    Toplam {order.total}₺
    
                </Text>
            </View>
    
    
            <View style={styles.button}>
                <TouchableOpacity style={[styles.buttonContainer, styles.callButton]} onPress={() => {
                    Linking.openURL('tel:0000000000')
                }}>
    
                    <Text style={styles.callText}>Siparişi İptal Et</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={() => {
                    navigation.push('Home')
                }}>
    
                    <Text style={styles.loginText}>Tamam</Text>
                </TouchableOpacity>
            </View>
            
        </View>
     </ScrollView>
    );
}


const styles = StyleSheet.create({

    container: {
        paddingTop: 35,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.6)',
        width: '100%',
        height: '100%',
    },
    infotitle: {
        textAlign: 'center',
        fontSize: 16

    },
    qrdata: {

        textAlign: 'center',
        fontSize: 25
    },
    button: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        marginTop: 30,
        justifyContent: 'flex-end'
    },
    inputContainer: {
        backgroundColor: 'rgba(255,255,255,0.6)',
        borderRadius: 30,
        width: '75%',
        height: 'auto',
        marginBottom: 20,
        flexDirection: 'column',
        alignItems: 'center',
        
    },
    buttonContainer: {
        height: 52,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
        width: '75%',
        borderRadius: 30,
        // borderWidth:2,
    },
    loginButton: {
        backgroundColor: '#fff',
        borderWidth: 0.8,
        //backgroundColor: "#00b5ec",
    },
    callButton: {
        backgroundColor: 'white',
        borderColor: 'red',
        borderWidth: 0.8,
        //backgroundColor: "#00b5ec",
    },
    callText: {
        color: 'red',
        fontSize: 16,
    },
    loginText: {
        color: 'black',
        fontSize: 16,
    },
});

exports.Orderqr = Orderqr;
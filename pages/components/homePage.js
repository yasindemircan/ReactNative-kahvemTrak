import {
  Text,
  View,
  Linking,
  Image,
  ImageBackground,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Alert,
  ScrollView,
  RefreshControl,
  ToastAndroid
} from "react-native";
import React, { useState, useEffect,useCallback } from "react";
//import ActionButton from 'react-native-action-button';
import Ionicon from "react-native-vector-icons/Ionicons";

//console.disableYellowBox = true;
import moment from "moment";
import Swiper from "react-native-swiper";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { getDataFromLocalStorage } from "../helpers/getDataLocalStorage";
import { TokenResponse } from "../helpers/Response";

var querystring = require("query-string");

let statusCodes = {
  1: "Alındı",
  2: "Hazırlanıyor",
  3: "Hazır :)",
  4: "Tamamlandı",
  5: "İptal Edildi",
};

let name = null;
const showToast = () => {
  return new Promise(resolve => {
    ToastAndroid.show("Oppps!", ToastAndroid.SHORT);
  });
};


function Home({ navigation, route }) {
  const [coffee, setCoffe] = useState(null);
  const [active, setActive] = useState(null);
  const [gift, setGift] = useState(null);
  const [refreshing , setRefreshing] = useState(false);
  const [isStarted, setIsStarted] = useState(false);


  const  onRefresh =  useCallback( async () => {
    setRefreshing(true);
    try {
      await getLocaldata()
      .then(() => setRefreshing(false));
    } catch (error) {
       showToast()
      .then(() =>
      console.log("then"),
      setRefreshing(false));
    }
    
  }, []);

  // --------------------RESPONSEEEEEEEE
  const getLocaldata = async () => {
    const LOCALSTORAGE = await getDataFromLocalStorage();
    name = LOCALSTORAGE.name;
    const ResponseActive = TokenResponse(
      "api/user/order/active",
      querystring.stringify({ token: LOCALSTORAGE.token })
    );
    const ResponseGift = TokenResponse(
      "api/user/gift/",
      querystring.stringify({ token: LOCALSTORAGE.token })
    );
    const AllResponse = await Promise.all([ResponseActive, ResponseGift]);
    if (AllResponse[0].success && AllResponse[1].success) {
      setActive(AllResponse[0].data);
      setCoffe(AllResponse[1].data.coffee);
      setGift(AllResponse[1].data.gift);
    }else{
      Alert.alert('Hata','Beklenmedik bişeyler oldu')
    }
    
  };

  const coffeeget = (count) => {
    let bosbardak = 5 - count;
    let bardaklar = [];
    for (let index = 0; index < count; index++) {
      bardaklar.push(
        <Image
          key={index}
          source={require("../../image/bardakdolu.png")}
          style={styles.coffe_active}
        ></Image>
      );
    }
    for (let index = bosbardak; index > 0; index--) {
      bardaklar.push(
        <Image
          key={index + 5}
          source={require("../../image/bardakdolu.png")}
          style={styles.coffe_unactive}
        ></Image>
      );
    }
    return bardaklar;
  };

  const renderContent = (item) => {
    let content = item.content;
    let counts = item.counts;

    let infoCon = [];
    for (let i of content) {
      let id = i.publicId;

      infoCon.push(counts[id] + "x " + i.name);
    }

    if (infoCon.length > 5) {
      let newinfoCon = [];
      for (let i = 0; i < 3; i++) {
        newinfoCon.push(infoCon[i]);
      }
      newinfoCon.push("...");

      infoCon = newinfoCon;
    }
    let geciktirici = item.delay !== 0 && item.delay !== "" ? false : true;

    infoCon.push(
      "T: " +
        item.total +
        "₺ - (Sipariş Saati: " +
        moment(item.date).format("HH:mm") +
        ")",
      geciktirici === false
        ? moment(item.date).add(item.delay, "minutes").format("HH:mm") +
            " Siparişin Hazır Olacak"
        : ""
    );
    return infoCon.join("\n");
  };

  const activeSPS = () => {
    let data = [];

    active.forEach((order) => {
      data.push(
        <TouchableOpacity
          key={order.id}
          onPress={() => navigation.navigate("Orderqr", { order })}
          style={{ textAlign: "center", alignSelf: "center" }}
        >
          <View style={styles.activeOrder}>
            <View style={styles.activeBox}>
              <View style={{ flexDirection: "row" }}>
                <Image
                  style={{ width: 100, height: 100, margin: 5 }}
                  source={require("../../image/load.gif")}
                />
                <View>
                  <Text style={{ margin: 8, fontSize: 16 }}>
                    Siparişiniz {statusCodes[order.status]}
                  </Text>
                  <Text style={{ marginLeft: 8, fontSize: 10 }}>
                    {renderContent(order)}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    });
    return data;
  };

  const swiperLogic = () => {
    if (active.length > 0) {
      return (
        <Swiper
          style={{ alignItems: "center", alignSelf: "center", height: 140 }}
          scrollEnabled={true}
          showsButtons={false}
          autoplay
          autoplayTimeout={7}
          dot={
            <View
              style={{
                backgroundColor: "rgba(0,0,0,.2)",
                width: 5,
                height: 5,
                borderRadius: 4,
                marginLeft: 3,
                marginRight: 3,
                marginTop: 0,
                marginBottom: -25,
              }}
            />
          }
          activeDot={
            <View
              style={{
                backgroundColor: "#000",
                width: 5,
                height: 5,
                borderRadius: 4,
                marginLeft: 3,
                marginRight: 3,
                marginTop: 0,
                marginBottom: -25,
              }}
            />
          }
        >
          {activeSPS()}
        </Swiper>
      );
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.clear();
      Alert.alert("İslem Basarılı", "Çıkış Yaptınız");
      navigation.navigate("Login");
    } catch (e) {
      Alert.alert("Hata", "Bir Hata Oldu Lütfen Tekrar Dene");
    }
  };

  useEffect(() => {
    getLocaldata();
  }, [isStarted]);

  return (
    <ImageBackground
      source={require("../../image/bc.png")}
      style={styles.container}
    >
      <ScrollView style={{ width: "100%", height: "100%"}} refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> } 
        >
        <View style={styles.container}>
          <StatusBar hidden={true} />

          <View style={styles.top}>
           
              <Image
                style={styles.logo}
                source={require("../../image/logo.png")}
              ></Image>
           
          </View>
          <View style={styles.main}>
            <View style={styles.hsdiv}>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.welcome}>Hoş Geldin </Text>
                <TouchableOpacity
                  onPress={() =>
                    Alert.alert(
                      "Cıkış Yapmak Üzerisiniz",
                      "Çıkış Yapmak İstiyor musun?",
                      [
                        { text: "Vazgeç", onPress: () => {} },
                        {
                          text: "Çıkış Yap",
                          onPress: () => {
                            logout();
                          },
                        },
                      ],
                      { cancelable: true }
                    )
                  }
                >
                  <Text
                    style={{ fontFamily: "AdventPro-Medium", fontSize: 25 }}
                  >
                    {name}
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  alignSelf: "flex-end",
                  width: "100%",
                  marginTop: "4%",
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <View
                    style={{
                      flexDirection: "column",
                      width: "70%",
                      borderWidth: 0,
                      borderColor: "yellow",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <View style={{ borderWidth: 0, borderColor: "green" }}>
                      <Text
                        style={{
                          fontFamily: "AdventPro-Regular",
                          fontSize: 15,
                          width: "100%",
                        }}
                      >
                        5 Kahveye Hediye Kampanyasi
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        width: "100%",
                        borderWidth: 0,
                        justifyContent: "center",
                      }}
                    >
                      {active !== null ? (
                        coffeeget(coffee)
                      ) : (
                        <Text>Yukleniyor...</Text>
                      )}
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "column",
                      width: "30%",
                      borderWidth: 0,
                      borderColor: "blue",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <View style={{ borderWidth: 0, borderColor: "green" }}>
                      <Text
                        style={{
                          fontFamily: "AdventPro-Regular",
                          fontSize: 15,
                          width: "100%",
                        }}
                      >
                        Hediyeniz
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("Gift", { gift })}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          width: "100%",
                          borderWidth: 0,
                          borderColor: "red",
                          justifyContent: "center",
                        }}
                      >
                        <Image
                          source={
                            gift === 0
                              ? require("../../image/gift.png")
                              : require("../../image/gift1.gif")
                          }
                          style={styles.gift}
                        ></Image>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.buttonsGroup}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Drinks")}
              style={styles.box}
            >
              <Image
                style={styles.buttonIcon}
                source={require("../../image/coffee.png")}
              ></Image>
              <Text style={styles.buttonText}>İçecekler </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.box2}
              onPress={() => {
                Linking.openURL("https://goo.gl/maps/nhzUrqSAz3ctUq1y6");
              }}
            >
              <Image
                style={styles.buttonIcon}
                source={require("../../image/qrcode.png")}
              ></Image>
              <Text style={styles.buttonText}>Teslim Noktamız</Text>
            </TouchableOpacity>
          </View>

          {active !== null ? swiperLogic() : <Text>Yukleniyor...</Text>}

          <View style={styles.oldOlder}>
            <TouchableOpacity
              style={styles.box3}
              onPress={() => navigation.navigate("OrderHistory")}
            >
              <Image
                style={{ width: 65, height: 65, marginTop: "5%" }}
                source={require("../../image/oldOrder.png")}
              />
              <Text style={{ fontSize: 17, marginTop: "4%" }}>
                
                Önceki Siparişler
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    
    flex: 1,
    alignItems: "center",
    width: "100%",
    height: "29%",
  
  },

  main: {
    flex: 2,
    backgroundColor: "#e0e5e7",
    width: "87%",
    borderRadius: 20,
    padding: 18,

    shadowColor: "#FFFF",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.9,
    elevation: 1,
  },
  top: {
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 140,
    height: 140,
    opacity: 0.8,
  },
  hsdiv: {
    fontSize: 25,
    textAlign: "left",
    alignSelf: "flex-start",
    textAlignVertical: "top",
    width: "100%",
    height: "100%",
    
  },
  welcome: {
    fontSize: 25,
    fontFamily: "AdventPro-Regular",
  },
  actionButtonIcon: {
    fontSize: 30,
    height: 30,
    color: "black",
  },
  buttonsGroup: {
    marginTop: "4%",
    width: "87%",
    flexDirection: "row",
  },
  oldOlder: {
    marginTop: "4%",
    marginBottom: "1%",
    width: "87%",
    flexDirection: "row",

    shadowColor: "#FFFF",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.9,
    elevation: 1,
  },
  activeOrder: {
    flex: 1,
    marginTop: "4%",
    width: "87%",
    flexDirection: "row",
    elevation: 1,
    //borderWidth:1,
  },
  box: {
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#e0e5e7",
    width: "48%",
    height: 140,
    borderRadius: 15,

    shadowColor: "#FFFF",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.9,
    elevation: 1,
  },
  box2: {
    alignItems: "center",
    marginLeft: "4%",
    backgroundColor: "#e0e5e7",
    width: "48%",
    height: 140,
    borderRadius: 15,

    shadowColor: "#FFFF",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.9,
    elevation: 1,
  },
  box3: {
    alignItems: "center",
    backgroundColor: "#e0e5e7",
    height: 120,
    borderRadius: 15,
    width: "100%",

    shadowColor: "#FFFF",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.9,
    elevation: 1,
  },
  activeBox: {
    alignItems: "flex-start",
    backgroundColor: "#e4f5ab",
    height: 120,
    borderRadius: 15,
    width: "100%",

    shadowColor: "#FFFF",
     shadowOffset: { width: 0, height: 2 },
     shadowOpacity: 0.9,
    
  },
  buttonText: {
    fontSize: 17,
  },
  buttonIcon: {
    margin: "8%",
    width: "50%",
    height: "60%",
  },
  coffe_active: {
    height: 40,
    width: 30,
    marginTop: "3%",
    marginRight: "5%",
  },
  gift: {
    height: 40,
    width: 43,
    marginTop: "3%",
  },
  coffe_unactive: {
    width: 30,
    height: 40,
    marginTop: "3%",
    marginRight: "5%",
    opacity: 0.4,
  },
});

exports.Home = Home;

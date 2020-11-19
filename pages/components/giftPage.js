import {
  Text,
  View,
  Image,
  ImageBackground,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";


import { getDataFromLocalStorage } from "../helpers/getDataLocalStorage";
import { TokenResponse } from "../helpers/Response";
var querystring = require("query-string");

global.Buffer = global.Buffer || require("buffer").Buffer;
function giveGift({ navigation, route }) {
  const [localData, setLocalData] = useState(null);
  const [isStarted, setIsStarted] = useState(false);
  const gift = route.params.gift;
  useEffect(() => {
    getLocaldata();
  }, [isStarted]);

  const getLocaldata = async () => {
    const LOCALSTORAGE = await getDataFromLocalStorage();
    const ResponseGift = await TokenResponse(
      "api/user/gift/all",
      querystring.stringify({ token: LOCALSTORAGE.token })
    );
  
    if (ResponseGift.success) {
      setLocalData(ResponseGift);
    }
  };

  const getGift = () => {
    let opacity = gift === 0 ? 0.5 : 1;
    let product = [];
    localData.data.forEach((element) => {
      product.push(
        <View key={element.id} style={{ opacity }}>
          <View style={styles.giftBox}>
            <Image
              style={{ width: 50, height: 50, marginRight: 20 }}
              source={require("../../image/gift1.gif")}
            />
            {/* <Ionicon name='gift'  style={{marginRight: 20,}} size={50} color='#465881'/> */}
            <View style={styles.proInfo}>
              <Text style={styles.proName}>{element.name}</Text>
            </View>
            <View style={styles.addBasketPar}>
              <TouchableOpacity
                style={styles.addBasket}
                onPress={() =>
                  navigation.navigate("GiftqrPage", {
                    qrdata: element.id + "#" + localData.publicId,
                  })
                }
              >
                <Text style={styles.add_text}> {'>'} </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    });

    return product;
  };

  return (
    <ImageBackground
      source={require("../../image/bgmini.png")}
      style={styles.container}
    >
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <View style={styles.top}>
          <TouchableOpacity
            onPress={() => navigation.push("Home")}
            style={styles.box}
          >
            <Image
              style={{
                width: 50,
                height: 50,
                marginLeft: 10,
                marginTop: "20%",
              }}
              source={require("../../image/back.png")}
            ></Image>
          </TouchableOpacity>
          <View style={styles.box2}>
            <Text style={styles.welcome}>Hediyeler</Text>
          </View>
        </View>
        <View style={styles.main}>
          <ScrollView
            style={{
              width: "100%",
              height: "100%",
              padding: "3%",
              paddingBottom: "10%",
            }}
          >
            <View pointerEvents={gift === 0 ? "none" : "auto"}>
              <View style={styles.pageInfo}>
                <Text style={styles.proName}>Hediye Puanın: {gift}</Text>
              </View>
              {localData ? getGift() : <Text> Yukleniyor ....</Text>}
            </View>
          </ScrollView>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    height: "20%",
  },

  main: {
    //flex:0,
    // backgroundColor:'#EEF1F2',
    width: "100%",
    height: "100%",
  },

  giftBox: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#e0e5e7",
    width: "100%",
    height: 65,
    borderRadius: 12,
    marginTop: "3%",
    padding: 6,
    paddingLeft: 20,
    paddingRight: 20,

    shadowColor: "#FFFF",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.9,
   // elevation: 1,

    //padding:18,
  },

  pageInfo: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#e0e5e7",
    width: "100%",
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    marginTop: "3%",
    padding: 6,
    paddingLeft: 20,
    paddingRight: 20,

    shadowColor: "#FFFF",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.9,
    elevation: 1,

    //padding:18,
  },
  top: {
    flexDirection: "row",
    width: "99%",
    height: "20%",
    //  borderWidth:1,
    borderColor: "green",
  },

  proName: {
    justifyContent: "center",
    fontSize: 20,
  },
  addBasket: {
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffcc00",
    borderRadius: 3,
  },
  addBasketPar: {
    flexDirection: "column",
    alignItems: "flex-end",
    width: "15%",
    height: 50,
    justifyContent: "center",
  },
  add_text: {
    textAlign: "center",
    fontSize: 40,
    fontFamily: "AdventPro-Medium",
  },
  proInfo: {
    justifyContent: "flex-start",
    alignSelf: "flex-start",
    flexDirection: "column",
    width: "65%",
    borderColor: "red",
  },

  welcome: {
    fontSize: 25,
    textAlign: "center",
    color: "white",
    //fontFamily:'AdventPro-Regular'
  },
  box: {
    width: "18%",
    height: "100%",
    borderColor: "blue",
  },
  box2: {
    alignItems: "center",
    //backgroundColor:'#EEF1F2',
    justifyContent: "flex-end",
    paddingBottom: "18%",
    width: "64%",
    height: "100%",
  },
});

exports.giveGift = giveGift;

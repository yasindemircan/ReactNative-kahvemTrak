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
import Accordian from "../components/Accordian/Accordian";

import { getDataFromLocalStorage } from "../helpers/getDataLocalStorage";
import { TokenResponse } from "../helpers/Response";
var querystring = require("query-string");

import moment from "moment";

global.Buffer = global.Buffer || require("buffer").Buffer;
function OrderHistory({ navigation }) {
  const [isStarted, setIsStarted] = useState(false);
  const [localData, setLocalData] = useState(null);

  useEffect(() => {
    getLocaldata();
  }, [isStarted]);
  const getLocaldata = async () => {
    const LOCALSTORAGE = await getDataFromLocalStorage();
    const RESPONSE = await TokenResponse(
      "api/user/order/old/",
      querystring.stringify({ token: LOCALSTORAGE.token })
    );
    if (RESPONSE.success) {
      setLocalData(RESPONSE.data);
    }
  };

  let statusCodes = {
    1: "Sipariş Alındı",
    2: "Hazırlanıyor",
    3: "Teslime Hazır",
    4: "Sipariş Tamamlandı",
    5: "Sipariş İptal Edildi",
  };

  const renderContent = (item) => {
    let content = item.content;
    let counts = item.counts;
    let infoCon = [];
    for (let i of content) {
      let id = i.publicId;
      infoCon.push(counts[id] + "x " + i.name);
    }
    return infoCon.join("\n");
  };

  const renderAccordians = (data) => {
    const items = [];
    for (let item of data) {
      items.push(
        <Accordian
          key={item.id}
          title={[
            moment(item.date).format("DD/MM/YYYY-HH:mm"),
            " \b \b ",
            " \n",
            statusCodes[item.status],
          ]}
          price={[item.total, " ₺"]}
          data={[
            "Sipariş ID: ",
            item.id,
            "\n",
            "Ürünler: \n",
            renderContent(item),
            "\n",
            item.status === 5 ? "\nİptal Nedeni : " + item.message : "",
          ]}
          price={[item.total, " ₺"]}
          color={item.status === 4 ? "green" : "red"}
          status={item.status}
        />
      );
    }
    return items;
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
            onPress={() => navigation.goBack()}
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
            <Text style={styles.welcome}>Önceki Siparişlerim</Text>
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
            {localData ? (
              renderAccordians(localData)
            ) : (
              <Text>Yukleniyor...</Text>
            )}
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
    flex: 2,
    // backgroundColor:'#EEF1F2',
    width: "100%",
    height: "100%",
  },

  top: {
    flexDirection: "row",
    width: "99%",
    height: "20%",
    //  borderWidth:1,
    borderColor: "green",
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
    //borderRadius:15,
  },
  box2: {
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: "15%",
    width: "64%",
    height: "100%",
  },
});

exports.OrderHistory = OrderHistory;

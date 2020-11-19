import {
  ToastAndroid,
  Text,
  View,
  Image,
  ImageBackground,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Picker } from "@react-native-picker/picker";

var querystring = require("query-string");

import { getDataFromLocalStorage } from "../helpers/getDataLocalStorage";
import { TokenResponse } from "../helpers/Response";

function cartPage({ navigation }) {
  const [selectedValue, setSelectedValue] = useState(0);
 
  const cart = useSelector((state) => state);
  const dispatch = useDispatch();

  let total = 0;

  const contextCreater = async (list) => {
    const content = [];
    await list.map((o) => {
      for (var i = 0; i < o.quantity; i++) {
        content.push(o.publicId);
      }
    });
    return content.join(",");
  };

  const complateOrder = async (all) => {
    let content = await contextCreater(all);

    if (getTotal() > 0) {
      const LOCALSTORAGE = await getDataFromLocalStorage();

      let token = LOCALSTORAGE.token;
      let location = "0,0";
      let delay = selectedValue;

      const tokenStrng = querystring.stringify({
        token,
        content,
        location,
        delay,
      });
      const ResponseNewOrder = await TokenResponse(
        "api/user/order/new",
        tokenStrng
      );
      if (ResponseNewOrder.success) {
        all.map((element) => {
          dispatch({ type: "REMOVE_FROM_CART_FOR_NEW", payload: element });
        });

        Alert.alert(
          "Yeni Sipariş Başarılı",
          "Siparişiniz başarılı bir şekilde bize ulaştı \nTeşekkür Ederiz..",
          [
            {
              text: "Harika, Anasayfaya Dön",
              onPress: () => navigation.push("Home"),
            },
          ],
          { cancelable: false }
        );
      } else {
        Alert.alert(
          "Hata",
          "Beklenmedik Bir Hata Oluştu Lütfen Sonra Tekrar Deneyin."
        );
      }
    }
   // Alert.alert("Hata", "Sepetiniz Boş");
  };

  const addTotal = (inp) => {
    total += parseFloat(inp);
  };

  const getTotal = () => {
    return String(total);
  };
  const ALL = [];
  const getCart = (basket) => {
    total = 0;
    let product = [];

    basket.forEach((element) => {
      addTotal(element.quantity * element.element.price);
      ALL.push({
        quantity: element.quantity,
        publicId: element.element.publicId,
      });

      product.push(
        <View key={element.element.publicId} style={styles.drinks}>
          <View style={styles.proInfo}>
            <Text style={styles.proName}>
              {" "}
              {element.quantity}x {element.element.name}
            </Text>
          </View>
          <Text style={styles.proPrice}>
            {element.quantity * element.element.price}TL
          </Text>
          <View style={styles.addBasketPar}>
            <TouchableOpacity
              onPress={() =>
                dispatch({ type: "REMOVE_FROM_CART", payload: element })
              }
              style={styles.addBasket}
            >
              <Text style={styles.add_text}>X</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    });

    return product;
  };

  return (
    <ImageBackground
      source={require("../../image/bc_dark.png")}
      style={styles.container}
    >
      <View style={styles.top}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.box}
        >
          <Image
            style={{ width: 50, height: 50, marginLeft: 10, marginTop: "20%" }}
            source={require("../../image/back.png")}
          ></Image>
        </TouchableOpacity>
        <View style={styles.MainView}>
          <StatusBar hidden={true} />

          <View style={styles.textParent}>
            <Text style={styles.MainText}>Sepet</Text>
          </View>
        </View>
        <View></View>
      </View>
      <View style={styles.Main}>
        <ScrollView style={styles.Scrool}>{getCart(cart)}</ScrollView>
        <View style={styles.alttakim}>
          <View style={styles.tamamla}>
            <Picker
              selectedValue={selectedValue}
              style={styles.dropdown}
              mode="dropdown"
              onValueChange={(itemValue, itemIndex) =>
                setSelectedValue(itemValue)
              }
            >
              <Picker.Item label="Hemen" value="0" />
              <Picker.Item label="15 Dakika Sonra" value="15" />
              <Picker.Item label="30 Dakika Sonra" value="30" />
              <Picker.Item label="45 Dakika Sonra" value="45" />
              <Picker.Item label="60 Dakika Sonra" value="60" />
            </Picker>
             
            <TouchableOpacity disabled = {getTotal() > 0 ? false:true}
              onPress={() => {
                complateOrder(ALL);
              }}
              style={styles.tamamlaButton}
            >
              <Text style={styles.totalText}>Toplam {getTotal()} TL</Text>
              <Text style={styles.tamamlaText}>Siparişi Tamamla</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>


    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    width: "80%",
    //  borderRadius:10,
  },
  tamamla: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#e0e5e7",
    width: "93%",

    borderRadius: 8,
  },
  tamamlaButton: {
    backgroundColor: "#84AA61",
    padding: 1,
    width: "95%",
    height: 70,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  tamamlaText: {
    padding: 5,
    fontSize: 20,
  },
  total: {
    padding: 8,
    borderRadius: 5,
    marginRight: 25,
    marginLeft: 25,
    alignItems: "flex-end",
    backgroundColor: "#e0e0e0",
  },
  totalText: {
    margin: 2,
    marginBottom: 2,
    fontSize: 15,
    //fontWeight:'600',
  },

  alttakim: {
    marginTop: 15,
  },
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  Scrool: {
    marginTop: 4,
  },
  top: {
    flexDirection: "row",
    alignItems: "flex-start",
    width: "100%",
    height: "18%",
  },
  MainView: {
    height: "100%",
    width: "64%",
  },
  textParent: {
    width: "64%",
    height: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
    alignSelf: "center",
    paddingBottom: "20%",
  },
  Main: {
    backgroundColor: "#ffffff",
    width: "95%",
    height: "80%",
    borderRadius: 20,
    marginBottom: "2%",
  },
  MainText: {
    fontSize: 30,
    alignItems: "center",
    textAlign: "center",
    color: "white",
  },
  drinks: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#e0e5e7",
    width: "95%",
    height: 40,
    borderRadius: 8,
    marginTop: "1%",
    margin: 9,
    padding: 6,
    paddingLeft: 10,
    paddingRight: 10,
    overflow: "visible",

    shadowColor: "#FFFF",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.9,
    elevation: 1,
  },

  proName: {
    fontSize: 16,
  },
  proPrice: {
    fontSize: 16,
    textAlign: "auto",
  },
  addBasket: {
    height: 30,
    width: 30,
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
    justifyContent: "flex-start",
  },
  add_text: {
    textAlign: "center",
    fontSize: 20,
    fontFamily: "AdventPro-Bold",
  },
  proInfo: {
    justifyContent: "flex-start",
    alignSelf: "flex-start",
    flexDirection: "column",
    width: "75%",
    borderColor: "red",
  },
});

exports.cartPage = cartPage;

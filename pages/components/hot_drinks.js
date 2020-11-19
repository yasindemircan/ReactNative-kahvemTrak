import {
  Text,
  View,
  ToastAndroid,
  Image,
  ImageBackground,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";

import { getDataFromLocalStorage } from "../helpers/getDataLocalStorage";
import { TokenResponse } from "../helpers/Response";
var querystring = require("query-string");
import { useSelector, useDispatch } from "react-redux";

const getItemCount=(cart) =>{
  let count = 0
  cart.map((item) => {
   count += (item.quantity)
  } )
  return count
}

const Hdrinks = ({ navigation }) => {
  const [isStarted, setIsStarted] = useState(false);
  const [localData, setLocalData] = useState(null);

  const dispatch = useDispatch();
  const cart = useSelector(state => state);

  useEffect(() => {
    getLocaldata();
  }, [isStarted]);
  const getLocaldata = async () => {
    const LOCALSTORAGE = await getDataFromLocalStorage();
    const RESPONSE = await TokenResponse(
      "api/user/order/products/all",
      querystring.stringify({ token: LOCALSTORAGE.token })
    );
    if (RESPONSE.success) {
      setLocalData(RESPONSE.data);
    }
  };
  const addBasketFunc = (element) => {
    dispatch({ type: "ADD_TO_CART", payload: { quantity: 1, element } });
    ToastAndroid.show(element.name + " sepete eklendi.", ToastAndroid.SHORT);
  };
  const getProduct = (data) => {
    let product = [];
    data.forEach((element) => {
      product.push(
        <View key={element.publicId} style={styles.drinks}>
          <View style={styles.proInfo}>
            <Text style={styles.proName}>{element.name}</Text>
            <Text style={styles.proPrice}>{element.price}TL</Text>
          </View>
          <View style={styles.addBasketPar}>
            <TouchableOpacity
              onPress={() => {
                addBasketFunc(element);
              }}
              style={styles.addBasket}
            >
              <Text style={styles.add_text}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    });

    return product;
  };

  // if (localData === null) {
  //   return (
  //     <View>
  //       <Text>Loading Data...</Text>
  //     </View>
  //   );
  // }
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
            <Text style={styles.welcome}>İçecekler</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("Cart")}
            style={styles.box3}
          >
          {getItemCount(cart) > 0 ? <Text style={{elevation:1,backgroundColor:'#468847',borderRadius:5,color:'white',padding:3,fontWeight:'bold'}}> {getItemCount(cart)} </Text>:null }  
            <Image
              style={{
                width: 45,
                height: 39,
                marginRight: 10,
                marginTop: "40%",
                margin: 25,
                position:"absolute",
      
              }}
              source={require("../../image/basket.png")}
             
            /> 
          
          </TouchableOpacity>
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
            {localData ? getProduct(localData):<Text>Yukleniyor..</Text>}

            <View style={{ height: 25 }}></View>
          </ScrollView>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Hdrinks;
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
    //borderRadius:12,
    //padding:18,
    //borderWidth:1,
    borderColor: "red",
  },

  drinks: {
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
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.9,
    elevation: 1,
  },
  top: {
    flexDirection: "row",
    width: "99%",
    height: "20%",
    //  borderWidth:1,
    borderColor: "green",
  },

  proName: {
    fontSize: 20,
  },
  proPrice: {
    fontSize: 17,
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
    fontSize: 50,
    color: "black",
    fontFamily: "AdventPro-Medium",
  },
  proInfo: {
    justifyContent: "flex-start",
    alignSelf: "flex-start",
    flexDirection: "column",
    width: "85%",
    borderColor: "red",
  },

  welcome: {
    fontSize: 25,
    textAlign: "center",
    color: "white",
    // fontFamily:'AdventPro-Regular'
  },

  box: {
    width: "18%",
    height: "100%",
    borderColor: "blue",
  },
  box2: {
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: "5%",
    paddingBottom: "0%",
    width: "64%",
    height: "100%",
  },
  box3: {
    alignItems: "center",
    height: "100%",
    width: "18%",
    
  },
});

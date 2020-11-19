import {
  Text,
  View,
  Image,
  ImageBackground,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import TextInputMask from "react-native-text-input-mask";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDataFromLocalStorage } from "../helpers/getDataLocalStorage";
import { TokenResponse } from "../helpers/Response";

var querystring = require("query-string");

function LoginMain({ navigation }) {
  const [isStarted, setIsStarted] = useState(false);
  const [ErrPhone, setErrPhone] = useState(true);
  const [ErrPass, setErrPass] = useState(true);
  const [Phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  let Key = "Storage_key_forLogin";
  useEffect(() => {
    getLocaldata();
  }, [isStarted]);
  const getLocaldata = async () => {
    const LOCALSTORAGE = await getDataFromLocalStorage();
    if (LOCALSTORAGE !== undefined && LOCALSTORAGE !== null) {
      navigation.navigate("Loading", { LOCALSTORAGE });
    }
  };

  const setObjectToLocalStorage = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      console.log("set local : ", jsonValue);
      await AsyncStorage.setItem(Key, jsonValue);
    } catch (e) {
      console.log("Kayıt hatasi: .", e);
    }
  };

  const getToken = async (data) => {
    return TokenResponse("gettoken/", querystring.stringify(data));
  };

  const loginButton = async () => {
    if (Phone !== "" && password !== "") {
      let data = {
        phone: Phone,
        password: password,
      };
      const Data = await getToken(data);
      if (Data.success) {
        setObjectToLocalStorage({ token: Data.token, name: Data.name });

        navigation.navigate("Loading");
      } else {
        Alert.alert(
          "Giriş Yapılamadı",
          "Lütfen Bilgilerinizi veya İnternet Baglantınızı Kontrol Ediniz."
        );
      }
    }
  };
  return (
    <ImageBackground
      source={require("../../image/bc_dark.png")}
      style={styles.container}
    >
      <ScrollView style={{ width: "100%" }}>
        <View style={styles.container}>
          <StatusBar hidden={true} />
          <View style={{ paddingBottom: 50 }}>
            <Image
              style={styles.logo}
              source={require("../../image/logo.png")}
            ></Image>
          </View>

          <View
            style={[styles.inputContainer, ErrPhone ? styles.inputErr : null]}
          >
            <Image
              style={styles.inputIcon}
              source={require("../../image/icons8-phone-50.png")}
            />
            <TextInputMask
              style={styles.inputs}
              placeholder="Telefon Numarası"
              maxLength={20}
              id="phone"
              keyboardType="numeric"
              underlineColorAndroid="transparent"
              onEndEditing={() =>
                Phone.length !== 10 ? setErrPhone(true) : setErrPhone(false)
              }
              onChangeText={(formatted, extracted) => {
                setPhone(extracted);
              }}
              mask={"([000]) [000]-[00]-[00]"}
            />
          </View>

          <View
            style={[styles.inputContainer, ErrPass ? styles.inputErr : null]}
          >
            <Image
              style={styles.inputIcon}
              source={require("../../image/icons8-unlock-52.png")}
            />
            <TextInput
              style={styles.inputs}
              placeholder="Parola"
              secureTextEntry={true}
              underlineColorAndroid="transparent"
              onChangeText={(text) => setPassword(text)}
              onEndEditing={() =>
                password.length < 6 ? setErrPass(true) : setErrPass(false)
              }
            />
          </View>

          <TouchableOpacity
            disabled={ErrPass || ErrPhone ? true : false}
            style={[
              styles.buttonContainer,
              styles.loginButton,
              { opacity: ErrPass || ErrPhone ? 0.6 : 1.0 },
            ]}
            onPress={() => {
              loginButton();
            }}
          >
            <Text style={styles.loginText}>Giriş Yap</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ForgetPassword");
            }}
          >
            <Text style={styles.text_padding}>Parolamı Unuttum</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Register");
            }}
          >
            <Text style={styles.text_padding}>Kayıt Ol</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  inputContainer: {
    backgroundColor: "rgba(255,255,255,0.6)",
    borderRadius: 30,
    width: "75%",
    height: 50,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    flex: 1,
    fontSize: 16,
  },
  inputIcon: {
    width: 25,
    height: 25,
    marginLeft: 15,
    justifyContent: "center",
    opacity: 0.6,
  },
  buttonContainer: {
    height: 52,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    width: "75%",
    borderRadius: 30,
    // borderWidth:2,
  },
  loginButton: {
    backgroundColor: "#84AA61",
  },
  loginText: {
    color: "black",
    fontSize: 16,
  },
  logo: {
    width: 220,
    height: 220,
    opacity: 0.8,
  },
  text_padding: {
    paddingTop: 20,
    fontSize: 16,
  },
  inputErr: {
    borderWidth: 1,
    borderColor: "red",
    borderStyle: "solid",
  },
});

exports.LoginMain = LoginMain;

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
import React from "react";

const fetch = require("node-fetch");
const Bluebird = require("bluebird");
var querystring = require("query-string");
const URL = "https:trakyam.xyz/";
fetch.Promise = Bluebird;

function Forget2Page({ navigation }) {
  let data = {
    kod: "",
    password: "",
  };

  const loginButton = () => {
    if (data.kod.length === 6 && data.password.length > 5) {
      let datas = {
        forgetid: data.kod,
        password: data.password,
      };

      fetch(URL + "forget/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: querystring.stringify(datas),
      })
        .then((response) => response.json())
        .then((jsondata) => {
          if (jsondata.success !== true) {
            Alert.alert("Hata", jsondata.message);
          } else {
            Alert.alert("Başarılı", jsondata.message);
            navigation.navigate("Login");
          }
        });
    } else {
      Alert.alert("Eksik Alan", "Tüm Alanları Doldurun.");
    }
  };

  const passControler = () => {
    if (data.password.length < 6) {
      Alert.alert(
        "Parola Hatası",
        "Parolanız 6 Karakterden Fazla olmalı, Lütfen Geçerli Bir Parola Giriniz."
      );
    }
  };

  const control = (text) => {
    if (text === "") {
      Alert.alert(
        "Bu Alan Boş Bırakılamaz",
        "Lütfen Cep Telefonunuza Gelen Dogrulama Kodunuzu Giriniz."
      );
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

          <View style={styles.inputContainer}>
            <Image
              style={styles.inputIcon}
              source={require("../../image/icons8-unlock-52.png")}
            />
            <TextInput
              style={styles.inputs}
              placeholder="Doğrulama Kodu"
              underlineColorAndroid="transparent"
              maxLength={6}
              onChangeText={(text) => (data.kod = text)}
              onEndEditing={() => control(data.kod)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Image
              style={styles.inputIcon}
              source={require("../../image/icons8-unlock-52.png")}
            />
            <TextInput
              style={styles.inputs}
              placeholder="Parola"
              secureTextEntry={true}
              underlineColorAndroid="transparent"
              onChangeText={(text) =>
                (data.password = text.length < 6 ? "" : text)
              }
              onEndEditing={() => passControler()}
            />
          </View>

          <TouchableOpacity
            style={[styles.buttonContainer, styles.loginButton]}
            onPress={() => {
              loginButton();
            }}
          >
            <Text style={styles.loginText}>Gönder</Text>
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
});

exports.Forget2Page = Forget2Page;

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
import React, { useState } from "react";
import TextInputMask from "react-native-text-input-mask";

import { TokenResponse } from "../helpers/Response";

var querystring = require("query-string");

function Register({ navigation }) {
  let data = {
    text: "",
    name: "",
    surname: "",
    tempName: "",
    password: "",
  };

  const nameControler = (name) => {
    let arr = data.tempName.split(" ");
    if (arr.length < 2) {
      Alert.alert(
        "İsim Hatası.",
        "Lütfen Adınızı ve Soyadınız ile Birlikte Giriniz."
      );
    } else {
      data.surname = arr[arr.length - 1];
      data.name = arr
        .splice(0, arr.length - 1)
        .toString()
        .replace(/[,]/gm, " ");
    }
  };

  const passControler = () => {
    if (data.password.length < 6) {
      Alert.alert("Parola Hatası", "Geçerli Parola Giriniz.");
    }
  };

  const registerButton = async () => {
    if (
      data.text !== "" &&
      data.name !== "" &&
      data.surname !== "" &&
      data.password !== ""
    ) {
      let datas = {
        name: data.name,
        surname: data.surname,
        phone: data.text,
        password: data.password,
      };
      const Response = await TokenResponse(
        "register/",
        querystring.stringify(datas)
      );
      if (Response.success) {
        Alert.alert(data.text, " Numarasına Doğrulama Kodu Gönderildi.");
        navigation.navigate("Verify");
      } else if (Response.code === 1000) {
        Alert.alert("Hata!", "Bu numara zaten kayıtlı.");
      } else {
        Alert.alert("Ooops!", "Bilinmeyen bir hata oluştu.");
      }
    } else {
      Alert.alert("Geçersiz Kayıt", "Lütfen Tüm Alanları Eksiksiz Doldurunuz.");
    }
  };

  const control = (text) => {
    if (text === "") {
      Alert.alert(
        "Geçersiz Telefon Numarası",
        "Telefonu numaranız geçersiz. Lütfen Kontrol edin."
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
              source={require("../../image/icons8-contact-48.png")}
            />
            <TextInput
              style={styles.inputs}
              placeholder="Adınız ve Soyadınız"
              underlineColorAndroid="transparent"
              keyboardType="default"
              onChangeText={(text) => (data.tempName = text)}
              onEndEditing={() => nameControler()}
            />
          </View>
          <View style={styles.inputContainer}>
            <Image
              style={styles.inputIcon}
              source={require("../../image/icons8-phone-50.png")}
            />
            <TextInputMask
              style={styles.inputs}
              placeholder="Telefon Numarası"
              maxLength={20}
              keyboardType="numeric"
              underlineColorAndroid="transparent"
              onEndEditing={() => control(data.text)}
              onChangeText={(formatted, extracted) => {
                data.text = extracted;
              }}
              mask={"([000]) [000]-[00]-[00]"}
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
              registerButton();
            }}
          >
            <Text style={styles.loginText}>Kayıt Ol</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            <Text style={styles.text_padding}>Giriş Yap</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Verify");
            }}
          >
            <Text style={styles.text_padding}>Hesabımı Doğrula</Text>
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
    //backgroundColor: '#DCDCDC',
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
    borderBottomColor: "#FFFFFF",
    flex: 1,
    fontSize: 16,
  },
  inputIcon: {
    width: 20,
    height: 20,
    marginLeft: 15,
    justifyContent: "center",
    opacity: 0.6,
  },
  buttonContainer: {
    height: 50,
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
    width: 200,
    height: 200,
    opacity: 0.8,
  },
  text_padding: {
    paddingTop: 20,
    fontSize: 16,
  },
});

exports.Register = Register;

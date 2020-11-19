import {
  Text,
  View,
  Image,
  ImageBackground,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Alert,
} from "react-native";
import React from "react";
import TextInputMask from "react-native-text-input-mask";
import { TokenResponse } from "../helpers/Response";

var querystring = require("query-string");

function ForgetPassword({ navigation }) {
  let data = {
    phoneNumber: "",
  };

  const verifybtn = async () => {
    if (data.phoneNumber !== "" && data.phoneNumber.length > 9) {
      let datas = {
        phone: data.phoneNumber,
      };
      const Response = await TokenResponse(
        "forget/",
        querystring.stringify(datas)
      );
      if (Response.success !== true) {
        Alert.alert("Hata", Response.message);
      } else {
        Alert.alert(
          "Başarılı",
          "Telefonuza Gelen Dogrulama Kodunu Girdikten Sonra Yeni Sifrenizi Belirleyin"
        );
        navigation.navigate("Forget2Page");
      }
    } else {
      Alert.alert(
        "Geçersiz Kayıt",
        "Lütfen Tüm Alanları Eksiksiz Doldurunuz." + data.phoneNumber.toString()
      );
    }
  };
  const control = (phoneNumber) => {
    if (phoneNumber === "" && phoneNumber.length < 9) {
      Alert.alert(
        "Telefon Numarasi Eksik",
        "Lütfen Telefon Numaranızı Eksiksiz Giriniz."
      );
    }
  };

  return (
    <ImageBackground
      source={require("../../image/bc_dark.png")}
      style={styles.container}
    >
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
            source={require("../../image/icons8-phone-50.png")}
          />
          <TextInputMask
            style={styles.inputs}
            placeholder="Telefon Numarası"
            maxLength={20}
            keyboardType="numeric"
            underlineColorAndroid="transparent"
            onEndEditing={() => control(data.phoneNumber)}
            onChangeText={(formatted, extracted) => {
              data.phoneNumber = extracted;
            }}
            mask={"([000]) [000]-[00]-[00]"}
          />
        </View>

        <TouchableOpacity
          style={[styles.buttonContainer, styles.loginButton]}
          onPress={() => {
            verifybtn();
          }}
        >
          <Text style={styles.loginText}>Kod iste</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Text style={{ paddingTop: 20, fontSize: 16 }}>
            Giriş Ekranına Dön
          </Text>
        </TouchableOpacity>
      </View>
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
    // borderBottomColor: '#F5FCFF',
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
    // borderBottomColor: '#FFFFFF',
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
    //backgroundColor: "#00b5ec",
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

exports.ForgetPassword = ForgetPassword;

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
} from "react-native";
import React from "react";
import { TokenResponse } from "../helpers/Response";

var querystring = require("query-string");

function Verify({ navigation }) {
  let data = {
    vcode: "",
  };

  const verifitybtn = async () => {
    if (data.vcode !== "" && data.vcode.length === 6) {
      let datas = {
        sms: data.vcode,
      };
      const Response = await TokenResponse(
        "verify/",
        querystring.stringify(datas)
      );
      if (Response.success !== true) {
        Alert.alert("Hata", Response.message);
      } else {
        Alert.alert(
          "Başarılı",
          "Doğrulama Başarılı Giriş Ekranına Yönlendiriliyorsunuz."
        );
        navigation.navigate("Login");
      }
    } else {
      Alert.alert(
        "Geçersiz Kayıt",
        "Lütfen Tüm Alanları Eksiksiz Doldurunuz." + data.vcode.toString()
      );
    }
  };
  const vcodecontrol = (vcode) => {
    if (vcode === "" && vcode.length < 6) {
      Alert.alert(
        "Doğrulama Hatası",
        "Doğrulama Kodu 6 Karakterden Oluşmalıdır."
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
            source={require("../../image/icons8-unlock-52.png")}
          />
          <TextInput
            style={styles.inputs}
            placeholder="Doğrulama Kodu"
            underlineColorAndroid="transparent"
            maxLength={6}
            onChangeText={(text) => (data.vcode = text)}
            onEndEditing={() => vcodecontrol(data.vcode)}
          />
        </View>

        <TouchableOpacity
          style={[styles.buttonContainer, styles.loginButton]}
          onPress={() => {
            verifitybtn();
          }}
        >
          <Text style={styles.loginText}>Doğrulama Yap</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Login");
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

exports.Verify = Verify;

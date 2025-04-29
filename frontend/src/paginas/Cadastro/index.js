import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TextInput, ScrollView, Button, Alert, TouchableOpacity, ActivityIndicator, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TextInputMask } from "react-native-masked-text";
import axios from "axios";


export default function Cadastro() {

  const navigation = useNavigation();
  const [registro, setRegistro] = useState({ nome: '', email: '', senha: '', cnpj: '', telefone: '' })
  const [confirm, setConfirm] = useState({ email: '', senha: '' })
  const [carregando, Carregando] = useState(false);

  if (carregando) {
    return <ActivityIndicator size="large" color="#0000ff" />
  }

  const handleSubmit = async () => {
    Carregando(true);
    for (let propriedade in registro) {
      if (registro.hasOwnProperty(propriedade)) {
        if (registro[propriedade] === null || registro[propriedade] === '') {
          Alert.alert(`O campo ${propriedade} é obrigatório.`);
          return
        }
        if (registro.email === confirm.email && registro.senha === confirm.senha) {
          await axios.post('https://pede-ja.onrender.com/cadastro', registro).then(function (resposta) {
            console.log(resposta.data);
            navigation.navigate('Login')
          }).catch(function (erro) {
            console.log(erro);
          });

          setRegistro({ nome: '', email: '', senha: '', cnpj: '', telefone: '' })
          setConfirm({ email: '', senha: '' })

        } else if (registro.email !== confirm.email) {
          Alert.alert('Emails não correspondem')
        } else {
          Alert.alert('Senhas não correspondem')
        }

      }
    }


    //Fim if
    Carregando(false);
  };

  return (
    <ScrollView style={{ backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <View style={styles.containerLogo}>
          <Text style={{ color: "#FFFFFF", fontSize: 36 }}>PEDE</Text>
          <Image source={require('../../assets/imagens/burger.png')} />
          <Text style={{ color: "#fff", fontSize: 36 }}>JÁ</Text>
        </View>
        <View style={styles.containerForm}>
          <Text style={styles.heading}>Cadastro</Text>
          <View style={styles.inputContainer}>
            <Image source={require("../../assets/imagens/FoodBar.png")} style={styles.icon} />
            <TextInput
              placeholder="Nome do Estabelecimento"
              style={styles.input}

              onChangeText={(text) => setRegistro({ ...registro, nome: text })}
            />
          </View>
          <View style={styles.inputContainer}>
            <Image source={require("../../assets/imagens/Letter.png")} style={styles.icon} />
            <TextInput
              placeholder="Email"
              style={styles.input}

              onChangeText={(text) => setRegistro({ ...registro, email: text })}
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputContainer}>
            <Image source={require("../../assets/imagens/Letter.png")} style={styles.icon} />
            <TextInput
              placeholder="Confirme o Email"
              onChangeText={(text) => setConfirm({ ...confirm, email: text })}
              style={styles.input}
            />
          </View>
          <View style={styles.inputContainer}>
            <Image source={require("../../assets/imagens/Documents.png")} style={styles.icon} />
            <TextInputMask
              type={'cnpj'}

              onChangeText={(text) => setRegistro({ ...registro, cnpj: text })}
              placeholder="CNPJ"
              style={styles.input}
            />
          </View>
          <View style={styles.inputContainer}>
            <Image source={require("../../assets/imagens/Lock.png")} style={styles.icon} />
            <TextInput
              placeholder="Senha"

              style={styles.input}
              onChangeText={(text) => setRegistro({ ...registro, senha: text })}

            />
          </View>
          <View style={styles.inputContainer}>
            <Image source={require("../../assets/imagens/Lock.png")} style={styles.icon} />
            <TextInput
              placeholder="Confirme a Senha"
              onChangeText={(text) => setConfirm({ ...confirm, senha: text })}

              style={styles.input}
            />
          </View>

          <View style={styles.inputContainer}>
            <Image source={require('../../assets/imagens/Phone.png')} style={styles.icon} />
            <TextInputMask
              style={styles.input}
              placeholder="telefone"
              onChangeText={(text) => setRegistro({ ...registro, telefone: text })}
              type="cel-phone"
              options={{
                maskType: "BRL",
                withDDD: true,
                dddMask: '(99) '
              }}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text>Cadastrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EA8841",
    ...Platform.select({
      android: {


      }
    })
  },
  containerLogo: {


    flexDirection: "row",
    width: '100%',
    marginTop: '7%',
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#EA8841',
    marginBottom: '7%',

    ...Platform.select({
      android: {
        width: "100%",
        marginTop: "15%",
        marginBottom: "0%",

      }
    })
  },
  containerForm: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,

    ...Platform.select({
      android: {
        paddingStart: "5%",
        paddingEnd: "5%",
        marginTop: "15%"

      }
    })
  },
  heading: {
    color: "#EA8841",
    fontSize: 40,
    textAlign: "center",
    marginTop: "5%",
    ...Platform.select({
      android: {

        marginTop: "10%"
      }
    })
  },
  inputContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    width: "30%",
    alignSelf: "center",
    marginTop: "1%",


    ...Platform.select({
      android: {
        width: "80%",
        marginLeft: "7%",
        marginTop: "10%",
        height: 50,

      }
    })
  },
  input: {
    marginLeft: "4%",
    height: 50,

    width: '90%'
  },
  icon: {
    height: 26,
    width: 25,
    marginTop: '2%',
    ...Platform.select({
      android: {

        height: "60%",
        width: '10%',
        marginTop: "3%",

      }
    })
  },
  button: {

    backgroundColor: "#EA8841",
    borderRadius: 50,
    width: "20%",
    marginTop: "2%",
    paddingVertical: 8,
    marginBottom: "1%",
    alignSelf: "center",

    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      android: {
        width: "60%",
        marginTop: "9%",
        paddingVertical: 8,
      }
    })


  },

});
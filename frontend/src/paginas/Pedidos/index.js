import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Modal,
  ActivityIndicator,
  Platform
} from "react-native";

export default function Pedidos({ route }) {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [visibleModal, setVisibleModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const { idR } = route.params;
  const [atualizarPedidos, setAtualizarPedidos] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [menu, setMenu] = useState(false)

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const listarPedidos = async () => {
    await axios.get(`https://pede-ja.onrender.com/${idR}/pedidos`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    listarPedidos();
    setAtualizarPedidos(false);
    setIsLoading(false);
  }, [atualizarPedidos]);

  const handleSelect = (pedido) => {
    setIsLoading(true);
    setSelectedItem(pedido);
    setVisibleModal(true);
    setIsLoading(false);
  };

  const handleOrderDone = async () => {
    const idP = parseInt(selectedItem.idPedido, 10);
    await axios.put(`https://pede-ja.onrender.com/${idR}/pedidos/${idP}`)
      .then(() => {
        setSelectedItem(null);
        setAtualizarPedidos(true);
        setVisibleModal(false)
      })
      .catch((error) => {
        console.error(error);
      });

  };

  const handleDeleteOrder = async () => {
    const idP = parseInt(selectedItem.idPedido, 10);
    await axios.delete(`https://pede-ja.onrender.com/${idR}/pedidos/${idP}`)
      .then(() => {
        setSelectedItem(null);
        setVisibleModal(false);
        setAtualizarPedidos(true);
      })
      .catch((error) => {
        console.error("Erro ao excluir pedido:", error);
      });
  };

  return (
    <View style={styles.container}>

      <View style={styles.containerLogo}>
        <Text style={{ color: "#FFFFFF", fontSize: 36 }}>PEDE</Text>
        <Image source={require('../../assets/imagens/burger.png')} />
        <Text style={{ color: "#fff", fontSize: 36 }}>JÁ</Text>

        <TouchableOpacity >
          <Text style={{
            fontSize: 24, color: '#ffffff', left: "1000%", ...Platform.select({
              android: {
                fontSize: 24,
                left: '300%'
              }
            })
          }} onPress={() => setMenu(true)}
          >☰</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={menu}
        transparent={true}
        onRequestClose={() => setMenu(false)}
      >

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{ backgroundColor: 'white', padding: 20, width: '80%', borderRadius: 25 }}>


            <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('Cardapio', { idR: idR }), setMenu(false) }}>
              <Text style={{ color: '#fff' }}>Cardapio</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
              <Text style={{ color: '#fff' }}>Sair da conta</Text>
            </TouchableOpacity>


            <TouchableOpacity onPress={() => {
              setMenu(!menu);
            }} style={styles.button}>
              <Text style={{ color: '#fff' }}>Fechar</Text>
            </TouchableOpacity>

          </View>
        </View>

      </Modal>

      <View style={styles.containerForm}>
        <View style={{ height: '97%', }}>
          <View style={{ alignItems: "flex-end", marginTop: 10, marginHorizontal: '25%', ...Platform.select({ android: { marginHorizontal: 15, } }) }}>
            <TouchableOpacity
              onPress={() => setAtualizarPedidos(true)}
              style={{ backgroundColor: "#EA8841", borderRadius: 10, width: 100, height: 25 }}>
              <Text style={{ color: 'white', textAlign: "center" }}>Atualizar</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={data}
            keyExtractor={(item) => item.idPedido.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleSelect(item)}>
                <ScrollView style={styles.flatList}>
                  <View style={{ flexDirection: "row" }}>

                    <View style={{ flex: 1, justifyContent: "center" }}>
                      <Text style={{ alignSelf: 'center', fontWeight: "bold", color: "#EA8841" }}>{`Pedido: n° ${item.numeroPedido}`}</Text>
                    </View>

                    <View style={{ flex: 1, justifyContent: "center" }}>
                      <Text style={{ alignSelf: 'center', fontWeight: "bold", color: "#EA8841" }}>{`Finalizado: ${item.finalizado}`}</Text>
                    </View>
                  </View>



                  <View style={{ flexDirection: "row", marginBottom: 5 }}>
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontWeight: "bold", color: "#EA8841" }}>Nome:</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                      <Text style={{ fontWeight: "bold", color: "#EA8841" }}>Qtd:</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                      <Text style={{ fontWeight: "bold", color: "#EA8841" }}>Observação:</Text>
                    </View>
                  </View>
                  <FlatList
                    data={item.pratos}
                    keyExtractor={(prato) => prato.nome}
                    renderItem={({ item: prato }) => (
                      <ScrollView>
                        <View style={{ flexDirection: "row", borderTopWidth: 1, width: '100%', marginBottom: 5, alignItems: "center" }}>
                          <View style={{ flex: 1 }}>
                            <Text>{prato.nome}</Text>
                          </View>
                          <View style={{ flex: 1, alignItems: 'center' }}>
                            <Text>{`x${prato.quantidade}`}</Text>
                          </View>
                          <View style={{ flex: 1, alignItems: 'flex-end' }}>
                            <Text>{prato.observacao}</Text>
                          </View>
                        </View>
                      </ScrollView>
                    )}
                  />
                </ScrollView>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        visible={visibleModal}
      >
        <View style={{ flex: 1 }}>
          {selectedItem && (

            <View style={{ flex: 1, borderWidth: 1, backgroundColor: 'white', padding: 20, borderRadius: 5, }}>

              <View style={{
                flexDirection: "row", marginBottom: 0, height: 55, borderWidth: 1, width: '70%', alignSelf: "center", ...Platform.select({
                  android: {
                    height: 55,
                    marginBottom: 0,
                    width: '95%'
                  }
                })
              }}>
                <View style={{ flex: 1, alignItems: "center" }}>
                  <Text style={{ fontWeight: "bold", color: "#EA8841", }}>{`Cliente: ${selectedItem.cliente}`}</Text>
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  <Text style={{ fontWeight: "bold", color: "#EA8841", }}>{`Telefone: ${selectedItem.telefone}`}</Text>
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  <Text style={{ fontWeight: "bold", color: "#EA8841", }}>{`Mesa: ${selectedItem.mesa}`}</Text>
                </View>
              </View>

              <View style={{
                flexDirection: "row", borderWidth: 0, marginBottom: 0, padding: 5, width: "70%", alignSelf: "center", ...Platform.select({
                  android: {
                    padding: 5,
                    marginBottom: 0,
                    width: '95%'
                  }
                })
              }}>
                <View style={{ flex: 1, alignItems: "center" }}>
                  <Text style={{ fontWeight: "bold", color: "#EA8841", }}>{`Pedido n°: ${selectedItem.numeroPedido}`}</Text>
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  <Text style={{ fontWeight: "bold", color: "#EA8841", }}>{`Finalizado: ${selectedItem.finalizado}`}</Text>
                </View>
              </View>

              <View style={{
                flexDirection: "row", marginBottom: 10, borderWidth: 0, padding: 3.6, width: '70%', alignSelf: "center", ...Platform.select({
                  android: {
                    marginBottom: 10,
                    padding: 3.6,
                    width: '95%'
                  }
                })
              }}>
                <View style={{ flex: 1, alignItems: "center" }}>
                  <Text style={{ fontWeight: "bold", color: "#EA8841" }}>Nome:</Text>
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  <Text style={{ fontWeight: "bold", color: "#EA8841" }}>Qtd:</Text>
                </View>
                <View style={{ flex: 1, alignItems: 'flex-start' }}>
                  <Text style={{ fontWeight: "bold", color: "#EA8841" }}>Valor:</Text>
                </View>
                <View style={{ flex: 1, alignItems: 'flex-start' }}>
                  <Text style={{ fontWeight: "bold", color: "#EA8841" }}>Observação:</Text>
                </View>
              </View>

              <View style={{
                flex: 2, borderWidth: 1, width: "70%", alignSelf: "center", ...Platform.select({
                  android: {
                    marginBottom: 10,
                    padding: 3.6,
                    width: '95%'
                  }
                })
              }}>
                <ScrollView>
                  {selectedItem.pratos.map((prato, index) => (
                    <View key={index} style={{ flexDirection: "row", borderBottomWidth: 1, width: '100%', marginBottom: 5, alignItems: "center" }}>
                      <View style={{ flex: 1, alignItems: 'center' }}>
                        <Text>{prato.nome}</Text>
                      </View>
                      <View style={{ flex: 1, alignItems: 'center' }}>
                        <Text>{`x${prato.quantidade}`}</Text>
                      </View>
                      <View style={{ flex: 1, alignItems: "flex-start" }}>
                        <Text>{`R$ ${(prato.valor * prato.quantidade).toFixed(2)}`}</Text>
                      </View>
                      <View style={{ flex: 1, alignItems: 'flex-start' }}>
                        <Text>{prato.observacao ? prato.observacao : 'N/A'}</Text>
                      </View>
                    </View>
                  ))}
                </ScrollView>
              </View>

              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: "bold", color: "#EA8841", marginTop: 10, marginLeft: "15%" }}>{`Valor Total: ${selectedItem.valorTotal}`}</Text>

                <TouchableOpacity style={styles.button} onPress={handleOrderDone}>
                  <Text>Pedido feito</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={handleDeleteOrder}>
                  <Text>Excluir Pedido</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => setVisibleModal(false)}>
                  <Text>Fechar </Text>
                </TouchableOpacity>
              </View>
            </View>

          )}
        </View>
      </Modal>

    </View>
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#EA8841',
    ...Platform.select({
      android: {
        marginTop: '5%',
        width: "100%",
      }
    })
  },
  containerForm: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    ...Platform.select({
      android: {
        paddingStart: "5%",
        paddingEnd: "5%",
        marginTop: "10%",
      }
    })
  },
  button: {
    backgroundColor: "#EA8841",
    borderRadius: 50,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    width: "15%",
    paddingVertical: 8,
    marginTop: '1%',
    ...Platform.select({
      android: {
        marginTop: 15,
        paddingVertical: 8,
        width: "60%",
      }
    })
  },

  flatList: {
    borderWidth: 1,
    alignSelf: "center",
    borderRadius: 15,
    marginTop: '3%',
    width: '40%',
    paddingHorizontal: '2%',
    ...Platform.select({
      android: {
        padding: 10,
        width: '100%',
        marginTop: '3%',
      }
    })
  }
});

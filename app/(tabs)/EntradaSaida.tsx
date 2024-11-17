import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView, StyleSheet, View, Text, ImageBackground, TextInput, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal'; // Importando o modal

// Importando as funções do ValueStore.ts
import { setEntrada, setSaida, getValueStore } from './ValueStore';

// Tela principal com os botões
const MainScreen = ({ navigation }: any) => {
  const image = { uri: 'https://img.freepik.com/fotos-gratis/fundo-abstrato-da-festa_23-2147718249.jpg' };

  // Estados para entrada
  const [cashValue, setCashValue] = useState<string>('');
  const [pixValue, setPixValue] = useState<string>('');
  const [debitCreditValue, setDebitCreditValue] = useState<string>('');

  // Estados para saída
  const [cashValueOut, setCashValueOut] = useState<string>('');
  const [pixValueOut, setPixValueOut] = useState<string>('');
  const [debitCreditValueOut, setDebitCreditValueOut] = useState<string>('');

  // Estados para data
  const [day, setDay] = useState<string>('01');
  const [month, setMonth] = useState<string>('01');
  const [year, setYear] = useState<string>('2024');

  // Estados para controle do modal
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [dateType, setDateType] = useState<'entrada' | 'saida'>('entrada'); // Tipo de data (entrada ou saída)

  // Função para exibir o modal
  const showModal = (type: 'entrada' | 'saida') => {
    setDateType(type);
    setIsModalVisible(true);
  };

  // Função para confirmar a data e armazenar os dados
  const handleConfirmDate = (selectedDay: string, selectedMonth: string, selectedYear: string) => {
    setDay(selectedDay);
    setMonth(selectedMonth);
    setYear(selectedYear);

    // Verificar qual tipo de dado estamos tratando (entrada ou saída)
    if (dateType === 'entrada') {
      setEntrada(cashValue, pixValue, debitCreditValue, selectedDay, selectedMonth, selectedYear);
    } else {
      setSaida(cashValueOut, pixValueOut, debitCreditValueOut, selectedDay, selectedMonth, selectedYear);
    }

    console.log(getValueStore()); // Para verificar no console os dados armazenados

    // Fechar o modal
    setIsModalVisible(false);
  };

  // Função para enviar os dados para o ValueStore
  const handleSubmit = () => {
    // Mostrar modal pedindo a data da entrada
    showModal('entrada');
  };

  const handleSubmitOut = () => {
    // Mostrar modal pedindo a data da saída
    showModal('saida');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.fullScreenImage}>
        <View style={styles.boxContainer}>
          <View style={styles.blackBox}>
            <Text style={styles.title}>ENTRADA</Text>

            {/* Campo Valor em Dinheiro - Entrada */}
            <Text style={styles.texto}>Valor em Dinheiro</Text>
            <TextInput
              style={styles.textInput}
              placeholder="100,00"
              placeholderTextColor="white"
              keyboardType="numeric"
              value={cashValue}
              onChangeText={setCashValue}
              textAlign="center"
            />

            {/* Campo Valor em PIX - Entrada */}
            <Text style={styles.texto}>Valor em PIX</Text>
            <TextInput
              style={styles.textInput}
              placeholder="100,00"
              placeholderTextColor="white"
              keyboardType="numeric"
              value={pixValue}
              onChangeText={setPixValue}
              textAlign="center"
            />

            {/* Campo Valor em Débito/Crédito - Entrada */}
            <Text style={styles.texto}>Valor em Débito/Crédito</Text>
            <TextInput
              style={styles.textInput}
              placeholder="100,00"
              placeholderTextColor="white"
              keyboardType="numeric"
              value={debitCreditValue}
              onChangeText={setDebitCreditValue}
              textAlign="center"
            />

            {/* Botão Enviar Entrada */}
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText1}>ENVIAR ENTRADA</Text>
            </TouchableOpacity>

            <Text style={styles.title2}>SAÍDA</Text>

            {/* Campo Valor em Dinheiro - Saída */}
            <Text style={styles.texto}>Valor em Dinheiro</Text>
            <TextInput
              style={styles.textInput}
              placeholder="100,00"
              placeholderTextColor="white"
              keyboardType="numeric"
              value={cashValueOut}
              onChangeText={setCashValueOut}
              textAlign="center"
            />

            {/* Campo Valor em PIX - Saída */}
            <Text style={styles.texto}>Valor em PIX</Text>
            <TextInput
              style={styles.textInput}
              placeholder="100,00"
              placeholderTextColor="white"
              keyboardType="numeric"
              value={pixValueOut}
              onChangeText={setPixValueOut}
              textAlign="center"
            />

            {/* Campo Valor em Débito/Crédito - Saída */}
            <Text style={styles.texto}>Valor em Débito/Crédito</Text>
            <TextInput
              style={styles.textInput}
              placeholder="100,00"
              placeholderTextColor="white"
              keyboardType="numeric"
              value={debitCreditValueOut}
              onChangeText={setDebitCreditValueOut}
              textAlign="center"
            />

            {/* Botão Enviar Saída */}
            <TouchableOpacity style={styles.button} onPress={handleSubmitOut}>
              <Text style={styles.buttonText1}>ENVIAR SAÍDA</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>

      {/* Modal para selecionar a data */}
      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Selecione a Data</Text>
          
          <TextInput
            style={styles.textInput}
            placeholder="Dia"
            placeholderTextColor="white"
            keyboardType="numeric"
            value={day}
            onChangeText={setDay}
            textAlign="center"
          />
          <TextInput
            style={styles.textInput}
            placeholder="Mês"
            placeholderTextColor="white"
            keyboardType="numeric"
            value={month}
            onChangeText={setMonth}
            textAlign="center"
          />
          <TextInput
            style={styles.textInput}
            placeholder="Ano"
            placeholderTextColor="white"
            keyboardType="numeric"
            value={year}
            onChangeText={setYear}
            textAlign="center"
          />

          <TouchableOpacity
            style={styles.button}
            onPress={() => handleConfirmDate(day, month, year)}
          >
            <Text style={styles.buttonText1}>CONFIRMAR</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => setIsModalVisible(false)}
          >
            <Text style={styles.buttonText1}>CANCELAR</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const Stack = createStackNavigator();

const App = () => {
  return (
    <Stack.Navigator initialRouteName="MainScreen">
      <Stack.Screen name="MainScreen" component={MainScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fullScreenImage: {
    ...StyleSheet.absoluteFillObject,
  },
  boxContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blackBox: {
    backgroundColor: 'black',
    borderRadius: 20,
    width: 351,
    height: 748,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  title2: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,
  },
  texto: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  textInput: {
    width: 223,
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    color: 'white',
    paddingLeft: 10,
    fontSize: 14,
    marginTop: 10,
  },
  button: {
    backgroundColor: '#6200ea',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginTop: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  buttonText1: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  datePicker: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  picker: {
    width: 80,
    height: 40,
    color: 'white',
  },
  modalContent: {
    backgroundColor: 'black',
    padding: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default App;

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView, StyleSheet, View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import TelaAgendamento from './TelaAgendamento';
import AgendaSemanal from './AgendaSemanal';
import AgendaMensal from './AgendaMensal';

// Tela principal com os botões
const MainScreen = ({ navigation }: any) => {
  const image = { uri: 'https://img.freepik.com/fotos-gratis/fundo-abstrato-da-festa_23-2147718249.jpg' };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.fullScreenImage}>
        <View style={styles.buttonContainer}>
            <Text style={styles.buttonText}>ENTRADA SAÍDA</Text>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const Stack = createStackNavigator();

const App = () => {
  return (
    
      <Stack.Navigator initialRouteName="MainScreen">
        <Stack.Screen name="MainScreen" component={MainScreen} options={{ headerShown: false }} />
        <Stack.Screen name="TelaAgendamento" component={TelaAgendamento} />
        <Stack.Screen name="AgendaSemanal" component={AgendaSemanal} />
        <Stack.Screen name="AgendaMensal" component={AgendaMensal} />
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
  buttonContainer: {
    flex: 1,
    justifyContent: 'center', // Centraliza verticalmente
    alignItems: 'center', // Centraliza horizontalmente
    gap: 60, // Espaçamento entre os botões
  },
  button: {
    backgroundColor: 'white', // Cor do botão
    borderRadius: 10, // Bordas arredondadas com raio de 10
    width: 167, // Largura do botão
    height: 50, // Altura do botão
    justifyContent: 'center', // Alinha o texto verticalmente
    alignItems: 'center', // Alinha o texto horizontalmente
  },
  buttonText: {
    color: 'black', // Cor do texto
    fontSize: 16, // Tamanho da fonte
    fontWeight: 'bold', // Peso da fonte
  },
});

export default App;

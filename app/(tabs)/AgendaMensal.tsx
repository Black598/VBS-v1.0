import React from 'react';
import { ImageBackground, StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';


const image: { uri: string } = { 
  uri: 'https://img.freepik.com/fotos-gratis/fundo-abstrato-da-festa_23-2147718249.jpg' 
};

const App: React.FC = () => (
  <SafeAreaProvider>
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <ImageBackground 
        source={image} 
        resizeMode="cover" 
        style={styles.fullScreenImage}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => Alert.alert('agendar clientes')}>
            <Text style={styles.buttonText}>AGENDAR CLIENTES</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => Alert.alert('agenda semanal')}>
            <Text style={styles.buttonText}>AGENDA SEMANAL</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => Alert.alert('agenda mensal')}>
            <Text style={styles.buttonText}>AGENDA MENSAL</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  </SafeAreaProvider>
);

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
    gap: 60, // Espaçamento entre os botões (ou use marginVertical nos botões individualmente)
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

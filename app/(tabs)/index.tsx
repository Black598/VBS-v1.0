import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { ImageBackground, StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';

import TelaCliente from './TelaCliente';
import TelaLucro from './TelaLucro';

const Stack = createNativeStackNavigator();

const image: { uri: string } = { 
  uri: 'https://img.freepik.com/vetores-gratis/premio-abstrato-preto-e-dourado-fundo-geometrico_1017-24783.jpg' 
};
const HomeScreen: React.FC = ({ navigation }: any) => (
<SafeAreaProvider>
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <ImageBackground 
        source={image} 
        resizeMode="cover" 
        style={styles.fullScreenImage}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => navigation.navigate('TelaCliente')}>
            <Text style={styles.buttonText}>CLIENTES</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => navigation.navigate('TelaLucro')}>
            <Text style={styles.buttonText}>LUCRO</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  </SafeAreaProvider>
  );

const App: React.FC = () => { return(
  
      <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    
)};

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

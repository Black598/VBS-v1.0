import React, { useState } from 'react';
import { ImageBackground, StyleSheet, View, Text, TextInput, Modal, TouchableOpacity } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';


const image: { uri: string } = { 
  uri: 'https://img.freepik.com/fotos-gratis/fundo-abstrato-da-festa_23-2147718249.jpg' 
};


const App: React.FC = () => {
  // Definindo os estados para o Dia, Mês e Ano
  const [day, setDay] = useState<string>('');
  const [month, setMonth] = useState<string>('');
  const [year, setYear] = useState<string>('');

  const [modalVisible, setModalVisible] = useState<boolean>(false); // Para controlar a visibilidade do Modal
  const [modalType, setModalType] = useState<string>(''); // Para saber qual modal abrir (Dia, Mês ou Ano)

  const openModal = (type: string) => {
    setModalType(type);
    setModalVisible(true);
  };

  const closeModal = () => setModalVisible(false);

  const handleDaySelect = (day: any) => {
    setDay(day.dateString); // Recebe a data no formato 'YYYY-MM-DD'
    closeModal();
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ImageBackground 
          source={image} 
          resizeMode="cover" 
          style={styles.fullScreenImage}>
          <View style={styles.boxContainer}>
            <View style={styles.blackBox}>
              <Text style={styles.title}>AGENDAR CLIENTES</Text>
              <Text style={styles.texto}>Nome do Cliente</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Digite o texto aqui"
              />
              <Text style={styles.texto2}>Data de Agendamento</Text>

              {/* Dia */}
              <TouchableOpacity onPress={() => openModal('day')}>
                <Text style={styles.texto}>Dia: {day || 'Selecione'}</Text>
              </TouchableOpacity>

              {/* Mês */}
              <TouchableOpacity onPress={() => openModal('month')}>
                <Text style={styles.texto}>Mês: {month || 'Selecione'}</Text>
              </TouchableOpacity>

              {/* Ano */}
              <TouchableOpacity onPress={() => openModal('year')}>
                <Text style={styles.texto}>Ano: {year || 'Selecione'}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Modal de Seleção para o Dia com Calendário */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={closeModal}>
            <View style={styles.modalBackground}>
              <View style={styles.modalContainer}>
                {modalType === 'day' && (
                  <>
                    <Text style={styles.modalTitle}>Selecione o Dia</Text>
                    
                  </>
                )}
                {/* Você pode adicionar outros modais para mês e ano aqui */}
                <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                  <Text style={styles.closeButtonText}>Fechar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </ImageBackground>
      </SafeAreaView>
    </SafeAreaProvider>
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
    justifyContent: 'center', // Centraliza verticalmente
    alignItems: 'center', // Centraliza horizontalmente
  },
  blackBox: {
    backgroundColor: 'black', // Cor de fundo preta
    borderRadius: 20, // Bordas arredondadas com raio de 20
    width: 351, // Largura de 351 pixels
    height: 628, // Altura de 628 pixels
    justifyContent: 'center', // Alinha os filhos (título e caixa de texto) verticalmente
    alignItems: 'center', // Centraliza horizontalmente
    padding: 20, // Espaçamento interno para não colar os elementos nas bordas
  },
  title: {
    color: 'white', // Cor do texto
    fontSize: 24, // Tamanho da fonte do título
    fontWeight: 'bold', // Peso da fonte
    marginBottom: 20, // Espaço entre o título e o campo de texto
  },
  texto: {
    color: 'white', // Cor do texto
    fontSize: 16, // Tamanho da fonte do título
    fontWeight: 'bold', // Peso da fonte
    marginBottom: 10, // Espaço entre o título e o campo de texto
  },
  texto2: {
    color: 'white', // Cor do texto
    fontSize: 16, // Tamanho da fonte do título
    fontWeight: 'bold', // Peso da fonte
    marginBottom: 20, // Espaço entre o título e o campo de texto
    marginTop: 20, // Espaço entre o campo de texto e o campo de cliente
  },
  textInput: {
    width: 223, // Largura da caixa de texto
    height: 30, // Altura da caixa de texto
    borderColor: 'white', // Cor da borda
    borderWidth: 1, // Espessura da borda
    borderRadius: 5, // Bordas arredondadas na caixa de texto
    color: 'white', // Cor do texto
    paddingLeft: 10, // Espaço interno à esquerda
    fontSize: 14, // Tamanho da fonte
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 350,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#ff5c5c',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default App;

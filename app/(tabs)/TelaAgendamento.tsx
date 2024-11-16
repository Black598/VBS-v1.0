import React, { useState } from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  TextInput,
  Modal,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const image: { uri: string } = {
  uri: 'https://img.freepik.com/fotos-gratis/fundo-abstrato-da-festa_23-2147718249.jpg',
};

const App: React.FC = () => {
  const [clientName, setClientName] = useState<string>('');
  const [day, setDay] = useState<string>('');
  const [month, setMonth] = useState<string>('');
  const [year, setYear] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalType, setModalType] = useState<string>('');
  const navigation = useNavigation();

  const openModal = (type: string) => {
    setModalType(type);
    setModalVisible(true);
  };

  const closeModal = () => setModalVisible(false);

  const handleSelection = (value: string) => {
    if (modalType === 'day') setDay(value);
    if (modalType === 'month') setMonth(value);
    if (modalType === 'year') setYear(value);
    closeModal();
  };

  const renderOptions = () => {
    let options: string[] = [];

    if (modalType === 'day') {
      options = Array.from({ length: 30 }, (_, i) => (i + 1).toString());
    } else if (modalType === 'month') {
      options = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
    } else if (modalType === 'year') {
      options = Array.from({ length: 7 }, (_, i) => (2024 + i).toString());
    }

    return options.map((value) => (
      <TouchableOpacity
        key={value}
        style={styles.option}
        onPress={() => handleSelection(value)}
      >
        <Text style={styles.optionText}>{value}</Text>
      </TouchableOpacity>
    ));
  };

  const handleSchedule = () => {
    if (!clientName || !day || !month || !year) {
      Alert.alert('Erro', 'Preencha todas as informações para agendar.');
      return;
    }

    Alert.alert('Agendado', `Cliente: ${clientName}\nData: ${day}/${month}/${year}`);
    // Aqui você pode salvar os dados no backend ou local storage
  };

  const handleViewAgenda = () => {
    navigation.navigate('AgendaSemanal' as never); // Navega para o arquivo AgendaSemanal.tsx
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={image}
          resizeMode="cover"
          style={styles.fullScreenImage}
        >
          <View style={styles.boxContainer}>
            <View style={styles.blackBox}>
              <Text style={styles.title}>AGENDAR CLIENTES</Text>
              <Text style={styles.texto}>Nome do Cliente</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Digite o nome aqui"
                placeholderTextColor="white"
                value={clientName}
                onChangeText={setClientName}
              />
              <Text style={styles.texto2}>Data de Agendamento</Text>

              {/* Botões para Dia, Mês e Ano lado a lado */}
              <View style={styles.row}>
                <TouchableOpacity onPress={() => openModal('day')} style={styles.dateButton}>
                  <Text style={styles.texto}>Dia: {day || 'Selecione'}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => openModal('month')} style={styles.dateButton}>
                  <Text style={styles.texto}>Mês: {month || 'Selecione'}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => openModal('year')} style={styles.dateButton}>
                  <Text style={styles.texto}>Ano: {year || 'Selecione'}</Text>
                </TouchableOpacity>
              </View>

              {/* Botões Agendar e Ver Agenda */}
              <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.actionButton} onPress={handleSchedule}>
                  <Text style={styles.buttonText}>Agendar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton} onPress={handleViewAgenda}>
                  <Text style={styles.buttonText}>Ver Agenda</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Modal */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={closeModal}
          >
            <View style={styles.modalBackground}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>
                  {modalType === 'day' && 'Selecione o Dia'}
                  {modalType === 'month' && 'Selecione o Mês'}
                  {modalType === 'year' && 'Selecione o Ano'}
                </Text>
                <ScrollView contentContainerStyle={styles.optionsContainer}>
                  {renderOptions()}
                </ScrollView>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  blackBox: {
    backgroundColor: 'black',
    borderRadius: 20,
    width: 351,
    height: 628,
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
  texto: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  texto2: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,
  },
  textInput: {
    width: 223,
    height: 30,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    color: 'white',
    paddingLeft: 10,
    fontSize: 14,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  dateButton: {
    flex: 1,
    marginHorizontal: 5,
    padding: 10,
    backgroundColor: '#333',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '100%',
    paddingHorizontal: 20,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 5,
    padding: 10,
    backgroundColor: '#007AFF',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
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
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  option: {
    width: 50,
    height: 50,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  optionText: {
    fontSize: 16,
    color: 'black',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#ff5c5c',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default App;

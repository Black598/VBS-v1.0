import React, { useState, useEffect } from 'react';
import { ImageBackground, StyleSheet, View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import DataStore from './DataStore'; // Simula um banco de dados local

const image: { uri: string } = {
  uri: 'https://img.freepik.com/fotos-gratis/fundo-abstrato-da-festa_23-2147718249.jpg',
};

const months = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
];

const App: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null); // Mês selecionado
  const [schedules, setSchedules] = useState(DataStore.getSchedules()); // Estado local dos agendamentos

  // Função para excluir um agendamento
  const deleteSchedule = (id: number) => {
    Alert.alert(
      'Confirmação',
      'Você tem certeza que deseja excluir este agendamento?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            DataStore.deleteSchedule(id); // Remove do DataStore
            // Atualiza o estado local
            setSchedules(DataStore.getSchedules());
          },
        },
      ]
    );
  };

  // Filtra os agendamentos pelo mês selecionado
  const filteredSchedules = selectedMonth !== null
    ? schedules.filter(schedule => Number(schedule.month) === selectedMonth + 1)
    : [];

  // Função para atualizar os agendamentos
  const updateSchedules = () => {
    setSchedules(DataStore.getSchedules());
  };

  // useEffect para adicionar o listener que atualiza os agendamentos quando o DataStore mudar
  useEffect(() => {
    // Adiciona o listener para atualizações
    DataStore.addListener(updateSchedules);

    // Limpa o listener quando o componente for desmontado
    return () => {
      DataStore.addListener(() => {}); // Remove o listener
    };
  }, []); // Executa apenas uma vez quando o componente for montado

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['left', 'right']}>
        <ImageBackground source={image} resizeMode="cover" style={styles.fullScreenImage}>
          <View style={styles.buttonContainer}>
            <Text style={styles.title}>Selecione um Mês</Text>
            <ScrollView horizontal style={styles.monthSelector}>
              {months.map((month, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.monthButton, selectedMonth === index && styles.selectedMonthButton]}
                  onPress={() => setSelectedMonth(index)}
                >
                  <Text
                    style={[styles.monthButtonText, selectedMonth === index && styles.selectedMonthButtonText]}
                  >
                    {month}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={styles.scheduleContainer}>
            <Text style={styles.subtitle}>
              {selectedMonth !== null ? `Agendamentos para ${months[selectedMonth]}` : 'Selecione um mês'}
            </Text>
            <ScrollView>
              {filteredSchedules.length > 0 ? (
                filteredSchedules.map((schedule) => (
                  <View key={schedule.id} style={styles.scheduleItem}>
                    <Text style={styles.text}>Cliente: {schedule.clientName}</Text>
                    <Text style={styles.text}>
                      Data: {schedule.day}/{schedule.month}/{schedule.year}
                    </Text>
                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => deleteSchedule(schedule.id)}
                    >
                      <Text style={styles.deleteButtonText}>Excluir</Text>
                    </TouchableOpacity>
                  </View>
                ))
              ) : (
                <Text style={styles.text}>
                  {selectedMonth !== null
                    ? 'Nenhum agendamento para este mês'
                    : 'Nenhum mês selecionado'}
                </Text>
              )}
            </ScrollView>
          </View>
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
  buttonContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  monthSelector: {
    flexDirection: 'row',
  },
  monthButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  selectedMonthButton: {
    backgroundColor: '#007BFF',
  },
  monthButtonText: {
    fontSize: 16,
    color: 'black',
  },
  selectedMonthButtonText: {
    color: 'white',
  },
  scheduleContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  scheduleItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: 'black',
  },
  deleteButton: {
    marginTop: 10,
    backgroundColor: '#FF6347',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default App;

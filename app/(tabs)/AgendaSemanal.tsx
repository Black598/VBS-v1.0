import React, { useState } from 'react';
import { ImageBackground, StyleSheet, View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import DataStore from './DataStore'; // Importando o DataStore

const image: { uri: string } = {
  uri: 'https://img.freepik.com/fotos-gratis/fundo-abstrato-da-festa_23-2147718249.jpg',
};

const AgendaSemanal: React.FC = () => {
  // Obtém o mês atual (1 para janeiro, 12 para dezembro)
  const currentMonth = new Date().getMonth() + 1;

  // Filtra os agendamentos para o mês atual
  const [schedules, setSchedules] = useState(
    DataStore.getSchedules().filter(schedule => parseInt(schedule.month) === currentMonth)
  );

  // Função para excluir um agendamento
  const handleDelete = (index: number) => {
    Alert.alert(
      'Excluir Agendamento',
      'Tem certeza que deseja excluir este agendamento?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            DataStore.deleteSchedule(index); // Remove do DataStore
            setSchedules(
              DataStore.getSchedules().filter(schedule => parseInt(schedule.month) === currentMonth)
            ); // Atualiza o estado local apenas para o mês atual
          },
        },
      ]
    );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['left', 'right']}>
        <ImageBackground source={image} resizeMode="cover" style={styles.fullScreenImage}>
          <View style={styles.scheduleContainer}>
            <Text style={styles.title}>Agenda Semanal</Text>
            <ScrollView>
              {schedules.length > 0 ? (
                schedules.map((schedule, index) => (
                  <View key={index} style={styles.scheduleItem}>
                    <View style={styles.scheduleTextContainer}>
                      <Text style={styles.text}>Cliente: {schedule.clientName}</Text>
                      <Text style={styles.text}>
                        Data: {schedule.day}/{schedule.month}/{schedule.year}
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => handleDelete(index)}
                    >
                      <Text style={styles.deleteButtonText}>Excluir</Text>
                    </TouchableOpacity>
                  </View>
                ))
              ) : (
                <Text style={styles.text}>Nenhum agendamento disponível para este mês</Text>
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
  scheduleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  scheduleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 351,
    height: 70,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    marginBottom: 15,
  },
  scheduleTextContainer: {
    flex: 1,
  },
  text: {
    fontSize: 16,
    color: 'black',
  },
  deleteButton: {
    backgroundColor: '#ff5c5c',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default AgendaSemanal;

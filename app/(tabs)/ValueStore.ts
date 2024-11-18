import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type WeekKeys = 'week1' | 'week2' | 'week3' | 'week4';

// Definindo o tipo mais específico para entrada e saída
export interface ValueStoreData {
  entrada: {
    [key: string]: {
      [dayKey: string]: Record<WeekKeys, number>; // Garantindo que cada dia tenha as chaves week1, week2, week3, week4
    };
  };
  saida: {
    [key: string]: {
      [dayKey: string]: Record<WeekKeys, number>; // O mesmo para saída
    };
  };
}

let valueStore: ValueStoreData = {
  entrada: {},
  saida: {},
};

// Função para determinar a semana do mês
const getWeekOfMonth = (day: number): number => {
  if (day <= 7) return 1;
  if (day <= 14) return 2;
  if (day <= 21) return 3;
  return 4;
};

// Função para salvar dados no AsyncStorage
const saveToAsyncStorage = async () => {
  try {
    await AsyncStorage.setItem('valueStore', JSON.stringify(valueStore)); // Salva no AsyncStorage
  } catch (error) {
    console.error('Erro ao salvar dados no AsyncStorage:', error);
  }
};

// Função para carregar dados do AsyncStorage
const loadFromAsyncStorage = async () => {
  try {
    const storedData = await AsyncStorage.getItem('valueStore');
    if (storedData) {
      valueStore = JSON.parse(storedData); // Carrega os dados armazenados no AsyncStorage
    }
  } catch (error) {
    console.error('Erro ao carregar dados do AsyncStorage:', error);
  }
};

// Funções para salvar dados de entrada
export const setEntrada = async (cash: string, pix: string, debitCredit: string, day: string, month: string, year: string) => {
  const week = getWeekOfMonth(parseInt(day));
  const key = `${year}-${month}`;
  const dayKey = `${day}-${month}-${year}`;

  if (!valueStore.entrada[key]) {
    valueStore.entrada[key] = {};
  }

  if (!valueStore.entrada[key][dayKey]) {
    // Garantir que o valor de cada dia tenha as chaves semanais corretamente tipadas
    valueStore.entrada[key][dayKey] = { week1: 0, week2: 0, week3: 0, week4: 0 };
  }

  const weekKey: WeekKeys = `week${week}` as WeekKeys; // Assegurando que a semana é uma chave válida

  // Adiciona o valor atual ao valor existente
  valueStore.entrada[key][dayKey][weekKey] += parseFloat(cash) + parseFloat(pix) + parseFloat(debitCredit);

  // Salva os dados no AsyncStorage
  await saveToAsyncStorage();
};

// Funções para salvar dados de saída
export const setSaida = async (cash: string, pix: string, debitCredit: string, day: string, month: string, year: string) => {
  const week = getWeekOfMonth(parseInt(day));
  const key = `${year}-${month}`;
  const dayKey = `${day}-${month}-${year}`;

  if (!valueStore.saida[key]) {
    valueStore.saida[key] = {};
  }

  if (!valueStore.saida[key][dayKey]) {
    // Garantir que o valor de cada dia tenha as chaves semanais corretamente tipadas
    valueStore.saida[key][dayKey] = { week1: 0, week2: 0, week3: 0, week4: 0 };
  }

  const weekKey: WeekKeys = `week${week}` as WeekKeys; // Assegurando que a semana é uma chave válida

  // Adiciona o valor atual ao valor existente
  valueStore.saida[key][dayKey][weekKey] += parseFloat(cash) + parseFloat(pix) + parseFloat(debitCredit);

  // Salva os dados no AsyncStorage
  await saveToAsyncStorage();
};

export default valueStore;

// Função para carregar os dados quando o aplicativo for iniciado
export const initializeValueStore = async () => {
  await loadFromAsyncStorage(); // Carrega os dados armazenados
};

export const getValueStore = () => valueStore;

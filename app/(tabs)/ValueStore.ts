// valueStore.ts
import React from 'react';

type WeekKeys = 'week1' | 'week2' | 'week3' | 'week4';

export interface ValueStoreData {
  entrada: {
    [key: string]: {
      [key: string]: {
        [key in WeekKeys]: number;
      };
    };
  };
  saida: {
    [key: string]: {
      [key: string]: {
        [key in WeekKeys]: number;
      };
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

// Funções para salvar dados de entrada
export const setEntrada = (cash: string, pix: string, debitCredit: string, day: string, month: string, year: string) => {
  const week = getWeekOfMonth(parseInt(day));
  const key = `${year}-${month}`;
  const dayKey = `${day}-${month}-${year}`;

  if (!valueStore.entrada[key]) {
    valueStore.entrada[key] = {};
  }

  if (!valueStore.entrada[key][dayKey]) {
    valueStore.entrada[key][dayKey] = { week1: 0, week2: 0, week3: 0, week4: 0 };
  }

  const weekKey: WeekKeys = `week${week}` as WeekKeys;

  // Adiciona o valor atual ao valor existente
  valueStore.entrada[key][dayKey][weekKey] += parseFloat(cash) + parseFloat(pix) + parseFloat(debitCredit);
};

// Funções para salvar dados de saída
export const setSaida = (cash: string, pix: string, debitCredit: string, day: string, month: string, year: string) => {
  const week = getWeekOfMonth(parseInt(day));
  const key = `${year}-${month}`;
  const dayKey = `${day}-${month}-${year}`;

  if (!valueStore.saida[key]) {
    valueStore.saida[key] = {};
  }

  if (!valueStore.saida[key][dayKey]) {
    valueStore.saida[key][dayKey] = { week1: 0, week2: 0, week3: 0, week4: 0 };
  }

  const weekKey: WeekKeys = `week${week}` as WeekKeys;

  // Adiciona o valor atual ao valor existente
  valueStore.saida[key][dayKey][weekKey] += parseFloat(cash) + parseFloat(pix) + parseFloat(debitCredit);
};

export default valueStore;

export const getValueStore = () => valueStore;

import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Text, FlatList } from 'react-native';
import { getValueStore } from './ValueStore';

const calculateYearlyProfits = () => {
  const { entrada, saida } = getValueStore();

  const yearlyProfits: Record<string, number> = {}; // Lucros anuais
  const monthlyProfits: Record<string, number[]> = {}; // Lucros mensais por ano

  // Iterando sobre cada chave (ano-mês) de entrada
  Object.keys(entrada).forEach((key) => {
    const [year, month] = key.split('-');
    const monthlyEntrada = entrada[key];
    const monthlySaida = saida[key] || {}; 

    // Inicializa os lucros do ano e do mês
    if (!yearlyProfits[year]) yearlyProfits[year] = 0;
    if (!monthlyProfits[year]) monthlyProfits[year] = new Array(12).fill(0);

    // Iterando sobre os dias do mês
    Object.keys(monthlyEntrada).forEach((dayKey) => {
      const weeklyEntrada = monthlyEntrada[dayKey]; // Agora, temos as semanas corretamente indexadas
      const weeklySaida = monthlySaida[dayKey] || {}; 

      // Iterando sobre as semanas
      Object.keys(weeklyEntrada).forEach((weekKey) => {
        const weekKeyTyped = weekKey as keyof typeof weeklyEntrada; // Garantindo que weekKey é um WeekKeys
        const totalEntrada = weeklyEntrada[weekKeyTyped];
        const totalSaida = weeklySaida[weekKeyTyped] || 0;
        const lucro = totalEntrada - totalSaida;

        // Acumula o lucro no mês (baseado no índice da semana)
        const monthIndex = parseInt(month) - 1;
        monthlyProfits[year][monthIndex] += lucro;
      });
    });

    // Soma os lucros do ano
    yearlyProfits[year] += monthlyProfits[year][parseInt(month) - 1];
  });

  return { yearlyProfits, monthlyProfits };
};

const LucroAnual = () => {
  const [yearlyProfits, setYearlyProfits] = useState<Record<string, number>>({});
  const [monthlyProfits, setMonthlyProfits] = useState<Record<string, number[]>>({});

  useEffect(() => {
    // Sempre que a página for carregada, ou quando os dados mudarem, recalcular os lucros
    const { yearlyProfits, monthlyProfits } = calculateYearlyProfits();
    setYearlyProfits(yearlyProfits);
    setMonthlyProfits(monthlyProfits);
  }, []); // Array de dependências vazio significa que vai rodar uma vez, no momento do carregamento do componente

  const currentYear = new Date().getFullYear().toString();

  // Dados para o gráfico de barras
  const monthlyLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // Verifica se existe lucro para o ano atual
  const monthlyData = monthlyProfits[currentYear] || new Array(12).fill(0);

  // Garantir que o lucro do ano atual não seja undefined
  const currentYearProfit = yearlyProfits[currentYear] || 0;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Lucros Anuais e Mensais</Text>
        
        {/* Exibe lucro do ano atual */}
        <Text style={styles.yearlyProfitText}>
          Lucro do ano {currentYear}: R$ {currentYearProfit.toFixed(2)}
        </Text>

        {/* Listagem de lucros mensais */}
        <FlatList
          data={Object.entries(yearlyProfits)}
          keyExtractor={(item, index) => `year-${index}`}
          renderItem={({ item }) => {
            const [year, profit] = item;
            return (
              <View style={styles.monthContainer}>
                <Text style={styles.monthTitle}>Ano: {year}</Text>
                <Text style={styles.weekText}>Lucro Total: R$ {profit.toFixed(2)}</Text>
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  yearlyProfitText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  monthContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
  },
  monthTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  weekText: {
    fontSize: 16,
    marginVertical: 5,
  },
});

export default LucroAnual;

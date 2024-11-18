import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView, StyleSheet, View, Text, ImageBackground, FlatList } from 'react-native';
import { getValueStore } from './ValueStore';

// Função para calcular lucros semanais
const calculateWeeklyProfits = () => {
  const valueStore = getValueStore();
  const { entrada, saida } = valueStore;

  const profits: Record<string, { week: number; lucro: number }[]> = {};

  Object.keys(entrada).forEach((key) => {
    const monthlyEntrada = entrada[key];
    const monthlySaida = saida[key] || {}; // Pode não haver saída para alguns meses

    if (!profits[key]) {
      profits[key] = [];
    }

    // Calcula lucro para cada semana
    for (let week = 1; week <= 4; week++) {
      const weekKey = `week${week}` as keyof typeof monthlyEntrada[string];

      let totalEntrada = 0;
      let totalSaida = 0;

      Object.keys(monthlyEntrada).forEach((dayKey) => {
        totalEntrada += monthlyEntrada[dayKey][weekKey] || 0;
      });

      Object.keys(monthlySaida).forEach((dayKey) => {
        totalSaida += monthlySaida[dayKey][weekKey] || 0;
      });

      const lucro = totalEntrada - totalSaida;

      if (lucro !== 0) {
        profits[key].push({ week, lucro });
      }
    }
  });

  return profits;
};

// Função para converter "YYYY-MM" para "Mês Ano"
const getMonthYearName = (monthYear: string) => {
  const [year, month] = monthYear.split('-');
  const date = new Date(parseInt(year), parseInt(month) - 1); // Meses em JS vão de 0-11
  return date.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
};

const MainScreen = () => {
  const image = { uri: 'https://img.freepik.com/fotos-gratis/fundo-abstrato-da-festa_23-2147718249.jpg' };
  const profits = calculateWeeklyProfits();

  // Ordena os meses em ordem crescente
  const sortedProfits = Object.entries(profits).sort((a, b) => {
    const [yearA, monthA] = a[0].split('-');
    const [yearB, monthB] = b[0].split('-');

    // Compara o ano e o mês
    if (yearA === yearB) {
      return parseInt(monthA) - parseInt(monthB);
    }
    return parseInt(yearA) - parseInt(yearB);
  });

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.fullScreenImage}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Lucros Semanais</Text>
          <FlatList
            data={sortedProfits} // Usa os dados ordenados
            keyExtractor={(item, index) => `month-${index}`}
            renderItem={({ item }) => {
              const [monthYear, weeks] = item;
              return (
                <View style={styles.monthContainer}>
                  {/* Exibir Mês e Ano formatado */}
                  <Text style={styles.monthTitle}>{getMonthYearName(monthYear)}</Text>
                  {weeks.map((weekData, index) => (
                    <Text key={index} style={styles.weekText}>
                      Semana {weekData.week}: R$ {weekData.lucro.toFixed(2)}
                    </Text>
                  ))}
                </View>
              );
            }}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const Stack = createStackNavigator();

const App = () => (

    <Stack.Navigator initialRouteName="MainScreen">
      <Stack.Screen name="MainScreen" component={MainScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
 
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fullScreenImage: {
    ...StyleSheet.absoluteFillObject,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
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

export default App;

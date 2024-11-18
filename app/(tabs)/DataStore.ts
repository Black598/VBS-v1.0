import AsyncStorage from '@react-native-async-storage/async-storage';

export type Schedule = {
  id: number;
  clientName: string;
  day: string;
  month: string;
  year: string;
};

class DataStore {
  private schedules: Schedule[] = [];
  private listeners: Function[] = [];

  // Adiciona um listener para notificações de mudanças no dataStore
  addListener(listener: Function) {
    this.listeners.push(listener);
  }

  // Notifica todos os listeners após uma mudança
  private notifyListeners() {
    this.listeners.forEach(listener => listener());
  }

  // Função para carregar os agendamentos do AsyncStorage
  private async loadSchedulesFromStorage() {
    try {
      const storedSchedules = await AsyncStorage.getItem('schedules');
      if (storedSchedules) {
        this.schedules = JSON.parse(storedSchedules); // Carrega os dados do AsyncStorage
      }
    } catch (error) {
      console.error('Erro ao carregar os agendamentos do AsyncStorage:', error);
    }
  }

  // Função para salvar os agendamentos no AsyncStorage
  private async saveSchedulesToStorage() {
    try {
      await AsyncStorage.setItem('schedules', JSON.stringify(this.schedules)); // Salva os agendamentos no AsyncStorage
    } catch (error) {
      console.error('Erro ao salvar os agendamentos no AsyncStorage:', error);
    }
  }

  // Função para adicionar um novo agendamento
  async addSchedule(schedule: Omit<Schedule, 'id'>) {
    const id = this.schedules.length > 0 ? Math.max(...this.schedules.map(s => s.id)) + 1 : 1;
    this.schedules.push({ ...schedule, id });
    await this.saveSchedulesToStorage(); // Salva os agendamentos após a adição
    this.notifyListeners(); // Notifica os listeners sobre a mudança
  }

  // Função para retornar todos os agendamentos
  getSchedules() {
    return this.schedules;
  }

  // Função para excluir um agendamento por ID
  async deleteSchedule(id: number) {
    this.schedules = this.schedules.filter(schedule => schedule.id !== id);
    await this.saveSchedulesToStorage(); // Salva após a exclusão
    this.notifyListeners(); // Notifica os listeners sobre a mudança
  }

  // Função para limpar todos os agendamentos
  async clearSchedules() {
    this.schedules = [];
    await this.saveSchedulesToStorage(); // Salva após limpar
    this.notifyListeners(); // Notifica os listeners sobre a mudança
  }

  // Função para inicializar o DataStore, carregando os dados do AsyncStorage
  async initialize() {
    await this.loadSchedulesFromStorage();
  }
}

const dataStoreInstance = new DataStore();

// Inicializa o DataStore ao iniciar o app
dataStoreInstance.initialize().catch(error => console.error('Erro ao inicializar DataStore:', error));

export default dataStoreInstance;

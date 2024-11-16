// DataStore.ts
export type Schedule = {
    id: number;  // Adicionando o campo 'id'
    clientName: string;
    day: string;
    month: string;
    year: string;
  };
  
  class DataStore {
    private schedules: Schedule[] = []; // Armazena os agendamentos
    private listeners: Function[] = []; // Lista de funções a serem chamadas quando os dados mudam
  
    // Adiciona um ouvinte (listener) que será notificado quando os dados mudarem
    addListener(listener: Function) {
      this.listeners.push(listener);
    }
  
    // Notifica todos os ouvintes sobre a mudança
    private notifyListeners() {
      this.listeners.forEach(listener => listener());
    }
  
    // Método para adicionar um agendamento
    addSchedule(schedule: Omit<Schedule, 'id'>) {
      const id = this.schedules.length > 0 ? Math.max(...this.schedules.map(s => s.id)) + 1 : 1;
      this.schedules.push({ ...schedule, id });
      this.notifyListeners(); // Notifica os ouvintes sobre a mudança
    }
  
    // Método para obter todos os agendamentos
    getSchedules() {
      return this.schedules;
    }
  
    // Método para excluir um agendamento
    deleteSchedule(id: number) {
      this.schedules = this.schedules.filter(schedule => schedule.id !== id);
      this.notifyListeners(); // Notifica os ouvintes sobre a mudança
    }
  
    // Método para limpar todos os agendamentos
    clearSchedules() {
      this.schedules = [];
      this.notifyListeners(); // Notifica os ouvintes sobre a mudança
    }
  }
  
  const dataStoreInstance = new DataStore();
  
  // Preenche com alguns agendamentos de exemplo
  dataStoreInstance.addSchedule({ clientName: 'Cliente 1', day: '15', month: '3', year: '2024' });
  dataStoreInstance.addSchedule({ clientName: 'Cliente 2', day: '20', month: '3', year: '2024' });
  
  export default dataStoreInstance;
  
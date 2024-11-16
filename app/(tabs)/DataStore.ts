// DataStore.ts
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
  
    addListener(listener: Function) {
      this.listeners.push(listener);
    }
  
    private notifyListeners() {
      this.listeners.forEach(listener => listener());
    }
  
    addSchedule(schedule: Omit<Schedule, 'id'>) {
      const id = this.schedules.length > 0 ? Math.max(...this.schedules.map(s => s.id)) + 1 : 1;
      this.schedules.push({ ...schedule, id });
      this.notifyListeners();
    }
  
    getSchedules() {
      return this.schedules;
    }
  
    deleteSchedule(id: number) {
      this.schedules = this.schedules.filter(schedule => schedule.id !== id);
      this.notifyListeners();
    }
  
    clearSchedules() {
      this.schedules = [];
      this.notifyListeners();
    }
  }
  
  const dataStoreInstance = new DataStore();
  
  // Exemplos de agendamentos
  dataStoreInstance.addSchedule({ clientName: 'Cliente 1', day: '15', month: '3', year: '2024' });
  dataStoreInstance.addSchedule({ clientName: 'Cliente 2', day: '20', month: '3', year: '2024' });
  
  export default dataStoreInstance;
  
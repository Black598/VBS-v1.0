// DataStore.ts
export type Schedule = {
    clientName: string;
    day: string;
    month: string;
    year: string;
  };
  
  class DataStore {
    private schedules: Schedule[] = []; // Armazena os agendamentos
  
    addSchedule(schedule: Schedule) {
      this.schedules.push(schedule);
    }
  
    getSchedules() {
      return this.schedules;
    }
  
    deleteSchedule(index: number) {
      if (index >= 0 && index < this.schedules.length) {
        this.schedules.splice(index, 1); // Remove o item pelo índice
      }
    }
  
    clearSchedules() {
      this.schedules = [];
    }
  }
  
  export default new DataStore();
  
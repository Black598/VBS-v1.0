// DataStore.ts
export type Schedule = {
    clientName: string;
    day: string;
    month: string;
    year: string;
  };
  
  class DataStore {
    private schedules: Schedule[] = []; // Armazena os agendamentos
  
    // Adiciona um novo agendamento
    addSchedule(schedule: Schedule) {
      this.schedules.push(schedule);
    }
  
    // Retorna todos os agendamentos
    getSchedules() {
      return this.schedules;
    }
  
    // Limpa todos os agendamentos (opcional)
    clearSchedules() {
      this.schedules = [];
    }
  }
  
  // Exporta uma única instância da classe
  export default new DataStore();
  
export class TeamLeadService {
    // Добавьте методы, которые будут взаимодействовать с бэкендом
    static async getTeamLeadData(): Promise<any> {
        // Пример запроса
        return await fetch("/api/team-lead-data").then((response) => response.json());
    }
}

export {};

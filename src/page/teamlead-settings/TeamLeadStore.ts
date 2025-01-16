import { makeAutoObservable } from "mobx";
import { TeamLeadService } from "./TeamLeadService";

export class TeamLeadStore {
    private _data: any = null;

    constructor() {
        makeAutoObservable(this);
    }

    get data() {
        return this._data;
    }

    async fetchData() {
        try {
            this._data = await TeamLeadService.getTeamLeadData();
        } catch (error) {
            console.error("Error fetching team lead data:", error);
        }
    }
}

export const teamLeadStore = new TeamLeadStore();
export {};

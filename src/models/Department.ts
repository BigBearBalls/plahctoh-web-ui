import {PreviewAccountDTO} from "./PreviewAccountDTO";

export interface Department {
    id: string;
    departmentName: string;
    teamLeaderAccountPreview: PreviewAccountDTO | undefined;
}
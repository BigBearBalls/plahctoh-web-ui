import {makeAutoObservable} from "mobx";

export default class MeetingRoomStore {
    constructor() {
        makeAutoObservable(this, {}, {autoBind: true});
    }
}
import {makeAutoObservable} from "mobx";
import {Type} from "./Type";

export class PopUpStore {
    
    constructor() {
        makeAutoObservable(this, {}, {autoBind: true});
    }

    private _enabled: boolean = false;

    private _type: Type = {} as Type;

    private _message: string = "";

    setPopUp(enabled: boolean, type: Type, message: string) {
        this._type = type;
        this._message = message;
        this._enabled = enabled;
    }

    set type(value: Type) {
        this._type = value;
    }

    get type() {
        return this._type;
    }

    set message(value: string) {
        this._message = value;
    }

    get message() {
        return this._message;
    }

    set enabled(value: boolean) {
        this._enabled = value;
    }

    get enabled() {
        return this._enabled;
    }

}
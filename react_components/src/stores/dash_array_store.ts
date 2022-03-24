import {autorun, makeAutoObservable} from "mobx";
import {DjangoFormStore} from "./django_form_store";

export class DashArrayStore {
    djangoStore: DjangoFormStore;
    dashArray: number[] = [];
    private field: string;

    constructor(djangoStore: DjangoFormStore, field: string) {
        this.djangoStore = djangoStore;
        this.field = field;

        const updateDashArray = () => {
            try {
                const dashArray = JSON.parse(this.djangoStore.values.get(this.field));
                if (dashArray) {
                    this.dashArray = dashArray;
                }
            } catch (e) {
                this.djangoStore.values.set(this.field, JSON.stringify(this.dashArray));
            }
        };
        updateDashArray();

        makeAutoObservable(this);

        autorun(updateDashArray);
    }

    setDashArray(i: number, value: number) {
        this.dashArray[i] = value;
        this.djangoStore.values.set(this.field, JSON.stringify(this.dashArray));
    }

    addDash() {
        this.dashArray.push(5);
        this.djangoStore.values.set(this.field, JSON.stringify(this.dashArray));
    }

    removeDash(i: number) {
        this.dashArray.splice(i, 1);
        this.djangoStore.values.set(this.field, JSON.stringify(this.dashArray));
    }
}
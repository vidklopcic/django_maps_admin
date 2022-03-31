import {makeAutoObservable} from "mobx";
import {DjangoFormStore} from "./django_form_store";
export class MapsMarkerStore {
    djangoStore: DjangoFormStore;

    private latField: string;
    private lngField: string;

    constructor(djangoStore: DjangoFormStore, lat: string, lng: string) {
        this.djangoStore = djangoStore;
        this.latField = lat;
        this.lngField = lng;
        makeAutoObservable(this);
    }

    get lat(): number | undefined {
        return parseFloat(this.djangoStore.values.get(this.latField));
    }

    get lng(): number | undefined {
        return parseFloat(this.djangoStore.values.get(this.lngField));
    }

    set lat(v: number | undefined) {
        this.djangoStore.values.set(this.latField, v == undefined ? '' : v.toString());
    }

    set lng(v: number | undefined) {
        this.djangoStore.values.set(this.lngField, v == undefined ? '' : v.toString());
    }

}
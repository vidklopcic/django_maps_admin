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
        const c = parseFloat(this.djangoStore.values.get(this.latField));
        return isNaN(c) ? undefined : c;
    }

    get lng(): number | undefined {
        const c = parseFloat(this.djangoStore.values.get(this.lngField));
        return isNaN(c) ? undefined : c;
    }

    set lat(v: number | undefined) {
        this.djangoStore.values.set(this.latField, v == undefined ? '' : v.toString());
    }

    set lng(v: number | undefined) {
        this.djangoStore.values.set(this.lngField, v == undefined ? '' : v.toString());
    }

}
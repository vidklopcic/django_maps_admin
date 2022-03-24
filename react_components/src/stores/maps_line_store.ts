import {autorun, makeAutoObservable} from "mobx";
import {DjangoFormStore} from "./django_form_store";
import {LatLngBoundsExpression, LatLngExpression, LatLngTuple} from "leaflet";

export class MapsLineStore {
    djangoStore: DjangoFormStore;
    bounds: LatLngBoundsExpression = [[46.010305, 14.410974], [46.100228, 14.610804]];

    points: LatLngTuple[] = [];
    dashArray?: number[];
    private field: string;
    private colorField: string;
    private weightField: string;
    private dashArrayField: string;
    private lineCapField: string;
    private lineJoinField: string;

    constructor(djangoStore: DjangoFormStore, field: string, color: string, weight: string, dashArray: string, lineCap: string, lineJoin: string) {
        this.djangoStore = djangoStore;
        this.field = field;
        this.colorField = color;
        this.weightField = weight;
        this.dashArrayField = dashArray;
        this.lineCapField = lineCap;
        this.lineJoinField = lineJoin;

        const updateDashArray = () => {
            try {
                this.dashArray = JSON.parse(this.djangoStore.values.get(this.dashArrayField));
            } catch (e) {
                this.djangoStore.values.set(this.dashArrayField, JSON.stringify(this.dashArray));
            }
        };
        updateDashArray();

        const updatePoints = () => {
            try {
                const points = JSON.parse(this.djangoStore.values.get(this.field));
                if (points) {
                    this.points = points;
                }
            } catch (e) {
                this.djangoStore.values.set(this.field, JSON.stringify(this.points));
            }
        };
        updatePoints();

        if (this.points.length) {
            const maxLat = Math.max(...this.points.map((p) => p[0]));
            const maxLng = Math.max(...this.points.map((p) => p[1]));
            const minLat = Math.min(...this.points.map((p) => p[0]));
            const minLng = Math.min(...this.points.map((p) => p[1]));
            this.bounds = [[minLat, minLng], [maxLat, maxLng]];

        }

        makeAutoObservable(this);

        autorun(updatePoints);
        autorun(updateDashArray);
    }

    get color() {
        return this.djangoStore.values.get(this.colorField);
    }

    get weight() {
        return this.djangoStore.values.get(this.weightField);
    }

    get lineCap() {
        console.log(this.djangoStore.values.get(this.lineCapField), 'cap');
        return this.djangoStore.values.get(this.lineCapField);
    }

    get lineJoin() {
        return this.djangoStore.values.get(this.lineJoinField);
    }
}
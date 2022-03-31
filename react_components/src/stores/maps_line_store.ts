import {autorun, makeAutoObservable} from "mobx";
import {DjangoFormStore} from "./django_form_store";
import {LatLng, LatLngBoundsExpression, LatLngExpression, LatLngTuple, LeafletMouseEvent} from "leaflet";

export class MapsLineStore {
    djangoStore: DjangoFormStore;
    bounds: LatLngBoundsExpression = [[46.010305, 14.410974], [46.100228, 14.610804]];

    points: LatLngTuple[] = [];
    dashArray?: number[];
    activePoint?: number;

    private field: string;
    private colorField: string;
    private weightField: string;
    private dashArrayField: string;
    private lineCapField: string;
    private lineJoinField: string;
    endedDragging: number = 0;

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
                const points: [number, number][] = JSON.parse(this.djangoStore.values.get(this.field));
                const invalid = points.filter((p) => p.length !== 2 || isNaN(p[0]) || isNaN(p[1]));
                if (points && !invalid.length) {
                    this.points = points;
                } else {
                    this.djangoStore.values.set(this.field, JSON.stringify(this.points));
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

    get color(): string {
        return this.djangoStore.values.get(this.colorField);
    }

    get lighterColor() {
        const a = 0x60;
        const rgba = [
            parseInt(this.color.substring(1, 3), 16) + a,
            parseInt(this.color.substring(3, 5), 16) + a,
            parseInt(this.color.substring(5, 7), 16) + a,
            parseInt(this.color.substring(7, 9), 16),
        ];
        return '#' + rgba.map((e) => (e > 255 ? e - 2 * a : e).toString(16).padStart(2, '0')).join('');
    }

    get weight() {
        return parseFloat(this.djangoStore.values.get(this.weightField));
    }

    get lineCap() {
        return this.djangoStore.values.get(this.lineCapField);
    }

    get lineJoin() {
        return this.djangoStore.values.get(this.lineJoinField);
    }

    onMapClick(e: LeafletMouseEvent) {
        if (Date.now() - this.endedDragging < 100) {
            return;
        }
        if (this.activePoint !== undefined) {
            this.activePoint = undefined;
            return;
        }
        this.points.push([e.latlng.lat, e.latlng.lng]);
        this.djangoStore.values.set(this.field, JSON.stringify(this.points));
    }

    onPointClick(i: number) {
        this.activePoint = i;
    }

    removePoint() {
        if (this.activePoint === undefined) return;
        this.points.splice(this.activePoint, 1);
        this.activePoint = undefined;
        this.djangoStore.values.set(this.field, JSON.stringify(this.points));
    }

    movePoint(index: number, latLng: LatLng) {
        this.points[index] = [latLng.lat, latLng.lng];
        this.djangoStore.values.set(this.field, JSON.stringify(this.points));
    }

    addPoint(segment: number[], latlng: LatLng) {
        this.points.splice(segment[1], 0, [latlng.lat, latlng.lng]);
        this.activePoint = undefined;
        this.djangoStore.values.set(this.field, JSON.stringify(this.points));
    }
}
import {autorun, makeAutoObservable, ObservableMap} from "mobx";

export class DjangoFormStore {
    values: ObservableMap = new ObservableMap<string, string>();
    private listeners: ([HTMLElement, () => void])[] = [];

    constructor() {
        makeAutoObservable(this);

        for (const fieldset of Array.from(document.getElementsByTagName('fieldset'))) {
            for (const e of Array.from(fieldset.getElementsByTagName('textarea'))) {
                this.attachField(e);
            }
            for (const e of Array.from(fieldset.getElementsByTagName('input'))) {
                this.attachField(e);
            }
            for (const e of Array.from(fieldset.getElementsByTagName('select'))) {
                this.attachField(e);
            }
        }
    }

    attachField(input: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement) {
        const listener = () => {
            this.values.set(input.name, input.value);
        };
        this.listeners.push([input, listener]);
        listener();
        input.addEventListener('change', listener);
        autorun(() => {
            if (input !== document.activeElement) {
                input.value = this.values.get(input.name);
            }
        });
    }

    dispose() {
        for (const listener of this.listeners) {
            listener[0].removeEventListener('change', listener[1]);
        }
    }
}
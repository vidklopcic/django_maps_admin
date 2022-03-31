import React from 'react';
import ReactDOM from 'react-dom';
import {MapsLineAdmin, MapsLineContext} from './maps_line_admin';
import {DjangoFormStore} from "./stores/django_form_store";
import {MapsLineStore} from "./stores/maps_line_store";
import {configure} from "mobx";
import {DashArrayStore} from "./stores/dash_array_store";
import {DashArrayAdmin, DashArrayContext} from "./dash_array_admin";
import {MapsPolygonStore} from "./stores/maps_polygon_store";
import {MapsPolygonAdmin, MapsPolygonContext} from './maps_polygon_admin';
import {MapsMarkerStore} from "./stores/maps_marker_store";
import {MapsMarkerAdmin, MapsMarkerContext} from "./maps_marker_admin";

configure({
    enforceActions: "never",
})

// @ts-ignore
window.react = {};

const fieldName = (field: Element, name: string) => field.attributes.getNamedItem(`data-maps-admin-${name}`)!.value;

// @ts-ignore
window.react.RenderMapsAdmin = () => {
    const djangoFormStore = new DjangoFormStore();

    for (const field of Array.from(document.querySelectorAll('input[data-maps-admin="marker"]'))) {
        const store = new MapsMarkerStore(
            djangoFormStore,
            fieldName(field, 'lat'),
            fieldName(field, 'lng'),
        );
        const container = document.createElement('div');
        container.style.borderRadius = '5px';
        container.style.overflow = 'hidden';
        container.style.width = '100%';
        container.style.marginTop = '8px';
        field.parentElement!.append(container);
        ReactDOM.render(
            <MapsMarkerContext.Provider value={store}>
                <MapsMarkerAdmin/>
            </MapsMarkerContext.Provider>,
            container,
        );
    }

    for (const field of Array.from(document.querySelectorAll('textarea[data-maps-admin="line"]'))) {
        const store = new MapsLineStore(
            djangoFormStore,
            (field as HTMLTextAreaElement).name,
            fieldName(field, 'color'),
            fieldName(field, 'weight'),
            fieldName(field, 'dash-array'),
            fieldName(field, 'line-cap'),
            fieldName(field, 'line-join'),
        );
        const container = document.createElement('div');
        container.style.borderRadius = '5px';
        container.style.overflow = 'hidden';
        container.style.width = '100%';
        field.parentElement!.append(container);
        ReactDOM.render(
            <MapsLineContext.Provider value={store}>
                <MapsLineAdmin/>
            </MapsLineContext.Provider>,
            container,
        );
    }

    for (const field of Array.from(document.querySelectorAll('textarea[data-maps-admin="polygon"]'))) {
        const store = new MapsPolygonStore(
            djangoFormStore,
            (field as HTMLTextAreaElement).name,
            fieldName(field, 'color'),
            fieldName(field, 'fill-color'),
            fieldName(field, 'weight'),
            fieldName(field, 'dash-array'),
            fieldName(field, 'line-cap'),
            fieldName(field, 'line-join'),
        );
        const container = document.createElement('div');
        container.style.borderRadius = '5px';
        container.style.overflow = 'hidden';
        container.style.width = '100%';
        field.parentElement!.append(container);
        console.log(store);
        ReactDOM.render(
            <MapsPolygonContext.Provider value={store}>
                <MapsPolygonAdmin/>
            </MapsPolygonContext.Provider>,
            container,
        );
    }

    for (const field of Array.from(document.querySelectorAll('textarea[data-maps-admin="dash-array"]'))) {
        const store = new DashArrayStore(
            djangoFormStore,
            (field as HTMLTextAreaElement).name,
        );
        const container = document.createElement('div');
        container.style.display = 'inline-block';
        field.parentElement!.append(container);
        (field as HTMLElement).style.display = 'none';
        ReactDOM.render(
            <DashArrayContext.Provider value={store}>
                <DashArrayAdmin/>
            </DashArrayContext.Provider>,
            container,
        );
    }


};


import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {MapContainer, Polyline, TileLayer} from 'react-leaflet'
import {MapsLineContext} from "../maps_line_admin";
import {MapsLineStore} from "../stores/maps_line_store";

export const MapView = observer(() => {
    const store = useContext(MapsLineContext) as MapsLineStore;
    return <MapContainer bounds={store.bounds} zoomControl={false}>
        {store.points.length && <Polyline positions={store.points} pathOptions={{
            color: store.color,
            weight: store.weight,
            dashArray: store.dashArray,
            lineCap: store.lineCap,
            lineJoin: store.lineJoin
        }}/>}
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
    </MapContainer>;
});
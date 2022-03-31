import React, {useContext, useEffect, useMemo, useRef, useState} from 'react';
import {observer} from "mobx-react-lite";
import {DivIcon} from "leaflet";
import {MapContainer, Marker, Polygon, Polyline, TileLayer} from 'react-leaflet'
import {MapsMarkerContext} from "../maps_marker_admin";
import {MapsLineContext} from "../maps_line_admin";
import {MapsMarkerStore} from "../stores/maps_marker_store";
import {MapsLineStore} from "../stores/maps_line_store";
import {LineMapInteractions} from "../maps_line_admin/interactions";
import styled from "styled-components";
import {MapUtils} from "../utils";
import {CaughtException} from "mobx/dist/core/derivation";
import {MapsPolygonContext} from "../maps_polygon_admin";
import {MapsPolygonStore} from "../stores/maps_polygon_store";
import {PolygonMapInteractions} from "../maps_polygon_admin/interactions";
import {MarkerMapInteractions} from "../maps_marker_admin/interactions";

const MapStyles = styled.div<{ color: string }>`
  display: contents;

  & .line-icon-active {
    background-color: #ccc;
    border: solid 2px ${({color}) => color};
    cursor: pointer;
    box-sizing: border-box;
    border-radius: 100%;
  }

  & .line-icon {
    background-color: white;
    border: solid 2px ${({color}) => color};
    cursor: pointer;
    box-sizing: border-box;
    border-radius: 100%;

    :hover {
      background-color: #ccc;
    }
  }
`;

export const MapMarkerView = observer(() => {
    const store = useContext(MapsMarkerContext) as MapsMarkerStore;
    return <MapContainer
        center={[store.lat ?? 46.05286280496623, store.lng ?? 14.510192871093752]}
        zoom={12}
        zoomControl={false}
        style={{zIndex: '0', cursor: 'crosshair'}}>
        {store.lat && store.lng && <Marker
            position={[store.lat, store.lng]}
            draggable={true}
            autoPan={true}
            eventHandlers={{
                dragend: (e) => {
                    const latLng = e.target.getLatLng();
                    store.lat = latLng.lat;
                    store.lng = latLng.lng;
                },
            }}
        />}
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerMapInteractions/>
    </MapContainer>;
});

export const MapLineView = observer(() => {
    const store = useContext(MapsLineContext) as MapsLineStore;
    // @ts-ignore
    const markersStore = useMemo<Map<number, Marker>>(() => new Map(), []);
    const [dragging, setDragging] = useState(false);
    let markers = useMemo(() => store.points.map((p, i) => {
        const active = i === store.activePoint;
        if (!dragging || !markersStore.has(i)) {
            markersStore.set(i, <Marker
                icon={new DivIcon({
                    iconSize: [10, 10],
                    className: active ? 'line-icon-active' : 'line-icon',
                })}
                key={i}
                position={p}
                draggable={true}
                autoPan={true}
                eventHandlers={{
                    click: (e) => store.onPointClick(i),
                    dragstart: () => setDragging(true),
                    drag: (e) => store.movePoint(i, e.target.getLatLng()),
                    dragend: () => {
                        setDragging(false);
                        store.endedDragging = Date.now();
                    },
                }}
            />);
        }
        return markersStore.get(i);
    }), [store.points, store.activePoint]);
    return <MapStyles color={store.lighterColor}>
        <MapContainer bounds={store.bounds} zoomControl={false}
                      style={{zIndex: '0', cursor: 'crosshair'}}>
            {store.points.length && <Polyline
                positions={store.points}
                pathOptions={{
                    color: store.color,
                    weight: store.weight,
                    dashArray: store.dashArray,
                    lineCap: store.lineCap,
                    lineJoin: store.lineJoin,
                }}
                eventHandlers={{
                    click: (e) => {
                        store.addPoint(MapUtils.getSegment(e.latlng, e.sourceTarget), e.latlng);
                        throw 'stopped propagation';
                    }
                }}/>}
            {markers}
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LineMapInteractions/>
        </MapContainer>
    </MapStyles>;
});

export const MapPolygonView = observer(() => {
    const store = useContext(MapsPolygonContext) as MapsPolygonStore;
    // @ts-ignore
    const markersStore = useMemo<Map<number, Marker>>(() => new Map(), []);
    const [dragging, setDragging] = useState(false);
    let markers = useMemo(() => store.points.map((p, i) => {
        const active = i === store.activePoint;
        if (!dragging || !markersStore.has(i)) {
            markersStore.set(i, <Marker
                icon={new DivIcon({
                    iconSize: [10, 10],
                    className: active ? 'line-icon-active' : 'line-icon',
                })}
                key={i}
                position={p}
                draggable={true}
                autoPan={true}
                eventHandlers={{
                    click: (e) => store.onPointClick(i),
                    dragstart: () => setDragging(true),
                    drag: (e) => store.movePoint(i, e.target.getLatLng()),
                    dragend: () => {
                        setDragging(false);
                        store.endedDragging = Date.now();
                    },
                }}
            />);
        }
        return markersStore.get(i);
    }), [store.points, store.activePoint]);
    return <MapStyles color={store.lighterColor}>
        <MapContainer bounds={store.bounds} zoomControl={false}
                      style={{zIndex: '0', cursor: 'crosshair'}}>
            {store.points.length && <Polygon
                positions={store.points}
                pathOptions={{
                    color: store.color,
                    weight: store.weight,
                    dashArray: store.dashArray,
                    lineCap: store.lineCap,
                    lineJoin: store.lineJoin,
                    fillColor: store.fillColor,
                    fillOpacity: 1,
                }}
                eventHandlers={{
                    click: (e) => {
                        store.addPoint(MapUtils.getSegment(e.latlng, e.sourceTarget), e.latlng);
                        throw 'stopped propagation';
                    }
                }}/>}
            {markers}
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <PolygonMapInteractions/>
        </MapContainer>
    </MapStyles>;
});


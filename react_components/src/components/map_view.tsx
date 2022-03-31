import React, {useContext, useEffect, useMemo, useRef, useState} from 'react';
import {observer} from "mobx-react-lite";
import {DivIcon} from "leaflet";
import {MapContainer, Marker, Polyline, TileLayer} from 'react-leaflet'
import {MapsLineContext} from "../maps_line_admin";
import {MapsLineStore} from "../stores/maps_line_store";
import {MapInteractions} from "../maps_line_admin/interactions";
import styled from "styled-components";
import {MapUtils} from "../utils";
import {CaughtException} from "mobx/dist/core/derivation";

const MapStyles = styled.div<{ color: string }>`
  display: contents;

  & .line-icon-active {
    background-color: #ccc;
    border: solid 3px ${({color}) => color};
    cursor: pointer;
    box-sizing: border-box;
    border-radius: 100%;
  }

  & .line-icon {
    background-color: white;
    border: solid 3px ${({color}) => color};
    cursor: pointer;
    box-sizing: border-box;
    border-radius: 100%;

    :hover {
      background-color: #ccc;
    }
  }
`;

export const MapView = observer(() => {
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
    return <MapStyles color={store.color}>
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
            <MapInteractions/>
        </MapContainer>
    </MapStyles>;
});
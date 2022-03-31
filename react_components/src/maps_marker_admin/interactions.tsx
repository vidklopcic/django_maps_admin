import {observer} from "mobx-react-lite";
import React, {useContext} from "react";
import {MapsMarkerContext} from "../maps_marker_admin";
import {MapsMarkerStore} from "../stores/maps_marker_store";
import styled from "styled-components";
import {MdDelete} from "react-icons/md";
import useWave from "use-wave";
import {useMapEvents} from "react-leaflet";

const Container = styled.div`
  display: flex;
  position: absolute;
  height: 35px;
  right: 8px;
  bottom: 8px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  box-shadow: 0 0 1.0em rgba(0, 0, 0, .15);
  border-radius: 5px;
  background-color: darkred;
  color: white;
  font-size: 20px;
  aspect-ratio: 1;
  cursor: pointer;
  transition: all 300ms;

  :hover {
    background-color: red;
  }
`;

export const MarkerMapInteractions = observer(() => {
    const store = useContext(MapsMarkerContext) as MapsMarkerStore;
    const map = useMapEvents({
        click: (e) => {
            store.lat = e.latlng.lat;
            store.lng = e.latlng.lng;
        }
    });
    return null;
});

// src/App.jsx
import React, {createContext, useContext} from 'react';
import {observer} from "mobx-react-lite";
import styled from "styled-components";
import {MapMarkerView} from "./components/map_view";
import {MapsMarkerStore} from "./stores/maps_marker_store";
import {MarkerMapsActions} from "./maps_marker_admin/interactions";

export const MapsMarkerContext = createContext<MapsMarkerStore | undefined>(undefined);

const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  margin-left: 160px;
  border-radius: 5px;
  overflow: hidden;

  @media (max-width: 1024px) {
    margin-left: 0;
  }
`;

export const MapsMarkerAdmin = observer(() => {
        return <Container>
            <MapMarkerView/>
        </Container>;
    }
);
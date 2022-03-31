// src/App.jsx
import React, {createContext, useContext} from 'react';
import {observer} from "mobx-react-lite";
import styled from "styled-components";
import {MapPolygonView} from "./components/map_view";
import {MapsPolygonStore} from "./stores/maps_polygon_store";
import {PolygonMapsActions} from "./maps_polygon_admin/interactions";

export const MapsPolygonContext = createContext<MapsPolygonStore | undefined>(undefined);

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

export const MapsPolygonAdmin = observer(() => {
        const store = useContext(MapsPolygonContext) as MapsPolygonStore;

        return <Container>
            <MapPolygonView/>
            {store.activePoint !== undefined && <PolygonMapsActions/>}
        </Container>;
    }
);
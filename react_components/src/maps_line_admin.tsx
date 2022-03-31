// src/App.jsx
import React, {createContext, useContext} from 'react';
import {observer} from "mobx-react-lite";
import styled from "styled-components";
import {MapLineView} from "./components/map_view";
import {MapsLineStore} from "./stores/maps_line_store";
import {LineMapsActions} from "./maps_line_admin/interactions";

export const MapsLineContext = createContext<MapsLineStore | undefined>(undefined);

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

export const MapsLineAdmin = observer(() => {
        const store = useContext(MapsLineContext) as MapsLineStore;

        return <Container>
            <MapLineView/>
            {store.activePoint !== undefined && <LineMapsActions/>}
        </Container>;
    }
);
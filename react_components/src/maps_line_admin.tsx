// src/App.jsx
import React, {createContext, useContext} from 'react';
import {observer} from "mobx-react-lite";
import styled from "styled-components";
import {MapView} from "./components/map_view";
import {MapsLineStore} from "./stores/maps_line_store";

export const MapsLineContext = createContext<MapsLineStore | undefined>(undefined);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 160px;
  
  @media (max-width: 1024px) {
    margin-left: 0;
  }
`;

export const MapsLineAdmin = observer(() => {
        const store = useContext(MapsLineContext) as MapsLineStore;

        return <Container>
            <MapView/>
        </Container>;
    }
);
import {observer} from "mobx-react-lite";
import React, {useContext} from "react";
import {MapsPolygonContext} from "../maps_polygon_admin";
import {MapsPolygonStore} from "../stores/maps_polygon_store";
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

export const PolygonMapInteractions = observer(() => {
    const store = useContext(MapsPolygonContext) as MapsPolygonStore;
    const map = useMapEvents({
        click: (e) => store.onMapClick(e)
    });
    return null;
});

export const PolygonMapsActions = observer(() => {
    const store = useContext(MapsPolygonContext) as MapsPolygonStore;
    const wave = useWave();
    return <Container>
        <ButtonContainer ref={wave} onClick={() => store.removePoint()}>
            <MdDelete/>
        </ButtonContainer>
    </Container>;
});
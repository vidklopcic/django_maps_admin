import {observer} from "mobx-react-lite";
import React, {useContext} from "react";
import {MapsLineContext} from "../maps_line_admin";
import {MapsLineStore} from "../stores/maps_line_store";
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

export const LineMapInteractions = observer(() => {
    const store = useContext(MapsLineContext) as MapsLineStore;
    const map = useMapEvents({
        click: (e) => store.onMapClick(e)
    });
    return null;
});

export const LineMapsActions = observer(() => {
    const store = useContext(MapsLineContext) as MapsLineStore;
    const wave = useWave();
    return <Container>
        <ButtonContainer ref={wave} onClick={() => store.removePoint()}>
            <MdDelete/>
        </ButtonContainer>
    </Container>;
});
import React, {createContext, useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import {DashArrayStore} from "./stores/dash_array_store";
import styled from "styled-components";
import {IconButton} from "./components/icon_button";
import {MdAdd, MdDelete} from "react-icons/md"

export const DashArrayContext = createContext<DashArrayStore | undefined>(undefined);

const Container = styled.div`
  display: inline-flex;
`;

const Input = styled.input.attrs({type: 'number', min: '0', step: '0.1'})`
  display: inline-flex;
  margin-right: 8px!important;
  width: 40px;
  
  @media (max-width: 1024px) {
    width: 60px;
  }
`;

const InputContainer = styled.div`
  display: inline-block;
  position: relative;

  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }
`;

const InputDelete = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  padding-right: 12px;
  color: red;
  cursor: pointer;
`;


export const DashArrayAdmin = observer(() => {
        const store = useContext(DashArrayContext) as DashArrayStore;
        return <Container>
            {store.dashArray?.map((e, i) => <InputContainer key={'input-' + i}>
                <Input value={e} onChange={(e) => store.setDashArray(i, e.target.valueAsNumber)}/>
                <InputDelete onClick={() => store.removeDash(i)}><MdDelete/></InputDelete>
            </InputContainer>)}
            <IconButton onClick={() => store.addDash()}><MdAdd/></IconButton>
        </Container>;
    }
);
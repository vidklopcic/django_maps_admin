import styled from "styled-components";

export const IconButton = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  width: 25px;
  height: 25px;
  border: solid 1px var(--admin-interface-save-button-background-color, #417690);
  color: var(--admin-interface-save-button-background-color, #417690);
  font-size: 16px;
  
  :hover {
    background-color: #EEEEEE;
  }

  @media (max-width: 1024px) {
    width: 32px;
    height: 32px;
  }
`;
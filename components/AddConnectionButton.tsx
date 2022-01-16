import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'

const Container = styled.button`
  background-color: transparent;
  padding: 16px;
  border: 2px rgba(255,255,255,0.5) dashed;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: border 0.2s;
  
  &:hover {
    border: 2px white solid;
    background-color: var(--secondary-color);
  }
`;

const AddConnectionButton = (props) => (
  <Container {...props}>
    <FontAwesomeIcon icon={faPlusCircle} />&nbsp;
    Add Connection
  </Container>
)

export default AddConnectionButton
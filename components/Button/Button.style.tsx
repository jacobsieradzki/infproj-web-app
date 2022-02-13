import styled from 'styled-components';

type ButtonStyleProps = {
  primaryColor: string;
  secondaryColor: string;
}

export const ButtonStyle = styled.button<ButtonStyleProps>`
  font-weight: 600;
  cursor: pointer;
  
  &.sm {
    padding: 8px 16px;
  }
  
  &.md {
    padding: 12px 24px;
  }
  
  &.lg {
    padding: 12px 24px;
  }
  
  &.simple {
    background-color: ${props => props.secondaryColor};
    border: none;
    color: ${props => props.primaryColor};
  }
  
  &.outlined {
    background-color: ${props => props.secondaryColor};
    border: 2px ${props => props.primaryColor} solid;
    color: ${props => props.primaryColor};
  }
  &.outlined:hover {
    background-color: ${props => props.primaryColor};
    border: 2px ${props => props.primaryColor} solid;
    color: ${props => props.secondaryColor};
  }
  
  &.filled {
    background-color: ${props => props.secondaryColor};
    border: 2px ${props => props.secondaryColor} solid;
    color: ${props => props.primaryColor};
  }
  &.filled:hover {
    background-color: ${props => props.primaryColor};
    border: 2px ${props => props.secondaryColor} solid;
    color: ${props => props.secondaryColor};
  }
  
`;
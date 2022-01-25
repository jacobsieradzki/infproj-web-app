import React, { CSSProperties } from 'react'
import styled from 'styled-components'

type LoaderProps = {
  size?: number;
  style?: CSSProperties;
}

const LoaderStyle = styled.div<LoaderProps>`
  display: inline-block;
  border: ${props => Math.round(props.size/5)}px solid rgba(255, 255, 255, 0.25);
  border-top: ${props => Math.round(props.size/5)}px solid var(--accent-color);
  border-radius: 50%;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  animation: spin 1s ease-in-out infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const Loader: React.FC<LoaderProps> = ({ size = 32, style }) => {
  return <LoaderStyle className={"loader"} {...{ size, style }} />;
}

export default Loader
import React, { CSSProperties } from 'react'
import styled from 'styled-components'

type LoaderProps = {
  width?: number;
  height?: number;
  style?: CSSProperties;
}

const LoaderStyle = styled.div<LoaderProps>`
  display: inline-block;
  border: 6px solid rgba(255, 255, 255, 0.25);
  border-top: 6px solid var(--accent-color);
  border-radius: 50%;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  animation: spin 1s ease-in-out infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const Loader: React.FC<LoaderProps> = ({ width = 32, height = 32, style }) => {
  return <LoaderStyle className={"loader"} {...{ width, height, style }} />;
}

export default Loader
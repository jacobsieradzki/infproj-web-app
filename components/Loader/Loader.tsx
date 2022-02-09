import React, { CSSProperties } from 'react'
import styled from 'styled-components'

const DEFAULT_PRIMARY_LOADER_COLOR = "var(--accent-color)";
const DEFAULT_SECONDARY_LOADER_COLOR = "rgba(255, 255, 255, 0.25)";

type LoaderProps = {
  size?: number;
  color?: string;
  bgColor?: string;
  style?: CSSProperties;
}

const LoaderStyle = styled.div<LoaderProps>`
  display: inline-block;
  border: ${props => Math.round(props.size/5)}px solid ${props => props.bgColor};
  border-top: ${props => Math.round(props.size/5)}px solid ${props => props.color};
  border-radius: 50%;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  animation: spin 1s ease-in-out infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const Loader: React.FC<LoaderProps> = ({
  size = 32,
  color = DEFAULT_PRIMARY_LOADER_COLOR,
  bgColor = DEFAULT_SECONDARY_LOADER_COLOR,
  style
}) => {
  return <LoaderStyle className={"loader"} {...{ size, color, bgColor, style }} />;
}

export default Loader
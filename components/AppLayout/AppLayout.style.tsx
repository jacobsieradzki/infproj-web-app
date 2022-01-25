import React from 'react'
import styled, { createGlobalStyle } from 'styled-components';

export const HEADER_HEIGHT = 75;

export const AppTheme = createGlobalStyle`
  :root {
    --text-color: rgba(255, 255, 255, 1);
    --text2-color: rgba(255, 255, 255, 0.5);
    --background-color: #102a43;
    --primary-color: #243b53;
    --secondary-color: #334e68;
    --accent-color: #ffeb3b;
  
    --page-space: 32px;
    --grid-item-space: 20px;
    --item-line-space: 16px;
    
    --shadow: rgb(0 0 0 / 16%) 0px 4px 16px 4px;
  }
  
  h1, h2, h3, h4, h5 {
    font-family: Playfair Display, serif;
  }
  
  h1, h2, h3, h4, h5, p, a {
    color: var(--text-color);
  }
  
  h1 { margin: 0.8rem 0; }
  p { margin: 0.2rem 0; }
  
  span {
    color: var(--text2-color);
    font-size: 14px;
  }
  
  .bg-blur {
    -webkit-backdrop-filter: saturate(180%) blur(20px);
    backdrop-filter: saturate(180%) blur(20px);
    background-color: rgba(255, 255, 255, 0.72);
  }
  
  .tooltip {
    position: relative;
    display: inline-block;
  }
  
  .tooltip .tooltip-text {
    width: 120px;
    background-color: #fff;
    color: #000;
    text-align: center;
    padding: 8px 4px;
    border-radius: 6px;
    position: absolute;
    z-index: 1;
    box-shadow: var(--shadow);
    opacity: 0;
    transform: translateY(10px);
    transition: all .2s;
  }
  
  .tooltip:hover .tooltip-text {
    opacity: 1;
    transform: none;
  }
`;

const Page = styled.div`
  background-color: var(--background-color);
`;

const Header = styled.div`
  background-color: var(--secondary-color);
  display: flex;
  align-items: center;
  height: ${HEADER_HEIGHT}px;
  padding: 0 var(--page-space);
  position: sticky;
  top: 0;
`;

const Content = styled.div`
  padding: var(--page-space) var(--page-space) 0 var(--page-space);
  min-height: calc(100vh - ${HEADER_HEIGHT}px);
`;

export const ContentCenterInPage = styled.div`
  min-height: calc(100vh - ${HEADER_HEIGHT}px - var(--page-space));
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
`;

const AppLayoutStyle = {
  Page,
  Header,
  Content,
}

export default AppLayoutStyle;


import React from 'react'
import styled, { createGlobalStyle } from 'styled-components';

const HEADER_HEIGHT = 85

export const AppTheme = createGlobalStyle`
  :root {
    --text-color: #fff;
    --background-color: #102a43;
    --primary-color: #243b53;
    --secondary-color: #334e68;
    --accent-color: #ffeb3b;
  
    --page-space: 32px;
    --grid-item-space: 16px;
  }
`;

const Page = styled.div`
  background-color: var(--background-color);
  
  h1, h2, h3, h4, h5 {
    font-family: Playfair Display, serif;
  }
  
  h1, h2, h3, h4, h5, p, span, a {
    color: var(--text-color);
  }
`;

const Header = styled.div`
  background-color: var(--secondary-color);
  display: flex;
  align-items: center;
  height: ${HEADER_HEIGHT}px;
  padding: 0 var(--grid-item-space);
`;

const Content = styled.div`
  padding: var(--page-space);
  min-height: calc(100vh - ${HEADER_HEIGHT}px);
`;

const ContentCenterInPage = styled.div`
  min-height: calc(100vh - ${HEADER_HEIGHT}px - var(--page-space)px*2);
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
`;

const AppLayoutStyle = {
  Page,
  Header,
  Content,
  ContentCenterInPage
}

export default AppLayoutStyle;


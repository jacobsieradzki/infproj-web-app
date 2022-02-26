import React from 'react'
import styled, { createGlobalStyle } from 'styled-components';

export const HEADER_HEIGHT = 64;

export const AppTheme = createGlobalStyle``;

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


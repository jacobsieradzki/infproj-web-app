import { HEADER_HEIGHT } from 'components/AppLayout/AppLayout.style'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-flow: row nowrap;

  h1 > .svg-inline--fa {
    width: 1.5rem;
  }
`;

const Header = styled.div`
  margin-bottom: 20px;
  h1 { 
    margin: 4px; 
  }
`;

const CONTENT_TAB_HEIGHT = 80;

const Content = styled.div`
  width: 70%;
  padding-right: 44px;
`;

const Column = styled.div`
  width: 30%;
  position: sticky;
  top: calc(${HEADER_HEIGHT}px + var(--page-space) );
`;

const ColumnContent = styled.div`
  border: 1px white solid;
  border-bottom: none;
  overflow: scroll;
  max-height: calc(100vh - ${HEADER_HEIGHT}px - ${CONTENT_TAB_HEIGHT}px - var(--page-space));
  transition: opacity 0.2s;
  
  &.hidden {
    opacity: 0;
    height: 0;
  }
`;

const ColumnTab = styled.button`
  width: 100%;
  height: ${CONTENT_TAB_HEIGHT-20}px;
  margin-bottom: 16px;
  background-color: transparent;
  border: 1px white solid;
  font-size: 1rem;
  color: white;
  cursor: pointer;
  
  &.selected {
    background-color: white;
    color: var(--background-color);
    font-weight: 600;
  }
`;

const ResourceStyles = {
  Container,
  Header,
  Content,
  Column,
  ColumnTab,
  ColumnContent,
}

export default ResourceStyles;
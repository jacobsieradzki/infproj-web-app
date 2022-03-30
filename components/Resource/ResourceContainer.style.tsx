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
    margin: 8px 0; 
  }
`;

const CONTENT_TAB_HEIGHT = 80;

const Content = styled.div`
  flex-grow: 2;
  display: flex;
  flex-flow: column nowrap;
  
  &:not(:only-child) {
    padding-right: 44px;
  }
`;

const Links = styled.div`
  margin: 24px 0;
  
  .subheader {
    font-size: 1.2rem;
    font-weight: 600;
  }
`;

const Column = styled.div`
  width: 30%;
  flex-shrink: 0;
  position: sticky;
  top: calc(${HEADER_HEIGHT}px + var(--page-space) );
  height: calc(100vh - ${HEADER_HEIGHT}px - var(--page-space));
  min-height: calc(100vh - ${HEADER_HEIGHT}px - var(--page-space));
`;

const ColumnContent = styled.div`
  flex-shrink: 0;
  border-bottom: none;
  overflow: scroll;
  transition: opacity 0.2s;
  
  &.with-tabs {
    height: calc(100vh - ${HEADER_HEIGHT}px - ${CONTENT_TAB_HEIGHT}px - var(--page-space) + 2px);
    min-height: calc(100vh - ${HEADER_HEIGHT}px - ${CONTENT_TAB_HEIGHT}px - var(--page-space) + 2px);
  }
  &:not(.with-tabs) {
    height: calc(100vh - ${HEADER_HEIGHT}px - var(--page-space) + 2px);
    min-height: calc(100vh - ${HEADER_HEIGHT}px - var(--page-space) + 2px);
  }
  &.border {
    border: 1px white solid;
  }
`;

const ColumnTab = styled.button`
  background-color: transparent;
  border: 1px white solid;
  font-size: 1rem;
  color: white;
  cursor: pointer;
  font-weight: 600;
  
  &:not(.compact) {
    width: 100%;
    height: ${CONTENT_TAB_HEIGHT-20}px;
    margin-bottom: 16px;
  }
  
  &.compact {
    margin: 16px 0;
    padding: 20px;
  }
  
  &.selected {
    background-color: white;
    color: var(--background-color);
  }
`;

const PDFWrapper = styled.div`
  width: 100%;
  height: calc(100% - 20px);
  
  & > div {
    position: relative;
    width: 100%;
    height: 100%;
  }
`;

interface TabWrapperProps { tab: string; }
const TabWrapper = styled.div<TabWrapperProps>`
  & > *:not(.${props => props.tab}) {
    display: none;
    opacity: 0;
  }
`;

const ResourceStyles = {
  Container,
  Header,
  Content,
  Links,
  PDFWrapper,
  Column,
  ColumnTab,
  ColumnContent,
  TabWrapper,
}

export default ResourceStyles;
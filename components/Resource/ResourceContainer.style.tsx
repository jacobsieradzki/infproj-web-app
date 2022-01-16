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

const Content = styled.div`
  width: 70%;
  padding-right: 44px;
`;

const Column = styled.div`
  width: 30%;
  border: 1px white solid;
  border-bottom: none;
  max-height: calc(100vh - ${HEADER_HEIGHT}px - var(--page-space));
  position: sticky;
  top: calc(${HEADER_HEIGHT}px + var(--page-space));
  overflow: scroll;
`;

const ResourceStyles = {
  Container,
  Header,
  Content,
  Column
}

export default ResourceStyles;
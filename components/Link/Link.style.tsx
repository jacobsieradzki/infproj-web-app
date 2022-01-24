import styled from 'styled-components';

const ContainerCss = `
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-start;
  text-align: start;
  background-color: var(--primary-color);
  padding: 16px;
  border: 2px rgba(255, 255, 255, 0.5) solid;
  cursor: pointer;
  width: 100%;
  
  &:hover {
    background-color: var(--background-color);
  }
  
  & > .svg-inline--fa { margin: 12px 16px 0 4px; }
  
  &.center {
    align-items: center;
    .svg-inline--fa { margin: 0 16px 0 4px; }    
  }
`;

const Container = styled.button`
  ${ContainerCss}
`;

const Link = styled.a`
  ${ContainerCss}
`;

const Content = styled.div`
  p {
    font-size: 1.1rem;
  }
  
  & > span {
    display: block;
    font-size: 1rem;
  }
  
  span.caption {
    margin: 8px 0;
    font-weight: 600;
  }
`;

const LinkStyles = {
  Container,
  Link,
  Content,
}

export default LinkStyles
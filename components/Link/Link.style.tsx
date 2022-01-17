import styled from 'styled-components';

const ContainerCss = `
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-start;
  text-align: start;
  background-color: var(--primary-color);
  padding: 14px;
  border: 2px rgba(255, 255, 255, 0.5) solid;
  cursor: pointer;
  
  &:hover {
    background-color: var(--background-color);
  }
  
  .svg-inline--fa {
    margin: 16px 16px 16px 4px;
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
  
  span {
    font-size: 1rem;
  }
`;

const LinkStyles = {
  Container,
  Link,
  Content,
}

export default LinkStyles
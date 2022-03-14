import styled from 'styled-components';

const ContainerCss = `
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-start;
  text-align: start;
  background-color: transparent;
  padding: 16px;
  border: 2px rgba(255, 255, 255, 0.5) solid;
  cursor: pointer;
  width: 100%;
  
  img.icon {
    margin-right: 16px;
    max-height: 100px;
  }
  
  span.content {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;  
    overflow: hidden;
  }
  
  &.noclick {
    cursor: default;
  }
  
  &:hover:not(.noclick) {
    border-color: white;
    background-color: var(--primary-color);
  }
  
  & > .svg-inline--fa { margin: 12px 16px 0 4px; }
  
  &.center {
    align-items: center;
    .icon.svg-inline--fa { margin: 0 16px 0 4px; }    
  }
  
  &.light {
    &:hover:not(.noclick) {
      color: white;
      svg {
        color: white;
      }
    }
  }
`;

const Container = styled.button`
  ${ContainerCss}
`;

const Link = styled.a`
  ${ContainerCss}
`;

const Content = styled.div`
  width: calc(100% - 1.0625em - 36px);
  
  p {
    font-size: 1rem;
  }
  
  & > span {
    display: block;
    font-size: 0.8rem;
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
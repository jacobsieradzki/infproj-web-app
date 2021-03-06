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
  
  p.title {
    font-size: 16px;
  }
  
  span.content {
    font-size: 14px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;  
    overflow: hidden;
  }
  
  span.caption {
    font-size: 12px;
  }
  
  &.noclick {
    cursor: default;
  }
  
  &:hover:not(.noclick) {
    border-color: white;
    background-color: var(--primary-color);
  }
  
  & > .svg-inline--fa { margin: 12px 16px 0 4px; }
  & > .fa-chevron-right, .fa-external-link-square-alt { 
    margin: 0 0px 0 16px;
    align-self: center !important;
  }
  
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

const Layout = styled.div`
  width: 100%;
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
    font-size: 16px;
  }
  
  & > span {
    display: block;
    font-size: 14px;
  }
  
  span.caption {
    margin: 8px 0;
    font-weight: 600;
  }
`;

const Reactions = styled.div`
  margin: 8px 0;
  display: flex;
  flex-flow: row wrap;
  gap: 6px;

  .tooltip-text {
    top: 120%;
    left: 50%;
    margin-left: -60px; /* Use half of the width (120/2 = 60), to center the tooltip */
    font-weight: 600;
  }
`;

const LinkStyles = {
  Layout,
  Container,
  Link,
  Content,
  Reactions,
}

export default LinkStyles
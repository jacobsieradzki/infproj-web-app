import { HorizontalStack } from 'components/GlobalStyles'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  position: relative;
  
  .alert {
    margin: 20px;
  }
  
  &.autoplay {
    .item:not(.selected):not(:hover) {
      opacity: 0.5;
    }
  }
`;

const AutoPlay = styled(HorizontalStack)`
  padding: 16px;
  justify-content: center;
  position: sticky;
  left: 0;
  bottom: 0;
  cursor: pointer;
  border: none;
    
  &.bg-blur { background-color: rgba(255, 255, 255, 0.20); }
  & > * { margin: 0; }
  p {
    font-size: 16px; 
    font-weight: 600; 
  }
  .svg-inline--fa { font-size: 1.2rem; }
`;

const PageContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 2px;
  margin: 16px 0;
  
  span.header {
    font-size: 1.5rem;
    font-weight: 600;
    cursor: default; 
    color: white;
  }
  
  .item {
    padding: 0 24px;
  }
  
  & > .add {
    margin: 16px 24px;
  }
  
`;

const Item = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 2px;
  padding: 0 24px;
  
  p { font-size: 1.2rem; }
  .links { margin-top: 8px; }
  
  &.selected {
    background-color: var(--secondary-color);
    
    margin-top: 16px;
    &:not(.time) { padding-top: 24px; } 
    padding-bottom: 24px;
    
    .add { 
      margin-top: 16px;
      max-height: 100px;
      opacity: 1;
      padding: 16px;
      cursor: pointer;
    }
  }
  
  span.subheader {
    font-size: 1rem;
    font-weight: 600;
    cursor: default; 
  }
  
  button.nostyle {
    border: 0;
    background-color: transparent;
    text-align: left;
    cursor: pointer;
  }
  
  img.content {
    width: 100%;
    object-fit: contain;
    margin: 8px 0;
  }
  
  .add {
    max-height: 0px;
    transition: max-height 0.5s, opacity 0.5s, padding 0.5s, margin 0.2s;
    padding: 0;
    opacity: 0;
    overflow: hidden;
    cursor: default;
  }
`;

const Inset = styled.div`
  padding: 16px 24px 0;
`;

const SubtitlesStyles = {
  Container,
  AutoPlay,
  PageContainer,
  Item,
  Inset,
}

export default SubtitlesStyles
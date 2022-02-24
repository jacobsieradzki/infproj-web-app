import { HorizontalStack } from 'components/GlobalStyles'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  position: relative;
  
  .alert {
    margin: 20px;
  }
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
  
  & > .add { margin: 16px 24px; }
  
  //.highlight-links {
  //  margin-top: 20px;
  //}
`;

const Item = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 2px;
  padding: 24px;
  
  p { font-size: 1.2rem; }
  
  &.selected {
    background-color: var(--secondary-color);
    margin-top: 16px;
    
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
  PageContainer,
  Item,
  Inset,
}

export default SubtitlesStyles
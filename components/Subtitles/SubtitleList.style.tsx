import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  position: relative;
`;

const Item = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 2px;
  padding: 0 24px 0 24px;
  
  &:last-child { padding-bottom: 32px; }
  
  &.selected {
    background-color: var(--secondary-color);
    padding-bottom: 24px;
    
    .add { 
      margin-top: 16px;
      max-height: 100px;
      opacity: 1;
      padding: 16px;
    }
  }
  
  span {
    font-size: 1rem;
    font-weight: 600;
    cursor: default; 
  }
  
  p {
    font-size: 1.2rem;
  }
  
  .add {
    max-height: 0px;
    transition: max-height 0.5s, opacity 0.5s, padding 0.5s, margin 0.2s;
    padding: 0;
    opacity: 0;
    overflow: hidden;
  }
`;

const SubtitlesStyles = {
  Container,
  Item,
}

export default SubtitlesStyles
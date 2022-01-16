import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  padding: 24px;
  position: relative;
`;

const Item = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 2px;
  
  padding: 12px 0;
  &:first-child { padding-top: 0; }
  &:last-child { padding-bottom: 0; }
  
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
  
  &:hover {
    .add { 
      margin-top: 16px;
      max-height: 100px;
      opacity: 1;
      padding: 16px;
    }
  }
`;

const SubtitlesStyles = {
  Container,
  Item,
}

export default SubtitlesStyles
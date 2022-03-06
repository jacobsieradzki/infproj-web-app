import styled from 'styled-components'

interface ContentProps {
  minHeight: number
};

const Container = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
`;

const Box = styled.div<ContentProps>`
  display: flex;
  flex-flow: column;
  width: min(90%, 700px);
  max-height: 90%;
  background-color: white;
  box-shadow: var(--shadow);
  overflow: scroll;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 12px;
  font-size: 20px;
  font-weight: 600;
  background-color: var(--background-color);
  border-bottom: 1px rgba(0,0,0,10%) solid;
  position: sticky;
  top: 0;
  z-index: 10;
  max-height: 61px;
  
  .close {
    position: absolute;
    width: 61px;
    height: 61px;
    right: 0;
    font-size: 20px;
    background-color: transparent;
    border: none;
    cursor: pointer;
    color: white;
    transition: background-color 0.2s;
    &:hover { background-color: rgba(255, 255, 255, 5%); }
    &:active { background-color: rgba(255, 255, 255, 20%); }
  }
`;

const Content = styled.div<ContentProps>`
  flex-grow: 2; 
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column nowrap;
  min-height: ${props => props.minHeight}px;
  
  h1, h2, h3, p, span { color: var(--black); }

  .buttons {
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: flex-end;
    gap: 8px;
    padding: 16px;
    border-top: 1px rgba(0,0,0,10%) solid;

    .loader {
      margin: 20px 0;
    }
  }
`;

const PopupStyles = {
  Container,
  Box,
  Header,
  Content,
}

export default PopupStyles
import styled from 'styled-components'

const Container = styled.div`
  text-align: center;
  
  .message {
    font-size: 1.7em;
    font-weight: 600;
  }
`;

const Slider = styled.div`
  width: max(200px, 50%);
  margin: 40px auto 72px;
  padding: 8px 0;
  cursor: default;
  
  .thumb {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    transition: all .1s;
    background-color: rgb(97, 36, 57);
    border: 8px rgb(190, 79, 113) solid;
    margin-top: -20px;
    margin-left: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .track, .slider {
    transition: all .1s;
  }
  
  .track-0 {
    height: 24px;
    border-radius: 999px;
    background-color: rgb(190, 79, 113);
  }

  .slider {
    height: 24px;
    background-color: rgb(190, 79, 113);
    border-radius: 999px;
    background-size: 0 100%;
    background-image: linear-gradient(#fff, #fff);
    background-repeat: no-repeat;
  }
  
  .thumb:hover {
    transform: scale(1.5);
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.5);
  }
`;

const Actions = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  margin: 32px 0;
  gap: 16px;
`;

const Links = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: 16px;
  margin: 40px auto;
  
  & > * {
    width: calc((100% - 48px) / 4) !important;
  }
  
  .link-prev {
    height: 100%;
    align-items: center;

    .svg-inline--fa:first-child {
      margin: 0 16px 0 8px;
    }
  }
`;

const CompletionViewStyle = {
  Container,
  Slider,
  Actions,
  Links,
}

export default CompletionViewStyle
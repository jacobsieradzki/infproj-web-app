import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex-grow: 2;
  gap: 16px;
  width: 100%;
  margin: 16px 0 0;
  
  & > * {
    width: 100%;
  }
  
  .link-prev {
    width: calc(100% - 20px - 20px);
    margin: 0 auto;
  }
  
  .error {
    text-align: center;
    color: red;
    margin: 20px;
  }
`;

const ChoosePdf = {
  Pages: styled.div`
    padding: 0 24px;
  `,
  PageGrid: styled.div`
    display: flex;
    flex-flow: row wrap;
    gap: 16px;
  `,
  Page: styled.button`
    border: 2px var(--primary-color) solid;
    background-color: transparent;
    font-size: 16px;
    font-weight: 600;
    text-align: left;
    padding: 8px 12px;
    
    & > img {
      margin-top: 8px;
    }
    
    &:hover {
      background-color: var(--primary-color);
      cursor: pointer;
      color: white;
    }
  `,
}

const CreateLinkStyle = {
  Container,
  ChoosePdf,
}

export default CreateLinkStyle
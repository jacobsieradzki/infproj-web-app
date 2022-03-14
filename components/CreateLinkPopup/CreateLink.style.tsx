import Loader from 'components/Loader/Loader'
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
  min-height: 70vh;
  
  & > * {
    width: 100%;
  }
  
  .loader-wrapper {
    display: flex;
    justify-content: center;
  }
  
  .link-prev {
    width: calc(100% - 20px);
    margin: 0 auto;
  }
  
  .video-container {
    width: calc(100% - 48px);
    .video { margin: 0; }
  }

  .form {
    width: min(500px, 90%);
    padding: 32px 0;
    .form-space { height: 32px; }
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

const Header = styled.div`
  padding: 0 24px;
  
  h2 {
    margin: 32px 0 0;
  }
`;

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const LoaderComponent = () => (
  <LoaderWrapper>
    <Loader />
  </LoaderWrapper>
)

const ErrorComponent = ({ error }) => (
  <span className={"error"}>
    {error}
  </span>
)

const CreateLinkStyle = {
  Container,
  ChoosePdf,
  Header,
  LoaderComponent,
  ErrorComponent,
}

export default CreateLinkStyle
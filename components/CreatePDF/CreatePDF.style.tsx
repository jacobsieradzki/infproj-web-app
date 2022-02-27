import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex-grow: 2;
  gap: 16px;

  .text-field, .upload, .caption {
    width: min(500px, 90%);
  }
  
  .caption {
    margin-top: 8px;
    color: rgba(0, 0, 0, 0.5);
  }
  
  .upload {
    button, span {
      text-align: left;
      display: block;
      width: 100%;
    }
  }

  .error {
    text-align: center;
    color: red;
    margin: 20px;
  }
`;

const CreatePDFStyle = {
  Container,
}

export default CreatePDFStyle
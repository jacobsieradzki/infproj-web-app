import styled from 'styled-components'

const Layout = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex-grow: 2;
  
  .form {
    width: min(500px, 90%);
    padding: 32px 0;
  }
  
  .form-space {
    height: 32px;
  }
  
  .text-field {
    
    margin: 8px 0;
  }
  
  .error {
    text-align: center;
    color: red;
    margin: 20px;
  }
`;

export const LoginPopupStyles = {
  Layout,
}

export default LoginPopupStyles
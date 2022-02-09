import styled from 'styled-components'

const Layout = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  
  .text-field {
    width: min(500px, 90%);
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
import styled from 'styled-components'

type ContainerProps = {
  primaryColor: string;
  secondaryColor: string;
}

const Container = styled.div<ContainerProps>`
  display: flex;
  flex-flow: row nowrap;
  padding: 16px;
  margin: 20px 0;
  gap: 8px;
  background-color: ${props => props.secondaryColor};
  color: ${props => props.primaryColor};
  border: solid ${props => props.primaryColor} 2px;

  &.permissions {
    .subtitle {
      font-size: 14px;
    }
  }
`;

const Icon = styled.div`
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const Content = styled.div`
  p.title {
    font-weight: 600;
  }
`;

const AlertStyles = {
  Container,
  Icon,
  Content,
}

export default AlertStyles
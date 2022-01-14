import styled from 'styled-components'
import { Grid } from 'components/GlobalStyles'

const Container = styled.div`
  
`;

const Box = styled(Grid.Box)`
  p {
    font-size: 1.5rem;
    font-weight: 700;
  }
`;

type LogoProps = {
  imageUrl: string;
}
const Logo = styled.div<LogoProps>`
  background-image: url(${props => props.imageUrl});
  background-position: center left;
  background-repeat: no-repeat;
  background-size: contain;
  height: 50px;
`;

const OrganisationsStyles = {
  Container,
  Box,
  Logo
}

export default OrganisationsStyles;
import styled from 'styled-components'

const Container = styled.div`
  
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(265px, 1fr));
  grid-gap: 1rem;
`;

const Box = styled.a`
  display: flex;
  flex-flow: column nowrap;
  background-color: var(--primary-color);
  padding: var(--grid-item-space);
  
  p {
    font-size: 1.5rem;
    font-weight: 700;
  }
  
  &:hover {
    background-color: var(--secondary-color);
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
  Grid,
  Box,
  Logo
}

export default OrganisationsStyles;
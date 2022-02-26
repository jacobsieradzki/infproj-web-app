import styled from 'styled-components'
import { Grid as GlobalGrid } from 'components/GlobalStyles'

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
`;

const Grid = styled(GlobalGrid.Container)`
  width: 100%;
  flex-flow: row wrap;
  
  & > * {
    width: calc((100% - 2rem) / 3);
    flex-shrink: 0;
  }
`;

const Box = styled(GlobalGrid.Box)`
  padding: 0;
  
  & > * {
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    align-items: center;
  }

  &:hover {
    box-shadow: var(--shadow);
  }
`;

const IconContent = styled.div`
  padding: 40px 0 20px;
`;

const BoxContent = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  padding: 16px 20px;
  gap: 8px;

  p {
    margin: 8px 0;
    font-size: 20px;
    font-weight: 600;
  }
`;

const NewMenuStyles = {
  Container,
  Grid,
  Box,
  IconContent,
  BoxContent,
}

export default NewMenuStyles
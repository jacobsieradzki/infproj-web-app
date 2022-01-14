import styled from 'styled-components'
import { Grid } from 'components/GlobalStyles'

export const Container = styled.div`
  
`;

export const Box = styled(Grid.Box)`
  padding: 0;
  
  &:hover {
    box-shadow: var(--shadow);
  }
`;

export const LecturePreview = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  background-color: #fff;
  aspect-ratio: 16 / 8;
  padding: var(--grid-item-space);
  
  span {
    margin: 0;
    color: black;
    font-size: 16px;
    font-weight: 600;
  }
  
  p {
    margin: 8px 0;
    color: blue;
    font-size: 24px;
    font-weight: 600;
  }
`;

export const BoxContent = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  padding: var(--grid-item-space);
  gap: var(--item-line-space);
  
  p {
    margin: 0;
  }
`;

const CoursesListStyles = {
  Container,
  Box,
}

export default CoursesListStyles
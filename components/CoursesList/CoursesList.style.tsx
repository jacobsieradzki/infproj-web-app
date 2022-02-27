import styled from 'styled-components'
import { Grid as GlobalGrid } from 'components/GlobalStyles'

const Container = styled.div`
  padding-bottom: 52px;
`;

const Grid = styled(GlobalGrid.Container)`
  &:not(.wide) > * {
    width: calc(100% / 3);
  }
  &.wide > * {
    width: calc(100% / 4);
  }
`;

const Box = styled(GlobalGrid.Box)`
  padding: 0;
  
  &:hover {
    box-shadow: var(--shadow);
  }
`;

const NewBox = styled(GlobalGrid.Box)`
  padding: 0;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-color);
  width: 33%;
  min-height: 200px;
  
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
    color: rgba(0, 0, 0, 0.5);
    font-size: 16px;
    font-weight: 600;
  }
  
  p {
    color: blue;
    font-size: 20px;
    font-weight: 600;
  }
`;

export const BoxContent = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  padding: 16px 20px;
  gap: 8px;
  
  p {
    margin: 0;
  }
`;

const List = styled.div`
  border: 1px #fff solid;
`;

const Row = styled.a`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 8px;
  background-color: var(--primary-color);
  padding: 16px;
  
  .svg-inline--fa {
    margin: 8px;
  }

  &:hover {
    background-color: var(--secondary-color);
  }

  &:not(:last-child) {
    border-bottom: 1px #fff solid;
  }
`;

const CoursesListStyles = {
  Container,
  Grid,
  Box,
  NewBox,
  List,
  Row,
}

export default CoursesListStyles
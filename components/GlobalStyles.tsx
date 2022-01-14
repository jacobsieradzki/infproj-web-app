import styled from 'styled-components'

// --------------------------------------------------
// Layout
// --------------------------------------------------

export const Spacer = styled.div`
  flex-grow: 2;
`;

export const CenterDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

type VerticalStackProps = {
  align: string;
}
export const VerticalStack = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: ${props => props.align || 'flex-start'};
  justify-content: center;
`;

export const Grid = {
  Container: styled.div`
    display: flex;
    gap: 1rem;
    
    & > a {
      width: 25%;
    }
  `,
  Box: styled.a`
    display: flex;
    flex-flow: column nowrap;
    background-color: var(--primary-color);
    padding: var(--grid-item-space);
    
    &:hover {
      background-color: var(--secondary-color);
    }
  `
}

// --------------------------------------------------
// Text
// --------------------------------------------------

export const CaptionUppercase = styled.span`
  font-size: 14px;
  text-transform: uppercase;
`;
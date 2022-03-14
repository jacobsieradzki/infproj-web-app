import styled from 'styled-components'

// --------------------------------------------------
// Layout
// --------------------------------------------------

type SpacerProps = {
  height?: number;
  width?: number;
}
export const Spacer = styled.div<SpacerProps>`
  flex-grow: 2;
  ${props => props.height ? `height: ${props.height}px;` : ""}
  ${props => props.width ? `width: ${props.width}px;` : ""}
`;

export const CenterDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

type StackProps = {
  align?: string;
  gap?: number;
  padding?: number;
  paddingH?: number;
  paddingV?: number;
}

export const VerticalStack = styled.div<StackProps>`
  display: flex;
  flex-flow: column nowrap;
  align-items: ${props => props.align || 'flex-start'};
  justify-content: center;
  gap: ${props => props.gap || 0}px;
  ${props => !!props.padding ? `padding: ${props.padding}px` : ""}
  ${props => (!!props.paddingH && !!props.paddingV) ? `padding: ${props.paddingV}px ${props.paddingH}px;` : ""}
`;

export const HorizontalStack = styled.div<StackProps>`
  display: flex;
  flex-flow: row nowrap;
  justify-content: ${props => props.align || 'flex-start'};
  align-items: center;
  gap: ${props => props.gap || 0}px;
  ${props => !!props.padding ? `padding: ${props.padding}px;` : ""}
  ${props => (!!props.paddingH || !!props.paddingV) ? `padding: ${props.paddingV || 0}px ${props.paddingH || 0}px;` : ""}
`;

export const Grid = {
  Container: styled.div`
    display: flex;
    gap: 1rem;
    
    & > * {
      width: calc((100% - 3rem) / 4);
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
  `,
  BoxButton: styled.button`
    display: flex;
    flex-flow: column nowrap;
    background-color: var(--primary-color);
    border: none;
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
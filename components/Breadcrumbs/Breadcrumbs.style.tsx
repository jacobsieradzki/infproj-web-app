import React from 'react'
import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  gap: 8px;
  
  a, p {
    font-size: 1rem;
    margin: 0;
  }
  
  a:hover {
    text-decoration: underline;
    text-underline-position: 4px;
    -webkit-text-underline-position: under;
    text-underline-position: under;
    text-decoration-thickness: 0.15rem;
  }
`;

const _BreadcrumbSeparator = styled.span`
  &.separator {
    font-size: 1rem;
    font-weight: 600;
    color: white;
  }
`;
export const BreadcrumbSeparator = () => <_BreadcrumbSeparator className={"separator"}>/</_BreadcrumbSeparator>;
/** @jsxImportSource theme-ui */
import React from 'react'

export const Spacer = props => (
  <div {...props} sx={{
    flexGrow: 2,
  }} />
);

export const CenterDiv = props => (
  <div {...props} sx={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  }} />
)

export const VerticalStack = props => (
  <div {...props} sx={{
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: props.align || 'flex-start',
    justifyContent: 'center',
  }} />
)
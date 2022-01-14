import React from 'react'

export const Spacer = props => (
  <div {...props} style={{
    flexGrow: 2,
  }} />
);

export const CenterDiv = props => (
  <div {...props} style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  }} />
)

export const VerticalStack = props => (
  <div {...props} style={{
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: props.align || 'flex-start',
    justifyContent: 'center',
  }} />
)
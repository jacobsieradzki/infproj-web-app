/** @jsxImportSource theme-ui */
import React from 'react'

const HEADER_HEIGHT = 85

const Page = props => (
  <div {...props} sx={{

  }} />
)

const Header = props => (
  <div {...props} sx={{
    backgroundColor: 'primary',
    display: 'flex',
    alignItems: 'center',
    height: HEADER_HEIGHT,
    h1: {
      padding: '0 var(--space-h)'
    }
  }} />
)

const Content = props => (
  <div {...props} sx={{
    padding: 'var(--space)',
    minHeight: `calc(100vh - ${HEADER_HEIGHT}px)`,
  }} />
)

const ContentCenterInPage = props => (
  <div {...props} sx={{
    minHeight: `calc(100vh - ${HEADER_HEIGHT}px - var(--space) - var(--space))`,
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center',
    justifyContent: 'center'
  }} />
)

const AppLayoutStyle = {
  Page,
  Header,
  Content,
  ContentCenterInPage
}

export default AppLayoutStyle;


/** @jsxImportSource theme-ui */
import React from 'react'

const Container = props => (
  <div {...props} sx={{

    }} />
)

const Grid = props => (
  <div {...props} sx={{
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(265px, 1fr))',
    gridGap: '1rem'
  }} />
)

const Box = props => (
  <a {...props} sx={{
    display: 'flex',
    flexFlow: 'column nowrap',
    backgroundColor: 'primary',
    padding: '1.5rem',
    p: {
      fontSize: '1.5rem',
      fontWeight: 700,
      margin: 'var(--space-1) 0'
    },
    ':hover': {
      backgroundColor: 'secondary',
    }
  }} />
)

const Logo = props => (
  <div {...props} sx={{
    backgroundImage: `url(${props.imageUrl})`,
    backgroundPosition: 'center left',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    height: '50px',
  }} />
)

const OrganisationsStyles = {
  Container,
  Grid,
  Box,
  Logo
}

export default OrganisationsStyles;
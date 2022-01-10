/** @jsxImportSource theme-ui */
import React from 'react'
import AppLayoutStyle from 'components/AppLayout/AppLayout.style'
import { VerticalStack } from 'components/GlobalStyles'

const Page: React.FC = ({ }) => {

  return (
    <AppLayoutStyle.ContentCenterInPage>
      <VerticalStack align={'center'} sx={{ marginBottom: 64 }}>
        <h1 sx={{ fontSize: 72, margin: '0' }}>404</h1>
        <p sx={{ fontSize: 24, margin: '16px 0' }}>This page could not be found.</p>
      </VerticalStack>
    </AppLayoutStyle.ContentCenterInPage>
  )
}

export default Page;
import React from 'react'
import { ContentCenterInPage } from 'components/AppLayout/AppLayout.style'
import { VerticalStack } from 'components/GlobalStyles'

const Page: React.FC = ({ }) => {

  return (
    <ContentCenterInPage>
      <VerticalStack align={'center'} style={{ marginBottom: 64 }}>
        <h1 style={{ fontSize: 72, margin: '0' }}>404</h1>
        <p style={{ fontSize: 24, margin: '16px 0' }}>This page could not be found.</p>
      </VerticalStack>
    </ContentCenterInPage>
  )
}

export default Page;
import AppLayoutStyle from 'components/AppLayout/AppLayout.style'
import React from 'react'

const AppLayout: React.FC = ({ children }) => {

  return (
    <AppLayoutStyle.Page>
      <AppLayoutStyle.Header>
        <h1>Classroom</h1>
      </AppLayoutStyle.Header>
      <AppLayoutStyle.Content>
        {children}
      </AppLayoutStyle.Content>
    </AppLayoutStyle.Page>
  )
}

export default AppLayout
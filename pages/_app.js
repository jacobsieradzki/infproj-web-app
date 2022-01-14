import React from 'react'
import 'styles/globals.css'
import AppLayout from 'components/AppLayout/AppLayout'
import { APIContextProvider } from 'contexts/APIContext'
import { AppTheme } from '../components/AppLayout/AppLayout.style'

function MyApp({ Component, pageProps }) {
  return (
    <APIContextProvider>
      <AppTheme />
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </APIContextProvider>
  )
}

export default MyApp

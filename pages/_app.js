/** @jsxImportSource theme-ui */
import React from 'react'
import 'styles/globals.css'
import AppLayout from 'components/AppLayout/AppLayout'
import { APIContextProvider } from 'contexts/APIContext'
import { ThemeProvider } from 'theme-ui'
import appTheme from 'styles/appTheme'

function MyApp({ Component, pageProps }) {
  return (
    <APIContextProvider>
      <ThemeProvider theme={appTheme}>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </ThemeProvider>
    </APIContextProvider>
  )
}

export default MyApp

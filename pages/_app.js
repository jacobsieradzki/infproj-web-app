import React from 'react'
import AppLayout from 'components/AppLayout/AppLayout'
import { AppTheme } from '../components/AppLayout/AppLayout.style'
import { APIContextProvider } from 'contexts/APIContext'
import { AuthContextProvider } from '../contexts/AuthContext'
import { PopupContextProvider } from '../contexts/PopupContext'
import { VideoContextProvider } from '../contexts/VideoContext'

import 'styles/globals.css'
import "pdfjs-dist/web/pdf_viewer.css";
import "lib/react-pdf-highlighter/style/pdf_viewer.css"
import "lib/react-pdf-highlighter/style/PdfHighlighter.css"
import "lib/react-pdf-highlighter/style/AreaHighlight.css"
import "lib/react-pdf-highlighter/style/Highlight.css"
import "lib/react-pdf-highlighter/style/MouseSelection.css"
import "lib/react-pdf-highlighter/style/Tip.css"

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <APIContextProvider>
        <VideoContextProvider>
          <PopupContextProvider>
            <AppTheme />
            <AppLayout>
              <Component {...pageProps} />
            </AppLayout>
          </PopupContextProvider>
        </VideoContextProvider>
      </APIContextProvider>
    </AuthContextProvider>
  )
}

export default MyApp

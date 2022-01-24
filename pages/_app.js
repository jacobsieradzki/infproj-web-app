import React from 'react'
import 'styles/globals.css'
import AppLayout from 'components/AppLayout/AppLayout'
import { APIContextProvider } from 'contexts/APIContext'
import { AppTheme } from '../components/AppLayout/AppLayout.style'
// import "pdfjs-dist/"

import "pdfjs-dist/web/pdf_viewer.css";
import "lib/react-pdf-highlighter/style/pdf_viewer.css"
import "lib/react-pdf-highlighter/style/PdfHighlighter.css"
import "lib/react-pdf-highlighter/style/AreaHighlight.css"
import "lib/react-pdf-highlighter/style/Highlight.css"
import "lib/react-pdf-highlighter/style/MouseSelection.css"
import "lib/react-pdf-highlighter/style/Tip.css"
import { VideoContextProvider } from '../contexts/VideoContext'

function MyApp({ Component, pageProps }) {
  return (
    <APIContextProvider>
      <VideoContextProvider>
        <AppTheme />
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </VideoContextProvider>
    </APIContextProvider>
  )
}

export default MyApp

import React, { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import PSPDFKitComponent from 'components/PDF/PSPDFKitComponent'
import Log from 'helper/Logging'
import Resource from 'models/Resource'
import PSPDFKit from 'pspdfkit'
import PDFStyles from 'components/PDF/PDFComponent.style'
const ReactPDFHighlighterComponent = dynamic(import('./ReactPDFHighlighterComponent'), { ssr: false });


type PDFComponentProps = {
  resource: Resource;
}

const PDFComponent: React.FC<PDFComponentProps> = ({ resource }) => {

  return (
    <div>
      {/*<PSPDFKitComponent document={"./example.pdf"} />*/}
      <ReactPDFHighlighterComponent />
    </div>
  );
}

export default PDFComponent
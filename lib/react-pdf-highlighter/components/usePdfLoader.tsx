import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist/legacy/build/pdf'
import React, { useEffect, useState } from 'react'
import { PDFDocumentProxy } from 'pdfjs-dist/types/display/api'

const DEFAULT_WORKER_SOURCE = "https://unpkg.com/pdfjs-dist@2.8.335/build/pdf.worker.min.js";

type PdfLoaderProps = (props: {
  /** See `GlobalWorkerOptionsType`. */
  workerSrc?: string,
  url: string,
  beforeLoad: JSX.Element,
  cMapUrl?: string,
  cMapPacked?: boolean,
}) => ({
  pdfDocument: PDFDocumentProxy;
  error: any;
});

const usePdfLoader: PdfLoaderProps = props => {

  const [workerSrc, setWorkerSrc] = useState(DEFAULT_WORKER_SOURCE);
  useEffect(() => {
    let newSrc = props.workerSrc || DEFAULT_WORKER_SOURCE;
    setWorkerSrc(newSrc);
    GlobalWorkerOptions.workerSrc = newSrc;
  }, [workerSrc]);

  const [pdfDocument, setPdfDocument] = useState<PDFDocumentProxy>(null);
  const [error, setError] = useState("this is an error");
  const documentRef = React.createRef<HTMLElement>();

  useEffect(() => {
    const { ownerDocument = document } = documentRef.current || {};
    const { url, cMapUrl, cMapPacked } = props;
    const discardedDocument = pdfDocument;
    setPdfDocument(null);
    setError(null);

    Promise.resolve()
      .then(() => discardedDocument && discardedDocument.destroy())
      .then(() => {
        if (!url) {
          return;
        }

        return getDocument({
          ...props,
          ownerDocument,
          cMapUrl,
          cMapPacked,
        }).promise.then((pdfDocument) => {
          setPdfDocument(pdfDocument);
        });
      })
      .catch((e) => setError(e));

    return () => pdfDocument?.destroy();
  }, [props.url]);

  return { pdfDocument, error };
}

export default usePdfLoader;

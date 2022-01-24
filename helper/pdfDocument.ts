import { IHighlight } from 'lib/react-pdf-highlighter'
import { NextRouter } from 'next/router'

const resetHash = () => {
  document.location.hash = "";
};

export const PDF_DOCUMENT_HASH_ID_PREFIX = "highlight-";

const parseIdFromHash = (router: NextRouter): string => {
  if (router) {
    let components = router.asPath.split('#');
    if (components.length > 1) {
      let fragment = components.pop();
      if (fragment.length > PDF_DOCUMENT_HASH_ID_PREFIX.length)
      return fragment.slice(PDF_DOCUMENT_HASH_ID_PREFIX.length);
    }
  }
  return null;
}

const getRandomId = (): string => {
  return String(Math.random()).slice(2);
};

const updateHash = (highlight: IHighlight, router: NextRouter) => {
  let noFragmentUrl = router.asPath.split('#')[0];
  if (!highlight) return router.replace(router.pathname, noFragmentUrl, { shallow: true });
  let newUrl = noFragmentUrl + '#' + PDF_DOCUMENT_HASH_ID_PREFIX + highlight.id;
  return router.replace(router.pathname, newUrl, { shallow: true });
};

export const PdfDocumentHelper = {
  resetHash,
  parseIdFromHash,
  getRandomId,
  updateHash,
}

export default PdfDocumentHelper
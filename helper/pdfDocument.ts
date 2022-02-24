import { IHighlight } from 'lib/react-pdf-highlighter'
import { NextRouter } from 'next/router'

const resetHash = () => {
  document.location.hash = "";
};

export const PDF_DOCUMENT_HASH_ID_PREFIX = "highlight-";
export const PDF_DOCUMENT_HASH_PAGE_ID_PREFIX = "page-";

const parseIdFromHash = (router: NextRouter): string => {
  if (router) {
    let components = router.asPath.split('#');
    let fragment = components.pop() || "";
    console.log(components, fragment);
    if (fragment.startsWith(PDF_DOCUMENT_HASH_ID_PREFIX)) {
      if (fragment.length > PDF_DOCUMENT_HASH_ID_PREFIX.length) {
        return fragment.slice(PDF_DOCUMENT_HASH_ID_PREFIX.length);
      }
    }
    if (fragment.startsWith(PDF_DOCUMENT_HASH_PAGE_ID_PREFIX)) {
      if (fragment.length > PDF_DOCUMENT_HASH_PAGE_ID_PREFIX.length) {
        return fragment.slice(PDF_DOCUMENT_HASH_PAGE_ID_PREFIX.length);
      }
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
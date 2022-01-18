import Loader from 'components/Loader/Loader'
import Log from 'helper/Logging'
import React, { useEffect, useState } from 'react'

import {
  PdfLoader,
  PdfHighlighter,
  Tip,
  Highlight,
  Popup,
  AreaHighlight,
} from "lib/react-pdf-highlighter";

import type { IHighlight, NewHighlight } from "lib/react-pdf-highlighter";

import { testHighlights as _testHighlights } from "./test-highlights";
import { Sidebar } from "./Sidebar";

// import "./style/App.css";

const testHighlights: Record<string, Array<IHighlight>> = _testHighlights;

interface State {
  url: string;
  highlights: Array<IHighlight>;
}

const getNextId = () => String(Math.random()).slice(2);

const parseIdFromHash = () =>
  document.location.hash.slice("#highlight-".length);

const resetHash = () => {
  document.location.hash = "";
};

const HighlightPopup = ({
  comment,
}: {
  comment: { text: string; emoji: string };
}) =>
  comment.text ? (
    <div className="Highlight__popup">
      {comment.emoji} {comment.text}
    </div>
  ) : null;

const PRIMARY_PDF_URL = "https://arxiv.org/pdf/1708.08021.pdf";
const SECONDARY_PDF_URL = "https://arxiv.org/pdf/1604.02480.pdf";

const searchParams = new URLSearchParams(document.location.search);

const initialUrl = searchParams.get("url") || PRIMARY_PDF_URL;

const ReactPDFHighlighterComponent = ({ }) => {

  const [url, setUrl] = useState(initialUrl);
  const [highlights, setHighlights] = useState(testHighlights[initialUrl]
    ? [...testHighlights[initialUrl]]
    : []);

  const resetHighlights = () => {
    setHighlights([]);
  };

  const toggleDocument = () => {
    const newUrl = url === PRIMARY_PDF_URL ? SECONDARY_PDF_URL : PRIMARY_PDF_URL;

    setUrl(newUrl);
    setHighlights(testHighlights[newUrl] ? [...testHighlights[newUrl]] : []);
  };

  const scrollViewerTo = (highlight: any) => {};

  const scrollToHighlightFromHash = () => {
    const highlight = getHighlightById(parseIdFromHash());

    if (highlight) {
      scrollViewerTo(highlight);
    }
  };

  useEffect(() => {
    window.addEventListener(
      "hashchange",
      scrollToHighlightFromHash,
      false
    );
  }, [])

  const getHighlightById = (id: string) => {
    return highlights.find((highlight) => highlight.id === id);
  }

  const addHighlight = (highlight: NewHighlight) => {
    Log.debug("PDF", "addHighlight", highlight);
    setHighlights([{ ...highlight, id: getNextId() }, ...highlights]);
  }

  console.log(highlights);

  const updateHighlight = (highlightId: string, position: Object, content: Object) => {
    console.log("Updating highlight", highlightId, position, content);
    setHighlights(highlights.map((h) => {
      const {
        id,
        position: originalPosition,
        content: originalContent,
        ...rest
      } = h;
      return id === highlightId
        ? {
          id,
          position: { ...originalPosition, ...position },
          content: { ...originalContent, ...content },
          ...rest,
        }
        : h;
    }))
  }

  return (
    <div className="App" style={{ display: "flex", width: "100%", height: "70vh" }}>
      <Sidebar
        highlights={highlights}
        resetHighlights={resetHighlights}
        toggleDocument={toggleDocument}
      />
      <div
        style={{
          height: "70vh",
          width: "100%",
          position: "relative",
        }}
      >
        <PdfLoader url={url} beforeLoad={<Loader />}>
          {(pdfDocument) => (
            <div>
              <p>PDF</p>
              <PdfHighlighter
                pdfDocument={pdfDocument}
                enableAreaSelection={(event) => event.altKey}
                onScrollChange={resetHash}
                pdfScaleValue="page-width"
                scrollRef={(scrollTo) => {
                  scrollViewerTo(scrollTo);
                  scrollToHighlightFromHash();
                }}
                onSelectionFinished={(
                  position,
                  content,
                  hideTipAndSelection,
                  transformSelection
                ) => (
                  <Tip
                    onOpen={transformSelection}
                    onConfirm={(comment) => {
                      addHighlight({ content, position, comment });
                      hideTipAndSelection();
                    }}
                  />
                )}
                highlightTransform={(
                  highlight,
                  index,
                  setTip,
                  hideTip,
                  viewportToScaled,
                  screenshot,
                  isScrolledTo
                ) => {
                  const isTextHighlight = !Boolean(
                    highlight.content && highlight.content.image
                  );

                  const component = isTextHighlight ? (
                    <Highlight
                      isScrolledTo={isScrolledTo}
                      position={highlight.position}
                      comment={highlight.comment}
                    />
                  ) : (
                    <AreaHighlight
                      isScrolledTo={isScrolledTo}
                      highlight={highlight}
                      onChange={(boundingRect) => {
                        updateHighlight(
                          highlight.id,
                          { boundingRect: viewportToScaled(boundingRect) },
                          { image: screenshot(boundingRect) }
                        );
                      }}
                    />
                  );

                  return (
                    <Popup
                      popupContent={<HighlightPopup {...highlight} />}
                      onMouseOver={(popupContent) =>
                        setTip(highlight, (highlight) => popupContent)
                      }
                      onMouseOut={hideTip}
                      key={index}
                    >
                      {component}
                    </Popup>
                  );
                }}
                highlights={highlights}
              />
            </div>
          )}
        </PdfLoader>
      </div>
    </div>
  );
}

export default ReactPDFHighlighterComponent;
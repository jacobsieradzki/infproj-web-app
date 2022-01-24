import Clip from 'models/Clip'
import React, { useEffect, useState } from 'react'
import { HighlightPopup } from 'components/PDF/PDFHighlight'
import Log from 'helper/Logging'
import PdfDocumentHelper from 'helper/pdfDocument'
import { AreaHighlight, Highlight, IHighlight, NewHighlight, PdfHighlighter, Popup, Tip } from 'lib/react-pdf-highlighter'
import { PDFDocumentProxy } from 'pdfjs-dist/types/display/api'
import Resource from 'models/Resource'

type PDFComponentProps = {
  resource: Resource;
  pdfDocument: PDFDocumentProxy;
  clips: Clip[];
  setClips: React.Dispatch<React.SetStateAction<Clip[]>>;
  highlights: IHighlight[];
  setHighlights: React.Dispatch<React.SetStateAction<IHighlight[]>>;
  currentHighlight: string;
}

const PDFComponent: React.FC<PDFComponentProps> = ({
  resource,
  pdfDocument,
  clips,
  setClips,
  highlights: _H,
  setHighlights,
  currentHighlight,
}) => {

  let highlights = clips.filter(x => !!x.highlight).map(x => new Clip(x).toLibraryModel());

  const [scrollTo, setScrollTo] = useState(null);

  // --------------------------------------------------
  // Highlight Helpers
  // --------------------------------------------------

  const getHighlightById = (id: string) => highlights.find((highlight) => highlight.id === id);

  useEffect(() => {
    window.addEventListener("hashchange", scrollToHighlightFromHash, false);
  }, []);

  useEffect(() => {
    scrollToHighlightFromHash();
  }, [currentHighlight]);

  // --------------------------------------------------
  // Actions
  // --------------------------------------------------

  const scrollToHighlightFromHash = () => {
    const highlight = getHighlightById(currentHighlight);
    if (highlight) {
      setScrollTo(f => {
        if (f) f(highlight);
        return f;
      });
    }
  };

  const addHighlight = (highlight: NewHighlight) => {
    Log.debug("PDF", "Adding highlight...", { highlight });
    setClips([Clip.fromHighlight(highlight), ...clips]);
  }

  const updateHighlight = (highlightId: string, position: Object, content: Object) => {
    // Log.debug("PDF", "Updating highlight...", { highlightId, position, content });
    // setHighlights(highlights.map((h) => {
    //   const { id, position: originalPosition, content: originalContent, ...rest } = h;
    //   return id === highlightId
    //     ? { id, position: { ...originalPosition, ...position }, content: { ...originalContent, ...content }, ...rest, }
    //     : h;
    // }));
  }

  // --------------------------------------------------
  // Render
  // --------------------------------------------------

  return (
    <PdfHighlighter
      pdfDocument={pdfDocument}
      highlights={highlights}
      scrollRef={scrollFunction => {
        setScrollTo(val => scrollFunction);
        scrollToHighlightFromHash();
      }}
      enableAreaSelection={e => e.altKey}
      onScrollChange={PdfDocumentHelper.resetHash}
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
        let isTextHighlight: boolean = !!highlight.content?.text;
        let useTextHighlight: boolean = isTextHighlight && highlight.position.rects.length > 0;
        let isSelected = currentHighlight == highlight.id;

        const component = useTextHighlight ? (
          <Highlight
            isScrolledTo={isSelected}
            position={highlight.position}
            comment={highlight.comment}
          />
        ) : (
          <AreaHighlight
            isScrolledTo={isSelected}
            highlight={highlight}
            onChange={(boundingRect) => {
              if (!isTextHighlight) updateHighlight(
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
    />
  );
}

export default PDFComponent
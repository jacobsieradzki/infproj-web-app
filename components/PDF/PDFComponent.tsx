import React, { useEffect, useState } from 'react'
import postNewHighlight from 'classroomapi/postNewHighlight'
import { refreshUseGetClips } from 'classroomapi/useGetClips'
import useAuthContext from 'contexts/AuthContext'
import usePopupContext from 'contexts/PopupContext'
import Clip from 'models/Clip'
import { HighlightPopup } from 'components/PDF/PDFHighlight'
import Log from 'helper/Logging'
import PdfDocumentHelper from 'helper/pdfDocument'
import { AreaHighlight, Highlight, IHighlight, NewHighlight, PdfHighlighter, Popup, Tip } from 'lib/react-pdf-highlighter'
import { PDFDocumentProxy } from 'pdfjs-dist/types/display/api'
import Resource from 'models/Resource'

type PDFComponentProps = {
  canCreateHighlights: boolean;
  resource: Resource;
  pdfDocument: PDFDocumentProxy;
  highlights: IHighlight[];
  currentHighlight: string;
  triggerRefresh: () => void;
}

const PDFComponent: React.FC<PDFComponentProps> = ({
  canCreateHighlights,
  resource,
  pdfDocument,
  highlights,
  currentHighlight,
  triggerRefresh,
}) => {
  const { authState } = useAuthContext();
  const { showStandardError, showError } = usePopupContext();

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

  const showPermissionPopup = () => {
    showError("You do not have permission to create a highlight here. You can enroll to the course or contact a course administrator.");
  }

  const addHighlight = async (highlight: NewHighlight) => {
    if (!canCreateHighlights) {
      return showPermissionPopup();
    }

    let newClip = Clip.fromHighlight(highlight, resource);
    Log.debug("PDF", "Adding highlight...", { newClip, highlight });

    let response = await postNewHighlight(authState, newClip);
    if (!!response) {
      Log.debug("PDF", "Added highlight.", { response });
      triggerRefresh();
    } else {
      showStandardError();
    }
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
      ) => {
        if (!canCreateHighlights) {
          showPermissionPopup();
          return <></>;
        } else {
          return (
            <Tip
              onOpen={transformSelection}
              onConfirm={(comment) => {
                addHighlight({ content, position, comment });
                hideTipAndSelection();
              }}
            />
          )
        }
      }}
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
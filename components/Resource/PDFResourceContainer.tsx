import useGetClips from 'classroomapi/useGetClips'
import useGetHighlights from 'classroomapi/useGetHighlights'
import ResourceHeader from 'components/Header/ResourceHeader'
import Clip from 'models/Clip'
import Highlight from 'models/Highlight'
import Link from 'models/Link'
import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import HighlightList from 'components/Highlights/HighlightList'
import PdfDocumentHelper from 'helper/pdfDocument'
import { IHighlight } from 'lib/react-pdf-highlighter'
import { useGetLinksForResource } from 'classroomapi/useGetLinks'
import Loader from 'components/Loader/Loader'
import { ResourceContainerProps, TabItem, TabType } from 'components/Resource/ResourceContainer'
import usePdfLoader from 'lib/react-pdf-highlighter/components/usePdfLoader'
import { HorizontalStack } from 'components/GlobalStyles'
import ResourceStyles from 'components/Resource/ResourceContainer.style'
const PDFComponent = dynamic(import('components/PDF/PDFComponent'), { ssr: false });

const PDFResourceContainer: React.FC<ResourceContainerProps> = ({
  organisation,
  course,
  event,
  resource
}) => {

  const router = useRouter();

  const [tab, setTab] = useState<TabType>("RESOURCES");

  const { pdfDocument, error: pdfError } = usePdfLoader({
    url: resource.url,
    beforeLoad: <Loader style={{ margin: "24px auto" }} />
  });

  const [pages, setPages] = useState<Clip[]>([]);
  const [apiPages, setApiPages] = useState<Clip[]>([]);
  const [highlights, setHighlights] = useState<Clip[]>([]);
  const [libraryHighlights, setLibraryHighlights] = useState<IHighlight[]>([]);
  const [_links, setLinks] = useState<Link[]>([]);


  let _currentHighlight = PdfDocumentHelper.parseIdFromHash(router);
  const [currentHighlight, setCurrentHighlight] = useState(_currentHighlight);
  useEffect(() => {
    setCurrentHighlight(PdfDocumentHelper.parseIdFromHash(router));
  }, [_currentHighlight]);

  const { data: links, loading: linksLoading } = useGetLinksForResource({ id: resource.id, courseId: course.id,
    onCompleted: res => {

    }
  });

  const { loading: clipsLoading } = useGetClips({ resourceId: resource.id, courseId: course.id,
    onCompleted: res => {
      console.log('AAAAALL CLIPS', res);
      let results = res.map(x => new Clip(x));
      let clipHighlights = results.filter(x => !!x.highlight && x.type == "PDF_CLIP");
      setApiPages(results.filter(x => x.type == "PDF_PAGE"));
      setHighlights(clipHighlights);
      setLibraryHighlights(clipHighlights.map(x => new Clip(x).toLibraryModel()));
    }
  });

  // Fill API pages with pre made pages
  useEffect(() => {
    const perform = async () => {
      let _clips: Clip[] = [];
      console.log("API PAGES", apiPages);
      for (let i = 1; i <= pdfDocument.numPages; i++) {
        let existingClip = apiPages.find(x => x.type == "PDF_PAGE" && x.start_location == i);
        let pageClip = await Clip.forPageOfPdf(pdfDocument, i, existingClip?.description);
        _clips.push(pageClip);
      }
      setPages(_clips);
    }
    if (pdfDocument) perform();
  }, [pdfDocument, apiPages]);


  let loading = clipsLoading || linksLoading;

  // let pages = pages that contain highlights and links
  // let apiPages = pages created from the API, null coalesced with a created one
  // let highlights = highlights that are specific to a page number and contain links
  // let links = links that are attributed to either a page or a link


  return (
    <ResourceStyles.Container>
      <ResourceStyles.Content>
        <ResourceHeader {...{ organisation, course, event, resource }} />

        <ResourceStyles.PDFWrapper>
          {pdfDocument && <PDFComponent {...{
            resource,
            pdfDocument,
            clips: [],
            setClips: c => console.log(c),
            highlights: highlights.map(x => x.toLibraryModel()),
            setHighlights: h => console.log(h),
            currentHighlight
          }} />}
          {pdfError && <p>Something went wrong loading this PDF:<br/>{JSON.stringify(pdfError)}</p>}
        </ResourceStyles.PDFWrapper>

      </ResourceStyles.Content>

      <ResourceStyles.Column>
        <HorizontalStack gap={16}>
          <TabItem tabId={"RESOURCES"} {...{ tab, setTab }}>
            Resources
          </TabItem>
          <TabItem tabId={"DISCUSSION"} {...{ tab, setTab }}>
            Discussion
          </TabItem>
        </HorizontalStack>
        <ResourceStyles.ColumnContent>
          {tab === "RESOURCES" ? (
            <HighlightList
              loading={loading}
              course={course}
              resource={resource}
              highlights={highlights}
              links={links}
              pageClips={pages}
              currentHighlight={currentHighlight}
              isDiscussion={false}
            />
          ) : (
            <HighlightList
              loading={loading}
              course={course}
              resource={resource}
              highlights={highlights}
              links={[]}
              pageClips={[]}
              currentHighlight={null}
              isDiscussion={true}
            />
          )}
        </ResourceStyles.ColumnContent>
      </ResourceStyles.Column>
    </ResourceStyles.Container>
  )
}

export default PDFResourceContainer
import useGetClips from 'api/useGetClips'
import Clip from 'models/Clip'
import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import useGetHighlights from 'api/useGetHighlights'
import HighlightList from 'components/Highlights/HighlightList'
import PdfDocumentHelper from 'helper/pdfDocument'
import { IHighlight } from 'lib/react-pdf-highlighter'
import { useGetLinksForResource } from 'api/useGetLinks'
import Loader from 'components/Loader/Loader'
import { ResourceContainerProps, TabContent, TabItem, TabType } from 'components/Resource/ResourceContainer'
import usePdfLoader from 'lib/react-pdf-highlighter/components/usePdfLoader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs'
import { HorizontalStack } from 'components/GlobalStyles'
import ResourceStyles from 'components/Resource/ResourceContainer.style'
import { COURSE_ROUTE, generateCourseRoute, generateOrganisationRoute, HOME_ROUTE, ORGANISATION_COURSES_ROUTE } from 'constants/navigation'
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

  const [clips, setClips] = useState<Clip[]>([]);
  const [highlights, setHighlights] = useState<IHighlight[]>([]);
  const [pageHighlights, setPageHighlights] = useState<Clip[]>([]);



  let _currentHighlight = PdfDocumentHelper.parseIdFromHash(router);
  const [currentHighlight, setCurrentHighlight] = useState(_currentHighlight);
  useEffect(() => {
    setCurrentHighlight(PdfDocumentHelper.parseIdFromHash(router));
  }, [_currentHighlight]);

  const { data: links } = useGetLinksForResource({ id: resource.id, courseId: course.id });

  useGetClips({ resourceId: resource.id, courseId: course.id,
    onCompleted: res => {
      let clipHighlights = res.filter(x => !!x.highlight).map(x => new Clip(x).toLibraryModel());
      setClips(res);
      setHighlights(clipHighlights);
    }
  });

  useEffect(() => {
    const perform = async () => {
      setPageHighlights(await Clip.forPagesOfPdf(pdfDocument));
    }
    if (pdfDocument) perform();
  }, [pdfDocument]);

  console.log(">>> render")
  console.log(clips);
  console.log(links);
  console.log(">>>")

  let resourceOrEventBreadcrumb = event
    ? { label: "Events", url: generateCourseRoute(organisation.id, course.id) }
    : { label: "Resources"}

  return (
    <ResourceStyles.Container>
      <ResourceStyles.Content>
        <ResourceStyles.Header>
          <Breadcrumbs items={[
            { label: "Home", url: HOME_ROUTE },
            { label: organisation.name, url: generateOrganisationRoute(organisation.id) },
            { label: course.name, url: generateCourseRoute(organisation.id, course.id) },
            resourceOrEventBreadcrumb,
            { label: resource.getTypeLabel() },
          ]} />

          {event ? (
            <h1>
              <FontAwesomeIcon icon={event.getIcon()} />&nbsp;&nbsp;
              {event.getTypeLabel()}: {event.name}
            </h1>
          ) : (
            <h1>
              <FontAwesomeIcon icon={resource.getIcon()} />&nbsp;&nbsp;
              {resource.name}
            </h1>
          )}
        </ResourceStyles.Header>

        <ResourceStyles.PDFWrapper>
          {pdfDocument && <PDFComponent {...{ resource, pdfDocument, clips, setClips, highlights, setHighlights, currentHighlight }} />}
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
        <TabContent tabId={"RESOURCES"} tab={tab}>
          <HighlightList
            course={course}
            resource={resource}
            links={links}
            clips={clips}
            pageClips={pageHighlights}
            currentHighlight={currentHighlight}
          />
        </TabContent>
        {/*<TabContent tabId={"DISCUSSION"} tab={tab}>*/}
        {/*<SubtitleList course={course} resource={resource} playerSeconds={currentTime} autoPlay={autoPlay} />*/}
        {/*</TabContent>*/}
      </ResourceStyles.Column>
    </ResourceStyles.Container>
  )
}

export default PDFResourceContainer
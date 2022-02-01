import { useGetLinksForResource } from 'classroomapi/useGetLinks'
import PDFComponent from 'components/PDF/PDFComponent'
import PDFResourceContainer from 'components/Resource/PDFResourceContainer'
import VideoResourceContainer from 'components/Resource/VideoResourceContainer'
import SubtitleList from 'components/Subtitles/SubtitleList'
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs'
import { HorizontalStack, Spacer } from 'components/GlobalStyles'
import ResourceStyles from 'components/Resource/ResourceContainer.style'
import VideoComponent from 'components/Video/VideoComponent'
import { COURSE_ROUTE, generateCourseRoute, generateOrganisationRoute, HOME_ROUTE, ORGANISATION_COURSES_ROUTE } from 'constants/navigation'
import Course from 'models/Course'
import Event from 'models/Event'
import Organisation from 'models/Organisation'
import Resource from 'models/Resource'

export type ResourceContainerProps = {
  organisation?: Organisation;
  course?: Course;
  event?: Event;
  resource?: Resource;
}

export type TabType = "RESOURCES" | "DISCUSSION";
export const TabItem = ({ tabId, tab, setTab, children }) => (
  <ResourceStyles.ColumnTab
    id={tab.toLowerCase() + "_key"}
    className={tab == tabId ? "selected" : ""}
    onClick={() => setTab(tabId)}
  >{children}</ResourceStyles.ColumnTab>
)

export const TabContent = ({ tabId, tab, children }) => (
  <ResourceStyles.ColumnContent
    className={tab == tabId ? "" : "hidden"}
  >{children}</ResourceStyles.ColumnContent>
)

const ResourceContainer: React.FC<ResourceContainerProps> = props => {

  const { organisation = null, course = null, event = null, resource = null } = props;

  const [tab, setTab] = useState<TabType>("RESOURCES");
  const [currentTime, setCurrentTime] = useState(0);
  const [pdfProps, setPdfProps] = useState(null);

  const { data: links, loading, error } = useGetLinksForResource({ id: resource.id , courseId: course.id });

  let isLectureVideo = resource.url && resource.type == "VID";
  let isPDF = resource.url && resource.type == "PDF";

  if (isLectureVideo) {
    return <VideoResourceContainer {...props} />
  }

  if (isPDF) {
    return <PDFResourceContainer {...props} />
  }

  return (
    <ResourceStyles.Container>
      <ResourceStyles.Content>
        <ResourceStyles.Header>
          <Breadcrumbs items={[
            { label: "Home", url: HOME_ROUTE },
            { label: organisation.name, url: generateOrganisationRoute(organisation.id) },
            { label: course.name, url: generateCourseRoute(organisation.id, course.id) },
            { label: "Resource" },
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

        <p>Content!!</p>

        <div style={{ backgroundColor: "white" }}>
          <pre>{JSON.stringify(organisation, null, 2)}</pre>
          <pre>{JSON.stringify(course, null, 2)}</pre>
          <pre>{JSON.stringify(event, null, 2)}</pre>
          <pre>{JSON.stringify(resource, null, 2)}</pre>
        </div>
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
          <p>Resources</p>
        </TabContent>
        {/*<TabContent tabId={"DISCUSSION"} tab={tab}>*/}
          {/*<SubtitleList course={course} resource={resource} playerSeconds={currentTime} autoPlay={autoPlay} />*/}
        {/*</TabContent>*/}
      </ResourceStyles.Column>
    </ResourceStyles.Container>
  )
}

export default ResourceContainer
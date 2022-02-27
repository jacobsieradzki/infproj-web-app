import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import React, { useState } from 'react'
import { useGetLinksForResource } from 'classroomapi/useGetLinks'
import PDFResourceContainer from 'components/Resource/PDFResourceContainer'
import VideoResourceContainer from 'components/Resource/VideoResourceContainer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs'
import { HorizontalStack } from 'components/GlobalStyles'
import ResourceStyles from 'components/Resource/ResourceContainer.style'
import { HOME_ROUTE, generateCourseRoute, generateOrganisationRoute, generateCourseRouteMenu } from 'constants/navigation'
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

export type TabType = "RESOURCES" | "DISCUSSION" | "SUBTITLES";
export const TabItem = ({ tabId = "", tab = "", setTab = null, children, compact = false, onClick = null }) => (
  <ResourceStyles.ColumnTab
    id={tab.toLowerCase() + "_key"}
    className={`${tabId.length > 0 && tab == tabId ? "selected" : ""} ${compact ? "compact" : ""}`}
    onClick={onClick || (() => setTab(tabId))}
  >{children}</ResourceStyles.ColumnTab>
)

const ResourceContainer: React.FC<ResourceContainerProps> = props => {

  const { organisation = null, course = null, event = null, resource = null } = props;

  const [tab, setTab] = useState<TabType>("RESOURCES");

  let isLectureVideo = !!resource?.url && resource?.type == "VID";
  if (isLectureVideo) return <VideoResourceContainer {...props} />

  let isPDF = !!resource?.url && resource?.type == "PDF";
  if (isPDF) return <PDFResourceContainer {...props} />

  return (
    <ResourceStyles.Container>
      <ResourceStyles.Content>
        <ResourceStyles.Header>
          <Breadcrumbs items={[
            { label: "Home", url: HOME_ROUTE },
            { label: organisation.name, url: generateOrganisationRoute(organisation.id) },
            { label: course?.name, url: generateCourseRoute(organisation.id, course?.id) },
            { label: "Resources", url: generateCourseRouteMenu(organisation.id, course?.id, "resources") },
            { label: resource?.getTypeLabel() },
          ]} />

          {event && (
            <h1>
              <FontAwesomeIcon icon={event.getIcon()} />&nbsp;&nbsp;
              {event.getTypeLabel()}: {event.name}
            </h1>
          )}
          {!!resource && !event && (
            <h1>
              <FontAwesomeIcon icon={resource.getIcon()} />&nbsp;&nbsp;
              {resource.name}
            </h1>
          )}
          {!resource && !event && (
            <h1>
              <FontAwesomeIcon icon={faExclamationTriangle} color={"var(--accent-color)"} />&nbsp;
              Resource not found
            </h1>
          )}
        </ResourceStyles.Header>
      </ResourceStyles.Content>

      {!!resource && <ResourceStyles.Column>
        <HorizontalStack gap={16}>
          <TabItem tabId={'RESOURCES'} {...{ tab, setTab }}>
            Resources
          </TabItem>
          <TabItem tabId={'DISCUSSION'} {...{ tab, setTab }}>
            Discussion
          </TabItem>
        </HorizontalStack>
        <ResourceStyles.ColumnContent className={"with-tabs border"}>
          {tab === 'RESOURCES' ? (
            <p>Resources!</p>
          ) : (
            <p>Discussion!</p>
          )}
        </ResourceStyles.ColumnContent>
      </ResourceStyles.Column>}
    </ResourceStyles.Container>
  )
}

export default ResourceContainer
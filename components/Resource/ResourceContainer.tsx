import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import ResourceHeader from 'components/Header/ResourceHeader'
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

  let isLectureVideo = !!resource?.url && resource?.type == "VID";
  if (isLectureVideo) return <VideoResourceContainer {...props} />

  let isPDF = !!resource?.url && resource?.type == "PDF";
  if (isPDF) return <PDFResourceContainer {...props} />

  return (
    <ResourceStyles.Container>
      <ResourceStyles.Content>
        <ResourceHeader organisation={organisation} course={course} resource={resource} />
      </ResourceStyles.Content>
    </ResourceStyles.Container>
  )
}

export default ResourceContainer
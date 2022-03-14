import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import Course from 'models/Course'
import Organisation from 'models/Organisation'
import Event from 'models/Event'
import Resource from 'models/Resource'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs'
import ResourceStyles from 'components/Resource/ResourceContainer.style'
import { generateCourseRoute, generateCourseRouteMenu, generateOrganisationRoute, HOME_ROUTE } from 'constants/navigation'

type ResourceHeaderProps = {
  organisation: Organisation;
  course: Course;
  event?: Event;
  resource: Resource;
}

const ResourceHeader: React.FC<ResourceHeaderProps> = ({ organisation, course, event, resource }) => {

  let resourcesOrEventsBreadcrumb = event
    ? { label: "Events", url: generateCourseRouteMenu(organisation?.id, course?.id, "events") }
    : { label: "Resources", url: generateCourseRouteMenu(organisation?.id, course?.id, "resources") };
  let label = { label: event?.getTypeLabel() || resource?.getTypeLabel() };

  return (
    <ResourceStyles.Header>
      <Breadcrumbs items={[
        { label: "Home", url: HOME_ROUTE },
        { label: organisation?.name, url: generateOrganisationRoute(organisation?.id) },
        { label: course?.name, url: generateCourseRoute(organisation?.id, course?.id) },
        resourcesOrEventsBreadcrumb,
        label,
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
      {resource && <span>{resource.description}</span>}
    </ResourceStyles.Header>
  )
}

export default ResourceHeader
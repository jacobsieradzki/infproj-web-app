import Course from 'models/Course'
import Organisation from 'models/Organisation'
import Event from 'models/Event'
import Resource from 'models/Resource'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs'
import ResourceStyles from 'components/Resource/ResourceContainer.style'
import { generateCourseRoute, generateOrganisationRoute, HOME_ROUTE } from 'constants/navigation'

type ResourceHeaderProps = {
  organisation: Organisation;
  course: Course;
  event?: Event;
  resource: Resource;
}

const ResourceHeader: React.FC<ResourceHeaderProps> = ({ organisation, course, event, resource }) => {

  let resourcesOrEventsBreadcrumb = event
    ? { label: "Events", url: generateCourseRoute(organisation.id, course.id) }
    : { label: "Resources" };
  let label = { label: event?.getTypeLabel() || resource.getTypeLabel() };

  return (
    <ResourceStyles.Header>
      <Breadcrumbs items={[
        { label: "Home", url: HOME_ROUTE },
        { label: organisation.name, url: generateOrganisationRoute(organisation.id) },
        { label: course.name, url: generateCourseRoute(organisation.id, course.id) },
        resourcesOrEventsBreadcrumb,
        label,
      ]} />

      {event ? (
        <h1>
          <FontAwesomeIcon icon={event.getIcon()} />&nbsp;&nbsp;
          {event.name}
        </h1>
      ) : (
        <h1>
          <FontAwesomeIcon icon={resource.getIcon()} />&nbsp;&nbsp;
          {resource.name}
        </h1>
      )}
    </ResourceStyles.Header>
  )
}

export default ResourceHeader
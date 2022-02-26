import ResourceContainer from 'components/Resource/ResourceContainer'
import Event from 'models/Event'
import Course from 'models/Course'
import Organisation from 'models/Organisation'
import Resource from 'models/Resource'
import React from 'react'
import useGetEvent from 'classroomapi/useGetEvent'
import useGetOrganisation from 'classroomapi/useGetOrganisation'
import { ContentCenterInPage } from 'components/AppLayout/AppLayout.style'
import Loader from 'components/Loader/Loader'

type EventContainerProps = {
  organisationId: string;
  courseId: string;
  eventId: string;
}

const EventContainer: React.FC<EventContainerProps> = ({ organisationId, courseId, eventId }) => {

  const organisationRes = useGetOrganisation({ organisationId });
  const eventRes = useGetEvent({ courseId, eventId });

  let organisation = organisationRes?.data;
  let event = eventRes?.data;
  let course = event?.course;
  let resource = event?.primary_resource;

  if (organisationRes.loading || eventRes.loading) {
    return (
      <ContentCenterInPage>
        <Loader />
      </ContentCenterInPage>
    )
  }

  return <ResourceContainer
    organisation={organisation ? new Organisation(organisation) : null}
    course={course ? new Course(course) : null}
    event={event ? new Event(event) : null}
    resource={resource ? new Resource(resource) : null}
  />;
}

export default EventContainer
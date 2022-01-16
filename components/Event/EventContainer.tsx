import ResourceContainer from 'components/Resource/ResourceContainer'
import Course from 'models/Course'
import Organisation from 'models/Organisation'
import Resource from 'models/Resource'
import React from 'react'
import useGetEvent from 'api/useGetEvent'
import useGetOrganisation from 'api/useGetOrganisation'
import { ContentCenterInPage } from 'components/AppLayout/AppLayout.style'
import Loader from 'components/Loader/Loader'
import Event from 'models/Event'

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
    organisation={organisation}
    course={course}
    event={event}
    resource={resource}
  />;
}

export default EventContainer
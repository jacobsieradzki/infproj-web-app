import React from 'react'
import { useRouter } from 'next/router';
import LinkView from 'components/Link/LinkView'
import { generateEventRoute } from 'constants/navigation'
import Event from 'models/Event'

type EventPreviewProps = {
  event: Event;
}

const EventPreview: React.FC<EventPreviewProps> = ({ event }) => {

  const router = useRouter();
  const organisationId = router?.query?.organisationId?.toString() || "";

  return (
    <LinkView
      title={event.name}
      subtitle={event.description}
      icon={event.getIcon()}
      color={"white"}
      href={generateEventRoute(organisationId, event.course_id, event.id)}
    />
  )
}

export default EventPreview
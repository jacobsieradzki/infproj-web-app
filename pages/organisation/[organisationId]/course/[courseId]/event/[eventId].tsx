import React from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import EventContainer from 'components/Event/EventContainer'

const Page: NextPage = ({ }) => {

  const router = useRouter();
  const organisationId = router.query.organisationId?.toString();
  const courseId = router.query.courseId?.toString();
  const eventId = router.query.eventId?.toString();

  return (
    <EventContainer
      organisationId={organisationId}
      courseId={courseId}
      eventId={eventId}
    />
  )
}

export default Page;
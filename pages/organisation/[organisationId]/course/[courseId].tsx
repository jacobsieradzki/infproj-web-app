import React from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import EventsList from 'components/EventsList/EventsList'

const Page: NextPage = ({ }) => {

  const router = useRouter();
  const organisationId = router.query.organisationId?.toString();
  const courseId = router.query.courseId?.toString();

  return (
    <EventsList organisationId={organisationId} courseId={courseId} />
  )
}

export default Page;
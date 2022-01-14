import React from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import CoursesList from 'components/CoursesList/CoursesList'

const Page: NextPage = ({ }) => {

  const router = useRouter();
  const organisationId = router.query.organisationId?.toString();

  return (
    <CoursesList organisationId={organisationId} />
  )
}

export default Page;
import React from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import PageResourceContainer from 'components/Resource/PageResourceContainer'

const Page: NextPage = ({ }) => {

  const router = useRouter();
  const organisationId = router.query.organisationId?.toString();
  const courseId = router.query.courseId?.toString();
  const resourceId = router.query.resourceId?.toString();

  return (
    <PageResourceContainer
      organisationId={organisationId}
      courseId={courseId}
      resourceId={resourceId}
    />
  )
}

export default Page;
import React from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import CourseScreen from 'components/CourseScreen/CourseScreen'

const Page: NextPage = ({ }) => {

  const router = useRouter();
  const organisationId = router.query.organisationId?.toString() || "";
  const courseId = router.query.courseId?.toString() || "";

  return <CourseScreen organisationId={organisationId} courseId={courseId} />;
}

export default Page;
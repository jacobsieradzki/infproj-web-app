import useGetCoursesForOrganisation from 'api/useGetCoursesForOrganisation'
import useGetOrganisation from 'api/useGetOrganisation'
import { useRouter } from 'next/router'
import React from 'react'
import { NextPage } from 'next'

const Page: NextPage = ({ }) => {

  const router = useRouter();
  const organisationId = router.query.organisationId?.toString();

  const { data: organisation } = useGetOrganisation({ organisationId });
  const { data, loading, error } = useGetCoursesForOrganisation({ organisationId });

  return (
    <div>
      <h1>{organisation ? organisation.name : "Courses"}</h1>
      {data.map(course => (
        <div key={course.id}>
          <p>{course.name}</p>
        </div>
      ))}
    </div>
  )
}

export default Page;
import { ContentCenterInPage } from 'components/AppLayout/AppLayout.style'
import CourseBox from 'components/CoursesList/CourseBox'
import { Grid } from 'components/GlobalStyles'
import Loader from 'components/Loader/Loader'
import OrganisationBox from 'components/Organisations/OrganisationBox'
import React from 'react'
import CoursesListStyles from './CoursesList.style'
import useGetCoursesForOrganisation from 'api/useGetCoursesForOrganisation'
import useGetOrganisation from 'api/useGetOrganisation'

type CoursesListProps = {
  organisationId: string;
}

const CoursesList: React.FC<CoursesListProps> = ({ organisationId }) => {

  const {
    data: organisation,
    loading: organisationLoading,
    error: organisationError
  } = useGetOrganisation({ organisationId });
  const {
    data: courses,
    loading: coursesLoading,
    error: coursesError
  } = useGetCoursesForOrganisation({ organisationId });



  if (organisationLoading || coursesLoading) {
    return (
      <ContentCenterInPage>
        <Loader />
      </ContentCenterInPage>
    )
  }

  return (
    <CoursesListStyles.Container>
      <h2>{organisation.name}</h2>
      <Grid.Container>
        {courses?.map(course =>
          <CourseBox key={course.id} course={course} />
        )}
      </Grid.Container>
    </CoursesListStyles.Container>
  )
}

export default CoursesList;
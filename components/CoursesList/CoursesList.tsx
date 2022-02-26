import { ContentCenterInPage } from 'components/AppLayout/AppLayout.style'
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs'
import CourseBox from 'components/CoursesList/CourseBox'
import Loader from 'components/Loader/Loader'
import { StaffOrganisationMembershipAlert } from 'components/Membership/MembershipAlerts'
import { generateOrganisationRoute, HOME_ROUTE } from 'constants/navigation'
import React from 'react'
import CoursesListStyles from './CoursesList.style'
import useGetCoursesForOrganisation from 'classroomapi/useGetCoursesForOrganisation'
import useGetOrganisation from 'classroomapi/useGetOrganisation'

type CoursesListProps = {
  organisationId: string;
}

const CoursesList: React.FC<CoursesListProps> = ({ organisationId }) => {

  const {
    data: organisation,
    loading: organisationLoading,
  } = useGetOrganisation({ organisationId });
  const {
    data: courses,
    loading: coursesLoading,
  } = useGetCoursesForOrganisation({ organisationId });



  if (organisationLoading || coursesLoading) {
    return (
      <ContentCenterInPage>
        <Loader />
      </ContentCenterInPage>
    )
  }

  return (
    <CoursesListStyles.Container className={"courses-list"}>
      <Breadcrumbs items={[
        { label: "Home", url: HOME_ROUTE },
        { label: organisation.name, url: generateOrganisationRoute(organisation.id) },
        { label: "Courses" },
      ]} />
      <h2>{organisation.name}</h2>

      <StaffOrganisationMembershipAlert value={organisation} />

      <CoursesListStyles.Grid className={"wide"}>
        {courses?.map(course =>
          <CourseBox key={course.id} course={course} />
        )}
      </CoursesListStyles.Grid>
    </CoursesListStyles.Container>
  )
}

export default CoursesList;
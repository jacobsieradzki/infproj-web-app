import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import ResourceList from './ResourceList'
import ClipsList from './ClipsList'
import CourseAddButton from 'components/CoursesList/CourseAddButton'
import useAuthContext from 'contexts/AuthContext'
import useGetCourse from 'classroomapi/useGetCourse'
import EventsList from 'components/EventsList/EventsList'
import {
  StaffCourseMembershipAlert,
  StudentCourseEnrollmentAlert,
  StudentCourseNewEnrollmentAlert,
  StudentCourseNewEnrollmentLoginAlert
} from 'components/Membership/MembershipAlerts'
import useGetOrganisation from 'classroomapi/useGetOrganisation'
import { ContentCenterInPage } from 'components/AppLayout/AppLayout.style'
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs'
import { HorizontalStack, Spacer } from 'components/GlobalStyles'
import Loader from 'components/Loader/Loader'
import { TabItem } from 'components/Resource/ResourceContainer'
import ResourceStyles from 'components/Resource/ResourceContainer.style'
import { COURSE_ROUTE, generateCourseRoute, generateCourseRouteMenu, generateOrganisationRoute, HOME_ROUTE } from 'constants/navigation'

interface CourseScreen {
  organisationId: string;
  courseId: string;
}

const CourseScreen: React.FC<CourseScreen> = ({ organisationId, courseId }) => {
  const { isLoggedIn, membership } = useAuthContext();
  const router = useRouter();
  const [tab, setTab] = useState(router.query.tab?.toString() || "events");

  useEffect(() => {
    if (!organisationId || !courseId) return;
    let route = COURSE_ROUTE + "?tab=" + tab;
    let path = generateCourseRouteMenu(organisationId, courseId, tab);
    console.log(COURSE_ROUTE + route, path);
    router.replace(route, path, { shallow: true });
  }, [tab]);

  const {
    data: organisation,
    loading: organisationLoading
  } = useGetOrganisation({ organisationId });
  const {
    data: course,
    loading: courseLoading
  } = useGetCourse({ courseId });

  if (organisationLoading || courseLoading) {
    return (
      <ContentCenterInPage>
        <Loader />
      </ContentCenterInPage>
    )
  }

  if (!organisation || !course) {
    return (
      <ContentCenterInPage>
        <p>Error</p>
      </ContentCenterInPage>
    )
  }

  let showAdd = membership.hasStaffPermissionForCourse(course);

  return (
    <ResourceStyles.Container>
      <ResourceStyles.Content>
        <ResourceStyles.Header>
          <Breadcrumbs items={[
            { label: "Home", url: HOME_ROUTE },
            { label: organisation.name, url: generateOrganisationRoute(organisation.id) },
            { label: "Courses", url: generateOrganisationRoute(organisation.id) },
            { label: course?.id },
          ]} />
          <h1>{course.name}</h1>

          <HorizontalStack gap={16}>
            <TabItem compact tabId={"events"} {...{ tab, setTab }}>Events</TabItem>
            <TabItem compact tabId={"resources"} {...{ tab, setTab }}>Resources</TabItem>
            <TabItem compact tabId={"clips"} {...{ tab, setTab }}>Clips</TabItem>
            <TabItem compact tabId={"links"} {...{ tab, setTab }}>Links</TabItem>
            <Spacer />
            {showAdd && <CourseAddButton {...{ organisationId, courseId }} />}
          </HorizontalStack>

          <ResourceStyles.TabWrapper tab={tab}>
            <div className={"events"}>
              <EventsList organisation={organisation} course={course} />
            </div>
            <div className={"resources"}>
              <ResourceList organisation={organisation} course={course} />
            </div>
            <div className={"clips"}>
              <ClipsList organisation={organisation} course={course} />
            </div>
            <div className={"links"}>
              <ResourceList organisation={organisation} course={course} />
            </div>
          </ResourceStyles.TabWrapper>

        </ResourceStyles.Header>
      </ResourceStyles.Content>

      <ResourceStyles.Column>
        <ResourceStyles.ColumnContent>
          {!isLoggedIn && <StudentCourseNewEnrollmentLoginAlert />}
          {isLoggedIn && <StudentCourseNewEnrollmentAlert value={course} />}
          {isLoggedIn && <StudentCourseEnrollmentAlert value={course} />}
          {isLoggedIn && <StaffCourseMembershipAlert value={course} />}
        </ResourceStyles.ColumnContent>
      </ResourceStyles.Column>
    </ResourceStyles.Container>
  )
}

export default CourseScreen
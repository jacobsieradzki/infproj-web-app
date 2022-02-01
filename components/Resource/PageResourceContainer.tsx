import useGetResource from 'classroomapi/useGetResource'
import ResourceContainer from 'components/Resource/ResourceContainer'
import Course from 'models/Course'
import Organisation from 'models/Organisation'
import Resource from 'models/Resource'
import React from 'react'
import useGetOrganisation from 'classroomapi/useGetOrganisation'
import { ContentCenterInPage } from 'components/AppLayout/AppLayout.style'
import Loader from 'components/Loader/Loader'

type PageResourceContainerProps = {
  organisationId: string;
  courseId: string;
  resourceId: string;
}

const PageResourceContainer: React.FC<PageResourceContainerProps> = ({ organisationId, courseId, resourceId }) => {

  const organisationRes = useGetOrganisation({ organisationId });
  const resourceRes = useGetResource({ courseId, resourceId });

  let organisation = organisationRes?.data;
  let resource = resourceRes?.data;
  let course = resource?.course;

  if (organisationRes.loading || resourceRes.loading) {
    return (
      <ContentCenterInPage>
        <Loader />
      </ContentCenterInPage>
    )
  }

  return <ResourceContainer
    organisation={new Organisation(organisation)}
    course={new Course(course)}
    resource={new Resource(resource)}
  />;
}

export default PageResourceContainer
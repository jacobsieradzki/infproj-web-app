import React, { useState } from 'react'
import ResourcePreview from 'components/Link/ResourcePreview'
import Resource from 'models/Resource'
import { ContentCenterInPage } from 'components/AppLayout/AppLayout.style'
import CoursesListStyles from 'components/CoursesList/CoursesList.style'
import Organisation from 'models/Organisation'
import Course from 'models/Course'
import Loader from 'components/Loader/Loader'
import useGetResources from 'classroomapi/useGetResources'

type ResourceListProps = {
  organisation: Organisation;
  course: Course;
}

const ResourceList: React.FC<ResourceListProps> = ({ organisation, course }) => {

  const [resources, setResources] = useState([]);
  const { loading } = useGetResources({ courseId: course.id, onCompleted: res => {
    setResources(res.map(x => new Resource(x)));
  }});

  if (loading) {
    return (
      <ContentCenterInPage>
        <Loader />
      </ContentCenterInPage>
    )
  }

  if (!resources) {
    return (
      <ContentCenterInPage>
        <p>Error</p>
      </ContentCenterInPage>
    )
  }

  return (
    <CoursesListStyles.Container>
      <CoursesListStyles.List>
        {loading && <Loader style={{ margin: '20 auto' }} />}
        {resources?.map(resource =>
          <ResourcePreview key={resource.id} resource={resource} />
        )}
      </CoursesListStyles.List>
    </CoursesListStyles.Container>
  )
}

export default ResourceList
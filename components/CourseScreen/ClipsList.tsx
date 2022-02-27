import React, { useState } from 'react'
import useGetClips from 'classroomapi/useGetClips'
import ClipPreview from 'components/Link/ClipPreview'
import Clip from 'models/Clip'
import { ContentCenterInPage } from 'components/AppLayout/AppLayout.style'
import CoursesListStyles from 'components/CoursesList/CoursesList.style'
import Organisation from 'models/Organisation'
import Course from 'models/Course'
import Loader from 'components/Loader/Loader'

type ResourceListProps = {
  organisation: Organisation;
  course: Course;
}

const ResourceList: React.FC<ResourceListProps> = ({ organisation, course }) => {

  const [clips, setClips] = useState([]);
  const { loading } = useGetClips({ courseId: course.id, onCompleted: res => {
    if (res.length > 0) {
      setClips(res.map(x => new Clip(x)).filter(x => {
        if (x.type == "PDF_PAGE" && x.description === "") return false;
        return true;
      }));
    }
  }});

  if (loading) {
    return (
      <ContentCenterInPage>
        <Loader />
      </ContentCenterInPage>
    )
  }

  if (!clips) {
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
        {clips?.map(clip =>
          <ClipPreview key={clip.id} clip={clip} />
        )}
      </CoursesListStyles.List>
    </CoursesListStyles.Container>
  )
}

export default ResourceList
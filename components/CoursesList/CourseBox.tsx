import React from 'react'
import { Spacer, Grid, CaptionUppercase } from 'components/GlobalStyles'
import { COURSE_ROUTE } from 'constants/navigation'
import Course from 'models/Course'
import CoursesListStyles, { BoxContent, LecturePreview } from './CoursesList.style'

type CourseBoxProps = {
  course: Course;
}

const CourseBox: React.FC<CourseBoxProps> = ({ course }) => {

  let href = COURSE_ROUTE
    .replace('[organisationId]', course.organisation_id)
    .replace('[courseId]', course.id);

  return (
    <CoursesListStyles.Box as={"a"} href={href}>
      <LecturePreview>
        <CaptionUppercase>{course.id}</CaptionUppercase>
        <p>{course.name}</p>
      </LecturePreview>
      <BoxContent>
        <p>Description</p>
        <CaptionUppercase>{course.organisation_id}</CaptionUppercase>
      </BoxContent>
    </CoursesListStyles.Box>
  )
}

export default CourseBox
import React from 'react'
import { CaptionUppercase } from 'components/GlobalStyles'
import { generateCourseRoute } from 'constants/navigation'
import Course from 'models/Course'
import CoursesListStyles, { BoxContent, LecturePreview } from './CoursesList.style'

type CourseBoxProps = {
  course: Course;
}

const CourseBox: React.FC<CourseBoxProps> = ({ course }) => {
  return (
    <CoursesListStyles.Box as={"a"} href={generateCourseRoute(course.organisation_id, course.id)}>
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
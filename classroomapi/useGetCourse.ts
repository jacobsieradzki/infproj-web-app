import Course from 'models/Course'
import useBaseRequest from 'classroomapi/useBaseRequest'
import { EndpointHook } from 'models/API'

type GetCourseProps = (props: {
  courseId: string;
}) => EndpointHook<Course>;

const useGetCourse: GetCourseProps = ({ courseId }) => {
  return useBaseRequest<Course>({
    path: "course/" + courseId,
    skip: !courseId,
  });
}

export default useGetCourse;
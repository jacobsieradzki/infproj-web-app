import Course from 'models/Course'
import useBaseRequest from 'classroomapi/useBaseRequest'
import { EndpointHook } from 'models/API'

type GetCoursesForOrganisationProps = (props: {
  organisationId: string;
}) => EndpointHook<Course[]>;

const useGetCoursesForOrganisation: GetCoursesForOrganisationProps = ({ organisationId }) => {
  return useBaseRequest<Course[]>({
    path: "course/?organisation_id=" + organisationId,
    defaultValue: [],
    skip: !organisationId,
  });
}

export default useGetCoursesForOrganisation;
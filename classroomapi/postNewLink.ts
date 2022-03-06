import { fetchBaseRequest } from 'classroomapi/useBaseRequest'
import { AuthContextProps } from 'contexts/AuthContext'
import Course from 'models/Course'
import Link from 'models/Link'

export interface PostNewLinkProps {
  subtitle_id: string;
  from_id: string;
  from_type: string;
  to_id: string;
  to_type: string;
}

export const postNewLink = (authState: AuthContextProps, course: Course, props: PostNewLinkProps): Promise<Link> => {

  const { credentials = "" } = authState;

  return fetchBaseRequest({
    path: "link/" + course.id + "/",
    method: "POST",
    body: props,
    credentials
  });
}

export default postNewLink
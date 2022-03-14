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

export interface PostNewClipLinkProps {
  course_id: string;
  subtitle_id?: string;
  video_id: string;
  from_id: string;
  from_type: string;
  content?: string;
  description?: string;
  start_location?: number;
  end_location?: number;
}

export const postNewVideoClipLink = (authState: AuthContextProps, props: PostNewClipLinkProps): Promise<Link> => {
  const { credentials = "" } = authState;
  return fetchBaseRequest({
    path: "create/link/video_clip",
    method: "POST",
    body: props,
    credentials
  });
}

export interface PostNewUrlLinkProps {
  course_id: string;
  subtitle_id: string;
  from_id: string;
  from_type: string;
  type?: string;
  url: string;
  name?: string;
  description?: string;
}

export const postNewUrlLink = (authState: AuthContextProps, props: PostNewUrlLinkProps): Promise<Link> => {
  const { credentials = "" } = authState;
  return fetchBaseRequest({
    path: "create/link/url",
    method: "POST",
    body: props,
    credentials
  });
}

export default postNewLink
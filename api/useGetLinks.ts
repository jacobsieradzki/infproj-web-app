import useBaseRequest from 'api/useBaseRequest'
import { EndpointHook } from 'models/API'
import Link from 'models/Link'

// https://jake-inf-project.herokuapp.com/link/6-034/?id=28&type=RESOURCE

type GetLinkForProps = (props: {
  courseId: string;
  id: string;
}) => EndpointHook<Link[]>;

type GetLinkProps = (props: {
  courseId: string;
  id: string;
  type: string;
}) => EndpointHook<Link[]>;

const useGetLinks: GetLinkProps = ({ id, courseId, type }) => {
  return useBaseRequest<Link[]>({
    path: "link/" + courseId + "/?id=" + id + "&type=" + type,
    defaultValue: [],
    skip: !(id && type),
  });
}

export default useGetLinks;

export const useGetLinksForResource: GetLinkForProps = ({ id, courseId }) => {
  return useGetLinks({ id, courseId, type: "RESOURCE" });
}
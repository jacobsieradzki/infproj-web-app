import useBaseRequest from 'api/useBaseRequest'
import { EndpointHook } from 'models/API'
import Resource from 'models/Resource'

type GetResourceProps = (props: {
  courseId: string;
  resourceId: string;
}) => EndpointHook<Resource>;

const useGetResource: GetResourceProps = ({ courseId, resourceId }) => {
  return useBaseRequest<Resource>({
    path: "resource/" + courseId + "/" + resourceId,
    skip: !(courseId && resourceId)
  });
}

export default useGetResource;
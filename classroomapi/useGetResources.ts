import useBaseRequest from 'classroomapi/useBaseRequest'
import { EndpointHook } from 'models/API'
import Resource from 'models/Resource'

type GetResourcesProps = (props: {
  courseId: string;
  onCompleted?: (res: Resource[]) => void;
}) => EndpointHook<Resource[]>;

const useGetResources: GetResourcesProps = ({ courseId, onCompleted }) => {
  return useBaseRequest<Resource[]>({
    path: "resource/" + courseId,
    defaultValue: [],
    skip: !courseId,
    onCompleted,
  });
}

export default useGetResources;
import useBaseRequest from 'classroomapi/useBaseRequest'
import { EndpointHook } from 'models/API'
import Clip from 'models/Clip'

type GetClipsProps = (props: {
  courseId: string;
  resourceId?: string;
  onCompleted?: (res: Clip[]) => void;
}) => EndpointHook<Clip[]>;

const useGetClips: GetClipsProps = ({ courseId, resourceId, onCompleted }) => {
  let path = "clip/" + courseId;
  if (resourceId) path += "?resource_id=" + resourceId;
  return useBaseRequest<Clip[]>({
    path,
    defaultValue: [],
    skip: !courseId,
    onCompleted
  });
}

export default useGetClips
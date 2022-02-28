import useBaseRequest from 'classroomapi/useBaseRequest'
import { EndpointHook } from 'models/API'
import Clip from 'models/Clip'
import { mutate } from 'swr'

interface GetClipsProps {
  courseId: string;
  resourceId?: string;
  onCompleted?: (res: Clip[]) => void;
}

const useGetClips = ({ courseId, resourceId, onCompleted }: GetClipsProps): EndpointHook<Clip[]> => {
  let path = "clip/" + courseId;
  if (resourceId) path += "?resource_id=" + resourceId;
  return useBaseRequest<Clip[]>({
    path,
    defaultValue: [],
    skip: !courseId,
    onCompleted
  });
}

export const refreshUseGetClips = async ({ courseId, resourceId }: GetClipsProps) => {
  let path = "clip/" + courseId;
  if (resourceId) path += "?resource_id=" + resourceId;
  console.log('mutating path...', path);
  await mutate(path);
}

export default useGetClips
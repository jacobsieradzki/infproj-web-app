import useBaseRequest from 'classroomapi/useBaseRequest'
import { EndpointHook } from 'models/API'
import Subtitle from 'models/Subtitle'

type GetSubtitlesProps = (props: {
  courseId: string;
  resourceId: string;
}) => EndpointHook<Subtitle[]>;

const useGetSubtitles: GetSubtitlesProps = ({ courseId, resourceId }) => {
  return useBaseRequest<Subtitle[]>({
    path: "subtitle/" + courseId + "/" + resourceId,
    defaultValue: [],
    skip: !(courseId && resourceId)
  });
}

export default useGetSubtitles
import useBaseRequest from 'classroomapi/useBaseRequest'
import { EndpointHook } from 'models/API'
import Highlight from 'models/Highlight'

type GetHighlightsProps = (props: {
  resourceId: string;
  onCompleted?: (res: Highlight[]) => void;
}) => EndpointHook<Highlight[]>;

const useGetHighlights: GetHighlightsProps = ({ resourceId, onCompleted }) => {
  return useBaseRequest<Highlight[]>({
    path: "highlight/" + resourceId,
    defaultValue: [],
    skip: !resourceId,
    onCompleted,
  });
}

export default useGetHighlights
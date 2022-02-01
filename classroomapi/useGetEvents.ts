import Event from 'models/Event'
import useBaseRequest from 'classroomapi/useBaseRequest'
import { EndpointHook } from 'models/API'

type GetEventsProps = (props: {
  courseId: string;
}) => EndpointHook<Event[]>;

const useGetEvents: GetEventsProps = ({ courseId }) => {
  return useBaseRequest<Event[]>({
    path: "event/" + courseId,
    defaultValue: [],
    skip: !courseId,
  });
}

export default useGetEvents;
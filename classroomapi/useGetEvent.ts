import Event from 'models/Event'
import useBaseRequest from 'classroomapi/useBaseRequest'
import { EndpointHook } from 'models/API'

type GetEventProps = (props: {
  courseId: string;
  eventId: string;
}) => EndpointHook<Event>;

const useGetEvent: GetEventProps = ({ courseId, eventId }) => {
  return useBaseRequest<Event>({
    path: "event/" + courseId + "/" + eventId,
    skip: !(courseId && courseId),
  });
}

export default useGetEvent;
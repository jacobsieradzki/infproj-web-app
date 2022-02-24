import useBaseRequest, { fetchBaseRequest } from 'classroomapi/useBaseRequest'
import useAuthContext, { AuthContextProps } from 'contexts/AuthContext'
import { EndpointHook } from 'models/API'
import Clip from 'models/Clip'
import Membership from 'models/Membership'
import User from 'models/User'

export const postNewHighlight = (authState: AuthContextProps, newClip: Clip): Promise<Membership[]> => {

  const { credentials = "" } = authState;

  return fetchBaseRequest({
    path: "highlight/" + newClip.resource.id + "/",
    method: "POST",
    body: {
      ...newClip,
      resource_id: newClip.resource.id,
      resource: undefined
    },
    credentials
  });
}

export default postNewHighlight
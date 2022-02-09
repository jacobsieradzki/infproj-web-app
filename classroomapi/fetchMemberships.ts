import useBaseRequest, { fetchBaseRequest } from 'classroomapi/useBaseRequest'
import useAuthContext, { AuthContextProps } from 'contexts/AuthContext'
import { EndpointHook } from 'models/API'
import Membership from 'models/Membership'
import User from 'models/User'

export const fetchMemberships = (authState: AuthContextProps): Promise<Membership[]> => {
  const { credentials = "" } = authState;
  return fetchBaseRequest({
    path: "user/memberships/",
    credentials
  });
}

export default fetchMemberships
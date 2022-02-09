import useBaseRequest, { fetchBaseRequest } from 'classroomapi/useBaseRequest'
import { EndpointHook } from 'models/API'
import User from 'models/User'

type GetUserProps = (username: string, password: string, onCompleted: (res: User) => void) => EndpointHook<User>;

const useGetUser: GetUserProps = (username, password, onCompleted) => {
  return useBaseRequest<User>({
    path: "user/",
    skip: !(username && password),
    username, password,
    onCompleted,
  });
}

export const fetchUser = (username: string, password: string): Promise<User> => {
  return fetchBaseRequest("user/", { username, password });
}

export default useGetUser
import useBaseRequest from 'api/useBaseRequest'
import { EndpointHook } from 'models/API'
import Organisation from 'models/Organisation'

type GetAllOrganisationsProps = () => EndpointHook<Organisation[]>;

const useGetAllOrganisations: GetAllOrganisationsProps = () => {
  return useBaseRequest<Organisation[]>({
    path: "organisation/",
    defaultValue: []
  });
}

export default useGetAllOrganisations;
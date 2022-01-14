import useBaseRequest from 'api/useBaseRequest'
import { EndpointHook } from 'models/API'
import Organisation from 'models/Organisation'

type GetOrganisationsProps = (props: {
  organisationId: string;
}) => EndpointHook<Organisation>;

const useGetOrganisation: GetOrganisationsProps = ({ organisationId }) => {
  return useBaseRequest<Organisation>({
    path: "organisation/" + organisationId,
    skip: !organisationId
  });
}

export default useGetOrganisation;
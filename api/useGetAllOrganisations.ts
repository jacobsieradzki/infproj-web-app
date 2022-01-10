import { useState } from 'react'
import useBaseRequest from 'api/useBaseRequest'
import { EndpointHook } from 'models/API'
import Organisation from 'models/Organisation'

const MOCK: EndpointHook<Organisation[]> = {
  data: [
    {
      id: "mit",
      name: "Massachusetts Institute of Technology",
      imageUrl: "/organisations/mit.png"
    },
    {
      id: "uoe",
      name: "University of Edinburgh",
      imageUrl: "/organisations/uoe.png"
    }
  ],
  loading: false,
  error: null
}

const useGetAllOrganisations = (): EndpointHook<Organisation[]> => {
  return MOCK;

  const [requestProps] = useState({});

  return useBaseRequest<Organisation[]>({
    path: "organisation/",
    requestProps,
    defaultValue: []
  });
}

export default useGetAllOrganisations;
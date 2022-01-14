import React from 'react'
import useGetAllOrganisations from 'api/useGetAllOrganisations'
import OrganisationBox from 'components/Organisations/OrganisationBox'
import AllOrganisationsStyle from './Organisations.style'

const AllOrganisations: React.FC = () => {

  const { data: organisations, loading, error } = useGetAllOrganisations();

  return (
    <AllOrganisationsStyle.Container>
      <AllOrganisationsStyle.Grid>
        {organisations?.map(organisation =>
          <OrganisationBox key={organisation.id} organisation={organisation} />
        )}
      </AllOrganisationsStyle.Grid>
    </AllOrganisationsStyle.Container>
  )
}

export default AllOrganisations
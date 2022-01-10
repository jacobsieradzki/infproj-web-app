import useGetAllOrganisations from 'api/useGetAllOrganisations'
import OrganisationBox from 'components/Organisations/OrganisationBox'
import React from 'react'
import AllOrganisationsStyle from './Organisations.style'

type AllOrganisationsProps = {

}

const AllOrganisations: React.FC<AllOrganisationsProps> = ({ }) => {

  const { data: organisations, loading, error } = useGetAllOrganisations();

  return (
    <AllOrganisationsStyle.Container>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <AllOrganisationsStyle.Grid>
        {organisations.map(organisation =>
          <OrganisationBox key={organisation.id} organisation={organisation} />
        )}
      </AllOrganisationsStyle.Grid>
    </AllOrganisationsStyle.Container>
  )
}

export default AllOrganisations
import { ContentCenterInPage } from 'components/AppLayout/AppLayout.style'
import Loader from 'components/Loader/Loader'
import React from 'react'
import useGetAllOrganisations from 'api/useGetAllOrganisations'
import OrganisationBox from 'components/Organisations/OrganisationBox'
import AllOrganisationsStyle from './Organisations.style'
import { Grid } from 'components/GlobalStyles'

const AllOrganisations: React.FC = () => {

  const { data: organisations, loading } = useGetAllOrganisations();

  if (loading) {
    return (
      <ContentCenterInPage>
        <Loader />
      </ContentCenterInPage>
    )
  }

  return (
    <AllOrganisationsStyle.Container>
      <Grid.Container>
        {organisations?.map(organisation =>
          <OrganisationBox key={organisation.id} organisation={organisation} />
        )}
      </Grid.Container>
    </AllOrganisationsStyle.Container>
  )
}

export default AllOrganisations
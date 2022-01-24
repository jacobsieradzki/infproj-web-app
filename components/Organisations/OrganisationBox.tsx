import React from 'react'
import { Spacer, Grid } from 'components/GlobalStyles'
import { generateOrganisationRoute, ORGANISATION_COURSES_ROUTE } from 'constants/navigation'
import Organisation from 'models/Organisation'
import OrganisationsStyles from './Organisations.style'

type OrganisationBoxProps = {
  organisation: Organisation;
}

const OrganisationBox: React.FC<OrganisationBoxProps> = ({ organisation }) => {
  return (
    <OrganisationsStyles.Box as={"a"} href={generateOrganisationRoute(organisation.id)}>
      <OrganisationsStyles.Logo imageUrl={organisation.image_url} />
      <Spacer />
      <p>{organisation.name}</p>
      <Spacer />
    </OrganisationsStyles.Box>
  )
}

export default OrganisationBox
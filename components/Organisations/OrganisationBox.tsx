import React from 'react'
import { Spacer, Grid } from 'components/GlobalStyles'
import { ORGANISATION_COURSES_ROUTE } from 'constants/navigation'
import Organisation from 'models/Organisation'
import OrganisationsStyles from './Organisations.style'

type OrganisationBoxProps = {
  organisation: Organisation;
}

const OrganisationBox: React.FC<OrganisationBoxProps> = ({ organisation }) => {

  let href = ORGANISATION_COURSES_ROUTE.replace('[organisationId]', organisation.id);

  return (
    <OrganisationsStyles.Box as={"a"} href={href}>
      <OrganisationsStyles.Logo imageUrl={organisation.image_url} />
      <Spacer />
      <p>{organisation.name}</p>
      <Spacer />
    </OrganisationsStyles.Box>
  )
}

export default OrganisationBox
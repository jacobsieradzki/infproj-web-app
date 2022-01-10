import { Spacer } from 'components/GlobalStyles'
import { ORGANISATION_COURSES_ROUTE } from 'constants/navigation'
import React from 'react'
import Organisation from 'models/Organisation'
import OrganisationsStyles from './Organisations.style'

type OrganisationBoxProps = {
  organisation: Organisation;
}

const OrganisationBox: React.FC<OrganisationBoxProps> = ({ organisation }) => {

  let href = ORGANISATION_COURSES_ROUTE.replace('[courseId]', organisation.id);

  return (
    <OrganisationsStyles.Box href={href}>
      <OrganisationsStyles.Logo imageUrl={organisation.imageUrl} />
      <Spacer />
      <p>{organisation.name}</p>
      <Spacer />
    </OrganisationsStyles.Box>
  )
}

export default OrganisationBox
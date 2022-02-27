import useAuthContext from 'contexts/AuthContext'
import React from 'react'
import CoursesListStyles, { BoxContent } from 'components/CoursesList/CoursesList.style'
import { IconDefinition } from '@fortawesome/fontawesome-common-types'
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs'
import ResourceStyles from 'components/Resource/ResourceContainer.style'
import { generateCourseRoute, generateOrganisationRoute, HOME_ROUTE } from 'constants/navigation'
import Course from 'models/Course'
import Organisation from 'models/Organisation'
import NewMenuStyles from './NewMenu.style'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'

interface NewMenuProps {
  organisation: Organisation;
  course: Course;
  title: string;
  items: {
    label: string,
    url?: string,
    onClick?: () => void,
    icon: IconDefinition
  }[];
}

const NewMenu: React.FC<NewMenuProps> = ({ title, organisation, course, items }) => {

  const { membership } = useAuthContext();
  let hasPermission = membership.hasStaffPermissionForCourse(course);

  return (
    <NewMenuStyles.Container>
      <ResourceStyles.Header>
        <Breadcrumbs items={[
          { label: "Home", url: HOME_ROUTE },
          { label: organisation.name, url: generateOrganisationRoute(organisation.id) },
          { label: course?.name, url: generateCourseRoute(organisation.id, course?.id) },
          { label: "New" },
        ]} />

        <h1>{title}</h1>

      </ResourceStyles.Header>

      {!hasPermission && (
        <NewMenuStyles.Error>
          <p>
            <FontAwesomeIcon icon={faExclamationTriangle} />&nbsp;
            You do not have permission to edit this course.
          </p>
        </NewMenuStyles.Error>
      )}

      {hasPermission && <NewMenuStyles.Grid>
        {items.map(item => (!!item.url ? (
          <NewMenuStyles.Box key={item.label} href={item.url}>
            <NewMenuStyles.IconContent>
              <FontAwesomeIcon icon={item.icon} size={'2x'} />
            </NewMenuStyles.IconContent>
            <NewMenuStyles.BoxContent>
              <p>{item.label}</p>
            </NewMenuStyles.BoxContent>
          </NewMenuStyles.Box>
        ) : (
          <NewMenuStyles.BoxButton key={item.label} onClick={item.onClick}>
            <NewMenuStyles.IconContent>
              <FontAwesomeIcon icon={item.icon} size={'2x'} />
            </NewMenuStyles.IconContent>
            <NewMenuStyles.BoxContent>
              <p>{item.label}</p>
            </NewMenuStyles.BoxContent>
          </NewMenuStyles.BoxButton>
        )))}
      </NewMenuStyles.Grid>}
    </NewMenuStyles.Container>
  )
}

export default NewMenu

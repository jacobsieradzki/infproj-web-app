import { Spacer } from 'components/GlobalStyles'
import ResourceStyles from 'components/Resource/ResourceContainer.style'
import { generateRoute, NEW_EVENT_ROUTE, NEW_RES_ROUTE } from 'constants/navigation'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { ListItemIcon, Menu, MenuItem } from '@mui/material'
import TodayIcon from '@mui/icons-material/Today'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface CourseAddButtonProps {
  organisationId: string;
  courseId: string;
}

const CourseAddButton: React.FC<CourseAddButtonProps> = ({ organisationId, courseId }) => {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [anchorElement, setAnchorElement] = useState(null);

  const close = () => setOpen(false);

  const handleClick = e => {
    setAnchorElement(e.currentTarget);
    setOpen(!open);
  }

  const generateUrl = (route: string) => generateRoute(route, organisationId, courseId);

  const handleCreateEvent = () => router.push(generateUrl(NEW_EVENT_ROUTE))
  const handleCreateResource = () => router.push(generateUrl(NEW_RES_ROUTE));

  return (
    <>
      <ResourceStyles.ColumnTab className={"compact " + (open ? "selected" : "")} onClick={handleClick}>
        <FontAwesomeIcon icon={faPlus} />
      </ResourceStyles.ColumnTab>

      <Menu anchorEl={anchorElement}
        open={open}
        onClose={close}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 32,
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleCreateEvent}>
          <ListItemIcon>
            <TodayIcon />
          </ListItemIcon>
          Create event
        </MenuItem>
        <MenuItem onClick={handleCreateResource}>
          <ListItemIcon>
            <UploadFileIcon />
          </ListItemIcon>
          Create resource
        </MenuItem>
      </Menu>
    </>
  )
}

export default CourseAddButton
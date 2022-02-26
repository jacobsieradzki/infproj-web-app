import React, { useState } from 'react'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ListItemIcon, Menu, MenuItem } from '@mui/material'
import CoursesListStyles from 'components/CoursesList/CoursesList.style'
import VideocamIcon from '@mui/icons-material/Videocam';
import SchoolIcon from '@mui/icons-material/School';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

type NewEventBoxProps = {

}

const NewEventBox: React.FC<NewEventBoxProps> = ({  }) => {

  const [open, setOpen] = useState(false);
  const [anchorElement, setAnchorElement] = useState(null);

  const handleClick = e => {
    setAnchorElement(e.currentTarget);
    setOpen(!open);
  }

  return (
    <CoursesListStyles.NewBox as={"button"} onClick={handleClick}>
      <FontAwesomeIcon icon={faPlus} size={"2x"} />

      <Menu anchorEl={anchorElement}
        open={open}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
      >
        <MenuItem>
          <ListItemIcon>
            <VideocamIcon />
          </ListItemIcon>
          Lecture
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <SchoolIcon />
          </ListItemIcon>
          Workshop
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <InsertDriveFileIcon />
          </ListItemIcon>
          Assignment
        </MenuItem>
      </Menu>

    </CoursesListStyles.NewBox>
  )
}

export default NewEventBox
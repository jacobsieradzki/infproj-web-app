import Course from 'models/Course'
import Organisation from 'models/Organisation'
import React from 'react'
import Popup from 'components/Popup/Popup'
import Link from 'models/Link'
import CreateLink from './CreateLink'

export interface CreateLinkPopupProps {
  isOpen: boolean;
  closeModal: () => void;
  course: Course;
  selectedId: string;
  selectedType: string;
  anchorSubtitleId?: string;
  handleCreatedLink: (link: Link) => void;
}

const CreateLinkPopup: React.FC<CreateLinkPopupProps> = (props) => {
  const { isOpen, closeModal } = props;
  return (
    <Popup isOpen={isOpen} closeModal={closeModal} title={"Create new connection"} minHeight={600}>
      <CreateLink {...props} />
    </Popup>
  )
}

export default CreateLinkPopup
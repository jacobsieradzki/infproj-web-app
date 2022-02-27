import Popup from 'components/Popup/Popup'
import Resource from 'models/Resource'
import React from 'react'
import CreatePDF from './CreatePDF'

export interface CreatePDFPopupProps {
  isOpen: boolean;
  closeModal: () => void;
  courseId: string;
  handleCreatedResource: (resource: Resource) => void;
}

const CreatePDFPopup: React.FC<CreatePDFPopupProps> = (props) => {
  const { isOpen, closeModal } = props;
  return (
    <Popup isOpen={isOpen} closeModal={closeModal} title={"Create new PDF resource"} minHeight={600}>
      <CreatePDF {...props} />
    </Popup>
  )
}

export default CreatePDFPopup
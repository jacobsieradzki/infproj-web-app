import React from 'react'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Modal } from '@mui/material'
import PopupStyles from './Popup.style'

export type PopupProps = {
  isOpen: boolean;
  closeModal: () => void;
  title?: string;
}

export const Popup: React.FC<PopupProps> = ({ isOpen, closeModal, title, children }) => {
  return (
    <Modal open={isOpen} onClose={closeModal}>
      <PopupStyles.Container>
        <PopupStyles.Box>
          {title?.length > 0 && <PopupStyles.Header>
            <p>{title}</p>
            <button className={"close"} onClick={closeModal}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </PopupStyles.Header>}
          <PopupStyles.Content>
            {children}
          </PopupStyles.Content>
        </PopupStyles.Box>
      </PopupStyles.Container>
    </Modal>
  )
}

export default Popup
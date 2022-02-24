import React, { useState, createContext, useContext } from 'react'
import Popup from 'components/Popup/Popup'

type PopupContextProps = {
  title: string;
  content: string;
}

type PopupProviderCallback = {
  showStandardError: () => void;
  showError: (message: string) => void;
  showErrorTitle: (message: string, title: string) => void;
}

const INITIAL_STATE: PopupContextProps = null;

export const PopupContext = createContext<Partial<PopupProviderCallback>>({});
export const usePopupContext = () => useContext(PopupContext);

export const PopupContextProvider: React.FunctionComponent = ({ children }) => {

  const [popupState, setPopupState] = useState<PopupContextProps>(INITIAL_STATE);
  const closeModal = () => setPopupState(null);

  const showError = (message: string, title: string = "Error!") => {
    setPopupState({ title, content: message });
  }

  const props: PopupProviderCallback = {
    showStandardError: () => showError("An error occurred - please try again later.", "Error!"),
    showError: m => showError(m),
    showErrorTitle: showError,
  };

  return (
    <PopupContext.Provider value={props}>
      <Popup isOpen={!!popupState} closeModal={closeModal} title={popupState?.title} minHeight={200}>
        <p style={{ margin: 20 }}>{popupState?.content}</p>
      </Popup>
      {children}
    </PopupContext.Provider>
  );
};

export default usePopupContext;

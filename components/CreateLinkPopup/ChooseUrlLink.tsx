import Loader from 'components/Loader/Loader'
import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import { HandleCreateUrlLinkProps } from 'components/CreateLinkPopup/CreateLink'
import Button from 'components/Button/Button'
import { Spacer } from 'components/GlobalStyles'
import { CreateLinkPopupProps } from 'components/CreateLinkPopup/CreateLinkPopup'
import CreateLinkStyle from './CreateLink.style'

function validateUrl(value) {
  return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);
}

const URL_LABELS = { 'URL': "web link", "YT": "YouTube video" }
const URL_PLACEHOLDERS = { 'URL': "https://example.com...", "YT": "https://www.youtube.com/watch..." }

interface ChooseUrlLinkProps {
  loading: boolean;
  error: any;
  type: string;
  deselect: () => void;
  handleCreateUrlLink: HandleCreateUrlLinkProps;
};

const ChooseUrlLink: React.FC<CreateLinkPopupProps & ChooseUrlLinkProps> = ({
  loading,
  error,
  type = "URL",
  deselect,
  handleCreateUrlLink,
}) => {

  const [urlText, _setUrlText] = useState("");
  const setUrlText = text => {
    if (!loading) _setUrlText(text);
  }

  const addUrl = (url: string) => handleCreateUrlLink(url, undefined, undefined);

  let urlEmpty = urlText.length < 5;
  let validUrl = validateUrl(urlText);

  return (
    <CreateLinkStyle.Container>

      <div className={"form"}>
        <h2>Add new {URL_LABELS[type]}</h2>
        <TextField fullWidth
          variant={"outlined"}
          margin={"dense"}
          label={"URL"}
          value={urlText}
          placeholder={URL_PLACEHOLDERS[type]}
          onChange={e => setUrlText(e.target.value)} />
        {!urlEmpty && !validUrl && !error && <CreateLinkStyle.ErrorComponent error={"Please enter a valid URL"} />}
        {error && <CreateLinkStyle.ErrorComponent error={error} />}
      </div>


      <Spacer />

      <div className={"buttons"}>
        <Button onClick={deselect}>
          Cancel
        </Button>
        <Spacer />
        {loading && <Loader />}
        {validUrl && !loading && <Button onClick={() => addUrl(urlText)}>
          Add URL
        </Button>}
      </div>
    </CreateLinkStyle.Container>
  )
}

export default ChooseUrlLink
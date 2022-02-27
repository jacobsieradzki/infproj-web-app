import React, { useState } from 'react'
import { faCopy, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import postCreatePdfResource from 'classroomapi/postCreatePdfResource'
import useAuthContext from 'contexts/AuthContext'
import TextField from '@mui/material/TextField'
import Button from 'components/Button/Button'
import { CaptionUppercase, Spacer } from 'components/GlobalStyles'
import Loader from 'components/Loader/Loader'
import CreatePDFStyle from 'components/CreatePDF/CreatePDF.style'
import { CreatePDFPopupProps } from 'components/CreatePDF/CreatePDFPopup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const CreatePDF: React.FC<CreatePDFPopupProps> = ({ closeModal, courseId, handleCreatedResource }) => {

  const { authState } = useAuthContext();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const handleFileUpload = e => setFile(e.target.files[0] || null);

  const handleCreate = async () => {
    if (name.length === 0) return setError("Please provide a name for your PDF.");
    if (!file) return setError("Please upload a PDF file.");

    setLoading(true);
    setError(null);
    try {
      let props = { courseId, name, description, file };
      let response = await postCreatePdfResource(authState, props);
      if (response) {
        handleCreatedResource(response);
        closeModal();
      } else {
        setLoading(false);
        setError("Something went wrong creating this resource - please try again later.");
      }
    } catch (e) {
      setError(e.toString());
      setLoading(false);
    }
  }

  return (
    <CreatePDFStyle.Container>
      <Spacer />

      <div className={"text-field"}>
        <TextField fullWidth
          variant={"outlined"}
          margin={"dense"}
          label={"Name"}
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </div>

      <div className={"text-field"}>
        <TextField fullWidth
          variant={"outlined"}
          margin={"dense"}
          label={"Description"}
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </div>

      <span className={"caption"}>Upload File</span>
      <div className={"upload"}>
        {!file ? (
          <label onChange={handleFileUpload} htmlFor="pdf-upload">
            <input id="pdf-upload" type="file" accept="application/pdf" hidden />
            <Button as={'span'}>
              <FontAwesomeIcon icon={faCopy} />&nbsp;
              Select PDF file...
            </Button>
          </label>
        ) : (
          <Button onClick={() => setFile(null)}>
            <FontAwesomeIcon icon={faTimesCircle} />&nbsp;&nbsp;
            {file.name}
          </Button>
        )}
      </div>

      {error && <span className={'error'}>{error}</span>}

      <Spacer />

      {!loading ? (
        <div className={'buttons'}>
          <Button onClick={closeModal} style={"inverse-neutral"}>
            Close
          </Button>
          <Spacer />
          <Button onClick={handleCreate} style={"inverse"} variant={"filled"}>
            Create
          </Button>
        </div>
      ) : (
        <div className={'buttons'}>
          <Spacer /><Loader size={24} color={"var(--background-color)"} /><Spacer />
        </div>
      )}
    </CreatePDFStyle.Container>
  )
}

export default CreatePDF